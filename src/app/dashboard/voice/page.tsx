"use client";

import { useState, useRef, useEffect } from "react";
import { saveQuote, saveJob, COMMON_VARIABLES } from "@/lib/storage";

interface ParsedInput {
  type: "quote" | "job_update" | "general";
  clientName?: string;
  location?: string;
  teamSize?: number;
  days?: number;
  floors?: number;
  hasLift?: boolean;
  parking?: boolean;
  congestionCharge?: boolean;
  ulez?: boolean;
  materials?: string[];
  area?: number;
  description?: string;
  raw: string;
}

// Simple NLP parser for trade-speak
function parseVoiceInput(text: string): ParsedInput {
  const lower = text.toLowerCase();
  const result: ParsedInput = { type: "general", raw: text };

  // Detect if it's a quote or job update
  if (
    lower.includes("quote") ||
    lower.includes("price") ||
    lower.includes("job for") ||
    lower.includes("new job")
  ) {
    result.type = "quote";
  } else if (
    lower.includes("finished") ||
    lower.includes("done") ||
    lower.includes("completed") ||
    lower.includes("started")
  ) {
    result.type = "job_update";
  }

  // Extract team size
  const teamMatch = lower.match(/(\d+)\s*(?:men|man|guys|lads|blokes|team|people|labourers)/);
  if (teamMatch) result.teamSize = parseInt(teamMatch[1]);

  // Extract days
  const daysMatch = lower.match(/(\d+)\s*(?:days?|day)/);
  if (daysMatch) result.days = parseInt(daysMatch[1]);

  // Extract floor level
  const floorMatch = lower.match(/(\d+)(?:st|nd|rd|th)?\s*floor/);
  if (floorMatch) result.floors = parseInt(floorMatch[1]);

  // Lift / no lift
  if (lower.includes("no lift") || lower.includes("no elevator") || lower.includes("stairs")) {
    result.hasLift = false;
  } else if (lower.includes("lift") || lower.includes("elevator")) {
    result.hasLift = true;
  }

  // Parking
  if (lower.includes("parking")) {
    result.parking = true;
  }

  // Congestion charge
  if (lower.includes("congestion") || lower.includes("c charge")) {
    result.congestionCharge = true;
  }

  // ULEZ
  if (lower.includes("ulez")) {
    result.ulez = true;
  }

  // Area in m²
  const areaMatch = lower.match(/(\d+)\s*(?:square\s*met(?:re|er)s?|m2|m²|sqm)/);
  if (areaMatch) result.area = parseInt(areaMatch[1]);

  // Location keywords
  const locationPatterns = [
    /(?:in|at|near|around)\s+([A-Z][a-zA-Z\s]+?)(?:\.|,|$|\s+(?:for|with|and|about|got))/,
  ];
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.location = match[1].trim();
      break;
    }
  }

  // Client name
  const clientMatch = text.match(/(?:for|client|customer)\s+([A-Z][a-zA-Z\s&]+?)(?:\.|,|$|\s+(?:in|at|about|they|want))/);
  if (clientMatch) result.clientName = clientMatch[1].trim();

  result.description = text;

  return result;
}

function generateSuggestions(parsed: ParsedInput): string[] {
  const suggestions: string[] = [];

  if (parsed.type === "quote") {
    if (parsed.floors && parsed.floors > 2 && parsed.hasLift === false) {
      const stairCost = parsed.floors * 150;
      suggestions.push(
        `Stair carry fee: ${parsed.floors} floors x £150 = £${stairCost}. Add this to the quote — your lads deserve it.`
      );
    }

    if (parsed.parking) {
      const parkingDays = parsed.days || 1;
      suggestions.push(
        `Parking: £30/day x ${parkingDays} days = £${30 * parkingDays}. Don't forget to add this.`
      );
    }

    if (parsed.congestionCharge) {
      const ccDays = parsed.days || 1;
      suggestions.push(
        `Congestion Charge: £15/day x ${ccDays} days = £${15 * ccDays}.`
      );
    }

    if (parsed.ulez) {
      const ulezDays = parsed.days || 1;
      suggestions.push(
        `ULEZ: £12.50/day x ${ulezDays} days = £${(12.5 * ulezDays).toFixed(2)}.`
      );
    }

    if (parsed.teamSize && parsed.days) {
      const labourRate = 200; // rough day rate per man
      const labourCost = parsed.teamSize * parsed.days * labourRate;
      suggestions.push(
        `Labour estimate: ${parsed.teamSize} men x ${parsed.days} days x £${labourRate}/day = £${labourCost}.`
      );
    }

    if (parsed.area) {
      suggestions.push(
        `Area: ${parsed.area}m². Typical suspended ceiling rate: £25-40/m² = £${parsed.area * 25} to £${parsed.area * 40} supply & fit.`
      );
    }

    if (parsed.location) {
      // Check if Central London (congestion charge zone)
      const centralLondon = ["canary wharf", "city", "westminster", "soho", "covent garden", "mayfair", "holborn", "clerkenwell", "shoreditch", "bank", "moorgate", "aldgate", "fenchurch"];
      if (centralLondon.some((area) => parsed.location!.toLowerCase().includes(area))) {
        suggestions.push(
          `Central London location detected. Don't forget: Congestion Charge (£15/day), ULEZ (£12.50/day), and higher parking costs.`
        );
      }
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Tip: Mention the floor level, parking situation, team size, and number of days for automatic cost suggestions."
      );
    }
  } else if (parsed.type === "job_update") {
    suggestions.push("Job update noted. I'll log this to your dashboard.");
  } else {
    suggestions.push(
      "Try saying something like: \"New quote for Kier Group in Canary Wharf, 4 men, 3 days, 12th floor no lift, need parking.\""
    );
  }

  return suggestions;
}

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [parsed, setParsed] = useState<ParsedInput | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ input: string; suggestions: string[]; time: string }>>([]);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<ReturnType<typeof createRecognition> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setSpeechSupported(false);
    }
  }, []);

  function createRecognition() {
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognition = new (SpeechRecognition as new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: ((event: { results: { transcript: string; isFinal: boolean }[][] }) => void) | null;
      onend: (() => void) | null;
      onerror: ((event: { error: string }) => void) | null;
      start: () => void;
      stop: () => void;
    })();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";
    return recognition;
  }

  function startListening() {
    const recognition = createRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const results = event.results;
      let finalTranscript = "";
      for (let i = 0; i < results.length; i++) {
        finalTranscript += results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);

    if (transcript) {
      processInput(transcript);
    }
  }

  function processInput(text: string) {
    const result = parseVoiceInput(text);
    const suggs = generateSuggestions(result);
    setParsed(result);
    setSuggestions(suggs);
    setHistory([
      {
        input: text,
        suggestions: suggs,
        time: new Date().toLocaleTimeString("en-GB"),
      },
      ...history,
    ]);
  }

  function handleManualSubmit() {
    if (!manualInput.trim()) return;
    processInput(manualInput);
    setTranscript(manualInput);
    setManualInput("");
  }

  function createQuoteFromParsed() {
    if (!parsed) return;

    const variables = [];
    if (parsed.parking && parsed.days) {
      variables.push({ name: "Parking", cost: 30 * parsed.days, notes: `${parsed.days} days` });
    }
    if (parsed.congestionCharge && parsed.days) {
      variables.push({ name: "Congestion Charge", cost: 15 * parsed.days, notes: `${parsed.days} days` });
    }
    if (parsed.ulez && parsed.days) {
      variables.push({ name: "ULEZ", cost: 12.5 * parsed.days, notes: `${parsed.days} days` });
    }
    if (parsed.floors && !parsed.hasLift) {
      variables.push({ name: "Stair Carry (no lift)", cost: parsed.floors * 150, notes: `${parsed.floors} floors` });
    }

    const materialsTotal = parsed.area ? parsed.area * 30 : 0;
    const labourTotal = (parsed.teamSize || 4) * (parsed.days || 1) * 200;
    const variablesTotal = variables.reduce((sum, v) => sum + v.cost, 0);
    const subtotal = materialsTotal + labourTotal + variablesTotal;
    const margin = 15;
    const marginAmount = subtotal * (margin / 100);
    const total = subtotal + marginAmount;

    saveQuote({
      clientName: parsed.clientName || "",
      clientPhone: "",
      clientEmail: "",
      projectAddress: parsed.location || "",
      description: parsed.raw,
      lineItems: [
        ...(parsed.area
          ? [{ description: "Suspended ceiling S&F", quantity: parsed.area, unit: "m²", unitRate: 30, total: materialsTotal }]
          : []),
        {
          description: "Labour",
          quantity: (parsed.teamSize || 4) * (parsed.days || 1),
          unit: "days",
          unitRate: 200,
          total: labourTotal,
        },
      ],
      variables,
      materialsTotal,
      labourTotal,
      variablesTotal,
      subtotal,
      margin,
      marginAmount,
      total,
      status: "draft",
    });

    alert(`Quote created for £${total.toFixed(2)}! View it in your dashboard.`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Voice Input</h1>
        <p className="text-slate-light mt-1">
          Talk naturally about a job. I&apos;ll pick out the details and calculate
          costs for you.
        </p>
      </div>

      {/* Voice Input Area */}
      <div className="bg-white rounded-xl border-2 border-navy p-8 text-center">
        {speechSupported ? (
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
              isListening
                ? "bg-red-500 animate-pulse scale-110"
                : "bg-navy hover:bg-navy-light"
            }`}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </button>
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto bg-gray-200">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
        )}
        <p className="mt-4 text-lg font-medium text-navy">
          {isListening
            ? "Listening... tap to stop"
            : speechSupported
            ? "Tap to start talking"
            : "Voice not supported — use text input below"}
        </p>
        {transcript && (
          <p className="mt-3 text-slate-light italic">
            &ldquo;{transcript}&rdquo;
          </p>
        )}
      </div>

      {/* Manual Text Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
          placeholder='Or type here: "4 men, 3 days, Canary Wharf, 5th floor no lift, parking needed"'
        />
        <button
          onClick={handleManualSubmit}
          className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 rounded-lg transition-colors"
        >
          Go
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-cream rounded-xl p-6">
          <h2 className="text-lg font-bold text-navy mb-3">
            Suggestions
          </h2>
          <div className="space-y-3">
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex gap-3 items-start bg-white rounded-lg p-4"
              >
                <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate leading-relaxed">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>

          {parsed?.type === "quote" && (
            <button
              onClick={createQuoteFromParsed}
              className="mt-4 bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-3 rounded-lg transition-colors w-full"
            >
              Create Quote from This
            </button>
          )}
        </div>
      )}

      {/* Example Prompts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-navy mb-3">
          Try Saying...
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "New quote for Kier Group in Canary Wharf, 4 men, 3 days, 12th floor no lift, need parking",
            "Price up 200 square metres suspended ceiling at a school in Romford, 5 men, 4 days",
            "Got a job in Central London, congestion charge, ULEZ, 6th floor with lift, 2 days parking",
            "Just finished the hospital job in Basildon, took 3 days with 4 men",
          ].map((example) => (
            <button
              key={example}
              onClick={() => {
                setManualInput(example);
                processInput(example);
                setTranscript(example);
              }}
              className="text-left text-sm p-3 rounded-lg bg-gray-50 hover:bg-cream text-slate-light hover:text-navy transition-colors"
            >
              &ldquo;{example}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-navy mb-4">
            Recent Inputs
          </h2>
          <div className="space-y-4">
            {history.map((entry, i) => (
              <div key={i} className="border-b border-gray-50 pb-4 last:border-0">
                <div className="flex justify-between text-sm">
                  <span className="text-navy font-medium">
                    &ldquo;{entry.input}&rdquo;
                  </span>
                  <span className="text-slate-light text-xs">
                    {entry.time}
                  </span>
                </div>
                <ul className="mt-2 space-y-1">
                  {entry.suggestions.map((s, j) => (
                    <li key={j} className="text-xs text-slate-light">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  type QuoteLineItem,
  type JobVariable,
  COMMON_VARIABLES,
  saveQuote,
} from "@/lib/storage";

const EMPTY_LINE_ITEM: QuoteLineItem = {
  description: "",
  quantity: 0,
  unit: "m²",
  unitRate: 0,
  total: 0,
};

const EMPTY_VARIABLE: JobVariable = {
  name: "",
  cost: 0,
  notes: "",
};

export default function QuotePage() {
  // Client info
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [description, setDescription] = useState("");

  // Line items (materials & labour)
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([
    { ...EMPTY_LINE_ITEM },
  ]);

  // Job variables
  const [variables, setVariables] = useState<JobVariable[]>([]);

  // Margin
  const [margin, setMargin] = useState(15);

  // Saved state
  const [saved, setSaved] = useState(false);

  // Calculations
  const materialsTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const variablesTotal = variables.reduce((sum, v) => sum + v.cost, 0);
  const subtotal = materialsTotal + variablesTotal;
  const marginAmount = subtotal * (margin / 100);
  const total = subtotal + marginAmount;

  // Line item handlers
  function updateLineItem(index: number, field: keyof QuoteLineItem, value: string | number) {
    const updated = [...lineItems];
    (updated[index] as unknown as Record<string, string | number>)[field] = value;
    if (field === "quantity" || field === "unitRate") {
      updated[index].total = updated[index].quantity * updated[index].unitRate;
    }
    setLineItems(updated);
  }

  function addLineItem() {
    setLineItems([...lineItems, { ...EMPTY_LINE_ITEM }]);
  }

  function removeLineItem(index: number) {
    setLineItems(lineItems.filter((_, i) => i !== index));
  }

  // Variable handlers
  function addVariable(preset?: { name: string; defaultCost: number }) {
    if (preset) {
      setVariables([
        ...variables,
        { name: preset.name, cost: preset.defaultCost, notes: "" },
      ]);
    } else {
      setVariables([...variables, { ...EMPTY_VARIABLE }]);
    }
  }

  function updateVariable(index: number, field: keyof JobVariable, value: string | number) {
    const updated = [...variables];
    (updated[index] as unknown as Record<string, string | number | undefined>)[field] = value;
    setVariables(updated);
  }

  function removeVariable(index: number) {
    setVariables(variables.filter((_, i) => i !== index));
  }

  // Save
  function handleSave() {
    saveQuote({
      clientName,
      clientPhone,
      clientEmail,
      projectAddress,
      description,
      lineItems,
      variables,
      materialsTotal,
      labourTotal: 0,
      variablesTotal,
      subtotal,
      margin,
      marginAmount,
      total,
      status: "draft",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">New Quote</h1>
          <p className="text-slate-light mt-1">
            Fill in the job details and add variables — the total updates live.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            saved
              ? "bg-green-500 text-white"
              : "bg-gold hover:bg-gold-light text-navy"
          }`}
        >
          {saved ? "Saved!" : "Save Quote"}
        </button>
      </div>

      {/* Client Details */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-navy mb-4">Client Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate mb-1">
              Client / Company Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="e.g. Kier Group"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="07700 900000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate mb-1">
              Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate mb-1">
              Project Address
            </label>
            <input
              type="text"
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="123 High Street, London E1 2AB"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate mb-1">
              Job Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
              placeholder="e.g. Supply and install 200m² suspended ceiling grid + tiles, 3 classrooms"
            />
          </div>
        </div>
      </section>

      {/* Line Items (Materials & Labour) */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">
            Materials &amp; Labour
          </h2>
          <button
            onClick={addLineItem}
            className="text-sm text-gold font-semibold hover:text-gold-light transition-colors"
          >
            + Add Line
          </button>
        </div>

        {/* Header */}
        <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-medium text-slate-light uppercase tracking-wider mb-2 px-1">
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-1">Unit</div>
          <div className="col-span-2">Rate</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-1" />
        </div>

        <div className="space-y-3">
          {lineItems.map((item, i) => (
            <div
              key={i}
              className="grid sm:grid-cols-12 gap-3 items-center"
            >
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateLineItem(i, "description", e.target.value)}
                className="sm:col-span-4 px-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                placeholder="e.g. Armstrong Dune tile 600x600"
              />
              <input
                type="number"
                value={item.quantity || ""}
                onChange={(e) => updateLineItem(i, "quantity", parseFloat(e.target.value) || 0)}
                className="sm:col-span-2 px-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                placeholder="Qty"
              />
              <select
                value={item.unit}
                onChange={(e) => updateLineItem(i, "unit", e.target.value)}
                className="sm:col-span-1 px-2 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
              >
                <option value="m²">m²</option>
                <option value="m">m</option>
                <option value="nr">nr</option>
                <option value="hrs">hrs</option>
                <option value="days">days</option>
                <option value="lot">lot</option>
              </select>
              <div className="sm:col-span-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-light text-sm">
                  &pound;
                </span>
                <input
                  type="number"
                  value={item.unitRate || ""}
                  onChange={(e) => updateLineItem(i, "unitRate", parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="sm:col-span-2 text-right font-medium text-navy text-sm">
                &pound;{item.total.toFixed(2)}
              </div>
              <button
                onClick={() => removeLineItem(i)}
                className="sm:col-span-1 text-red-400 hover:text-red-600 transition-colors text-center"
                title="Remove"
              >
                <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 text-right">
          <span className="text-sm text-slate-light">Materials &amp; Labour Total: </span>
          <span className="text-lg font-bold text-navy">
            &pound;{materialsTotal.toFixed(2)}
          </span>
        </div>
      </section>

      {/* Job Variables — THE KEY FEATURE */}
      <section className="bg-white rounded-xl border-2 border-gold/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-navy">
              Job Variables
            </h2>
            <p className="text-sm text-slate-light">
              The extras that change job-to-job. Quick-add common ones below.
            </p>
          </div>
          <button
            onClick={() => addVariable()}
            className="text-sm text-gold font-semibold hover:text-gold-light transition-colors"
          >
            + Custom Variable
          </button>
        </div>

        {/* Quick-add presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {COMMON_VARIABLES.map((preset) => {
            const alreadyAdded = variables.some((v) => v.name === preset.name);
            return (
              <button
                key={preset.name}
                onClick={() => !alreadyAdded && addVariable(preset)}
                disabled={alreadyAdded}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  alreadyAdded
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-gold/5 text-gold border-gold/20 hover:bg-gold/10 hover:border-gold/40"
                }`}
              >
                {alreadyAdded ? "+" : "+"} {preset.name} (&pound;{preset.defaultCost})
              </button>
            );
          })}
        </div>

        {/* Added variables */}
        {variables.length > 0 && (
          <div className="space-y-3">
            {variables.map((variable, i) => (
              <div key={i} className="grid sm:grid-cols-12 gap-3 items-center">
                <input
                  type="text"
                  value={variable.name}
                  onChange={(e) => updateVariable(i, "name", e.target.value)}
                  className="sm:col-span-4 px-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                  placeholder="Variable name"
                />
                <div className="sm:col-span-3 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-light text-sm">
                    &pound;
                  </span>
                  <input
                    type="number"
                    value={variable.cost || ""}
                    onChange={(e) => updateVariable(i, "cost", parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <input
                  type="text"
                  value={variable.notes || ""}
                  onChange={(e) => updateVariable(i, "notes", e.target.value)}
                  className="sm:col-span-4 px-3 py-2 rounded border border-gray-200 focus:border-gold outline-none text-sm"
                  placeholder="Notes (e.g. 3 days parking)"
                />
                <button
                  onClick={() => removeVariable(i)}
                  className="sm:col-span-1 text-red-400 hover:text-red-600 transition-colors text-center"
                  title="Remove"
                >
                  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {variables.length === 0 && (
          <div className="text-center py-6 text-slate-light text-sm">
            No variables added yet. Click the buttons above to add common costs,
            or add a custom one.
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gold/20 text-right">
          <span className="text-sm text-slate-light">Variables Total: </span>
          <span className="text-lg font-bold text-gold">
            &pound;{variablesTotal.toFixed(2)}
          </span>
        </div>
      </section>

      {/* Totals */}
      <section className="bg-navy rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">Quote Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-white/70">
            <span>Materials &amp; Labour</span>
            <span>&pound;{materialsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gold">
            <span>Job Variables</span>
            <span>&pound;{variablesTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/70 border-t border-white/10 pt-3">
            <span>Subtotal</span>
            <span>&pound;{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-white/70">Margin</span>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(parseFloat(e.target.value) || 0)}
                className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-white text-center text-sm outline-none focus:border-gold"
                min={0}
                max={100}
              />
              <span className="text-white/50 text-sm">%</span>
            </div>
            <span>&pound;{marginAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold border-t border-white/20 pt-4">
            <span>TOTAL</span>
            <span className="text-gold">&pound;{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              saved
                ? "bg-green-500 text-white"
                : "bg-gold hover:bg-gold-light text-navy"
            }`}
          >
            {saved ? "Saved!" : "Save Quote"}
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-lg font-semibold border border-white/20 hover:border-gold text-white hover:text-gold transition-colors"
          >
            Print / PDF
          </button>
        </div>
      </section>
    </div>
  );
}

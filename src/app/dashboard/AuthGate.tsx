"use client";

import { useEffect, useState } from "react";

// Change here (then rebuild) to rotate. Client-side obscurity, not real auth.
const PASSPHRASE = "dunn2001";
const STORAGE_KEY = "ecdunn_director_auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === PASSPHRASE);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSPHRASE) {
      localStorage.setItem(STORAGE_KEY, PASSPHRASE);
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (unlocked === null) return null;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-sm text-center"
        >
          <div className="mb-6">
            <div className="text-lg font-bold text-white">E C DUNN</div>
            <div className="text-[10px] text-gold tracking-[0.15em] uppercase mt-1">
              Director Access
            </div>
          </div>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
              error ? "border-red-400" : "border-white/20"
            } text-white placeholder-white/40 focus:border-gold focus:outline-none`}
            placeholder="Passphrase"
          />
          {error && (
            <p className="text-xs text-red-300 mt-2">
              Incorrect. Ask Reece if you&apos;ve forgotten.
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-gold hover:bg-gold-light text-navy font-semibold py-3 rounded-lg transition-colors"
          >
            Unlock
          </button>
          <p className="text-[10px] text-white/40 mt-4 leading-relaxed">
            One-time per device. Bookmark this page after unlock.
          </p>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

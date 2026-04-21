import type { Metadata } from "next";
import { AuthGate } from "./AuthGate";

export const metadata: Metadata = {
  title: "Director Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="flex flex-col">
                <span className="text-lg font-bold text-white">E C DUNN</span>
                <span className="text-[10px] text-gold tracking-[0.15em] uppercase">
                  Director Dashboard
                </span>
              </a>
            </div>
            <nav className="flex items-center gap-1 sm:gap-2">
              <a
                href="/dashboard"
                className="text-sm text-white/70 hover:text-gold px-3 py-2 rounded transition-colors"
              >
                Overview
              </a>
              <a
                href="/dashboard/quote"
                className="text-sm text-white/70 hover:text-gold px-3 py-2 rounded transition-colors"
              >
                New Quote
              </a>
              <a
                href="/dashboard/jobs"
                className="text-sm text-white/70 hover:text-gold px-3 py-2 rounded transition-colors"
              >
                Jobs
              </a>
              <a
                href="/"
                className="text-xs text-white/40 hover:text-white/60 px-2 py-1 transition-colors hidden sm:block"
              >
                Website
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
    </AuthGate>
  );
}

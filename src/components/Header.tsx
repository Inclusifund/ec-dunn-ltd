"use client";

import { useState } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#sectors", label: "Sectors" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Us" },
  { href: "#areas", label: "Areas" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Company Name */}
          <a href="#" className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-wide">
              E C DUNN
            </span>
            <span className="text-xs text-gold tracking-[0.2em] uppercase">
              Ceilings & Partitions
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+447778321064"
              className="bg-gold hover:bg-gold-light text-navy font-semibold px-5 py-2.5 rounded text-sm transition-colors"
            >
              Call Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-gold transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+447778321064"
                className="bg-gold hover:bg-gold-light text-navy font-semibold px-5 py-2.5 rounded text-sm transition-colors text-center mt-2"
              >
                Call Us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

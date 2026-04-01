export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold text-white">E C DUNN</span>
              <span className="block text-xs text-gold tracking-[0.2em] uppercase">
                Ceilings & Partitions
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Specialist ceilings and partitions contractor with 25+ years
              experience across London, Essex and South East England.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { href: "#services", label: "Our Services" },
                { href: "#sectors", label: "Sectors" },
                { href: "#about", label: "About Us" },
                { href: "#areas", label: "Areas Covered" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/50 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info (NAP for SEO) */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-white/50 text-sm">
              <p>E C Dunn Ltd</p>
              <p>7 Lodysons Close</p>
              <p>Orsett, Essex</p>
              <p className="pt-2">
                <a
                  href="tel:+447778321064"
                  className="hover:text-gold transition-colors"
                >
                  07778 321 064
                </a>
              </p>
              <p>
                <a
                  href="mailto:edwarddunn9234@btinternet.com"
                  className="hover:text-gold transition-colors"
                >
                  edwarddunn9234@btinternet.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {year} E C Dunn Ltd. Company No. 04252121. All rights
            reserved.
          </p>
          <p className="text-white/20 text-xs">
            Website by AntiGravity
          </p>
        </div>
      </div>
    </footer>
  );
}

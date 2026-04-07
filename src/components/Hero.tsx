export function Hero() {
  return (
    <section className="relative bg-navy pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/ai/hero-main.png"
          alt="Luxury ceiling with ornate crown molding and LED lighting"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-gold text-sm font-medium">
                Est. 2001 &mdash; 25+ Years in the Trade
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Expert Ceilings &{" "}
              <span className="text-gold">Partitions</span>{" "}
              Across London &amp; South East
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              From schools and hospitals to heritage sites and upscale restaurants
              &mdash; E C Dunn Ltd delivers quality suspended ceilings,
              partitions, and drylining with the reliability that keeps clients
              coming back for over two decades.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-4 rounded text-lg transition-colors"
              >
                Get a Free Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center border-2 border-white/20 hover:border-gold text-white hover:text-gold font-semibold px-8 py-4 rounded text-lg transition-colors"
              >
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold">25+</div>
                <div className="text-sm text-white/50 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold">500+</div>
                <div className="text-sm text-white/50 mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold">100%</div>
                <div className="text-sm text-white/50 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero image showcase */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/ai/portfolio-luxury.png"
                alt="Luxury multi-level recessed ceiling with LED strip lighting"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-xl border-4 border-navy">
              <img
                src="/images/ai/hero-detail.png"
                alt="Ornate crown molding and ceiling rose detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

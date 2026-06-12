const stats = [
  { value: "25+", label: "Years in the Trade", sub: "Established 2001" },
  { value: "500+", label: "Projects Completed", sub: "Across London & the South East" },
  { value: "100%", label: "Client Satisfaction", sub: "The reason they keep coming back" },
];

export function WorkInMotion() {
  return (
    <section className="py-16 md:py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            On the Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            25 Years of Craft &mdash; In Motion
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            From first stud to final finish &mdash; watch the work that has kept
            clients coming back for over two decades.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-center">
          {/* Video centrepiece */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/20">
              <video
                className="w-full h-full object-cover aspect-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/ecdunn-hero-poster.jpg"
              >
                <source src="/video/ecdunn-hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Stats around the video */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-xl p-5 lg:p-6 text-center lg:text-left hover:border-gold/40 transition-colors"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold">
                  {s.value}
                </div>
                <div className="text-sm md:text-base font-semibold text-white mt-1">
                  {s.label}
                </div>
                <div className="hidden lg:block text-sm text-white/50 mt-1">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

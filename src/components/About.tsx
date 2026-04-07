export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden aspect-[4/3]">
              <img
                src="/images/team-construction.jpg"
                alt="Expert ceiling installation showing craftsmanship in progress"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent block */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-lg -z-10" />
            {/* Small overlay card */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-gold">25+</div>
              <div className="text-xs text-navy font-medium">Years of Excellence</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
              A Family Business Built on{" "}
              <span className="text-gold">Trust</span>
            </h2>
            <div className="space-y-4 text-slate leading-relaxed">
              <p>
                E C Dunn Ltd was founded by Edward Dunn in 2001, but Edward&apos;s
                experience in the ceilings and partitions trade goes back well
                over 25 years. What started as one man and his tools has grown
                into a trusted team of skilled tradesmen delivering quality work
                across London and the South East.
              </p>
              <p>
                We&apos;re a family business at heart. Edward&apos;s son now works
                alongside him full-time, having completed his apprenticeship
                under his father&apos;s guidance. That same dedication to getting
                things right &mdash; properly, the first time &mdash; runs
                through everything we do.
              </p>
              <p>
                Our reputation speaks for itself. Long-standing supply chain
                partners and clients return to us year after year because they
                know what they&apos;ll get: honest pricing, reliable teams, and
                workmanship that lasts. No shortcuts. No surprises.
              </p>
            </div>

            <div className="flex gap-8 mt-8 pt-8 border-t border-gray-100">
              <div>
                <div className="text-2xl font-bold text-navy">Est. 2001</div>
                <div className="text-sm text-slate-light">
                  Companies House Registered
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">Family Run</div>
                <div className="text-sm text-slate-light">
                  Father &amp; Son Team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const areas = [
  "Central London",
  "East London",
  "South London",
  "North London",
  "West London",
  "Hornchurch",
  "Romford",
  "Upminster",
  "Grays",
  "Thurrock",
  "Basildon",
  "Southend",
  "Chelmsford",
  "Brentwood",
  "Dartford",
  "Gravesend",
  "Medway",
  "Maidstone",
  "Croydon",
  "Bromley",
  "Woolwich",
  "Greenwich",
  "Canary Wharf",
  "City of London",
];

export function CoverageArea() {
  return (
    <section id="areas" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Coverage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3">
            Areas We Cover
          </h2>
          <p className="text-slate-light mt-4 max-w-2xl mx-auto text-lg">
            Based in Hornchurch, Essex, we work across London, Essex, Kent, and
            the wider South East of England.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 text-sm text-slate"
              >
                <svg
                  className="w-4 h-4 text-gold shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {area}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-slate-light">
              Don&apos;t see your area?{" "}
              <a
                href="#contact"
                className="text-gold font-semibold hover:underline"
              >
                Get in touch
              </a>{" "}
              &mdash; we cover most of South East England.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

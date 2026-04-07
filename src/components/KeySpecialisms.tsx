const specialisms = [
  {
    name: "Schools & Education",
    stat: "40+ Schools",
    tagline: "Inspiring learning environments",
    description:
      "Acoustic ceiling systems, corridor partitions, and hall renovations built to last across London and Essex schools.",
    image: "/images/ai/sector-school.jpg",
    features: ["Acoustic compliance", "BBA certified", "DfE approved"],
    accentColor: "#3b82f6",
  },
  {
    name: "Hospitals & Healthcare",
    stat: "NHS Trusted",
    tagline: "Precision-grade clinical environments",
    description:
      "Fire-rated, hygienic ceiling systems for NHS trusts, clinics, and healthcare facilities meeting HTM compliance.",
    image: "/images/ai/sector-hospital.jpg",
    features: ["HTM compliant", "Fire-rated Cat A", "Antibacterial"],
    accentColor: "#10b981",
  },
  {
    name: "Partitions & Drylining",
    stat: "Core Service",
    tagline: "The backbone of every fit-out",
    description:
      "Metal stud partitions, drylining, and acoustic separations for offices, schools, hospitals, and commercial refurbishments. Our most in-demand trade.",
    image: "/images/ai/about-team.jpg",
    features: ["Metal stud & MF", "Acoustic rated", "Fire compartmentation"],
    accentColor: "#c8973e",
  },
];

export function KeySpecialisms() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            What We Do Best
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3">
            Our Core Specialisms
          </h2>
          <p className="text-slate-light mt-4 max-w-2xl mx-auto text-lg">
            Over 25 years, these three areas have become the foundation of our
            reputation &mdash; where we deliver the most value, the most often.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {specialisms.map((s) => (
            <div
              key={s.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              style={{ borderBottom: `3px solid ${s.accentColor}` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div
                  className="absolute bottom-3 right-3 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                  style={{ backgroundColor: s.accentColor }}
                >
                  {s.stat}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 text-white"
                  style={{ backgroundColor: s.accentColor }}
                >
                  {s.tagline}
                </span>

                <h3 className="text-xl font-bold text-navy mb-2">{s.name}</h3>
                <p className="text-sm text-slate-light leading-relaxed mb-4">
                  {s.description}
                </p>

                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ backgroundColor: s.accentColor }}
                      >
                        &#10003;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

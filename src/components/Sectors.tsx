const sectors = [
  {
    name: "Schools & Education",
    description: "Classroom ceilings, corridor partitions, and hall renovations across London and Essex schools.",
    image: "/ec-dunn-ltd/images/ai/sector-school.png",
  },
  {
    name: "Hospitals & Healthcare",
    description: "Hygienic, fire-rated ceiling systems for NHS trusts, clinics, and healthcare facilities.",
    image: "/ec-dunn-ltd/images/ai/sector-hospital.png",
  },
  {
    name: "Restaurants & Hospitality",
    description: "Bespoke ceiling features, acoustic solutions, and partitioning for upscale dining and hotels.",
    image: "/ec-dunn-ltd/images/ai/sector-restaurant.png",
  },
  {
    name: "Heritage & Listed Buildings",
    description: "Sympathetic ceiling restoration for period properties, old pubs, churches, and protected structures.",
    image: "/ec-dunn-ltd/images/ai/sector-heritage.png",
  },
  {
    name: "Commercial & Offices",
    description: "Office fit-outs, open-plan partitioning, and ceiling installations for commercial properties.",
    image: "/ec-dunn-ltd/images/ai/sector-commercial.png",
  },
  {
    name: "Retail & Leisure",
    description: "Shopping centres, gyms, cinemas, and leisure facilities — high-traffic environments built to last.",
    image: "/ec-dunn-ltd/images/ai/sector-retail.png",
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Where We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3">
            Sectors We Serve
          </h2>
          <p className="text-slate-light mt-4 max-w-2xl mx-auto text-lg">
            Over 25 years we&apos;ve built a reputation across diverse sectors, each
            demanding its own standards of quality and compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sector.image}
                  alt={sector.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-bold text-white text-lg">
                  {sector.name}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-light leading-relaxed">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

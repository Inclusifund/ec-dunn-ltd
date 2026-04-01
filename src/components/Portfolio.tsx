const projects = [
  {
    image: "/ec-dunn-ltd/images/ai/portfolio-circular.png",
    title: "Circular Feature Ceiling",
    category: "MF Ceilings",
    description: "Bespoke circular recessed ceiling with integrated LED ring lighting and modern design.",
  },
  {
    image: "/ec-dunn-ltd/images/ai/portfolio-luxury.png",
    title: "Luxury Residential Ceiling",
    category: "Bulkheads & Rafts",
    description: "Multi-level recessed ceiling with LED strip lighting and premium wall paneling.",
  },
  {
    image: "/ec-dunn-ltd/images/ai/portfolio-heritage-panel.png",
    title: "Heritage Ceiling Panel",
    category: "Heritage & Restoration",
    description: "Ornate decorative ceiling panel with classical plasterwork and LED backlighting.",
  },
  {
    image: "/ec-dunn-ltd/images/ai/hero-main.png",
    title: "Crown Molding & Skirting",
    category: "MF Ceilings",
    description: "Elegant crown molding and decorative ceiling skirting with warm ambient lighting.",
  },
  {
    image: "/ec-dunn-ltd/images/ai/sector-restaurant.png",
    title: "Restaurant Fit-Out",
    category: "Suspended Ceilings",
    description: "Bespoke floating ceiling raft with hidden LED lighting for upscale dining.",
  },
  {
    image: "/ec-dunn-ltd/images/ai/about-team.png",
    title: "Precision Installation",
    category: "Partitions & Drylining",
    description: "Expert MF ceiling showing the transition from framework to flawless finish.",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3">
            Recent Projects
          </h2>
          <p className="text-slate-light mt-4 max-w-2xl mx-auto text-lg">
            From bespoke heritage restorations to modern commercial fit-outs &mdash;
            every project receives the same dedication to quality craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-[280px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

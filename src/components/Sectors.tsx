'use client';

import { useEffect, useRef } from 'react';

type Template = 'cinematic' | 'structured' | 'ambient';
type AnimType = 'from-left' | 'sharp-drop' | 'ambient-rise' | 'fade-reveal' | 'snap-right' | 'zoom-burst';

interface Sector {
  name: string;
  tagline: string;
  description: string;
  image: string;
  template: Template;
  animation: AnimType;
  accentColor: string;
  features: string[];
  stat: string;
}

const sectors: Sector[] = [
  {
    name: "Schools & Education",
    tagline: "Inspiring learning environments",
    description: "Acoustic ceiling systems, corridor partitions, and hall renovations built to last across London and Essex schools.",
    image: "/images/ai/sector-school.png",
    template: 'cinematic',
    animation: 'from-left',
    accentColor: '#3b82f6',
    features: ['Acoustic compliance', 'BBA certified', 'DfE approved'],
    stat: '40+ Schools',
  },
  {
    name: "Hospitals & Healthcare",
    tagline: "Precision-grade clinical environments",
    description: "Fire-rated, hygienic ceiling systems for NHS trusts, clinics, and healthcare facilities meeting HTM compliance.",
    image: "/images/ai/sector-hospital.png",
    template: 'structured',
    animation: 'sharp-drop',
    accentColor: '#10b981',
    features: ['HTM compliant', 'Fire-rated Cat A', 'Antibacterial'],
    stat: 'NHS Trusted',
  },
  {
    name: "Restaurants & Hospitality",
    tagline: "Atmospheres that define dining",
    description: "Bespoke ceiling features, acoustic rafts, and mood-defining partitions for upscale restaurants and boutique hotels.",
    image: "/images/ai/sector-restaurant.png",
    template: 'ambient',
    animation: 'ambient-rise',
    accentColor: '#c8973e',
    features: ['Bespoke design', 'Acoustic rafts', 'LED integration'],
    stat: '5★ Venues',
  },
  {
    name: "Heritage & Listed Buildings",
    tagline: "Where history meets craftsmanship",
    description: "Sympathetic restoration of ornate plaster ceilings, coving, and skirting for period properties and protected structures.",
    image: "/images/ai/sector-heritage.png",
    template: 'cinematic',
    animation: 'fade-reveal',
    accentColor: '#a16207',
    features: ['Listed building expertise', 'Lime plaster restoration', 'Victorian coving'],
    stat: 'Grade I & II',
  },
  {
    name: "Commercial & Offices",
    tagline: "Productive spaces, built efficiently",
    description: "Office fit-outs, open-plan suspended ceilings, and partitioning for modern commercial properties and business parks.",
    image: "/images/ai/sector-commercial.png",
    template: 'structured',
    animation: 'snap-right',
    accentColor: '#6366f1',
    features: ['Cat A/Cat B fit-out', 'M&E coordination', 'Fast-track delivery'],
    stat: '200+ Offices',
  },
  {
    name: "Retail & Leisure",
    tagline: "High-impact spaces that convert",
    description: "Shopping centres, gyms, cinemas, and leisure facilities — designed for millions of footfall and lasting visual impact.",
    image: "/images/ai/sector-retail.png",
    template: 'ambient',
    animation: 'zoom-burst',
    accentColor: '#ec4899',
    features: ['High-traffic rated', 'Branded environments', 'Rapid refurb'],
    stat: 'Nationwide',
  },
];

function AnimatedCard({ sector, index }: { sector: Sector; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (index % 3) * 130;
            setTimeout(() => {
              el.classList.add(`anim-${sector.animation}`);
              el.classList.remove('anim-ready');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, sector.animation]);

  // ── CINEMATIC template ── full-bleed image, bottom content, accent top border
  if (sector.template === 'cinematic') {
    return (
      <div
        ref={cardRef}
        className="anim-ready group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ height: '390px', borderTop: `4px solid ${sector.accentColor}` }}
      >
        <img
          src={sector.image}
          alt={sector.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/35 to-transparent" />

        {/* Stat badge */}
        <div
          className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: sector.accentColor }}
        >
          {sector.stat}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: sector.accentColor }}
          >
            {sector.tagline}
          </p>
          <h3 className="text-2xl font-bold text-white mb-4">{sector.name}</h3>

          {/* Feature pills — appear on hover */}
          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            {sector.features.map((f) => (
              <span
                key={f}
                className="text-xs px-2 py-1 rounded text-white/90"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── STRUCTURED template ── image top + clean content panel below
  if (sector.template === 'structured') {
    return (
      <div
        ref={cardRef}
        className="anim-ready group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        style={{ borderBottom: `3px solid ${sector.accentColor}` }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={sector.image}
            alt={sector.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Stat badge */}
          <div
            className="absolute bottom-3 right-3 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
            style={{ backgroundColor: sector.accentColor }}
          >
            {sector.stat}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 text-white"
            style={{ backgroundColor: sector.accentColor }}
          >
            {sector.tagline}
          </span>

          <h3 className="text-xl font-bold text-navy mb-2">{sector.name}</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-4">{sector.description}</p>

          {/* Feature checklist */}
          <ul className="space-y-1.5">
            {sector.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: sector.accentColor }}
                >
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // ── AMBIENT template ── full image with frosted glass card + accent glow ring
  return (
    <div
      ref={cardRef}
      className="anim-ready group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        height: '370px',
        boxShadow: `0 0 0 2px ${sector.accentColor}50, 0 8px 32px rgba(0,0,0,0.18)`,
      }}
    >
      <img
        src={sector.image}
        alt={sector.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Ambient gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${sector.accentColor}cc 0%, rgba(26,35,50,0.3) 55%, transparent 100%)`,
        }}
      />

      {/* Stat badge */}
      <div
        className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
        style={{ backgroundColor: sector.accentColor }}
      >
        {sector.stat}
      </div>

      {/* Frosted glass card at bottom */}
      <div
        className="absolute bottom-4 left-4 right-4 rounded-xl p-4"
        style={{
          backgroundColor: 'rgba(26, 35, 50, 0.78)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${sector.accentColor}45`,
        }}
      >
        <h3 className="text-lg font-bold text-white mb-0.5">{sector.name}</h3>
        <p className="text-xs font-semibold mb-3" style={{ color: sector.accentColor }}>
          {sector.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sector.features.map((f) => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded text-white/80"
              style={{
                backgroundColor: `${sector.accentColor}25`,
                border: `1px solid ${sector.accentColor}55`,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
          {sectors.map((sector, index) => (
            <AnimatedCard key={sector.name} sector={sector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

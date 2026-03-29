export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ecdunnltd.co.uk",
    name: "E C Dunn Ltd",
    description:
      "Specialist ceilings and partitions contractor with 25+ years experience across London, Essex and South East England. Suspended ceilings, drylining, partitions for schools, hospitals, heritage sites and commercial projects.",
    url: "https://ecdunnltd.co.uk",
    telephone: "+447778321064",
    email: "edwarddunn9234@btinternet.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Spectrum House, 2b Suttons Lane",
      addressLocality: "Hornchurch",
      addressRegion: "Essex",
      postalCode: "RM12 6RJ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5565,
      longitude: 0.2128,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Essex" },
      { "@type": "AdministrativeArea", name: "Kent" },
      { "@type": "AdministrativeArea", name: "South East England" },
    ],
    foundingDate: "2001-07-13",
    founder: {
      "@type": "Person",
      name: "Edward Dunn",
    },
    priceRange: "££",
    paymentAccepted: "Cash, Bank Transfer",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ceilings & Partitions Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Suspended Ceilings",
            description: "Installation of metal grid and mineral fibre tile suspended ceiling systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Partitions & Drylining",
            description: "Stud wall partitions and plasterboard drylining for commercial and public buildings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MF Ceilings",
            description: "Metal frame ceiling systems for seamless flush-finished ceilings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fire-Rated Systems",
            description: "Fire-rated ceiling and partition installations meeting building regulations",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Heritage & Restoration",
            description: "Sensitive ceiling and partition work in listed buildings and heritage sites",
          },
        },
      ],
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

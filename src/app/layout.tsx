import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "E C Dunn Ltd | Ceilings & Partitions Contractor | London & South East",
    template: "%s | E C Dunn Ltd",
  },
  description:
    "Specialist ceilings and partitions contractor with 25+ years experience across London, Essex and South East England. Suspended ceilings, drylining, partitions for schools, hospitals, heritage sites and commercial projects.",
  keywords: [
    "suspended ceilings London",
    "partitions contractor Essex",
    "ceilings and partitions South East England",
    "suspended ceiling installer",
    "drylining contractor London",
    "commercial ceilings Essex",
    "ceiling contractor Orsett",
    "ceiling contractor Hornchurch",
    "partition walls London",
    "heritage ceiling restoration",
    "school ceiling contractor",
    "hospital ceiling contractor",
    "E C Dunn",
  ],
  authors: [{ name: "E C Dunn Ltd" }],
  openGraph: {
    title: "E C Dunn Ltd | Ceilings & Partitions Contractor",
    description:
      "25+ years of expert ceilings and partitions work across London, Essex and South East England.",
    url: "https://ecdunnltd.co.uk",
    siteName: "E C Dunn Ltd",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ecdunnltd.co.uk"),
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/capabilities.md",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

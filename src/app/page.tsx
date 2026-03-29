import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Sectors } from "@/components/Sectors";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { CoverageArea } from "@/components/CoverageArea";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Services />
        <Sectors />
        <About />
        <WhyUs />
        <CoverageArea />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

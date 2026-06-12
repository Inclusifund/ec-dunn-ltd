import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkInMotion } from "@/components/WorkInMotion";
import { KeySpecialisms } from "@/components/KeySpecialisms";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
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
        <WorkInMotion />
        <KeySpecialisms />
        <Services />
        <Portfolio />
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

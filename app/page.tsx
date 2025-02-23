import AboutUs from "./components/about";
import AbstractIndexing from "./components/abstract_index";
import FAQ from "./components/faq";
import { HeroSection } from "./components/hero-section";
import SpecialIssuesCarousel from "./components/recent-issues";
import LatestArticles from "./components/recent-manuscripts";

export default function Home() {
  return (
    <div className="bg-white px-2  font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      <AboutUs />
      <AbstractIndexing />
      <LatestArticles />
      <SpecialIssuesCarousel />
      <FAQ />
    </div>
  );
}

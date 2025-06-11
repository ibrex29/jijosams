import dynamic from "next/dynamic";
import { HeroSection } from "../components/hero-section";

const AboutUs = dynamic(() => import("../components/about"));
const AbstractIndexing = dynamic(() => import("../components/abstract_index"));
const FAQ = dynamic(() => import("../components/faq"));
const SpecialIssuesCarousel = dynamic(
  () => import("../components/recent-issues"),
);
const LatestArticles = dynamic(
  () => import("../components/recent-manuscripts"),
);

export default function Home() {
  return (
    <div className="bg-white px-2 font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      <AboutUs />
      <AbstractIndexing />
      <LatestArticles />
      <SpecialIssuesCarousel />
      <FAQ />
    </div>
  );
}

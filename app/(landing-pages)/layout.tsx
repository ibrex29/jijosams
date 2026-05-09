"use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#f4e5c6_0%,#f8f4ea_42%,#f2f7f0_100%)]">
      <Navbar />
      <main className="relative flex-grow">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(3,148,71,0.08),transparent)]" />
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default LandingPageLayout;

"use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <main className="container flex-grow mx-auto px-4">{children}</main>
      <Footer />
    </main>
  );
};

export default LandingPageLayout;

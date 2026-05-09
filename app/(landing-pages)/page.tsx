import Image from "next/image";
import Link from "next/link";

import { EditorialHighlights } from "@/app/components/editorial-highlights";
import { HeroSection } from "@/app/components/hero-section";

const scopeItems = [
  "Accounting",
  "Business Management",
  "Administration",
  "Economics",
  "Geography",
  "Political Science",
  "International Relations",
  "Sociology and related fields",
];

const activityNews = [
  {
    title: "Editorial Strategy Session",
    text: "Editorial board planning and peer-review quality assurance workshop.",
    image: "/images/slu_background.jpg",
  },
  {
    title: "Faculty Research Engagement",
    text: "Cross-department collaboration around new social science submissions.",
    image: "/images/aboutus_bg.jpg",
  },
  {
    title: "Academic Visibility Drive",
    text: "Indexing and abstracting awareness session for contributors.",
    image: "/images/areas_bg.jpg",
  },
  {
    title: "Reviewer Capacity Building",
    text: "Reviewer orientation and manuscript evaluation standards update.",
    image: "/images/paper_bg.jpg",
  },
];

export default function Home() {
  return (
    <div className="pb-20">
      <HeroSection />

      {/* ── Editorial Highlights ───────────────────────────────────── */}
      <EditorialHighlights />

      {/* ── Scope + About ──────────────────────────────────────────── */}
      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="overflow-hidden rounded-[2.25rem] border border-[var(--jijosams-gold)]/20 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1fr_1.4fr]">

            {/* Scope panel */}
            <div className="border-b border-[var(--jijosams-gold)]/20 bg-[var(--jijosams-green-deep)] p-8 sm:p-10 lg:border-b-0 lg:border-r lg:border-r-white/10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--jijosams-gold)]" />
                Scope
              </span>
              <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">Disciplines We Cover</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {scopeItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* About panel */}
            <div className="p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--jijosams-red)]">About JIJOSAMS</p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--jijosams-green-deep)] sm:text-3xl">
                A publication platform for impactful scholarship
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#2e4a3e] sm:text-base">
                The Editorial Board supports rigorous research that advances policy,
                management practice, and critical social inquiry. We provide a
                structured manuscript workflow from submission to publication.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--jijosams-green)]/20 bg-[#f5fbf7] p-4">
                  <p className="text-sm font-bold text-[var(--jijosams-green-deep)]">Bi-Annual Releases</p>
                  <p className="mt-1 text-sm text-[#385347]">Regular issue scheduling with editorial quality checks.</p>
                </div>
                <div className="rounded-2xl border border-[var(--jijosams-green)]/20 bg-[#f5fbf7] p-4">
                  <p className="text-sm font-bold text-[var(--jijosams-green-deep)]">Peer-Review Integrity</p>
                  <p className="mt-1 text-sm text-[#385347]">Independent reviewer assessments and transparent decisions.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 lg:px-6">
        <div className="rounded-3xl bg-[linear-gradient(145deg,#0b6a3a,#0e8a4a)] p-6 text-white sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-gold)]">
                News and Activities
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl">
                Previous Journal and Faculty Activities
              </h2>
            </div>
            <Link
              href="/about-us"
              className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[var(--jijosams-green-deep)]"
            >
              View More
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {activityNews.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

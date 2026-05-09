import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Editorial Quality",
    description:
      "Structured manuscript screening and peer-review to maintain publication integrity.",
  },
  {
    title: "Research Relevance",
    description:
      "Work that addresses current societal, policy, and management challenges.",
  },
  {
    title: "Academic Visibility",
    description:
      "A platform that supports discoverability, indexing, and scholarly engagement.",
  },
];

const activities = [
  { title: "Academic Workshop", image: "/images/IBREX.jpeg" },
  { title: "Faculty Board Meeting", image: "/images/aboutus_bg.jpg" },
  { title: "Research Review Session", image: "/images/slu_background.jpg" },
];

const impactStats = [
  { label: "Publication Cycle", value: "Bi-Annual" },
  { label: "Review Model", value: "Double-Blind" },
  { label: "Access Mode", value: "Print + E-Journal" },
];

export default function AboutUsPage() {
  return (
    <div className="pb-20 pt-8">
      <section className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="overflow-hidden rounded-[2.25rem] border border-[var(--jijosams-gold)]/35 bg-white shadow-[0_20px_60px_rgba(3,148,71,0.09)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-red)]">
                About The Journal
              </p>
              <h1 className="max-w-4xl text-3xl leading-tight text-[var(--jijosams-green-deep)] sm:text-4xl">
                Jigawa Journal of Social and Management Sciences (JIJOSAMS)
              </h1>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-[#2e4a3e] sm:text-base">
                JIJOSAMS is a bi-annual peer-reviewed print and e-journal published by
                the Faculty of Social and Management Sciences, Sule Lamido University,
                Kafin Hausa, Jigawa State, Nigeria. The journal provides a strong
                academic forum for scholarship in social and management sciences.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/manuscripts"
                  className="rounded-full bg-[var(--jijosams-red)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Explore Manuscripts
                </Link>
                <Link
                  href="/submission-guidelines"
                  className="rounded-full border border-[var(--jijosams-green-deep)]/25 px-5 py-2.5 text-sm font-semibold text-[var(--jijosams-green-deep)] transition hover:bg-[var(--jijosams-green-deep)] hover:text-white"
                >
                  Submission Guidelines
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] bg-[var(--jijosams-green-deep)]">
              <Image
                src="/images/landing-pages-images/jijosams3.jpeg"
                alt="JIJOSAMS academic engagement"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(4,103,55,0.68),rgba(4,103,55,0.08))]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {impactStats.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[var(--jijosams-green)]/15 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--jijosams-red)]">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--jijosams-green-deep)]">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
              className="rounded-2xl border border-[var(--jijosams-green)]/20 bg-[#f5fbf7] p-5"
          >
            <h2 className="text-xl text-[var(--jijosams-green-deep)]">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#2e4a3e]">
              {pillar.description}
            </p>
          </article>
        ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="rounded-3xl bg-[var(--jijosams-cream)] p-6 sm:p-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-red)]">
                News and Activities
              </p>
              <h2 className="mt-1 text-2xl text-[var(--jijosams-green-deep)]">
                Highlights from previous journal activities
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {activities.map((activity) => (
              <article key={activity.title} className="overflow-hidden rounded-2xl bg-white">
                <div className="relative h-44 w-full">
                  <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[var(--jijosams-green-deep)]">
                    {activity.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

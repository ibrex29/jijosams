import Link from "next/link";
import { CalendarBlank, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Events & Conferences | JIJOSAMS",
  description:
    "Stay up to date with upcoming academic events, conferences, and workshops related to JIJOSAMS and the Faculty of Social and Management Sciences.",
};

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Faculty Research Conference",
    date: "August 14–15, 2026",
    location: "Sule Lamido University, Kafin Hausa, Jigawa State",
    category: "Conference",
    description:
      "A flagship gathering of researchers, academics, and policymakers to present and discuss emerging findings in social and management sciences.",
  },
  {
    id: 2,
    title: "Manuscript Writing & Publication Workshop",
    date: "September 5, 2026",
    location: "Faculty of Social and Management Sciences, SLU",
    category: "Workshop",
    description:
      "A one-day workshop designed to support early-career researchers in preparing high-quality manuscripts for peer-reviewed publication.",
  },
  {
    id: 3,
    title: "Open Access & Research Visibility Seminar",
    date: "October 22, 2026",
    location: "Virtual (Online)",
    category: "Seminar",
    description:
      "An interactive seminar exploring strategies for improving research discoverability, indexing, and academic impact through open access publishing.",
  },
];

const pastEvents = [
  {
    id: 4,
    title: "IBREX Academic Exchange",
    date: "March 2025",
    location: "Sule Lamido University, Kafin Hausa",
    category: "Conference",
    description:
      "An inter-university research exchange that facilitated scholarly dialogue across disciplines within the Faculty of Social and Management Sciences.",
  },
  {
    id: 5,
    title: "Editorial Board Retreat",
    date: "January 2025",
    location: "Faculty Board Room, SLU",
    category: "Internal",
    description:
      "A strategic retreat for the JIJOSAMS editorial board to review submission trends, refine review processes, and plan for Volume 2.",
  },
];

const categoryColors: Record<string, string> = {
  Conference: "bg-[var(--jijosams-green-deep)] text-white",
  Workshop: "bg-[var(--jijosams-gold)] text-[var(--jijosams-green-deep)]",
  Seminar: "bg-[var(--jijosams-red)] text-white",
  Internal: "border border-[var(--jijosams-gold)]/60 text-[var(--jijosams-green-deep)]",
};

export default function EventsConferencesPage() {
  return (
    <div className="pb-20 pt-8">
      {/* Hero Banner */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="rounded-[2.25rem] bg-[linear-gradient(130deg,var(--jijosams-green-deep),var(--jijosams-green))] p-8 text-white sm:p-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-gold)]">
            Events & Conferences
          </p>
          <h1 className="text-3xl sm:text-4xl">Academic Events & Gatherings</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/90 sm:text-base">
            Explore upcoming and past academic events, workshops, and conferences
            organized by or affiliated with JIJOSAMS and the Faculty of Social and
            Management Sciences, Sule Lamido University.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-6">
        <h2 className="mb-6 text-2xl font-semibold text-[var(--jijosams-green-deep)]">
          Upcoming Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              className="flex flex-col rounded-2xl border border-[var(--jijosams-gold)]/45 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span
                className={`mb-4 self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${categoryColors[event.category] ?? "bg-gray-100 text-gray-700"}`}
              >
                {event.category}
              </span>
              <h3 className="text-lg font-semibold leading-snug text-[var(--jijosams-green-deep)]">
                {event.title}
              </h3>
              <p className="mt-3 flex-grow text-sm leading-7 text-[#2e4a3e]">
                {event.description}
              </p>
              <div className="mt-5 space-y-2 text-sm text-[#2e4a3e]">
                <p className="flex items-center gap-2">
                  <CalendarBlank size={16} className="shrink-0 text-[var(--jijosams-red)]" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="shrink-0 text-[var(--jijosams-red)]" />
                  {event.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="mx-auto mt-14 max-w-7xl px-4 lg:px-6">
        <h2 className="mb-6 text-2xl font-semibold text-[var(--jijosams-green-deep)]">
          Past Events
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pastEvents.map((event) => (
            <article
              key={event.id}
              className="flex gap-5 rounded-2xl border border-[var(--jijosams-gold)]/35 bg-white p-6"
            >
              <div className="flex flex-col items-center justify-start pt-0.5">
                <CalendarBlank size={22} className="text-[var(--jijosams-green-deep)]" />
              </div>
              <div>
                <span
                  className={`mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${categoryColors[event.category] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {event.category}
                </span>
                <h3 className="text-base font-semibold text-[var(--jijosams-green-deep)]">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#2e4a3e]">{event.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#2e4a3e]">
                  <span className="flex items-center gap-1">
                    <CalendarBlank size={13} className="text-[var(--jijosams-red)]" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[var(--jijosams-red)]" />
                    {event.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-14 max-w-7xl px-4 lg:px-6">
        <div className="rounded-3xl bg-[var(--jijosams-cream)] p-6 sm:p-8">
          <h2 className="text-2xl text-[var(--jijosams-green-deep)]">
            Want to Collaborate or Present?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#2e4a3e] sm:text-base">
            If you are interested in partnering with JIJOSAMS for an academic event,
            submitting a conference paper, or presenting your research, please reach
            out to our editorial team.
          </p>
          <Link
            href="/contact-us"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--jijosams-red)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Contact the Editorial Team
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

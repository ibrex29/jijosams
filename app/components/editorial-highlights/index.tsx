"use client";

import { CalendarDots, Intersect, NotePencil, ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";

const editorialHighlightsData = [
  {
    label: "Double-blind Peer Review",
    description:
      "Anonymous review process ensuring unbiased, rigorous evaluation of every manuscript.",
    Icon: ShieldCheck,
  },
  {
    label: "Bi-annual Publication",
    description:
      "Consistent scheduling across both print and e-journal formats twice each year.",
    Icon: CalendarDots,
  },
  {
    label: "Interdisciplinary Focus",
    description:
      "Spanning social and management sciences across multiple academic disciplines.",
    Icon: Intersect,
  },
  {
    label: "Open Call for Papers",
    description:
      "Volume 2, Issue 1 is actively accepting original and high-quality submissions.",
    Icon: NotePencil,
  },
];

export function EditorialHighlights() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--jijosams-red)]">
          Why Publish With Us
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-[var(--jijosams-green-deep)] sm:text-3xl">
          Editorial Highlights
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {editorialHighlightsData.map(({ label, description, Icon }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-[var(--jijosams-green)]/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--jijosams-green)]/10">
              <Icon className="h-5 w-5 text-[var(--jijosams-green)]" weight="duotone" />
            </div>
            <p className="font-semibold text-[var(--jijosams-green-deep)]">{label}</p>
            <p className="mt-2 text-sm leading-6 text-[#385347]">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[linear-gradient(135deg,var(--jijosams-green-deep),#0e8a4a)] p-6 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--jijosams-gold)]">
            Current Submission Window
          </p>
          <p className="mt-1 text-lg font-semibold">
            Open for Social and Management Sciences manuscripts
          </p>
        </div>
        <Link
          href="/signup"
          className="shrink-0 rounded-full bg-[var(--jijosams-red)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Submit Now →
        </Link>
      </div>
    </section>
  );
}

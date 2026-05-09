"use client";

import AuthorGuideline from "@/app/components/author-guideline";
import ManuscriptSubmission from "@/app/components/manuscript-submission";
import PublicationCharges from "@/app/components/publication-charges";
import IndexingReviewers from "@/app/components/indexing-reviewers";

const steps = [
  "Prepare manuscript according to journal format",
  "Create or access your author account",
  "Upload manuscript details and required files",
  "Track review progress from your dashboard",
];

export default function SubmissionGuidelinesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-6">
      <section className="rounded-[2.25rem] border border-[var(--jijosams-gold)]/45 bg-white p-8 sm:p-12">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-red)]">
          For Authors
        </p>
        <h1 className="text-3xl text-[var(--jijosams-green-deep)] sm:text-4xl">
          Submission Guidelines
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#2e4a3e] sm:text-base">
          Follow these instructions to reduce processing delays and improve
          review readiness of your manuscript.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step}
              className="rounded-xl bg-[#f5fbf7] p-3 text-sm text-[#2e4a3e]"
            >
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-8 rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(3,148,71,0.08)] sm:p-6">
        <ManuscriptSubmission />
        <AuthorGuideline />
        <PublicationCharges />
        <IndexingReviewers />
      </section>
    </div>
  );
}

import ManuscriptList from "../../components/manuscripts";

export default function ManuscriptsPage() {
  return (
    <div className="pb-16">
      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--jijosams-gold)]/35 bg-white p-8 shadow-[0_20px_60px_rgba(3,148,71,0.09)] sm:p-10">
          <div className="pointer-events-none absolute right-[-48px] top-[-48px] h-44 w-44 rounded-full bg-[var(--jijosams-gold)]/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-64px] left-[-44px] h-44 w-44 rounded-full bg-[var(--jijosams-green)]/20 blur-3xl" />
          <p className="relative mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-red)]">
            Manuscript Archive
          </p>
          <h1 className="relative text-3xl text-[var(--jijosams-green-deep)] sm:text-4xl">
            Published Manuscripts
          </h1>
          <p className="relative mt-4 max-w-3xl text-sm leading-7 text-[#2e4a3e] sm:text-base">
            Explore published articles and accepted manuscripts across social and
            management sciences fields.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {[
              "Peer-reviewed",
              "Policy and governance",
              "Management and economics",
              "Social research",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--jijosams-green)]/20 bg-[#f5fbf7] px-3 py-1 text-xs font-semibold text-[var(--jijosams-green-deep)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        <div className="rounded-3xl border border-[var(--jijosams-green)]/10 bg-white px-3 py-6 shadow-[0_20px_60px_rgba(3,148,71,0.08)] sm:px-6 lg:px-8">
          <ManuscriptList />
        </div>
      </section>
    </div>
  );
}

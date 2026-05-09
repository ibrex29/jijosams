const channels = [
  {
    title: "Editorial Office",
    details: [
      "Jigawa Journal of Social and Management Sciences (JIJOSAMS)",
      "Faculty of Social and Management Sciences",
      "Sule Lamido University, Kafin Hausa",
      "Jigawa State, Nigeria",
    ],
  },
  {
    title: "Email Contacts",
    details: ["journal.sms@slu.edu.ng", "muhammad.abdulkadir@slu.edu.ng"],
  },
  {
    title: "Phone Contacts",
    details: ["+2348032817414", "+2349078451648"],
  },
];

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 lg:px-6">
      <section className="rounded-[2.25rem] bg-[linear-gradient(130deg,var(--jijosams-green-deep),var(--jijosams-green))] p-8 text-white sm:p-12">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--jijosams-gold)]">
          Contact Us
        </p>
        <h1 className="text-3xl sm:text-4xl">Reach The Editorial Team</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/90 sm:text-base">
          Use the channels below for manuscript submissions, editorial
          communication, and publication inquiries.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => (
          <article
            key={channel.title}
            className="rounded-2xl border border-[var(--jijosams-gold)]/45 bg-white p-6"
          >
            <h2 className="text-xl text-[var(--jijosams-green-deep)]">{channel.title}</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-[#2e4a3e] sm:text-base">
              {channel.details.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl bg-[var(--jijosams-cream)] p-6 sm:p-8">
        <h2 className="text-2xl text-[var(--jijosams-green-deep)]">Submission Reminder</h2>
        <p className="mt-3 text-sm leading-7 text-[#2e4a3e] sm:text-base">
          For faster processing, ensure your manuscript follows the journal
          format and includes all required metadata before upload.
        </p>
      </section>
    </div>
  );
}

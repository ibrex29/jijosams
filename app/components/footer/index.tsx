import Image from "next/image";
import Link from "next/link";
import { Envelope, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";

const scopeList = [
  "Accounting",
  "Business Management",
  "Administration",
  "Economics",
  "Geography",
  "Political Science",
  "International Relations",
  "Sociology and related fields",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Manuscripts", href: "/manuscripts" },
  { label: "Submission Guidelines", href: "/submission-guidelines" },
  { label: "Events & Conferences", href: "/events-conferences" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="mt-20 bg-[var(--jijosams-green-deep)] text-white">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-[linear-gradient(90deg,var(--jijosams-gold),var(--jijosams-red),var(--jijosams-gold))]" />

      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <section className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/logo/jijosams_logo.png"
                alt="JIJOSAMS logo"
                width={72}
                height={72}
              />
              <div>
                <p className="font-semibold uppercase tracking-[0.2em] text-[var(--jijosams-gold)]">
                  JIJOSAMS
                </p>
                <p className="text-xs text-white/75">Bi-Annual Peer-Reviewed Journal</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-white/80">
              A peer-reviewed print and e-journal published by the Faculty of Social
              and Management Sciences, Sule Lamido University, Kafin Hausa, Jigawa
              State, Nigeria.
            </p>
          </section>

          {/* Quick links */}
          <section>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[var(--jijosams-gold)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/80 transition hover:text-[var(--jijosams-gold)]"
                  >
                    <span className="h-px w-3 bg-[var(--jijosams-gold)]/60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Journal scope */}
          <section>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[var(--jijosams-gold)]">
              Journal Scope
            </h3>
            <ul className="space-y-2.5">
              {scopeList.map((scope) => (
                <li key={scope} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--jijosams-gold)]/70" />
                  {scope}
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[var(--jijosams-gold)]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--jijosams-gold)]" />
                <span className="leading-6">
                  Faculty of Social and Management Sciences,<br />
                  Sule Lamido University, Kafin Hausa,<br />
                  Jigawa State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[var(--jijosams-gold)]" />
                <span>+2348032817414 | +2349078451648</span>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={16} className="shrink-0 text-[var(--jijosams-gold)]" />
                <a
                  href="mailto:journal.sms@slu.edu.ng"
                  className="transition hover:text-[var(--jijosams-gold)]"
                >
                  journal.sms@slu.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={16} className="shrink-0 text-[var(--jijosams-gold)]" />
                <a
                  href="mailto:muhammad.abdulkadir@slu.edu.ng"
                  className="transition hover:text-[var(--jijosams-gold)]"
                >
                  muhammad.abdulkadir@slu.edu.ng
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/55 sm:flex-row">
          <p>© 2026 Jigawa Journal of Social and Management Sciences (JIJOSAMS). All rights reserved.</p>
          <p>
            Published by the Faculty of SMS,{" "}
            <span className="text-white/70">Sule Lamido University</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

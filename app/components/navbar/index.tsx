"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { globalSearch } from "@/app/api/(landing-page)/manuscript";
import { Manuscript } from "@/types";

const topNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const publicationsDropdown = [
  { label: "Manuscripts", href: "/manuscripts" },
  { label: "Submission Guidelines", href: "/submission-guidelines" },
  { label: "Events & Conferences", href: "/events-conferences" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const [isMobilePublicationsOpen, setIsMobilePublicationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { mutate, data: searchResults, status } = useMutation({
    mutationFn: (search: string) => globalSearch(search),
    onSuccess: (response) => {
      setShowResults(Boolean(response?.data?.length));
    },
    onError: () => {
      setShowResults(false);
    },
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      const trimmed = query.trim();
      if (!trimmed) {
        setShowResults(false);
        return;
      }
      mutate(trimmed);
    }, 250);

    return () => clearTimeout(debounce);
  }, [query, mutate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPublicationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPublicationsActive = publicationsDropdown.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--jijosams-green-deep)] px-4 py-2 text-xs text-white sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>journal.sms@slu.edu.ng</span>
          <span>+2348032817414 | +2349078451648</span>
        </div>
      </div>

      <nav className="border-b border-[var(--jijosams-gold)]/60 bg-[var(--jijosams-cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo/jijosams_logo.png"
              alt="JIJOSAMS logo"
              width={68}
              height={68}
              priority
            />
            <div className="hidden sm:block">
              <p className="font-semibold uppercase tracking-[0.2em] text-[var(--jijosams-red)]">
                JIJOSAMS
              </p>
              <p className="text-sm font-medium text-[var(--jijosams-green-deep)]">
                Social and Management Sciences Journal
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-semibold transition ${
                pathname === "/"
                  ? "text-[var(--jijosams-red)]"
                  : "text-[var(--jijosams-green-deep)] hover:text-[var(--jijosams-red)]"
              }`}
            >
              Home
            </Link>

            {/* Publications dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsPublicationsOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-sm font-semibold transition ${
                  isPublicationsActive
                    ? "text-[var(--jijosams-red)]"
                    : "text-[var(--jijosams-green-deep)] hover:text-[var(--jijosams-red)]"
                }`}
              >
                Publications
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`transition-transform duration-200 ${isPublicationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isPublicationsOpen && (
                <div className="absolute left-0 top-9 z-50 min-w-[220px] overflow-hidden rounded-xl border border-[var(--jijosams-gold)]/50 bg-white shadow-xl">
                  {publicationsDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsPublicationsOpen(false)}
                      className={`block px-5 py-3 text-sm font-semibold transition hover:bg-[var(--jijosams-cream)] ${
                        pathname === item.href
                          ? "text-[var(--jijosams-red)]"
                          : "text-[var(--jijosams-green-deep)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About & Contact */}
            {topNavItems.slice(1).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition ${
                    active
                      ? "text-[var(--jijosams-red)]"
                      : "text-[var(--jijosams-green-deep)] hover:text-[var(--jijosams-red)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden w-full max-w-xs lg:block">
            <div className="relative">
              <MagnifyingGlass
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--jijosams-green-deep)]"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search manuscript title"
                className="w-full rounded-full border border-[var(--jijosams-gold)] bg-white py-2 pl-9 pr-3 text-sm text-[var(--jijosams-green-deep)] outline-none ring-0 transition focus:border-[var(--jijosams-red)]"
              />
              {showResults && (
                <div className="absolute left-0 right-0 top-12 max-h-72 overflow-auto rounded-xl border border-[var(--jijosams-gold)] bg-white p-3 shadow-xl">
                  {status === "pending" && (
                    <p className="text-sm text-[var(--jijosams-green-deep)]">Searching...</p>
                  )}
                  {searchResults?.data?.map((manuscript: Manuscript) => (
                    <Link
                      key={manuscript.id}
                      href={`/manuscripts/details/${manuscript.id}`}
                      className="block rounded-md px-2 py-2 text-sm text-[var(--jijosams-green-deep)] hover:bg-[var(--jijosams-cream)]"
                      onClick={() => {
                        setShowResults(false);
                        setQuery("");
                      }}
                    >
                      {manuscript.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="whitespace-nowrap rounded-full border border-[var(--jijosams-green)] px-4 py-2 text-sm font-semibold text-[var(--jijosams-green)] transition hover:bg-[var(--jijosams-green)] hover:text-white"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="whitespace-nowrap rounded-full bg-[var(--jijosams-red)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Submit Manuscript
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md border border-[var(--jijosams-gold)] p-2 text-[var(--jijosams-green-deep)] lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-[var(--jijosams-gold)] bg-[var(--jijosams-cream)] px-4 py-4 lg:hidden">
            <div className="mb-4 grid gap-1">
              {/* Home */}
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--jijosams-green-deep)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Publications collapsible */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobilePublicationsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-[var(--jijosams-green-deep)]"
                >
                  Publications
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform duration-200 ${isMobilePublicationsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMobilePublicationsOpen && (
                  <div className="ml-3 mt-1 grid gap-1 border-l-2 border-[var(--jijosams-gold)]/50 pl-3">
                    {publicationsDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-2 py-2 text-sm text-[var(--jijosams-green-deep)]"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobilePublicationsOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About & Contact */}
              {topNavItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--jijosams-green-deep)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/signin");
                }}
                className="rounded-full border border-[var(--jijosams-green)] px-3 py-2 text-sm font-semibold text-[var(--jijosams-green)]"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/signup");
                }}
                className="rounded-full bg-[var(--jijosams-red)] px-3 py-2 text-sm font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

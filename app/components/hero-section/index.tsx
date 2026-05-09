"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "/images/landing-pages-images/jijosams1.jpeg",
  "/images/landing-pages-images/jijosams2.jpeg",
  "/images/landing-pages-images/jijosams3.jpeg",
  "/images/landing-pages-images/jijosams4.jpeg",
  "/images/landing-pages-images/jijosams5.jpeg",
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full">
      <article className="relative min-h-[700px] overflow-hidden bg-[var(--jijosams-green-deep)] text-white shadow-[0_30px_80px_rgba(4,103,55,0.28)] sm:min-h-[820px]">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt="JIJOSAMS editorial and academic activities"
                fill
                priority={index === 0}
                className="object-cover object-[72%_center]"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,32,20,0.88)_0%,rgba(7,32,20,0.72)_24%,rgba(7,32,20,0.42)_50%,rgba(7,32,20,0.08)_75%,rgba(7,32,20,0.18)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[60%] bg-white/5 backdrop-blur-[22px] [mask-image:linear-gradient(90deg,black_0%,black_55%,transparent_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_left_center,rgba(211,174,102,0.14),transparent_42%)]" />

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 backdrop-blur-md">
          {heroImages.map((image, index) => (
            <span
              key={`${image}-indicator`}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeIndex ? "w-8 bg-[var(--jijosams-gold)]" : "w-2 bg-white/45"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 flex min-h-[700px] items-end sm:min-h-[820px]">
          <div className="mx-auto w-full max-w-7xl px-8 py-14 sm:px-12 sm:py-18 lg:px-16 lg:py-22">
            <p className="mb-4 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/95 backdrop-blur-md">
              Call For Papers • Volume 2 Issue 1
            </p>
            <h1 className="max-w-2xl text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Jigawa Journal of Social and Management Sciences
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              JIJOSAMS is an invaluable bi-annual peer-reviewed print and e-journal
              published by the Faculty of Social and Management Sciences, Sule Lamido
              University Kafin Hausa, Jigawa State, Nigeria. Scholars, academics and
              researchers are invited to submit original manuscripts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-[var(--jijosams-red)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Submit Manuscript
              </Link>
              <Link
                href="/submission-guidelines"
                className="rounded-full border border-white/75 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--jijosams-green-deep)]"
              >
                Author Guidelines
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

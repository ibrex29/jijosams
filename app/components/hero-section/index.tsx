"use client";
import React from "react";
import { Boxes } from "../ui/bg-boxes";
import { cn } from "@/app/lib/utils";

export function HeroSection() {
  return (
    <div className="h-[560px] relative w-full  overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <h1
        className={cn(
          "md:text-6xl text-center text-4xl font-bold text-[#a96c04] relative z-20",
        )}
      >
        Advancing Science & Technology <br />
        through Research Excellence
      </h1>
      <p className="text-center text-xl text-bold mt-2 text-black relative z-20">
        0pen-access journal publishing cutting-edge research in science and
        technology.
      </p>
    </div>
  );
}

"use client";
import React from "react";
import { Boxes } from "../ui/bg-boxes";
import { cn } from "@/app/lib/utils";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <div className="h-[560px] relative w-full  overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      {/* Content */}
      <div className="relative z-20 max-w-4xl px-4 text-center">
  <h1
    className={cn(
      "text-4xl md:text-5xl font-extrabold tracking-tight text-[#a96c04] drop-shadow-md",
    )}
  >
    Advancing Science & Technology <br />
    through Research Excellence
  </h1>
  <p className="mt-4 text-lg md:text-xl text-primary drop-shadow-md">
    Open-access journal publishing cutting-edge research in science and
    technology.
  </p>

  {/* ISSN Numbers */}
<div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
  <span className="px-3 py-1 text-sm md:text-sm font-semibold text-[#a96c04] bg-[#fff6eb] border border-[#a96c04]/30 rounded-full shadow-sm">
    Online ISSN: <span className="font-bold">2736-0903</span>
  </span>
  <span className="px-3 py-1 text-sm md:text-sm font-semibold text-[#a96c04] bg-[#fff6eb] border border-[#a96c04]/30 rounded-full shadow-sm">
    Print ISSN: <span className="font-bold">2736-089X</span>
  </span>
</div>


  {/* CTA Buttons */}
  <div className="mt-6 flex gap-4 justify-center">
    <Button
      onClick={() => router.push("/signin")}
      variant="contained"
      color="primary"
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: "12px",
        textTransform: "none",
        fontSize: "1rem",
        backgroundColor: "#a96c04",
        "&:hover": { backgroundColor: "#8b5803" },
      }}
    >
      Submit Your Paper
    </Button>
    <Button
      onClick={() => router.push("/manuscripts")}
      variant="outlined"
      color="primary"
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: "12px",
        textTransform: "none",
        fontSize: "1rem",
        borderColor: "#a96c04",
        color: "#a96c04",
        "&:hover": {
          backgroundColor: "#a96c0415",
          borderColor: "#a96c04",
        },
      }}
    >
      Explore Journals
    </Button>
  </div>
</div>

    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const ManuscriptDetails = () => {
  const router = useRouter();
  const manuscript = {
    title: "Three-Dimensional Topological Photonic Crystals (Invited Review)",
    authors: "Jian-Wei Liu, Gui-Geng Liu, Baile Zhang",
    journal: "Progress In Electromagnetics Research, Vol. 181, issue 2, 2024",
    doi: "10.2528/PIER24111001",
    abstract: `Photonic crystals, often referred to as the “semiconductors of light,” have entered a new phase enabling exotic properties once exclusive to topological quantum matter such as topological insulators. While the development of the first three-dimensional (3D) photonic crystal marked the establishment of photonic crystals as an independent field, initial studies in topological photonic crystals focused mainly on one and two dimensions. Though a true photonic crystal counterpart of a 3D strong topological insulator remains elusive, significant progress has been made toward achieving 3D topological photonic crystals.`,
  };

  return (
    <div className="max-w-6xl mx-auto mt-2 p-6">
      <div className="flex flex-row gap-4">
        <div>
          {/* Title */}
          <div className="flex justify-between p-2 flex-col border-l-2 border-primary">
            <h1 className="text-primary text-xl font-bold">Vol. 181</h1>
            <p className="text-gray-500 text-sm mt-2">2024-12-27</p>
          </div>

          {/* Manuscript Title */}
          <h2 className="text-xl font-semibold mt-4">{manuscript.title}</h2>

          {/* Authors */}
          <p className="text-primary font-medium mt-2">
            By {manuscript.authors}
          </p>

          {/* Journal Info */}
          <p className="text-gray-500 italic mt-2">{manuscript.journal}</p>
          <p className="text-gray-500 text-sm">doi:{manuscript.doi}</p>

          {/* Abstract Section */}
          <div className="mt-6 border-t-2 pt-4">
            <h3 className="text-lg font-semibold">Abstract</h3>
            <p className="text-gray-700 mt-2 text-justify leading-relaxed">
              {manuscript.abstract}
            </p>
          </div>

          {/* Citation */}
          <div className="mt-6 border-t-2 pt-4 flex justify-between items-center">
            <p className="text-sm italic">
              Citation: {manuscript.authors}, &quot;{manuscript.title},&quot;{" "}
              {manuscript.journal}.
            </p>
            <div className="flex gap-2">
              <button className="border px-3 py-1 text-sm">Copy</button>
              <button className="border px-3 py-1 text-sm">Export</button>
            </div>
          </div>
        </div>

        <div>
          {/* Actions */}
          <div className="flex w-fit flex-col gap-2">
            <Image
              src="/images/manuscript_cover.png"
              alt="Manuscript Cover"
              width={200}
              height={200}
            />
            <a
              href="https://slujst.com.ng/wp-content/uploads/2025/02/SLUJST_PEM017_Pp_1-10.pdf"
              download
            >
              <Button outlined className="text-sm whitespace-nowrap">
                Download Manuscript
              </Button>
            </a>
            <Button
              outlined
              className="text-sm whitespace-nowrap"
              onClick={() =>
                router.push(
                  "https://slujst.com.ng/wp-content/uploads/2025/02/SLUJST_PEM017_Pp_1-10.pdf",
                )
              }
            >
              View Manuscript
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptDetails;

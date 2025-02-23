import { Manuscript } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ManuscriptCardProps {
  manuscript: Manuscript;
}

export default function ManuscriptCard({ manuscript }: ManuscriptCardProps) {
  const router = useRouter();

  const TruncatedText = ({ text, limit }: { text: string; limit: number }) => {
    const [showFullText, setShowFullText] = useState(false);

    if (text.length <= limit) {
      return (
        <p className="text-gray-700 mt-2 text-justify leading-relaxed">
          {text}
        </p>
      );
    }

    return (
      <p className="text-gray-700 mt-2 text-justify leading-relaxed">
        {showFullText ? text : `${text.substring(0, limit)}...`}
        <button
          onClick={() => setShowFullText(!showFullText)}
          className="text-blue-600 text-sm ml-2"
        >
          {showFullText ? "View Less" : "View More"}
        </button>
      </p>
    );
  };

  return (
    <div className="border-t-2 border-primary py-4 flex flex-col md:flex-row gap-4 items-start">
      {manuscript.formattedManuscript && (
        <Image
          src={"/images/manuscript_cover.png"}
          alt={manuscript.title}
          width={100}
          height={100}
          className="object-cover"
        />
      )}
      <div>
        <h3
          className="text-black font-bold text-lg cursor-pointer"
          onClick={() => router.push(`/details/${manuscript.id}`)}
        >
          {manuscript.title}
        </h3>
        <p className="text-primary font-medium mt-1">
          By{" "}
          {Array.isArray(manuscript.Authors)
            ? manuscript.Authors.join(", ")
            : ""}
        </p>
        <TruncatedText text={manuscript.abstract} limit={400} />
        <div className="mt-2 flex flex-col md:flex-row items-start md:items-center text-sm text-gray-900">
          <span className="mr-0 md:mr-4">
            DOI:{" "}
            <a
              href={manuscript.DOI}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {manuscript.DOI}
            </a>
          </span>
          <span className="text-blue-600 mt-2 md:mt-0">
            Downloads: {manuscript.downloadTimes}
          </span>
        </div>
      </div>
    </div>
  );
}
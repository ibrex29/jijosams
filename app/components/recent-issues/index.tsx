"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const specialIssues = [
  {
    title: "Reconfigurable Intelligent Surface: Design and Applications",
    editors: "Kwai-Man Luk and Kin Fai (Kenneth) Tong",
    issueNumber: "2022-2",
    image: "/images/manuscript_cover.png",
  },
  {
    title: "Advances in Electromagnetic Theory",
    editors: "Wei E. I. Sha",
    issueNumber: "2022-1",
    image: "/images/manuscript_cover.png",
  },
];

export default function SpecialIssuesCarousel() {
  return (
    <div className="w-full max-w-5xl p-2 mx-auto bg-gray-100">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="bg-white flex justify-center items-center"
      >
        {specialIssues.map((issue, index) => (
          <SwiperSlide
            key={index}
            className="p-4 flex justify-center w-full flex-col items-center"
          >
            <div className="flex justify-center items-center">
              <Image
                src={issue.image}
                alt={issue.title}
                width={100}
                height={150}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className=" text-base font-semibold">{issue.title}</h3>
              <p className="text-sm text-gray-600">Editors: {issue.editors}</p>
              <p className="text-xs text-gray-500">
                Special Issue {issue.issueNumber}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

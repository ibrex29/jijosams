"use client";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { teams } from "@/app/constants";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section with Background */}
      <div
        className="relative h-[300px] md:h-[550px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/aboutus_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Who We Are
        </motion.h1>
      </div>

      {/* Content Section (Outside Background) */}
      <div className="bg-white min-h-screen px-4 md:px-12 lg:px-24 py-12">
        {teams.map((team, index) => (
          <div
            key={index}
            className="mb-1 grid grid-cols-1 md:grid-cols-3 my-16 gap-2"
          >
            <motion.div
              className="col-span-1 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col border-l-[6px] border-double border-primary pl-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {team.category}
                </h2>
                <p className="text-gray-600 text-base mt-2">
                  {team.description}
                </p>
              </div>
            </motion.div>

            {typeof team.members[0] === "object" ? (
              <div className="col-span-2 overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {team.members.map((member, i) => (
                    <motion.div
                      key={i}
                      className="text-center flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    >
                      <Avatar
                        src={
                          typeof member === "object" ? member.img : undefined
                        }
                        alt={
                          typeof member === "object" ? member.name : undefined
                        }
                        sx={{
                          width: 128,
                          height: 128,
                          fontSize: 48,
                          bgcolor: "#ccc",
                        }}
                      >
                        {typeof member === "object" && !member.img}
                      </Avatar>
                      {typeof member === "object" && (
                        <h3 className="text-sm font-semibold text-gray-900 mt-4">
                          {member.name}
                        </h3>
                      )}
                      {typeof member === "object" && (
                        <p className="text-xs text-gray-600">{member.role}</p>
                      )}
                      {typeof member === "object" && "email" in member && (
                        <p className="text-blue-600 text-sm hover:underline">
                          {member.email}
                        </p>
                      )}
                      {typeof member === "object" && "tel_number" in member && (
                        <p className="text-xs text-gray-600">
                          {member.tel_number}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-2 flex flex-col items-start gap-2 text-gray-600">
                {team.members.map((member, i) => (
                  <span key={i} className="flex items-center">
                    <Image
                      alt="verified"
                      width={30}
                      height={30}
                      src="/icons/verified.jpg"
                      className="mr-2"
                    />
                    <a
                      href="#"
                      className="text-blue-600 text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {typeof member === "string" ? member : member.name}
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

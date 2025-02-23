"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Button from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <nav className="bg-white  fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex justify-between gap-12">
          <Link href="/">
            <Image
              src="logo/slu_jst_logo.svg"
              alt="Logo"
              width={160}
              height={100}
            />
          </Link>
          <div className="hidden lg:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link
              href="/manuscripts"
              className="text-gray-700 hover:text-primary"
            >
              Manuscript
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-primary">
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-600 text-3xl text-bold"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <div className="relative  w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#9e6962] border-light-blue-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#AC3122]"
            />
            <MagnifyingGlass
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue-500"
            />
          </div>
          <div>
            <Button className="w-32">Sign Up</Button>
          </div>

          <div className="flex justify-center items-center">
            <Link
              href="/login"
              className="text-black  font-bold hover:text-primary whitespace-nowrap"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 lg:hidden">
            <Link href="/" className="py-2 text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link
              href="/manuscripts"
              className="py-2 text-gray-700 hover:text-primary"
            >
              Manuscript
            </Link>
            <Link
              href="/about-us"
              className="py-2 text-gray-700 hover:text-primary "
            >
              About us
            </Link>
            <Link
              href="/contact-us"
              className="py-2 text-gray-700 hover:text-primary "
            >
              Contact us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

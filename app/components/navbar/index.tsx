"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlass, X, List } from "@phosphor-icons/react";
import Button from "../ui/button";
import { Manuscript } from "@/types";
import { globalSearch } from "@/app/api/(landing-page)/manuscript";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Mutation for fetching search results
 const {
  mutate,
  data: searchResults,
  status,
} = useMutation({
  mutationFn: (search: string) => globalSearch(search),
  onSuccess: (response) => {
    console.log("Search results:", response);
    if (response?.data?.length > 0) {
      setIsModalOpen(true);
    }
  },
  onError: (error) => {
    console.error("Error fetching search results:", error);
  },
});


  // Handle search input change
  const handleSearch = (search: string) => {
    setQuery(search);
    if (!search) {
      setIsModalOpen(false);
      return;
    }
    mutate(search);
  };

  // Debounce the search input to avoid too many requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex justify-between gap-12">
          <Link href="/">
            <Image
              src="/logo/slu_jst_logo.svg"
              alt="Logo"
              width={160}
              height={100}
            />
          </Link>
          <div className="hidden lg:flex lg:space-x-2 xl:space-x-6">
            <Link
              href="/"
              className="text-gray-700 font-semibold hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/manuscripts"
              className="text-gray-700 font-semibold hover:text-primary"
            >
              Manuscripts
            </Link>
            <Link
              href="/about-us"
              className="text-gray-700 font-semibold hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-700 font-semibold hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 xl:space-x-6">
          {/* Search Input */}
          <div className="hidden w-64 lg:flex relative ">
            <input
              type="text"
              placeholder="Search manuscripts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#9e6962] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#AC3122]"
            />
            <MagnifyingGlass
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue-500"
            />
            {/* Search Results Modal */}
            {isModalOpen && (
              <div className="absolute left-0 right-0 mt-12 bg-white rounded-lg shadow-lg p-6 max-h-80 overflow-y-auto z-50">
                <div className="flex justify-end items-center mb-4">
                  {/* <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={24} />
                </button> */}
                </div>

                {status === "pending" ? (
                  <p className="text-gray-500">Loading...</p>
                ) : searchResults?.data && searchResults.data.length > 0 ? (
                  <ul>
                    {searchResults?.data.map((manuscript: Manuscript) => (
                      <li key={manuscript.id} className="mb-2">
                        <Link
                          href={`/manuscripts/details/${manuscript.id}`}
                          className="text-blue-600 hover:underline"
                          onClick={() => setIsModalOpen(false)}
                        >
                          {manuscript.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No results found.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center space-x-6">
            <div className="hidden lg:flex justify-center items-center space-x-2">
              <Button className="w-24" onClick={() => router.push("/signup")}>
                sign up
              </Button>
              <Link
                href="/signin"
                className="text-black px-4 py-2 rounded-lg bg-[#f1e7e7] font-bold hover:text-primary whitespace-nowrap"
              >
                login
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={32} /> : <List size={32} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-primary z-50 p-6 flex flex-col items-center space-y-6">
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Mobile Links */}
          <Link
            href="/"
            className="text-white text-lg hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/manuscripts"
            className="text-white text-lg hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Manuscript
          </Link>
          <Link
            href="/about-us"
            className="text-white text-lg hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact-us"
            className="text-white text-lg hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile Search */}
          {/* <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search manuscripts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#9e6962] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#AC3122]"
            />
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue-500" />
          </div> */}

          {/* Mobile Auth Buttons */}
          <Button
            className="w-full  text-black max-w-xs"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
          <Link
            href="/login"
            className="text-black font-bold hover:text-primary"
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}

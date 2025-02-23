"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-white mt-auto  bottom-0 py-8 px-6 md:px-12 lg:px-24">
      <div className=" mx-auto w-full border-t-2 border-primary py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src="/logo/slu_jst_logo.svg"
              alt="SLUJST Logo"
              width={150}
              height={60}
            />
          </div>
          <p className="mt-4 text-gray-700">
            The SLU Journal of Science and Technology (SLUJST) is an
            open-access, peer-reviewed platform dedicated to advancing research
            and innovation in science and technology.
          </p>
          <p className="mt-4 text-gray-700 font-medium">Address:</p>
          <p className="text-gray-700">
            Sule Lamido University, <br />
            Kafin Hausa, Jigawa State, Nigeria.
          </p>
        </div>

        <div className=" justify-end grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-gray-600 font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li
                className="text-black hover:underline cursor-pointer"
                onClick={() => router.push("/submission-guidelines")}
              >
                Submission Guidelines
              </li>
              <li className="text-black hover:underline cursor-pointer">
                Issues
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-gray-600 font-semibold">About Us</h3>
            <ul className="mt-2 space-y-1">
              <li
                className="text-black hover:underline cursor-pointer"
                onClick={() => router.push("/about-us")}
              >
                Editorial Board
              </li>
              <li
                className="text-black hover:underline cursor-pointer"
                onClick={() => router.push("/about-us")}
              >
                Advisory Board
              </li>
              <li
                className="text-black hover:underline cursor-pointer"
                onClick={() => router.push("/about-us")}
              >
                Section Editors
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-gray-600 font-semibold"
              onClick={() => router.push("/contact-us")}
            >
              Contact
            </h3>
            <ul className="mt-2 space-y-1">
              <li className="text-black hover:underline cursor-pointer">
                Help
              </li>
              <li className="text-black hover:underline cursor-pointer">
                Privacy
              </li>
              <li className="text-black hover:underline cursor-pointer">
                Support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-4 text-gray-600 text-sm">
        <p>© 2024 SLUJST. All Rights Reserved.</p>

        {/* TODO Add Social Mediasd Icons */}
        {/* <div className="flex space-x-4">
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const handleNotImplemented = (feature: string) => {
    toast(`${feature} feature is coming soon!`);
  };

  return (
    <header className="flex justify-between items-center w-full py-4 px-4 sm:px-6">
      <Link
        href="/"
        className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
      >
        DistLink<span className="text-xs align-super">®</span>
      </Link>

      <div className="flex gap-2 sm:gap-4">
        <Link
          href="/login"
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base font-semibold"
        >
          {/* <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> */}
          Login
        </Link>
        <Link
          href="/signup"
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition text-sm sm:text-base font-semibold"
        >
          {/* <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          <span className="hidden sm:inline">Register</span>
          <span className="sm:hidden">Register</span> */}
          Register
        </Link>
      </div>
    </header>
  );
}

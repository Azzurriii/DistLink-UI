"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isLoggedIn, username, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center w-full py-4 px-4 sm:px-6">
      <Link
        href="/"
        className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
      >
        DistLink<span className="text-xs align-super">®</span>
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-gray-400 text-sm mr-2">Welcome</span>
              <div className="flex items-center">
                <span className="font-medium">{username}</span>
                <svg
                  className={`w-4 h-4 ml-1 text-gray-400 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <Link
                  href="#"
                  onClick={() => toast("Profile feature coming soon!")}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
                <Link
                  href="#"
                  onClick={() => toast("Settings feature coming soon!")}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold">2</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 sm:gap-4">
          <Link
            href="/login"
            className="flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base font-semibold"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </Link>
          <Link
            href="/signup"
            className="flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition text-sm sm:text-base font-semibold"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

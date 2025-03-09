"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LinkShortener() {
  const [url, setUrl] = useState("");
  const [isAutoPaste, setIsAutoPaste] = useState(false);
  const router = useRouter();

  const handleShorten = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    toast.loading("Shortening your link...", { duration: 1000 });
    setTimeout(() => {
      toast.success("Link shortened successfully!");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-8 sm:mt-16 mb-8 sm:mb-12 px-4 sm:px-0">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center whitespace-nowrap overflow-visible">
        <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent font-semibold">
          Shorten Your Loooong Links :)
        </span>
      </h1>

      <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
        DistLink is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>

      <div className="w-full relative">
        <div className="flex w-full rounded-full overflow-hidden bg-gray-800 p-1">
          <div className="flex items-center pl-4 flex-grow">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter the link here"
              className="bg-transparent w-full py-3 focus:outline-none text-white text-sm sm:text-base"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transition text-sm sm:text-base"
            onClick={handleShorten}
          >
            <span className="hidden sm:inline">Shorten It!</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center mt-3 text-xs sm:text-sm text-gray-500 sm:justify-between gap-2 sm:gap-0">
          {/* <div className="flex items-center">
            <input 
              type="checkbox" 
              id="autoPaste" 
              className="mr-2"
              checked={isAutoPaste}
              onChange={() => setIsAutoPaste(!isAutoPaste)}
            />
            <label htmlFor="autoPaste">Auto Paste from Clipboard</label>
          </div> */}
          <div className="text-center sm:text-right">
            You can create <span className="text-pink-500">05</span> more links.{" "}
            <span
              className="text-pink-500 hover:text-pink-400 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Register Now
            </span>{" "}
            to enjoy Unlimited usage
          </div>
        </div>
      </div>
    </div>
  );
}

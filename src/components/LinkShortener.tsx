"use client";

import { useState, useEffect } from "react";
// import Link from "next/link"; // REMOVED - Unused import
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  shortenUrl,
  storeUrlInLocalStorage,
  getGuestLinksCreatedCount,
  incrementGuestLinksCreatedCount,
} from "@/services/api";

interface LinkShortenerProps {
  isLoggedIn?: boolean;
  onLinkShortened: () => void; // Callback function when a link is shortened
}

const MAX_LINKS_GUEST = 5;

export default function LinkShortener({
  isLoggedIn = false,
  onLinkShortened,
}: LinkShortenerProps) {
  const [url, setUrl] = useState("");
  const [isAutoPaste, setIsAutoPaste] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingCreations, setRemainingCreations] = useState(MAX_LINKS_GUEST);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      const createdCount = getGuestLinksCreatedCount();
      setRemainingCreations(Math.max(0, MAX_LINKS_GUEST - createdCount));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isAutoPaste) {
      const readClipboard = async () => {
        try {
          const text = await navigator.clipboard.readText();
          if (text && text.startsWith("http")) {
            setUrl(text);
          }
        } catch (error) {
          console.error("Failed to read clipboard:", error);
        }
      };

      readClipboard();
    }
  }, [isAutoPaste]);

  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    if (!url.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return;
    }

    if (!isLoggedIn) {
      const createdCount = getGuestLinksCreatedCount();
      if (createdCount >= MAX_LINKS_GUEST) {
        toast.error(
          `You have reached the guest limit of ${MAX_LINKS_GUEST} link creations. Register to enjoy unlimited usage.`,
          { duration: 4000 }
        );
        return;
      }
    }

    setIsLoading(true);
    let toastId: string | undefined;

    try {
      toastId = toast.loading("Shortening your link...");

      const response = await shortenUrl({
        originalUrl: url,
        expiration: "7D",
      });

      if (!isLoggedIn) {
        storeUrlInLocalStorage(response);
        incrementGuestLinksCreatedCount();
        setRemainingCreations((prev) => Math.max(0, prev - 1));
      }

      toast.success("Link shortened successfully!", { id: toastId });
      setUrl("");
      onLinkShortened();
    } catch (error) {
      console.error("Shortening failed in LinkShortener component:", error);

      if (toastId) {
        toast.dismiss(toastId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-8 sm:mt-16 mb-8 sm:mb-12 px-4 sm:px-0">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center whitespace-nowrap overflow-visible">
        <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent font-semibold">
          Shorten Your Looooong Links :)
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
            className={`${
              isLoading
                ? "bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full transition text-sm sm:text-base`}
            onClick={handleShorten}
            disabled={isLoading}
          >
            <span className="hidden sm:inline">
              {isLoading ? "Shortening..." : "Shorten Now!"}
            </span>
            <span className="sm:hidden">→</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center mt-3 text-xs sm:text-sm text-gray-500 sm:justify-between gap-2 sm:gap-0">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 px-4 py-2 rounded-lg">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isAutoPaste}
                  onChange={() => setIsAutoPaste(!isAutoPaste)}
                />
                <div
                  className="w-11 h-6 bg-gray-700 rounded-full peer 
                               peer-focus:ring-2 peer-focus:ring-blue-300
                               peer-checked:bg-blue-900
                               after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                               after:bg-gray-400 after:rounded-full after:h-5 after:w-5
                               after:transition-all after:duration-300 after:ease-in-out
                               peer-checked:after:translate-x-5 peer-checked:after:bg-blue-500
                               peer-checked:after:border-white peer-checked:after:shadow-lg"
                ></div>
              </label>
              <span className="text-sm text-white font-medium">
                Auto Paste from Clipboard
              </span>
            </div>
          ) : (
            <div className="text-center sm:text-right">
              You have{" "}
              <span className="text-pink-500">{remainingCreations}</span> link
              {remainingCreations !== 1
                ? " creations"
                : " creation"} remaining.{" "}
              <span
                className="text-pink-500 hover:text-pink-400 cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Register Now
              </span>{" "}
              to enjoy Unlimited usage
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

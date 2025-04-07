"use client";

import { useEffect, useRef } from "react";

export default function ShortenButton() {
  const handleShorten = () => {
    // Scroll to the input field
    const shortenerInput = document.querySelector(".bg-gray-800 input");
    if (shortenerInput) {
      shortenerInput.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        (shortenerInput as HTMLInputElement).focus();
      }, 500);
    }
  };

  return (
    <button
      onClick={handleShorten}
      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition md:hidden mb-6"
    >
      Shorten Links
    </button>
  );
}

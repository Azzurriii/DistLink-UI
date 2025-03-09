"use client";

import toast from "react-hot-toast";

export default function ShortenButton() {
  const handleShorten = () => {
    toast.loading("Processing your request...", { duration: 1000 });
    setTimeout(() => {
      toast.success("Link shortened successfully!");
    }, 1000);
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

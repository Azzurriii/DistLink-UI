"use client";

import { useEffect, useState } from "react";
import PlatformIcon from "./PlatformIcon";
import QRCodeModal from "./QRCodeModal";
import { FaCopy, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { removeUrlFromLocalStorage } from "@/services/api";

interface LinkItem {
  id: string;
  shortLink: string;
  originalLink: string;
  clicks: number;
  status: string;
  date: string;
}

interface LinksTableProps {
  links: LinkItem[];
  onLinksUpdated: () => void;
}

export default function LinksTable({ links, onLinksUpdated }: LinksTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleDeleteLink = (id: string) => {
    removeUrlFromLocalStorage(id);
    onLinksUpdated();
    toast.success("Link removed successfully");
  };

  const handleCopy = async (text: string) => {
    const toastId = toast.loading("Copying to clipboard...");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", { id: toastId });
    } catch (error) {
      toast.error("Failed to copy text", { id: toastId });
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-4">
        {links.length > 0 ? (
          <button
            className="text-blue-500 text-sm hover:text-blue-400"
            onClick={() => toast("History feature is coming soon!")}
          >
            View All
          </button>
        ) : (
          <div className="text-gray-400 text-center w-full py-10">
            No shortened links yet. Create your first shortened link above!
          </div>
        )}
      </div>

      {links.length > 0 && (
        <>
          {/* Mobile View */}
          {!isDesktop && (
            <div className="flex flex-col gap-3">
              {links.map((link, index) => (
                <div
                  key={link.id}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center p-3 cursor-pointer"
                    onClick={() => toggleRow(index)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <PlatformIcon url={link.originalLink} size="sm" />
                      <span className="truncate text-sm text-gray-300 flex-shrink">
                        {link.shortLink}
                      </span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(link.shortLink);
                        }}
                        aria-label="Copy short link"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 ml-2 text-red-500 hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLink(link.id);
                        }}
                        aria-label="Delete link"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                      <span className="ml-2">
                        {expandedRow === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                  </div>

                  {expandedRow === index && (
                    <div className="p-3 border-t border-gray-700 space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs text-gray-400">
                            Original Link:
                          </div>
                          <button
                            className="text-gray-500 hover:text-gray-300"
                            onClick={() => handleCopy(link.originalLink)}
                            aria-label="Copy original link"
                          >
                            <FaCopy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-300 truncate">
                          {link.originalLink}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className="text-xs text-gray-400">Status</div>
                          <div
                            className={`text-sm ${
                              link.status === "Active"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {link.status}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Date</div>
                          <div className="text-sm text-gray-300">
                            {link.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <QRCodeModal
                          url={link.originalLink}
                          shortUrl={link.shortLink}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Desktop View */}
          {isDesktop && (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left align-middle min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-gray-400 font-medium">
                      Short Link
                    </th>
                    <th className="py-3 px-4 text-gray-400 font-medium">
                      Original Link
                    </th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-center hidden md:table-cell">
                      QR Code
                    </th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-center">
                      Status
                    </th>
                    <th className="py-3 px-4 text-gray-400 font-medium">
                      Date
                    </th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id} className="border-b border-gray-800">
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center">
                          <span className="text-gray-300 flex-grow truncate max-w-[150px] md:max-w-[200px]">
                            {link.shortLink}
                          </span>
                          <button
                            className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0"
                            onClick={() => handleCopy(link.shortLink)}
                            aria-label="Copy short link"
                          >
                            <FaCopy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center">
                          <PlatformIcon url={link.originalLink} size="sm" />
                          <span className="text-gray-300 truncate max-w-[200px] md:max-w-xs ml-2 flex-grow">
                            {link.originalLink}
                          </span>
                          <button
                            className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0"
                            onClick={() => handleCopy(link.originalLink)}
                            aria-label="Copy original link"
                          >
                            <FaCopy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center align-middle hidden md:table-cell">
                        <QRCodeModal
                          url={link.originalLink}
                          shortUrl={link.shortLink}
                        />
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        <span
                          className={`px-2 py-1 rounded-full text-xs inline-block ${
                            link.status === "Active"
                              ? "bg-green-900/30 text-green-500"
                              : "bg-red-900/30 text-red-500"
                          }`}
                        >
                          {link.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-middle text-gray-300">
                        {link.date}
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        <button
                          className="text-red-500 hover:text-red-400"
                          onClick={() => handleDeleteLink(link.id)}
                          aria-label="Delete link"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

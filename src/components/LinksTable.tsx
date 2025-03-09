"use client";

import { useEffect, useState } from 'react';
import PlatformIcon from './PlatformIcon';
import QRCodeModal from './QRCodeModal';
import { FaCopy, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function LinksTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  // Prevent render mobile view
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const links = [
    { 
      shortLink: "https://distlink.com/Bn41aCOinx", 
      originalLink: "https://www.twitter.com/tweets/8erelCorihu/", 
      clicks: 1313, 
      status: "Active", 
      date: "Oct - 10 -2023"
    },
    { 
      shortLink: "https://distlink.com/Bn41aCOinx", 
      originalLink: "https://www.youtube.com/watch?v=8J7ZmH0lXuk", 
      clicks: 4313, 
      status: "Inactive", 
      date: "Oct - 08 -2023"
    },
    { 
      shortLink: "https://distlink.com/Bn41aCOinx", 
      originalLink: "https://www.adventuresinwanderlust.com/", 
      clicks: 1013, 
      status: "Active", 
      date: "Oct - 01 -2023"
    },
    { 
      shortLink: "https://distlink.com/Bn41aCOinx", 
      originalLink: "https://vimeo.com/625527654", 
      clicks: 1313, 
      status: "Active", 
      date: "Sep - 20 -2023"
    },
    { 
      shortLink: "https://distlink.com/Bn41aCOinx", 
      originalLink: "https://unsplash.com/photos/2KjNwOzFIVQ", 
      clicks: 1423, 
      status: "Active", 
      date: "Sep - 18 -2023"
    }
  ];

  const handleCopy = async (text: string) => {
    const toastId = toast.loading("Copying to clipboard...");
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", { id: toastId });
    } catch (error) {
      toast.error("Failed to copy text", { id: toastId });
    }
  };

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Shorten Links</h2>
        <button 
          className="text-blue-500 text-sm hover:text-blue-400"
          onClick={() => toast('History feature is coming soon!')}
        >
          View All
        </button>
      </div>

      {/* Mobile View */}
      {!isDesktop && (
        <div className="flex flex-col gap-3">
          {links.map((link, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => toggleRow(index)}
              >
                <div className="flex items-center">
                  <PlatformIcon url={link.originalLink} className="mr-2" />
                  <div className="truncate max-w-[180px]">{link.shortLink}</div>
                </div>
                <div className="flex items-center">
                  <button 
                    className="mr-3 text-gray-500 hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(link.shortLink);
                    }}
                  >
                    <FaCopy className="w-4 h-4" />
                  </button>
                  {expandedRow === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedRow === index && (
                <div className="p-3 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-400">Original Link:</div>
                    <button 
                      className="text-gray-500 hover:text-gray-300"
                      onClick={() => handleCopy(link.originalLink)}
                    >
                      <FaCopy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-300 truncate mb-3">{link.originalLink}</div>
                  
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-400">Clicks</div>
                      <div className="text-sm">{link.clicks}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Status</div>
                      <div className={`text-sm ${link.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                        {link.status}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Date</div>
                      <div className="text-sm">{link.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <QRCodeModal url={link.originalLink} shortUrl={link.shortLink} />
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
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400">Short Link</th>
                <th className="py-3 px-4 text-gray-400">Original Link</th>
                <th className="py-3 px-4 text-gray-400">QR Code</th>
                <th className="py-3 px-4 text-gray-400">Clicks</th>
                <th className="py-3 px-4 text-gray-400">Status</th>
                <th className="py-3 px-4 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-4 px-4 flex items-center">
                    <span className="text-gray-300">{link.shortLink}</span>
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-300"
                      onClick={() => handleCopy(link.shortLink)}
                      aria-label="Copy short link"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <PlatformIcon url={link.originalLink} className="mr-2" />
                      <span className="text-gray-300 truncate max-w-xs">{link.originalLink}</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-gray-300"
                        onClick={() => handleCopy(link.originalLink)}
                        aria-label="Copy original link"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <QRCodeModal url={link.originalLink} shortUrl={link.shortLink} />
                  </td>
                  <td className="py-4 px-4 text-gray-300">{link.clicks}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      link.status === 'Active' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'
                    }`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{link.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
"use client";

import PlatformIcon from './PlatformIcon';
import QRCodeModal from './QRCodeModal';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LinksTable() {
  const links = [
    { 
      shortLink: "https://linkly.com/Bn41aCOinx", 
      originalLink: "https://www.twitter.com/tweets/8erelCorihu/", 
      clicks: 1313, 
      status: "Active", 
      date: "Oct - 10 -2023"
    },
    { 
      shortLink: "https://linkly.com/Bn41aCOinx", 
      originalLink: "https://www.youtube.com/watch?v=8J7ZmH0lXuk", 
      clicks: 4313, 
      status: "Inactive", 
      date: "Oct - 08 -2023"
    },
    { 
      shortLink: "https://linkly.com/Bn41aCOinx", 
      originalLink: "https://www.adventuresinwanderlust.com/", 
      clicks: 1013, 
      status: "Active", 
      date: "Oct - 01 -2023"
    },
    { 
      shortLink: "https://linkly.com/Bn41aCOinx", 
      originalLink: "https://vimeo.com/625527654", 
      clicks: 1313, 
      status: "Active", 
      date: "Sep - 20 -2023"
    },
    { 
      shortLink: "https://linkly.com/Bn41aCOinx", 
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
  );
} 
"use client";

import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Header() {
  const handleNotImplemented = (feature: string) => {
    toast(`${feature} feature is coming soon!`);
  };

  return (
    <header className="flex justify-between items-center w-full py-4 px-4 sm:px-6">
      <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        DistLink<span className="text-xs align-super">®</span>
      </div>
      
      <div className="flex gap-2 sm:gap-4">
        <button 
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base"
          onClick={() => handleNotImplemented('Login')}
        >
          Login →
        </button>
        <button 
          className="hidden sm:block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
          onClick={() => handleNotImplemented('Registration')}
        >
          Register Now
        </button>
      </div>
    </header>
  );
} 
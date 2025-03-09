import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full py-4 px-6">
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        DistLink<span className="text-xs align-super">®</span>
      </div>
      
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition">
          Login →
        </button>
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition">
          Register Now
        </button>
      </div>
    </header>
  );
} 
"use client";

// import { useState } from "react"; // REMOVED - Unused import
import { FaFilter, FaEdit } from "react-icons/fa";

export default function TableActions() {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <button className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
        <FaFilter className="mr-2" />
        Filter
      </button>
      <button className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
        <FaEdit className="mr-2" />
        Bulk Edit
      </button>
    </div>
  );
}

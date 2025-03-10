"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHistory, FaChartBar, FaStream, FaCog } from "react-icons/fa";

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "History", icon: <FaHistory className="mr-2" /> },
    {
      id: "statistics",
      label: "Statistics",
      icon: <FaChartBar className="mr-2" />,
      onClick: () => toast("Statistics feature coming soon!"),
    },
    {
      id: "clickStream",
      label: "Click Stream",
      icon: <FaStream className="mr-2" />,
      onClick: () => toast("Click Stream feature coming soon!"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog className="mr-2" />,
      onClick: () => toast("Settings feature coming soon!"),
    },
  ];

  return (
    <div className="flex justify-center mb-6 border-b border-gray-700">
      <div className="flex space-x-2 sm:space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center py-3 px-2 sm:px-4 text-sm sm:text-base font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

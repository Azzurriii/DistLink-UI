"use client";

import React from "react";

interface GlassCardProps {
  title: string;
  children: React.ReactNode;
}

export default function GlassCard({ title, children }: GlassCardProps) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem]">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-800/20 backdrop-blur-xl rounded-[2rem]"></div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-pink-500/5 rounded-[2rem]"></div>

      {/* Enhanced glow border */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
        {children}
      </div>
    </div>
  );
}

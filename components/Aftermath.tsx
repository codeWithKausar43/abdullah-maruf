"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface AftermathProps {
  onReenter: () => void;
  onReturnToSite: () => void;
}

export const Aftermath: React.FC<AftermathProps> = ({ onReenter, onReturnToSite }) => {
  const { sections, personal } = siteConfig;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-center overflow-hidden">
      <div className="max-w-xl w-full bg-[#121215] border border-white/10 rounded-sm p-8 sm:p-12 relative z-10 shadow-2xl">
        {/* Status Badge */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-4 font-mono">
          {sections.aftermath.badge}
        </p>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
          {sections.aftermath.title}
        </h2>
        <div className="w-16 h-[1px] bg-white/20 mx-auto mb-6" />

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-6">
          {sections.aftermath.description}
        </p>

        <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-10">
          SUBJECT: {personal.name} — {personal.location}
        </p>

        {/* Action Buttons (NO EMOJIS, NO ICONS) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReenter}
            className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 hover:bg-zinc-200 active:scale-95 font-medium cursor-pointer"
          >
            {sections.aftermath.buttonReplay}
          </button>

          <button
            onClick={onReturnToSite}
            className="px-8 py-4 bg-transparent border border-white/20 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95 font-medium cursor-pointer"
          >
            {sections.aftermath.buttonReturn}
          </button>
        </div>
      </div>
    </div>
  );
};

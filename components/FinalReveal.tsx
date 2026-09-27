"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface FinalRevealProps {
  onTriggerExperience: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onTriggerExperience }) => {
  const { sections, personal } = siteConfig;

  return (
    <section id="monograph" className="py-32 sm:py-44 bg-[#0d0d10] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Category */}
        <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs mb-4 font-light">
          {sections.finalReveal.category}
        </p>

        {/* Grand Serif Heading */}
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[0.95] mb-8">
          {sections.finalReveal.title}
        </h2>

        <div className="w-24 h-[1px] bg-white/20 mx-auto mb-8" />

        {/* Minimal Statement */}
        <p className="text-base sm:text-xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed mb-12">
          {sections.finalReveal.statement}
        </p>

        {/* Personal Tag */}
        <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-medium mb-10">
          {personal.name} — {personal.location}
        </div>

        {/* Master Trigger Button */}
        <div>
          <button
            onClick={onTriggerExperience}
            className="px-10 py-5 bg-white text-black text-xs sm:text-sm uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-105 hover:bg-zinc-200 active:scale-95 shadow-2xl font-medium cursor-pointer"
          >
            {sections.finalReveal.buttonTrigger}
          </button>
        </div>
      </div>
    </section>
  );
};

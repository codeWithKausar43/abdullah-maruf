"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface MysterySectionProps {
  onTriggerExperience: () => void;
}

export const MysterySection: React.FC<MysterySectionProps> = ({ onTriggerExperience }) => {
  const { sections, personal } = siteConfig;

  return (
    <section id="archive" className="py-28 sm:py-36 bg-[#0d0d10] border-t border-b border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Category */}
        <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs mb-4 font-light">
          {sections.mystery.category}
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
          {sections.mystery.title}
        </h2>
        <div className="w-24 h-[1px] bg-white/20 mx-auto mb-8" />

        {/* Statement */}
        <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed mb-12">
          {sections.mystery.statement}
        </p>

        {/* Curatorial Protocol Box with Fine 1px Lines */}
        <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-sm p-6 sm:p-10 text-left font-mono text-xs sm:text-sm text-zinc-400 mb-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-zinc-400">
            <span className="tracking-[0.2em] uppercase text-zinc-300 font-semibold">
              ARCHIVE CLEARANCE // {personal.location.toUpperCase()}
            </span>
            <span>{personal.birthYear}</span>
          </div>

          <div className="space-y-3">
            {sections.mystery.manifesto.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-zinc-500 font-mono">0{idx + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Minimal line pulse */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
            <span>AUDITORY VOLTAGE: HIGH</span>
            <span>STATUS: ARMED</span>
          </div>
        </div>

        {/* Trigger Button */}
        <button
          onClick={onTriggerExperience}
          className="px-9 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-105 hover:bg-zinc-200 active:scale-95 shadow-xl font-medium cursor-pointer"
        >
          {sections.mystery.buttonTrigger}
        </button>
      </div>
    </section>
  );
};

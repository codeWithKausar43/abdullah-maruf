"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

interface InteractiveSectionProps {
  onTriggerExperience: () => void;
}

export const InteractiveSection: React.FC<InteractiveSectionProps> = ({ onTriggerExperience }) => {
  const { sections, personal } = siteConfig;
  const [frequency, setFrequency] = useState<number>(108.0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    if (Math.abs(val - 140.0) < 1.5) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  };

  return (
    <section id="dialogue" className="py-28 sm:py-36 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center text-center">
        {/* Category */}
        <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs mb-4 font-light">
          {sections.interactive.category}
        </p>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
          {sections.interactive.title}
        </h2>
        <div className="w-24 h-[1px] bg-white/20 mx-auto mb-6" />

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-lg mx-auto mb-14">
          {sections.interactive.subtitle}
        </p>

        {/* Minimalist Gallery Tuner Console */}
        <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-sm p-8 sm:p-12 flex flex-col items-center shadow-2xl">
          <div className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium mb-3">
            CARRIER RESONANCE
          </div>

          <div className="text-5xl sm:text-7xl font-serif font-bold text-white tracking-tight flex items-baseline gap-2 mb-2">
            <span>{frequency.toFixed(2)}</span>
            <span className="text-xs sm:text-sm font-sans tracking-widest text-zinc-400 font-normal">
              MHZ
            </span>
          </div>

          <p className="text-xs font-mono tracking-wider uppercase text-zinc-400 mb-8">
            {isLocked
              ? `HARMONIC ALIGNED // ${personal.name.toUpperCase()}`
              : sections.interactive.frequencyPrompt}
          </p>

          {/* Minimalist White Audio Bars */}
          <div suppressHydrationWarning className="w-full h-12 flex items-center justify-center gap-1 sm:gap-2 mb-8 px-4">
            {Array.from({ length: 32 }).map((_, i) => {
              const distance = Math.abs((i / 32) * 60 + 90 - frequency);
              const height = Math.max(12, 100 - distance * 6);
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-150"
                  style={{
                    height: `${height}%`,
                    backgroundColor: isLocked
                      ? "#ffffff"
                      : height > 70
                      ? "#d4d4d8"
                      : "#27272a",
                  }}
                />
              );
            })}
          </div>

          {/* Fine Slider */}
          <div className="w-full mb-8">
            <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-3">
              <span>90.00 MHZ</span>
              <span className="text-zinc-300">TARGET: 140.00 MHZ</span>
              <span>150.00 MHZ</span>
            </div>
            <input
              type="range"
              min="90"
              max="150"
              step="0.1"
              value={frequency}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={onTriggerExperience}
            className="w-full sm:w-auto px-9 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-105 hover:bg-zinc-200 active:scale-95 shadow-xl font-medium cursor-pointer"
          >
            {sections.interactive.buttonTrigger}
          </button>
        </div>
      </div>
    </section>
  );
};

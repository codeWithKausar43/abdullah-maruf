"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CinematicBackground } from "./CinematicBackground";

interface HeroProps {
  onTriggerExperience: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerExperience }) => {
  const { personal, sections, media } = siteConfig;

  const scrollToGallery = () => {
    const el = document.getElementById("works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-24 lg:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* =======================================================================
          CINEMATIC ANIMATED BACKGROUND: SILK & SMOKE WAVES
          ======================================================================= */}
      <CinematicBackground />

      {/* Subtle overlay watermark and fine guide marks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[1]">
        {/* Subtle architectural vertical lines */}
        <div className="hidden lg:block absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="w-full h-full border-x border-white/[0.03] grid grid-cols-12 pointer-events-none">
            <div className="col-span-7 border-r border-white/[0.02] h-full" />
            <div className="col-span-5 h-full" />
          </div>
        </div>

        {/* Ambient Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold text-white/[0.015] tracking-widest uppercase pointer-events-none select-none">
          MARUF
        </div>
      </div>

      {/* =======================================================================
          MAIN CONTENT: CLEAN & SPACIOUS CINEMATIC EDITORIAL LAYOUT
          ======================================================================= */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">

          {/* LEFT COLUMN: MONUMENTAL TYPOGRAPHY & ACTIONS (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Header Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-zinc-300 font-medium">
                {sections.hero.category}
              </span>
              <span className="text-zinc-600 text-[10px]">|</span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-400 font-mono">
                JAMALPUR, BD
              </span>
            </div>

            {/* Monumental Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl xl:text-[6.8rem] font-bold text-white tracking-tighter leading-[0.93] mb-6">
              {sections.hero.headingLine1}
              <span className="block text-zinc-300 italic font-normal tracking-tight mt-1">
                {sections.hero.headingLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <div className="lg:border-l-2 lg:border-white/20 lg:pl-6 max-w-xl mb-10">
              <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light tracking-wide leading-relaxed">
                {sections.hero.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
              {/* Primary: Smooth Scroll to Gallery */}
              <button
                onClick={scrollToGallery}
                className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-200 active:scale-95 font-medium cursor-pointer overflow-hidden flex items-center justify-center gap-3"
              >
                <span>{sections.hero.buttonPrimary}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Designated Trigger Button: Launches Fullscreen Valley Horizon Experience */}
              <button
                onClick={onTriggerExperience}
                className="group w-full sm:w-auto px-8 py-4 bg-white/[0.06] border border-white/20 text-white text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:bg-white/15 hover:border-white/50 active:scale-95 font-medium cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{sections.hero.buttonSecondary}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CLEAN CINEMATIC PORTRAIT FRAME (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[400px] lg:max-w-[440px] group">
              {/* SVG Outer Framing Wireframe Graphics */}
              <svg
                className="absolute -top-4 -left-4 -right-4 -bottom-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20 text-white/20 transition-all duration-500 group-hover:text-white/50"
                fill="none"
              >
                <path d="M 0 24 L 0 0 L 24 0" stroke="currentColor" strokeWidth="1.5" />
                <path d="M calc(100% - 24px) 0 L 100% 0 L 100% 24" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 0 calc(100% - 24px) L 0 100% L 24 100%" stroke="currentColor" strokeWidth="1.5" />
                <path d="M calc(100% - 24px) 100% L 100% 100% L 100% calc(100% - 24px)" stroke="currentColor" strokeWidth="1.5" />
              </svg>

              {/* Main Portrait Frame with Glass Border */}
              <div
                onClick={onTriggerExperience}
                className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-[#121212] transition-all duration-700 group-hover:border-white/40 cursor-pointer"
              >
                {/* The Subject Image */}
                <Image
                  src={media.heroImage}
                  alt={personal.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 440px"
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />

                {/* Shading Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Viewfinder Overlay */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono text-zinc-300 tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    <span className="font-semibold text-white">PORTFOLIO</span>
                  </div>
                  <div className="text-zinc-400">
                    JAMALPUR
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1 pointer-events-none">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white uppercase border-b border-white/15 pb-2">
                    <span className="font-semibold">{personal.name}</span>
                    <span className="text-zinc-400">STUDY #04</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400 uppercase pt-0.5">
                    <span>{personal.location}</span>
                    <span>TAP TO VIEW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          BOTTOM STATUS & SCROLL INDICATOR
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-2">
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>ABDULLAH AL MARUF</span>
          </div>

          <div 
            onClick={scrollToGallery}
            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            title="Scroll to Gallery"
          >
            <span className="text-zinc-400 font-medium tracking-[0.3em]">
              {sections.hero.scrollText}
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-400 to-transparent animate-pulse" />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span>PHOTOGRAPHY & ARCHIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

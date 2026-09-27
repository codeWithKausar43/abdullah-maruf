"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface HeroProps {
  onTriggerExperience: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerExperience }) => {
  const { personal, sections, media } = siteConfig;

  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-24 lg:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-[#0a0a0a]"
    >
      {/* =======================================================================
          CUSTOM GRAPHICS LAYER 1: AMBIENT ARCHITECTURAL GRID & RETICLE ACCENTS
          ======================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle radial aura gradients */}
        <div className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-zinc-700/10 via-zinc-800/5 to-transparent blur-[140px]" />
        <div className="absolute top-[25%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-zinc-600/10 via-zinc-900/5 to-transparent blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-t from-zinc-800/10 to-transparent blur-[120px]" />

        {/* Architectural drafting vertical lines (Visible on large screens) */}
        <div className="hidden lg:block absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="w-full h-full border-x border-white/[0.03] grid grid-cols-12 pointer-events-none">
            <div className="col-span-7 border-r border-white/[0.03] h-full relative">
              {/* Precision tick marks along vertical axis */}
              <div className="absolute top-1/4 -right-1.5 w-3 h-[1px] bg-white/20" />
              <div className="absolute top-2/4 -right-1.5 w-3 h-[1px] bg-white/20" />
              <div className="absolute top-3/4 -right-1.5 w-3 h-[1px] bg-white/20" />
            </div>
            <div className="col-span-5 h-full relative" />
          </div>
        </div>

        {/* Watermark Monogram Typography in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold text-white/[0.015] tracking-widest uppercase pointer-events-none select-none">
          MARUF
        </div>

        {/* Precision Crosshair (+) Markers */}
        <div className="hidden md:flex absolute top-28 left-8 items-center gap-2 text-white/20 font-mono text-[9px] tracking-widest">
          <span>+</span>
          <span>SEC: 01 // ARCHIVE_INIT</span>
        </div>
        <div className="hidden md:flex absolute top-28 right-8 items-center gap-2 text-white/20 font-mono text-[9px] tracking-widest">
          <span>COORDS: 24°55&apos;N 89°57&apos;E</span>
          <span>+</span>
        </div>
      </div>

      {/* =======================================================================
          MAIN EDITORIAL CONTENT: CINEMATIC ASYMMETRICAL DESKTOP LAYOUT
          ======================================================================= */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: NARRATIVE, MONUMENTAL TYPOGRAPHY & SPECS (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Curatorial Header Badge with Live Indicator */}
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
                EDITION {personal.birthYear}–2025
              </span>
            </div>

            {/* Monumental Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl xl:text-[6.8rem] font-bold text-white tracking-tighter leading-[0.93] mb-6">
              {sections.hero.headingLine1}
              <span className="block text-zinc-300 italic font-normal tracking-tight mt-1">
                {sections.hero.headingLine2}
              </span>
            </h1>

            {/* Editorial Subtitle with Left Border Accent on Desktop */}
            <div className="lg:border-l-2 lg:border-white/20 lg:pl-6 max-w-xl mb-8">
              <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light tracking-wide leading-relaxed">
                {sections.hero.subtitle}
              </p>
            </div>

            {/* Curatorial Spec Grid (Custom Graphic Info Module) */}
            <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 my-2 border-y border-white/10 text-left">
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-500 font-mono mb-1">LOCATION</p>
                <p className="text-xs text-zinc-200 font-medium tracking-wider">{personal.location}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-500 font-mono mb-1">INCEPTION</p>
                <p className="text-xs text-zinc-200 font-medium tracking-wider">{personal.birthDate}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-500 font-mono mb-1">CURATION STATUS</p>
                <p className="text-xs text-emerald-400 font-mono tracking-wider">ACTIVE // RESTRICTED</p>
              </div>
            </div>

            {/* Action Buttons with Micro-interactions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-8 w-full sm:w-auto">
              <button
                onClick={onTriggerExperience}
                className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] font-medium cursor-pointer overflow-hidden flex items-center justify-center gap-3"
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

              <button
                onClick={onTriggerExperience}
                className="group w-full sm:w-auto px-8 py-4 bg-white/[0.04] border border-white/20 text-white text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-95 font-medium cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span>{sections.hero.buttonSecondary}</span>
              </button>
            </div>

            {/* Audio Waveform Micro Graphic Accent */}
            <div className="flex items-center gap-3 mt-6 text-zinc-500 text-[10px] font-mono tracking-widest">
              <div className="flex items-center gap-1 h-3">
                <span className="w-[2px] h-2 bg-zinc-500 animate-pulse" />
                <span className="w-[2px] h-3.5 bg-zinc-400 animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-[2px] h-1.5 bg-zinc-500 animate-pulse" style={{ animationDelay: "300ms" }} />
                <span className="w-[2px] h-3 bg-zinc-400 animate-pulse" style={{ animationDelay: "450ms" }} />
                <span className="w-[2px] h-2 bg-zinc-500 animate-pulse" style={{ animationDelay: "200ms" }} />
              </div>
              <span>SENSORY CALIBRATION: 140.00 MHZ</span>
            </div>
          </div>

          {/* RIGHT COLUMN: CINEMATIC VIEWFINDER SHOWCASE WITH CUSTOM GRAPHICS (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[420px] lg:max-w-[460px] group">
              
              {/* Custom Graphics: Ambient Backdrop Halo & Sunburst Ring */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-white/10 via-zinc-500/10 to-transparent rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* SVG Outer Framing Wireframe Graphics */}
              <svg
                className="absolute -top-4 -left-4 -right-4 -bottom-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20 text-white/30 transition-all duration-500 group-hover:text-white/60"
                fill="none"
              >
                {/* 4 Corner Viewfinder Brackets */}
                <path d="M 0 28 L 0 0 L 28 0" stroke="currentColor" strokeWidth="1.5" />
                <path d="M calc(100% - 28px) 0 L 100% 0 L 100% 28" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 0 calc(100% - 28px) L 0 100% L 28 100%" stroke="currentColor" strokeWidth="1.5" />
                <path d="M calc(100% - 28px) 100% L 100% 100% L 100% calc(100% - 28px)" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Midpoint Alignment Ticks */}
                <line x1="50%" y1="0" x2="50%" y2="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="50%" y1="calc(100% - 8px)" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="50%" x2="8" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="calc(100% - 8px)" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

              {/* Main Portrait Frame with Glass Border */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-[#121212] shadow-2xl transition-all duration-700 group-hover:border-white/30">
                
                {/* The Subject Image */}
                <Image
                  src={media.heroImage}
                  alt={personal.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 460px"
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />

                {/* Cinematic Vignette & Shading Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Viewfinder HUD Overlay */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono text-zinc-300 tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    <span className="font-semibold text-white">REC // 4K</span>
                  </div>
                  <div className="hidden sm:block text-zinc-400">
                    ISO 100 • 50MM • F/1.4
                  </div>
                  <div>
                    FPS 24.00
                  </div>
                </div>

                {/* Center Focal Crosshair Marker */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30 group-hover:opacity-75 transition-opacity duration-500">
                  <div className="relative w-10 h-10 border border-white/40 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute top-0 w-[1px] h-2 bg-white" />
                    <div className="absolute bottom-0 w-[1px] h-2 bg-white" />
                    <div className="absolute left-0 h-[1px] w-2 bg-white" />
                    <div className="absolute right-0 h-[1px] w-2 bg-white" />
                  </div>
                </div>

                {/* Bottom Viewfinder HUD Metadata */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white uppercase border-b border-white/15 pb-2">
                    <span className="font-semibold">{personal.name}</span>
                    <span className="text-zinc-400">ARCHIVE_ID: #04</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400 uppercase pt-0.5">
                    <span>{personal.origin}</span>
                    <span>STUDY NO. 04 / 2025</span>
                  </div>
                </div>
              </div>

              {/* Floating Curatorial Glass Badge (Top Right Offset) */}
              <div className="absolute -top-5 -right-3 sm:-right-5 z-30 px-3.5 py-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hidden sm:flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-200 uppercase font-medium">
                  VERIFIED MONOGRAPH
                </span>
              </div>

              {/* Floating Technical Stamp Card (Bottom Left Offset) */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 z-30 px-4 py-2.5 bg-[#0e0e11]/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl hidden sm:flex flex-col gap-0.5">
                <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                  GEO LOCATION
                </span>
                <span className="text-[11px] font-mono tracking-wider text-white font-medium">
                  JAMALPUR SADAR, BD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          CINEMATIC BOTTOM STATUS & SCROLL INDICATOR
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-2">
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>PORTFOLIO MONOGRAPH 2025</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-400 font-medium tracking-[0.3em]">
              {sections.hero.scrollText}
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-400 to-transparent animate-pulse" />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span>AUDIT: SOUND ENCRYPTED</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </section>
  );
};


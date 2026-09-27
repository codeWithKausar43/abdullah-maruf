"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { Gallery } from "@/components/Gallery";
import { MysterySection } from "@/components/MysterySection";
import { InteractiveSection } from "@/components/InteractiveSection";
import { FinalReveal } from "@/components/FinalReveal";
import { ImmersiveExperience } from "@/components/ImmersiveExperience";
import { Aftermath } from "@/components/Aftermath";
import { siteConfig } from "@/config/site";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [viewState, setViewState] = useState<"landing" | "immersive" | "aftermath">("landing");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleTriggerExperience = () => {
    setViewState("immersive");
  };

  const handleExitExperience = () => {
    setViewState("aftermath");
  };

  const handleReturnToSite = () => {
    setViewState("landing");
  };

  if (!mounted) {
    return <main className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] relative">
      {/* 1. Contemporary Luxury Landing Page State */}
      {viewState === "landing" && (
        <div className="w-full flex flex-col">
          {/* Top Luxury Navbar */}
          <Navbar onTriggerExperience={handleTriggerExperience} />

          {/* Section 1: Hero */}
          <Hero onTriggerExperience={handleTriggerExperience} />

          {/* Section 2: Selected Works / Curated Gallery */}
          <Gallery onTriggerExperience={handleTriggerExperience} />

          {/* Section 3: Profile & Identity Monograph */}
          <Profile onTriggerExperience={handleTriggerExperience} />

          {/* Section 4: The Mystery / Curatorial Warning */}
          <MysterySection onTriggerExperience={handleTriggerExperience} />

          {/* Section 5: Experimental Harmonic Calibrator */}
          <InteractiveSection onTriggerExperience={handleTriggerExperience} />

          {/* Section 6: Final Climax / Resonance Point */}
          <FinalReveal onTriggerExperience={handleTriggerExperience} />

          {/* High-End KEXART Style Client Footer (Max-Width 1400px, NO EMOJIS, NO ICONS) */}
          <footer className="w-full bg-[#070709] border-t border-white/5 py-20">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
                {/* Brand Column */}
                <div className="lg:col-span-2 pr-4">
                  <a href="#home" className="inline-block mb-6">
                    <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {siteConfig.personal.name.toUpperCase()}
                    </span>
                  </a>
                  <p className="text-zinc-400 max-w-sm text-sm font-light leading-relaxed mb-6">
                    {siteConfig.personal.statement}
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-mono">
                    ORIGIN: <span className="text-zinc-300">{siteConfig.personal.location}</span>
                  </p>
                </div>

                {/* Navigation Index */}
                <div>
                  <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-6 font-medium">
                    EXPLORE
                  </h3>
                  <ul className="space-y-3">
                    {siteConfig.navigation.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href={item.href}
                          className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 font-light"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Identity Intel & Trigger */}
                <div>
                  <h3 className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-6 font-medium">
                    ARCHIVE INTEL
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                    Inception: {siteConfig.personal.birthDate}
                  </p>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                    Status: {siteConfig.personal.relationshipStatus}
                  </p>
                  <button
                    onClick={handleTriggerExperience}
                    className="text-xs tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors font-medium border-b border-white/40 pb-1 cursor-pointer"
                  >
                    ACCESS SENSORY ARCHIVE
                  </button>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-light gap-4">
                <p>
                  (C) {new Date().getFullYear()} {siteConfig.personal.name}. All rights reserved.
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase">
                  CONTEMPORARY VISUAL MONOGRAPH
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 2. Fullscreen Surprise Party Mode */}
      {viewState === "immersive" && (
        <ImmersiveExperience onExit={handleExitExperience} />
      )}

      {/* 3. Post-Experience Aftermath State */}
      {viewState === "aftermath" && (
        <Aftermath
          onReenter={handleTriggerExperience}
          onReturnToSite={handleReturnToSite}
        />
      )}
    </main>
  );
}

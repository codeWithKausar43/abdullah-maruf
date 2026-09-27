"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface ProfileProps {
  onTriggerExperience: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onTriggerExperience }) => {
  const { personal, sections, media } = siteConfig;

  return (
    <section id="profile" className="py-28 sm:py-36 bg-[#0d0d10] border-t border-b border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Portrait with Architectural Frame */}
          <div className="relative group max-w-lg mx-auto lg:mx-0 w-full">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-white/10 bg-[#141416]">
              <Image
                src={media.profileImage}
                alt={`${personal.name} - Profile`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                className="object-cover transition-all duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Architectural Border Frame */}
            <div className="absolute -inset-4 border border-white/10 rounded-sm pointer-events-none transition-all duration-700 group-hover:-inset-2 group-hover:border-white/30" />

            {/* Minimal Stat Badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#141417]/90 backdrop-blur-xl border border-white/10 p-6 text-center rounded-sm shadow-2xl">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-white">
                {personal.birthYear}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mt-1">
                {personal.birthDate.split(",")[0]}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Bio and Monograph */}
          <div>
            <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs mb-4 font-light">
              {sections.profile.category}
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              {personal.name}
            </h2>

            <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
              {sections.profile.biographyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>
                {personal.statement}
              </p>
            </div>

            {/* Signature & Location Marker */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif text-3xl text-zinc-200 italic font-light">
                  {personal.name}
                </p>
                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mt-2">
                  {personal.location}
                </p>
              </div>

              <button
                onClick={onTriggerExperience}
                className="px-6 py-3 rounded-full border border-white/20 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all font-medium cursor-pointer"
              >
                VIEW PHOTO SHOWCASE
              </button>
            </div>
          </div>
        </div>

        {/* Four Curated Facts / Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28 pt-16 border-t border-white/10">
          {sections.profile.curatedFacts.map((fact, idx) => (
            <div key={idx} className="text-center group">
              <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-2 font-light">
                {fact.label}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2 transition-transform duration-500 group-hover:scale-105">
                {fact.value}
              </p>
              <p className="text-[11px] tracking-[0.15em] text-zinc-400">
                {fact.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

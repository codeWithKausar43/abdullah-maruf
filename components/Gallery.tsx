"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface GalleryProps {
  onTriggerExperience: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onTriggerExperience }) => {
  const { sections, media } = siteConfig;
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Highland", "Grandstand", "Valley", "Formal"];
  const works = media.archiveGallery;

  return (
    <section id="works" className="py-28 sm:py-36 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs mb-4 font-light">
            {sections.works.category}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            {sections.works.title}
          </h2>
          <div className="w-24 h-[1px] bg-white/20 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-zinc-400 font-light max-w-lg mx-auto">
            {sections.works.subtitle}
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 font-medium cursor-pointer ${
                activeFilter === cat
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Works Grid (All 4 Real Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {works.map((item, idx) => (
            <div
              key={item.id}
              onClick={onTriggerExperience}
              className="group cursor-pointer flex flex-col w-full"
            >
              {/* Photo Card with Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-5 bg-[#141416] border border-white/10 shadow-lg">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter contrast-105"
                />

                {/* Subtle Hover Veil */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center p-4">
                  <span className="border border-white/40 bg-black/60 backdrop-blur-md text-white px-6 py-3 text-[11px] tracking-[0.2em] uppercase rounded-full font-medium">
                    EXPLORE WORK
                  </span>
                </div>

                {/* Top Corner Index */}
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-black/50 px-2 py-0.5 rounded">
                  0{idx + 1}
                </div>
              </div>

              {/* Work Metadata */}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-zinc-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-zinc-500 text-[11px] tracking-[0.15em] uppercase mt-1">
                  <span>{item.medium}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <button
            onClick={onTriggerExperience}
            className="px-8 py-4 rounded-full border border-white/20 text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all font-medium cursor-pointer"
          >
            {sections.works.buttonViewAll}
          </button>
        </div>
      </div>
    </section>
  );
};

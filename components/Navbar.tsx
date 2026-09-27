"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

interface NavbarProps {
  onTriggerExperience: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerExperience }) => {
  const { personal, navigation } = siteConfig;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 transition-all duration-300">
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Name */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            {personal.name.toUpperCase()}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navigation.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 font-medium relative group py-1 cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden sm:block">
          <button
            onClick={onTriggerExperience}
            className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium cursor-pointer"
          >
            DO NOT OPEN
          </button>
        </div>

        {/* Minimal Mobile Menu Toggle (Text-based, NO emojis, NO icons) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-xs tracking-[0.2em] uppercase text-zinc-300 hover:text-white font-medium px-3 py-1.5 border border-white/10 rounded-full cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-6 py-6 animate-in fade-in duration-200">
          <ul className="flex flex-col gap-4">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.href);
                  }}
                  className="block text-sm tracking-[0.25em] uppercase text-zinc-300 hover:text-white py-1 cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onTriggerExperience();
                }}
                className="w-full text-center px-6 py-3 text-xs tracking-[0.2em] uppercase rounded-full bg-white text-black font-medium"
              >
                DO NOT OPEN
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

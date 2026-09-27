"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { audioEngine } from "./audio-engine";

interface ImmersiveExperienceProps {
  onExit: () => void;
}

export const ImmersiveExperience: React.FC<ImmersiveExperienceProps> = ({ onExit }) => {
  const { media, personal } = siteConfig;
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Strobe and Laser Colors
  const [strobeColor, setStrobeColor] = useState<string>("rgba(255, 0, 85, 0.45)");
  const [flashOverlay, setFlashOverlay] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [flashingWarning, setFlashingWarning] = useState<string>("DJ MARUF LIVE // 135 BPM");
  const [secretEscapeCount, setSecretEscapeCount] = useState<number>(0);

  // Request fullscreen and trap navigation
  useEffect(() => {
    const requestFs = async () => {
      try {
        const el = document.documentElement as unknown as {
          requestFullscreen?: () => Promise<void>;
          webkitRequestFullscreen?: () => Promise<void>;
          mozRequestFullScreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };

        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
          await el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        }
      } catch {
        // Fallback to full viewport
      }
    };

    requestFs();

    // Lock body scrolling completely
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Play music at 100% full volume
    audioEngine.play(media.audioPath, media.audioVolume);

    // =========================================================================
    // 1. NAVIGATION LOCK: Prevent User from easily pressing back or leaving
    // =========================================================================
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      // Re-push history so back button fails to navigate away!
      window.history.pushState(null, "", window.location.href);
      triggerClickConfusion();
    };
    window.addEventListener("popstate", handlePopState);

    // Intercept page unload / tab closing warning
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "The Maruf sensory party is active! Are you sure you want to exit?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // =========================================================================
    // 2. DISCO & DJ COLORFUL LIGHTING CYCLE
    // =========================================================================
    const rainbowColors = [
      "rgba(255, 0, 85, 0.65)",    // Hot Pink / Neon Magenta
      "rgba(0, 240, 255, 0.65)",   // Electric Cyan
      "rgba(255, 238, 0, 0.6)",    // Bright Yellow
      "rgba(57, 255, 20, 0.6)",    // Acid Green
      "rgba(176, 38, 255, 0.65)",  // Ultraviolet Violet
      "rgba(255, 107, 53, 0.7)",   // Electric Orange
      "rgba(255, 255, 255, 0.8)",  // Blinding Strobe White
    ];

    const strobeTimer = setInterval(() => {
      const col = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      setStrobeColor(col);
    }, 140);

    // Cycle chaotic DJ alert headlines to confuse visitor
    const warnings = [
      "DJ MARUF LIVE // 135 BPM OVERLOAD",
      "CANNOT DISENGAGE // FREQUENCY CLIMAX",
      "SYSTEM LOCKED // SENSORY OVERRIDE",
      "ALL CHANNELS ACTIVE // HIGH VOLTAGE",
      "JAMALPUR FREQUENCY // 100% MAXIMUM BASS",
      "DO NOT ATTEMPT TO EXIT // PARTY IN PROGRESS",
    ];

    const warningTimer = setInterval(() => {
      const nextWarning = warnings[Math.floor(Math.random() * warnings.length)];
      setFlashingWarning(nextWarning);
    }, 1200);

    // =========================================================================
    // 3. SECRET ESCAPE (Only if owner presses ESC 7 times rapidly)
    // =========================================================================
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSecretEscapeCount((prev) => {
          if (prev + 1 >= 7) {
            handleOwnerExit();
            return 0;
          }
          return prev + 1;
        });
        // Still trigger flash on ESC to confuse them!
        triggerClickConfusion();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(strobeTimer);
      clearInterval(warningTimer);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [media.audioPath, media.audioVolume]);

  const handleOwnerExit = () => {
    audioEngine.stop();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onExit();
  };

  /**
   * Whenever user clicks or taps anywhere trying to leave:
   * Instead of closing, it creates a MASSIVE MULTI-COLOR FLASH,
   * SHAKES THE DISPLAY, DROPS A BASS IMPACT, AND INCREASES CONFUSION!
   */
  const triggerClickConfusion = () => {
    setClickCount((c) => c + 1);
    setFlashOverlay(true);
    audioEngine.triggerBassDrop();

    // Re-request fullscreen on every tap if user exited native fullscreen
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    setTimeout(() => {
      setFlashOverlay(false);
    }, 220);
  };

  return (
    <div
      ref={containerRef}
      onClick={triggerClickConfusion}
      onContextMenu={(e) => {
        e.preventDefault();
        triggerClickConfusion();
      }}
      className={`fixed inset-0 z-[99999] w-screen h-screen bg-black overflow-hidden select-none cursor-pointer ${
        flashOverlay ? "screen-click-shock" : ""
      }`}
      style={{
        width: "100vw",
        height: "100dvh",
      }}
    >
      {/* ================================================================= */}
      {/* LAYER 1: DJ CLUB BACKGROUND & MARUF PULSING PHOTO                  */}
      {/* ================================================================= */}
      <div className="absolute inset-0 w-full h-full animate-bass-shake">
        <Image
          src={media.prankImage}
          alt={personal.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-130 brightness-110 saturate-150"
        />
        {/* Dynamic color overlay wash */}
        <div 
          className="absolute inset-0 mix-blend-color opacity-70 transition-colors duration-150"
          style={{ backgroundColor: strobeColor }}
        />
      </div>

      {/* ================================================================= */}
      {/* LAYER 2: 360-DEGREE ROTATING DISCO LIGHT BEAM WASH                 */}
      {/* ================================================================= */}
      <div
        className="absolute inset-[-50%] pointer-events-none animate-disco-sweep opacity-40 mix-blend-screen"
        style={{
          background: "conic-gradient(from 0deg, #ff0055, #00f0ff, #ffee00, #39ff14, #b026ff, #ff6b35, #ff0055)",
        }}
      />

      {/* ================================================================= */}
      {/* LAYER 3: 4 CORNER ROTATING CLUB MOVING-HEAD SPOTLIGHTS            */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Magenta Moving Head */}
        <div className="absolute -top-20 -left-20 w-[80vw] h-[80vw] rounded-full bg-radial from-[#ff0055]/50 via-transparent to-transparent blur-3xl animate-spot-1 mix-blend-screen" />

        {/* Top-Right Cyan Moving Head */}
        <div className="absolute -top-20 -right-20 w-[80vw] h-[80vw] rounded-full bg-radial from-[#00f0ff]/50 via-transparent to-transparent blur-3xl animate-spot-2 mix-blend-screen" />

        {/* Bottom-Center Acid Green Moving Head */}
        <div className="absolute -bottom-20 left-1/4 w-[75vw] h-[75vw] rounded-full bg-radial from-[#39ff14]/40 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />

        {/* Center Ultraviolet Moving Head */}
        <div className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] rounded-full bg-radial from-[#b026ff]/50 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />
      </div>

      {/* ================================================================= */}
      {/* LAYER 4: MULTI-DIRECTIONAL SWEEPING LASER BEAMS CUTTING DISPLAY    */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Laser 1: Electric Cyan (from Top Left) */}
        <div
          className="absolute -top-[50%] left-[20%] w-[8px] h-[250%] bg-gradient-to-b from-[#00f0ff] via-white to-transparent shadow-[0_0_40px_#00f0ff] animate-laser-sweep1 opacity-90"
          style={{ transformOrigin: "top center" }}
        />

        {/* Laser 2: Hot Magenta (from Top Right) */}
        <div
          className="absolute -top-[50%] right-[20%] w-[10px] h-[250%] bg-gradient-to-b from-[#ff0055] via-white to-transparent shadow-[0_0_45px_#ff0055] animate-laser-sweep2 opacity-90"
          style={{ transformOrigin: "top center" }}
        />

        {/* Laser 3: Acid Green (Center Cross) */}
        <div
          className="absolute -top-[50%] left-1/2 w-[6px] h-[250%] bg-gradient-to-b from-[#39ff14] via-white to-transparent shadow-[0_0_40px_#39ff14] animate-laser-sweep3 opacity-80"
          style={{ transformOrigin: "top center" }}
        />

        {/* Laser 4: Electric Amber (Horizontal Slicing Beam) */}
        <div
          className="absolute top-1/2 -left-[50%] w-[250%] h-[7px] bg-gradient-to-r from-[#ffee00] via-white to-transparent shadow-[0_0_35px_#ffee00] -rotate-12 opacity-80 animate-pulse"
        />

        {/* Laser 5: Ultraviolet (Reverse Diagonal Beam) */}
        <div
          className="absolute top-1/3 -right-[50%] w-[250%] h-[6px] bg-gradient-to-l from-[#b026ff] via-white to-transparent shadow-[0_0_35px_#b026ff] rotate-15 opacity-80 animate-pulse"
        />
      </div>

      {/* ================================================================= */}
      {/* LAYER 5: HYPER-STROBE MULTI-COLOR BLINK LAYER                     */}
      {/* ================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay animate-hyper-strobe"
        style={{
          backgroundColor: strobeColor,
        }}
      />

      {/* Single Instant White/Neon Shock on Click */}
      {flashOverlay && (
        <div className="absolute inset-0 z-40 bg-white pointer-events-none mix-blend-difference animate-ping opacity-90" />
      )}

      {/* ================================================================= */}
      {/* LAYER 6: FULL PERIMETER DANCING EQUALIZER BARS (TOP & BOTTOM)     */}
      {/* ================================================================= */}
      {/* Top Equalizer */}
      <div className="absolute top-0 inset-x-0 h-10 pointer-events-none flex items-start justify-between gap-1 px-1">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-b from-[#ff0055] via-[#00f0ff] to-transparent rounded-b-sm"
            style={{
              height: `${Math.floor(25 + Math.random() * 75)}%`,
              animation: `strobePulse ${0.12 + (i % 6) * 0.05}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Bottom Equalizer */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none flex items-end justify-between gap-1 px-1">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-[#39ff14] via-[#00f0ff] to-[#ffee00] rounded-t-sm"
            style={{
              height: `${Math.floor(25 + Math.random() * 75)}%`,
              animation: `strobePulse ${0.15 + (i % 6) * 0.06}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ================================================================= */}
      {/* LAYER 7: CHAOTIC ON-SCREEN DJ RAVE HUD TO CONFUSE VISITOR          */}
      {/* ================================================================= */}
      <div className="absolute top-14 inset-x-4 flex flex-col items-center pointer-events-none text-center">
        <div className="px-6 py-2.5 rounded-full bg-black/80 backdrop-blur-xl border-2 border-white/40 text-sm sm:text-lg font-mono font-black tracking-[0.25em] uppercase text-white shadow-[0_0_30px_rgba(255,255,255,0.7)] animate-pulse">
          {flashingWarning}
        </div>

        <div className="mt-3 text-xs sm:text-sm font-mono text-[#00f0ff] font-bold tracking-[0.3em] uppercase bg-black/60 px-4 py-1 rounded">
          {personal.name.toUpperCase()} // JAMALPUR FREQUENCY MATRIX
        </div>

        {/* Frantic Click Counter that mocks their attempt to leave */}
        {clickCount > 0 && (
          <div className="mt-3 text-[11px] sm:text-xs font-mono text-[#ff0055] font-black tracking-widest uppercase bg-black/90 border border-[#ff0055] px-4 py-1.5 rounded-full animate-bounce">
            ESCAPE REJECTED (ATTEMPTS: {clickCount}) — SENSORY VOLTAGE INCREASED
          </div>
        )}
      </div>

      {/* Center Screen Audio Pulse Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-[#00f0ff]/50 animate-ping" />

      {/* Bottom Confusion Warning */}
      <div className="absolute bottom-6 inset-x-4 text-center pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-white/70 uppercase bg-black/70 px-4 py-1 rounded">
          SCREEN LOCKED // TAP SCREEN TO OVERCHARGE FREQUENCY
        </span>
      </div>

      {/* Secret Developer Exit Zone (Invisible 15px area in extreme top-right) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleOwnerExit();
        }}
        title=""
        className="absolute top-0 right-0 w-8 h-8 opacity-0 z-50 cursor-default"
      />
    </div>
  );
};

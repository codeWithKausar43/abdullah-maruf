"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { audioEngine } from "./audio-engine";

interface ImmersiveExperienceProps {
  onExit: () => void;
}

export const ImmersiveExperience: React.FC<ImmersiveExperienceProps> = ({ onExit }) => {
  const { media, personal } = siteConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stage 1: "video", Stage 2: "showcase"
  const [stage, setStage] = useState<"video" | "showcase">("video");

  // Audio-reactive metrics for showcase stage
  const [bassEnergy, setBassEnergy] = useState<number>(0);
  const [strobeColor, setStrobeColor] = useState<string>("rgba(255, 0, 85, 0.75)");
  const [flashOverlay, setFlashOverlay] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [flashingTitle, setFlashingTitle] = useState<string>("GRANDSTAND VIEW // HIGH VOLTAGE");

  const djColors = [
    "rgba(255, 0, 85, 0.85)",   // Hot Neon Magenta
    "rgba(0, 240, 255, 0.85)",  // Electric Cyan
    "rgba(255, 238, 0, 0.8)",   // Acid Yellow
    "rgba(57, 255, 20, 0.8)",   // Laser Green
    "rgba(176, 38, 255, 0.85)", // Ultraviolet
    "rgba(255, 107, 53, 0.85)", // Neon Orange
    "rgba(255, 255, 255, 0.95)", // Strobe White
  ];

  // Request fullscreen if supported on user interaction
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
        // Fallback gracefully
      }
    };

    requestFs();

    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Preload Grandstand View image into memory for zero latency transition
    const grandstandImg = new window.Image();
    grandstandImg.src = media.grandstandImage || "/images/maruf-2.jpg";

    // Pre-initialize main audio stream (without playing)
    audioEngine.initAudio(media.audioPath, media.audioVolume ?? 1.0);

    // ESC key handler for clean exit
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [media.audioPath, media.audioVolume, media.grandstandImage]);

  // Clean exit handler
  const handleExit = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    audioEngine.stop();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onExit();
  }, [onExit]);

  // Start video playback as soon as mounted
  useEffect(() => {
    if (stage === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay attempt:", err);
        });
      }
    }
  }, [stage]);

  // Transition handler: Triggered IMMEDIATELY when the video ends completely
  const handleVideoEnd = useCallback(() => {
    // 1. Immediately switch to showcase stage
    setStage("showcase");

    // 2. Play the main audio at its configured full playback level
    audioEngine.play(media.audioPath, media.audioVolume ?? 1.0);
  }, [media.audioPath, media.audioVolume]);

  const handleVideoError = useCallback(() => {
    console.warn("Video encountered error, progressing to showcase");
    handleVideoEnd();
  }, [handleVideoEnd]);

  // Reactivity and animation loop during the showcase stage
  useEffect(() => {
    if (stage !== "showcase") return;

    let animId: number;
    const updateAudioReactivity = () => {
      const metrics = audioEngine.getAudioMetrics();
      setBassEnergy(metrics.bass);

      // Trigger instantaneous strobe flash on high bass kick
      if (metrics.isBeat) {
        setStrobeColor(djColors[Math.floor(Math.random() * djColors.length)]);
        setFlashOverlay(true);
        setTimeout(() => setFlashOverlay(false), 90);
      }

      animId = requestAnimationFrame(updateAudioReactivity);
    };

    animId = requestAnimationFrame(updateAudioReactivity);

    const titles = [
      "GRANDSTAND VIEW // HIGH VOLTAGE",
      "ABDULLAH AL MARUF // LIVE SHOWCASE",
      "FULL FREQUENCY UNLOCKED // 135 BPM",
      "MAXIMUM PRACTICAL BRIGHTNESS // ACTIVE",
      "SENSORY LIGHTING // DYNAMIC MATRIX",
    ];

    const titleInterval = setInterval(() => {
      setFlashingTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, 1500);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(titleInterval);
    };
  }, [stage]);

  // Click shockwave and bass impact during showcase
  const triggerClickFX = () => {
    if (stage === "video") {
      // If video was blocked or paused, click starts it
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
      return;
    }

    setClickCount((c) => c + 1);
    setFlashOverlay(true);
    audioEngine.triggerBassDrop();

    setTimeout(() => {
      setFlashOverlay(false);
    }, 180);
  };

  // Grandstand View image dynamic scale reacting to bass
  const imageScale = 1.0 + Math.min(0.08, bassEnergy * 0.08);

  const grandstandImageSrc = media.grandstandImage || "/images/maruf-2.jpg";

  return (
    <div
      ref={containerRef}
      onClick={triggerClickFX}
      className={`fixed inset-0 z-[99999] w-screen h-screen bg-black overflow-hidden select-none cursor-pointer ${
        flashOverlay ? "screen-click-shock" : ""
      }`}
      style={{
        width: "100vw",
        height: "100dvh",
      }}
    >
      {/* ================================================================= */}
      {/* STAGE 1: FULLSCREEN VIDEO PLAYER                                  */}
      {/* ================================================================= */}
      {stage === "video" && (
        <div className="absolute inset-0 z-50 w-full h-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className="w-full h-full object-contain"
            src="/video/cute-baby.mp4"
          >
            <source src="/video/cute-baby.mp4" type="video/mp4" />
            <source
              src="/video/Cute%20Baby%20calling%20Papa%20%23cute%20%23funny%20%23cutebaby%20%23youtubeshorts.mp4"
              type="video/mp4"
            />
          </video>

          {/* Clean Exit Control Button in Top-Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExit();
            }}
            className="absolute top-4 right-4 z-[60] px-4 py-1.5 bg-black/80 hover:bg-white hover:text-black text-white text-[10px] sm:text-[11px] font-mono tracking-widest uppercase rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
          >
            CLOSE [ESC]
          </button>
        </div>
      )}

      {/* ================================================================= */}
      {/* STAGE 2: "GRANDSTAND VIEW" SHOWCASE + MAXIMUM LIGHTING EFFECTS    */}
      {/* ================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-100 ${
          stage === "showcase" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* LAYER 1: AMBIENT BLURRED BACKDROP FOR FULL-BLEED MAXIMUM BRIGHTNESS GLOW */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <Image
            src={grandstandImageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter blur-3xl opacity-50 scale-125 brightness-135"
          />
        </div>

        {/* LAYER 2: "GRANDSTAND VIEW" PHOTO COMPLETELY COVERING SCREEN IN ORIGINAL REAL COLORS */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-75 z-10"
          style={{
            transform: `scale(${imageScale})`,
          }}
        >
          <Image
            src={grandstandImageSrc}
            alt="Grandstand View - Abdullah Al Maruf"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>

        {/* LAYER 3: 360-DEGREE ROTATING DISCO LIGHT BEAM WASH */}
        <div
          className="absolute inset-[-50%] pointer-events-none animate-disco-sweep opacity-50 mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 0deg, #ff0055, #00f0ff, #ffee00, #39ff14, #b026ff, #ff6b35, #ffffff, #ff0055)",
          }}
        />

        {/* LAYER 4: 4 CORNER ROTATING CLUB MOVING-HEAD SPOTLIGHTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-Left Magenta Spotlight */}
          <div className="absolute -top-24 -left-24 w-[85vw] h-[85vw] rounded-full bg-radial from-[#ff0055]/60 via-[#ff0055]/20 to-transparent blur-3xl animate-spot-1 mix-blend-screen" />

          {/* Top-Right Cyan Spotlight */}
          <div className="absolute -top-24 -right-24 w-[85vw] h-[85vw] rounded-full bg-radial from-[#00f0ff]/60 via-[#00f0ff]/20 to-transparent blur-3xl animate-spot-2 mix-blend-screen" />

          {/* Bottom-Center Acid Green Spotlight */}
          <div className="absolute -bottom-24 left-1/4 w-[80vw] h-[80vw] rounded-full bg-radial from-[#39ff14]/50 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />

          {/* Center Ultraviolet Aura */}
          <div className="absolute top-1/3 left-1/3 w-[65vw] h-[65vw] rounded-full bg-radial from-[#b026ff]/55 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />
        </div>

        {/* LAYER 5: MULTI-DIRECTIONAL SWEEPING HIGH-INTENSITY LASER BEAMS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Laser 1: Electric Cyan */}
          <div
            className="absolute -top-[50%] left-[20%] w-[10px] h-[250%] bg-gradient-to-b from-[#00f0ff] via-white to-transparent shadow-[0_0_50px_#00f0ff] animate-laser-sweep1 opacity-90"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 2: Hot Magenta */}
          <div
            className="absolute -top-[50%] right-[20%] w-[12px] h-[250%] bg-gradient-to-b from-[#ff0055] via-white to-transparent shadow-[0_0_55px_#ff0055] animate-laser-sweep2 opacity-90"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 3: Acid Green Center */}
          <div
            className="absolute -top-[50%] left-1/2 w-[8px] h-[250%] bg-gradient-to-b from-[#39ff14] via-white to-transparent shadow-[0_0_50px_#39ff14] animate-laser-sweep3 opacity-85"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 4: Solar Yellow Horizontal */}
          <div className="absolute top-1/2 -left-[50%] w-[250%] h-[9px] bg-gradient-to-r from-[#ffee00] via-white to-transparent shadow-[0_0_45px_#ffee00] -rotate-12 opacity-85 animate-pulse" />

          {/* Laser 5: Ultraviolet Diagonal */}
          <div className="absolute top-1/3 -right-[50%] w-[250%] h-[8px] bg-gradient-to-l from-[#b026ff] via-white to-transparent shadow-[0_0_45px_#b026ff] rotate-15 opacity-85 animate-pulse" />
        </div>

        {/* LAYER 6: HYPER-STROBE MULTI-COLOR BLINK LAYER */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay animate-hyper-strobe"
          style={{
            backgroundColor: strobeColor,
          }}
        />

        {/* Instant White Strobe Shockwave Flash on Bass Drop / Beat */}
        {flashOverlay && (
          <div className="absolute inset-0 z-40 bg-white pointer-events-none mix-blend-difference animate-ping opacity-95" />
        )}

        {/* LAYER 7: PERIMETER DANCING EQUALIZER BARS (TOP & BOTTOM) */}
        {/* Top Equalizer */}
        <div className="absolute top-0 inset-x-0 h-8 pointer-events-none flex items-start justify-between gap-1 px-1 z-30">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-b from-[#ff0055] via-[#00f0ff] to-transparent rounded-b-sm"
              style={{
                height: `${Math.floor(25 + ((i % 8) * 8) + bassEnergy * 40)}%`,
                transition: "height 0.08s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom Equalizer */}
        <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none flex items-end justify-between gap-1 px-1 z-30">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-[#39ff14] via-[#00f0ff] to-[#ffee00] rounded-t-sm"
              style={{
                height: `${Math.floor(20 + ((i % 12) * 5) + bassEnergy * 50)}%`,
                transition: "height 0.08s ease",
              }}
            />
          ))}
        </div>

        {/* LAYER 8: DJ RAVE HUD */}
        {/* Top Left Slim Badge */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span>{flashingTitle}</span>
          </div>
        </div>

        {/* Bottom Controls & Info */}
        <div className="absolute bottom-6 inset-x-4 flex flex-col items-center pointer-events-none text-center z-30 gap-2">
          <div className="text-[11px] sm:text-xs font-mono text-[#00f0ff] font-bold tracking-[0.3em] uppercase bg-black/75 px-4 py-1 rounded-full border border-white/20">
            {personal.name.toUpperCase()} // GRANDSTAND VIEW
          </div>

          {clickCount > 0 && (
            <div className="text-[10px] sm:text-xs font-mono text-[#ff0055] font-black tracking-widest uppercase bg-black/90 border border-[#ff0055] px-4 py-1 rounded-full animate-bounce shadow-[0_0_20px_#ff0055]">
              LIGHTING BOOSTED (x{clickCount}) — FULL LEVEL
            </div>
          )}

          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white/70 uppercase">
            TAP ANYWHERE TO BOOST LIGHTING
          </span>
        </div>

        {/* Clean Exit Control Button in Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
          className="absolute top-4 right-4 z-50 px-4 py-1.5 bg-black/85 hover:bg-white hover:text-black text-white text-[10px] sm:text-[11px] font-mono tracking-widest uppercase rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
        >
          CLOSE [ESC]
        </button>
      </div>
    </div>
  );
};

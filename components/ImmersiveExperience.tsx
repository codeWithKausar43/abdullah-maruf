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

  // Audio-reactive & strobe metrics for showcase stage
  const [bassEnergy, setBassEnergy] = useState<number>(0);
  const [isBeatActive, setIsBeatActive] = useState<boolean>(false);
  const [strobeColor, setStrobeColor] = useState<string>("rgba(255, 0, 85, 0.9)");
  const [flashOverlay, setFlashOverlay] = useState<boolean>(false);
  const [initialBlast, setInitialBlast] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [flashingTitle, setFlashingTitle] = useState<string>("GRANDSTAND VIEW // HIGH VOLTAGE");

  const djColors = [
    "rgba(255, 0, 85, 0.95)",   // Hot Neon Magenta
    "rgba(0, 240, 255, 0.95)",  // Electric Cyan
    "rgba(255, 238, 0, 0.9)",   // Acid Yellow
    "rgba(57, 255, 20, 0.9)",   // Laser Green
    "rgba(176, 38, 255, 0.95)", // Ultraviolet
    "rgba(255, 107, 53, 0.95)", // Neon Orange
    "rgba(255, 255, 255, 1.0)",  // Strobe White
    "rgba(0, 255, 204, 0.95)",  // Bright Aqua
    "rgba(255, 0, 187, 0.95)",  // Vivid Pink
  ];

  // Helper to maintain fullscreen mode inside the immersive state
  const requestFs = useCallback(async () => {
    try {
      const doc = document as any;
      if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
        const el = (containerRef.current || document.documentElement) as any;
        if (el.requestFullscreen) {
          await el.requestFullscreen({ navigationUI: "hide" });
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
          await el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen({ navigationUI: "hide" });
        }
      }
    } catch {
      // Fallback gracefully
    }
  }, []);

  // Request fullscreen if supported on user interaction
  useEffect(() => {
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
  }, [media.audioPath, media.audioVolume, media.grandstandImage, requestFs]);

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

  // Start video playback as soon as mounted: COMPLETELY MUTED
  useEffect(() => {
    if (stage === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay attempt:", err);
        });
      }

      // iOS Safari native fullscreen fallback to guarantee hidden address bar
      const anyVid = videoRef.current as any;
      if (anyVid.webkitEnterFullscreen && !document.fullscreenElement) {
        try {
          anyVid.webkitEnterFullscreen();
        } catch {
          // Handled gracefully
        }
      }
    }
  }, [stage]);

  // Transition handler: Triggered IMMEDIATELY when the video ends completely
  const handleVideoEnd = useCallback(() => {
    // 1. Immediately switch to showcase stage with extreme initial shockwave
    setStage("showcase");
    setInitialBlast(true);
    setFlashOverlay(true);

    // Initial shock duration
    setTimeout(() => {
      setInitialBlast(false);
      setFlashOverlay(false);
    }, 2200);

    // Keep user in fullscreen if browser permits
    requestFs();

    // 2. Play the main audio at its configured full playback level
    audioEngine.play(media.audioPath, media.audioVolume ?? 1.0);
  }, [media.audioPath, media.audioVolume, requestFs]);

  const handleVideoError = useCallback(() => {
    console.warn("Video encountered error, progressing to showcase");
    handleVideoEnd();
  }, [handleVideoEnd]);

  // Audio-reactive loop and high-intensity strobe cycling during showcase stage
  useEffect(() => {
    if (stage !== "showcase") return;

    let animId: number;
    let colorIdx = 0;

    const updateAudioReactivity = () => {
      const metrics = audioEngine.getAudioMetrics();
      setBassEnergy(metrics.bass);
      setIsBeatActive(metrics.isBeat);

      // Rapidly cycle colors synchronized with audio metrics
      colorIdx = (colorIdx + 1) % djColors.length;
      setStrobeColor(djColors[colorIdx]);

      // Trigger instantaneous high-intensity strobe flash on beats or high bass
      if (metrics.isBeat) {
        setFlashOverlay(true);
        setTimeout(() => setFlashOverlay(false), 80);
      }

      animId = requestAnimationFrame(updateAudioReactivity);
    };

    animId = requestAnimationFrame(updateAudioReactivity);

    const titles = [
      "GRANDSTAND VIEW // HIGH VOLTAGE",
      "MAXIMUM SENSORY ILLUMINATION",
      "FULL FREQUENCY UNLOCKED // 135 BPM",
      "OVERWHELMING VISUAL MATRIX",
      "HIGH-INTENSITY COLOR MATRIX",
    ];

    const titleInterval = setInterval(() => {
      setFlashingTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, 1200);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(titleInterval);
    };
  }, [stage, djColors]);

  // Click shockwave and bass impact during showcase
  const triggerClickFX = () => {
    // Re-assert fullscreen to hide URL/navigation bar
    requestFs();

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
  const imageScale = 1.0 + Math.min(0.12, bassEnergy * 0.12);

  const grandstandImageSrc = media.grandstandImage || "/images/maruf-2.jpg";

  return (
    <div
      ref={containerRef}
      onClick={triggerClickFX}
      className={`fixed inset-0 z-[999999] w-screen h-screen bg-black overflow-hidden select-none cursor-pointer ${
        flashOverlay ? "screen-click-shock" : ""
      } ${initialBlast || isBeatActive ? "animate-screen-vibrate" : ""}`}
      style={{
        width: "100vw",
        height: "100dvh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
      }}
    >
      {/* ================================================================= */}
      {/* STAGE 1: FULLSCREEN VIDEO PLAYER (COMPLETELY MUTED)                */}
      {/* ================================================================= */}
      {stage === "video" && (
        <div className="absolute inset-0 z-50 w-full h-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
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
      {/* STAGE 2: "GRANDSTAND VIEW" SHOWCASE + EXTREME VISUAL EFFECTS      */}
      {/* ================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-75 ${
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
            className="object-cover object-center filter blur-3xl opacity-60 scale-125 brightness-150"
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

        {/* LAYER 3: 360-DEGREE ROTATING RAPID DISCO LIGHT BEAM WASH */}
        <div
          className="absolute inset-[-50%] pointer-events-none animate-disco-sweep opacity-65 mix-blend-screen z-20"
          style={{
            background:
              "conic-gradient(from 0deg, #ff0055, #00f0ff, #ffee00, #39ff14, #b026ff, #ff6b35, #ffffff, #00ffcc, #ff0055)",
          }}
        />

        {/* LAYER 4: 4 CORNER ROTATING CLUB MOVING-HEAD SPOTLIGHTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Top-Left Magenta Spotlight */}
          <div className="absolute -top-24 -left-24 w-[90vw] h-[90vw] rounded-full bg-radial from-[#ff0055]/75 via-[#ff0055]/25 to-transparent blur-3xl animate-spot-1 mix-blend-screen" />

          {/* Top-Right Cyan Spotlight */}
          <div className="absolute -top-24 -right-24 w-[90vw] h-[90vw] rounded-full bg-radial from-[#00f0ff]/75 via-[#00f0ff]/25 to-transparent blur-3xl animate-spot-2 mix-blend-screen" />

          {/* Bottom-Center Acid Green Spotlight */}
          <div className="absolute -bottom-24 left-1/4 w-[85vw] h-[85vw] rounded-full bg-radial from-[#39ff14]/65 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />

          {/* Center Ultraviolet Aura */}
          <div className="absolute top-1/3 left-1/3 w-[70vw] h-[70vw] rounded-full bg-radial from-[#b026ff]/70 via-transparent to-transparent blur-3xl animate-pulse mix-blend-screen" />
        </div>

        {/* LAYER 5: MULTI-DIRECTIONAL SWEEPING HIGH-INTENSITY LASER BEAMS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Laser 1: Electric Cyan */}
          <div
            className="absolute -top-[50%] left-[20%] w-[12px] h-[250%] bg-gradient-to-b from-[#00f0ff] via-white to-transparent shadow-[0_0_60px_#00f0ff] animate-laser-sweep1 opacity-95"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 2: Hot Magenta */}
          <div
            className="absolute -top-[50%] right-[20%] w-[14px] h-[250%] bg-gradient-to-b from-[#ff0055] via-white to-transparent shadow-[0_0_65px_#ff0055] animate-laser-sweep2 opacity-95"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 3: Acid Green Center */}
          <div
            className="absolute -top-[50%] left-1/2 w-[10px] h-[250%] bg-gradient-to-b from-[#39ff14] via-white to-transparent shadow-[0_0_60px_#39ff14] animate-laser-sweep3 opacity-90"
            style={{ transformOrigin: "top center" }}
          />

          {/* Laser 4: Solar Yellow Horizontal */}
          <div className="absolute top-1/2 -left-[50%] w-[250%] h-[11px] bg-gradient-to-r from-[#ffee00] via-white to-transparent shadow-[0_0_55px_#ffee00] -rotate-12 opacity-90 animate-pulse" />

          {/* Laser 5: Ultraviolet Diagonal */}
          <div className="absolute top-1/3 -right-[50%] w-[250%] h-[10px] bg-gradient-to-l from-[#b026ff] via-white to-transparent shadow-[0_0_55px_#b026ff] rotate-15 opacity-90 animate-pulse" />
        </div>

        {/* LAYER 6: RAPID MULTI-COLOR HIGH-INTENSITY RAVE STROBE */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge animate-extreme-strobe z-20"
        />

        {/* LAYER 7: ULTRA-FAST OPTICAL BLINK OVERLAY */}
        <div
          className="absolute inset-0 pointer-events-none animate-ultra-blink mix-blend-difference z-20"
          style={{
            backgroundColor: strobeColor,
          }}
        />

        {/* LAYER 8: FULLSCREEN DYNAMIC AUDIO GLOW PULSE */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-75 z-25"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${strobeColor} 0%, transparent 75%)`,
            opacity: 0.5 + bassEnergy * 0.45,
            transform: `scale(${1.0 + bassEnergy * 0.25})`,
          }}
        />

        {/* LAYER 9: SUDDEN EXPLOSIVE WHITE/DIFFERENCE SHOCKWAVE FLASH (ON BEAT & INITIAL TRANSITION) */}
        {(flashOverlay || initialBlast) && (
          <div className="absolute inset-0 z-40 bg-white pointer-events-none mix-blend-difference opacity-100 animate-ping" />
        )}

        {/* LAYER 10: PERIMETER DANCING EQUALIZER BARS (TOP & BOTTOM) */}
        {/* Top Equalizer */}
        <div className="absolute top-0 inset-x-0 h-10 pointer-events-none flex items-start justify-between gap-1 px-1 z-30">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-b from-[#ff0055] via-[#00f0ff] to-transparent rounded-b-sm"
              style={{
                height: `${Math.floor(25 + ((i % 8) * 9) + bassEnergy * 50)}%`,
                transition: "height 0.06s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom Equalizer */}
        <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none flex items-end justify-between gap-1 px-1 z-30">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-[#39ff14] via-[#00f0ff] to-[#ffee00] rounded-t-sm"
              style={{
                height: `${Math.floor(20 + ((i % 12) * 6) + bassEnergy * 65)}%`,
                transition: "height 0.06s ease",
              }}
            />
          ))}
        </div>

        {/* LAYER 11: DJ RAVE HUD */}
        {/* Top Left Slim Badge */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
            <span>{flashingTitle}</span>
          </div>
        </div>

        {/* Bottom Controls & Info */}
        <div className="absolute bottom-6 inset-x-4 flex flex-col items-center pointer-events-none text-center z-30 gap-2">
          <div className="text-[11px] sm:text-xs font-mono text-[#00f0ff] font-bold tracking-[0.3em] uppercase bg-black/80 px-4 py-1 rounded-full border border-white/30 shadow-[0_0_15px_#00f0ff]">
            {personal.name.toUpperCase()} // GRANDSTAND VIEW
          </div>

          {clickCount > 0 && (
            <div className="text-[10px] sm:text-xs font-mono text-[#ff0055] font-black tracking-widest uppercase bg-black/95 border border-[#ff0055] px-4 py-1 rounded-full animate-bounce shadow-[0_0_30px_#ff0055]">
              MAX LIGHTING OVERDRIVE (x{clickCount})
            </div>
          )}

          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white/80 uppercase">
            TAP ANYWHERE TO BOOST LIGHTING
          </span>
        </div>

        {/* Clean Exit Control Button in Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
          className="absolute top-4 right-4 z-50 px-4 py-1.5 bg-black/90 hover:bg-white hover:text-black text-white text-[10px] sm:text-[11px] font-mono tracking-widest uppercase rounded-full border border-white/40 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        >
          CLOSE [ESC]
        </button>
      </div>
    </div>
  );
};

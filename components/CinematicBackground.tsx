"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

export const CinematicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking for subtle, luxury parallax interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / width - 0.5;
      targetMouseY = (e.clientY - rect.top) / height - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Subtle, ethereal floating particles for cinematic atmospheric depth
    const numParticles = 40;
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        const baseAlpha = 0.12 + Math.random() * 0.28;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.0 + Math.random() * 1.8,
          speedY: -(0.15 + Math.random() * 0.25),
          speedX: (Math.random() - 0.5) * 0.15,
          alpha: baseAlpha,
          baseAlpha,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Smooth lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Pure black luxury background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // 2. Elegant, whisper-thin flowing silk wave ribbons
      // 12 finely tuned harmonic streamlines that wave organically like dark sheer silk
      const numLines = 14;
      const baseY = height * 0.62 + mouseY * 60;
      const stepX = 8;
      const numPoints = Math.ceil(width / stepX) + 2;

      for (let j = 0; j < numLines; j++) {
        const offsetPercent = j / (numLines - 1);
        const linePhase = offsetPercent * 1.4;
        const lineAlpha = 0.04 + Math.sin(offsetPercent * Math.PI) * 0.18;

        ctx.beginPath();

        for (let i = 0; i <= numPoints; i++) {
          const x = i * stepX;
          const normX = x / width;

          // Multi-harmonic gentle organic undulation
          const w1 = Math.sin(normX * 3.2 + elapsed * 0.0005 + linePhase) * 45;
          const w2 = Math.cos(normX * 5.4 - elapsed * 0.00035 + linePhase * 0.7) * 25;
          const w3 = Math.sin(normX * 1.8 + elapsed * 0.0002) * 20;

          // Subtle interactive mouse displacement
          const distToMouse = Math.abs(normX - (mouseX + 0.5));
          const mouseEffect = Math.max(0, 1 - distToMouse * 2.5) * mouseY * 35;

          const y = baseY + (offsetPercent - 0.5) * 85 + w1 + w2 + w3 + mouseEffect;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(225, 235, 250, ${lineAlpha})`;
        ctx.lineWidth = 1.0;
        ctx.shadowColor = "rgba(255, 255, 255, 0.35)";
        ctx.shadowBlur = 8;
        ctx.stroke();
      }

      // 4. Soft translucent silk ribbon fill between inner lines
      ctx.save();
      ctx.beginPath();
      // Top boundary
      for (let i = 0; i <= numPoints; i++) {
        const x = i * stepX;
        const normX = x / width;
        const w1 = Math.sin(normX * 3.2 + elapsed * 0.0005) * 45;
        const w2 = Math.cos(normX * 5.4 - elapsed * 0.00035) * 25;
        const y = baseY - 35 + w1 + w2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Bottom boundary
      for (let i = numPoints; i >= 0; i--) {
        const x = i * stepX;
        const normX = x / width;
        const w1 = Math.sin(normX * 3.2 + elapsed * 0.0005 + 1.4) * 45;
        const w2 = Math.cos(normX * 5.4 - elapsed * 0.00035 + 0.98) * 25;
        const y = baseY + 45 + w1 + w2;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      const silkGrad = ctx.createLinearGradient(0, baseY - 60, 0, baseY + 60);
      silkGrad.addColorStop(0, "rgba(255, 255, 255, 0.0)");
      silkGrad.addColorStop(0.5, "rgba(220, 230, 245, 0.035)");
      silkGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = silkGrad;
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      // 5. Delicate cinematic floating light particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + mouseX * 0.2;
        p.phase += 0.02;
        p.alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.phase));

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 240, 255, ${p.alpha})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

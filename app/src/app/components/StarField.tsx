"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let animationId: number | null = null;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const STAR_COUNT = 80;
    const SPEED = 0.15;
    const stars: Star[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createStar(): Star {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 2.0 + 0.5,
        opacity: Math.random() * 0.4 + 0.5,
      };
    }

    function init() {
      resize();
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
      }
    }

    function paintStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity})`;
        ctx.fill();
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        star.y -= SPEED * star.z;
        star.x += SPEED * 0.3 * star.z;

        star.opacity += (Math.random() - 0.5) * 0.015;
        star.opacity = Math.max(0.4, Math.min(0.95, star.opacity));

        if (star.y < -5) {
          star.y = window.innerHeight + 5;
          star.x = Math.random() * window.innerWidth;
        }
        if (star.x > window.innerWidth + 5) {
          star.x = -5;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity})`;
        ctx.fill();
      }

      if (Math.random() < 0.001) {
        const sx = Math.random() * window.innerWidth;
        const sy = Math.random() * window.innerHeight * 0.5;
        const len = Math.random() * 80 + 40;
        const gradient = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.3);
        gradient.addColorStop(0, "rgba(180, 200, 255, 0.6)");
        gradient.addColorStop(1, "rgba(180, 200, 255, 0)");
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.3);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    }

    function start() {
      if (animationId !== null) return;
      if (reducedMotion.matches || document.hidden) {
        paintStatic();
        return;
      }
      animationId = requestAnimationFrame(draw);
    }

    function stop() {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function handleMotionChange() {
      stop();
      if (reducedMotion.matches) paintStatic();
      else start();
    }

    init();
    start();

    window.addEventListener("resize", init);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", init);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

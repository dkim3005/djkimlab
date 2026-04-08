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

    let animationId: number;
    const STAR_COUNT = 120;
    const SPEED = 0.15;
    const stars: Star[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStar(): Star {
      return {
        x: Math.random() * (canvas?.width ?? 1920),
        y: Math.random() * (canvas?.height ?? 1080),
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      };
    }

    function init() {
      resize();
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Slow drift — parallax based on z depth
        star.y -= SPEED * star.z;
        star.x += SPEED * 0.3 * star.z;

        // Gentle twinkle
        star.opacity += (Math.random() - 0.5) * 0.01;
        star.opacity = Math.max(0.05, Math.min(0.6, star.opacity));

        // Wrap around
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
        if (star.x > canvas.width + 5) {
          star.x = -5;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity})`;
        ctx.fill();
      }

      // Occasional subtle shooting star (very rare)
      if (Math.random() < 0.001) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.5;
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

    init();
    draw();

    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
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

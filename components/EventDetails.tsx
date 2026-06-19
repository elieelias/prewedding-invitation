'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function EventDetails() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Maintain canvas size state to avoid reloading on minor layout changes
  const prevWidth = useRef(0);

  const drawFoil = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number) => {
    canvas.width = width;
    canvas.height = height;

    // Create a luxury gold-foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#A38652');
    grad.addColorStop(0.2, '#DBC8A9');
    grad.addColorStop(0.5, '#C2A677');
    grad.addColorStop(0.8, '#E6D0AA');
    grad.addColorStop(1, '#A38652');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Render gold glitter specs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const size = Math.random() * 2 + 1;
      ctx.fillRect(rx, ry, size, size);
    }

    ctx.fillStyle = 'rgba(30, 86, 105, 0.15)';
    for (let i = 0; i < 25; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const size = Math.random() * 1.5 + 0.5;
      ctx.fillRect(rx, ry, size, size);
    }

    // Border inner golden outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Calligraphy style "Scratch here" text
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = '600 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) (ctx as any).letterSpacing = '3px';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Resize Observer prevents resets on scroll by only triggering on substantial width shifts
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const currentWidth = Math.floor(rect.width);
      const currentHeight = Math.floor(rect.height);

      if (currentWidth === 0 || currentHeight === 0) return;

      // Only redraw/reinitialize canvas if the width changed by more than 5px
      if (Math.abs(prevWidth.current - currentWidth) > 5) {
        prevWidth.current = currentWidth;
        drawFoil(canvas, ctx, currentWidth, currentHeight);
      }
    });

    observer.observe(parent);

    return () => {
      observer.disconnect();
    };
  }, []);

  const triggerConfetti = () => {
    const colors = ['#C2A677', '#4CB2D4', '#1E5669', '#E6D0AA', '#FFFFFF'];
    const newParticles: Particle[] = [];

    // Spawn 50 particles flying out from the center of the date card
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      newParticles.push({
        id: Math.random(),
        x: 160, // approximate horizontal center of date card
        y: 34,  // approximate vertical center of date card
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2, // slight upward bias
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    setParticles(newParticles);
  };

  // Particles animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => {
            const nextY = p.y + p.vy;
            const nextX = p.x + p.vx;
            // Add gravity and air resistance
            return {
              ...p,
              x: nextX,
              y: nextY,
              vy: p.vy + 0.15, // gravity
              vx: p.vx * 0.98,  // drag
              rotation: p.rotation + p.rotationSpeed,
              opacity: p.opacity - 0.015
            };
          })
          .filter((p) => p.opacity > 0 && p.y < 350)
      );
      animationFrameId.current = requestAnimationFrame(updateParticles);
    };

    animationFrameId.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [particles.length]);

  const checkScratchPercentage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparent = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      const total = pixels.length / 4;
      const percentage = (transparent / total) * 100;

      // Reveal completely if guest scratches off 45% or more
      if (percentage >= 45 && !isRevealed) {
        setIsRevealed(true);
        triggerConfetti();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Scale coordinates accurately to resolve padding/CSS scale mismatch
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage(canvas, ctx);
  };

  const startDrawing = (clientX: number, clientY: number) => {
    isDrawingRef.current = true;
    scratch(clientX, clientY);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawingRef.current) scratch(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const t = e.touches[0];
    if (t) startDrawing(t.clientX, t.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    // Prevent document scrolling while drawing
    if (e.cancelable) e.preventDefault();
    const t = e.touches[0];
    scratch(t.clientX, t.clientY);
  };

  return (
    <div className="w-full space-y-6 select-none relative flex flex-col items-center">

      {/* Small Glass Champagne Glass Icon 
      <div className="flex justify-center text-teal-dark/50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 transform -rotate-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      */}

      {/* Date Card Container */}
      <div className="relative w-full max-w-xs mx-auto h-[68px] overflow-visible rounded-xl shadow-[0_8px_25px_rgba(30,86,105,0.04)] border border-[#C2A677]/25 bg-white flex justify-between items-center px-6">

        {/* Confetti Emitter Overlay */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none z-30"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotation}deg)`,
              borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            }}
          />
        ))}

        {/* Unscratched date labels (HTML structure showing beneath canvas) */}
        <span className="font-sans text-[10px] tracking-widest text-teal-dark uppercase font-bold">
          Saturday
        </span>

        <span className="font-serif text-3xl font-light text-teal-light">
          04
        </span>

        <span className="font-sans text-[10px] tracking-widest text-teal-dark uppercase font-bold">
          July 2026
        </span>

        {/* Scratch Canvas Card */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none z-20 rounded-xl transition-all duration-1000 ease-out ${isRevealed ? 'opacity-0 scale-95 pointer-events-none filter blur-sm' : 'opacity-100'
            }`}
          onMouseDown={handleMouseDown}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={stopDrawing}
          onTouchMove={handleTouchMove}
        />
      </div>

      {/* Celebration detail statements */}
      <div className="space-y-2 px-4 max-w-sm text-center">
        <p className="font-sans text-xs tracking-[0.2em] text-teal-dark font-bold uppercase leading-relaxed">
          Let&apos;s Eat, Dance & Celebrate the Bride-To-Be!
        </p>

        <div className="flex items-center justify-center space-x-2 text-[10px] tracking-widest text-gold uppercase font-bold pt-1">
          <span>7:00 PM</span>
          <span>&bull;</span>
          <span>$50 per guest</span>
        </div>
      </div>

    </div>
  );
}
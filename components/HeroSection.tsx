'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BrandingHeader from './BrandingHeader';
import CalloutSection from './CalloutSection';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImages = [
    {
      id: 1,
      src: '/heroimage1.jpeg',
      alt: 'Bride Portrait',
      // Mobile: top-left hanging slightly off-screen; Desktop: left margin
      position: 'top-[10vh] left-[-30px] sm:left-[6vw] animate-sway-left origin-top',
      size: 'w-32 h-44 sm:w-48 sm:h-64',
      ribbonLength: 'h-24 sm:h-32'
    },
    {
      id: 2,
      src: '/heroimage2.jpeg',
      alt: 'Champagne Toast',
      // Mobile: top-right hanging slightly off-screen; Desktop: right margin
      position: 'top-[4vh] right-[-20px] sm:right-[5vw] animate-sway-right origin-top',
      size: 'w-32 h-32 sm:w-44 sm:h-44',
      ribbonLength: 'h-16 sm:h-24'
    },
    {
      id: 3,
      src: '/heroimage3.jpeg',
      alt: 'Floral Decor',
      // Mobile: bottom-left offset; Desktop: bottom-right offset
      position: 'top-[58vh] left-[-15px] sm:left-auto sm:right-[8vw] animate-sway-left origin-top',
      size: 'w-36 h-32 sm:w-48 sm:h-44',
      ribbonLength: 'h-40 sm:h-56'
    }
  ];

  // Calculate opacity for the scroll indicator (fades out as you scroll down)
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 300);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#FCFAF6] flex flex-col items-center justify-center px-6">
      
      {/* Background Decorative Gold Foliage Pattern (Subtle Watermark) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[radial-gradient(#C2A677_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* BACKGROUND LAYER: Parallax Hanging Images */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        {/* Top ceiling anchor line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C2A677]/20 to-transparent" />

        {heroImages.map((img) => (
          <div key={img.id} className={`absolute flex flex-col items-center z-10 ${img.position}`}>
            {/* Hanging Gold String */}
            <div className={`w-[1px] bg-gradient-to-b from-[#C2A677]/65 to-[#C2A677]/35 ${img.ribbonLength}`} />

            {/* Tiny Golden Hanging Pin Accent */}
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E6D0AA] to-[#C2A677] border border-white/40 shadow-sm -mt-[3px] z-20" />

            {/* Framed Polaroid-style Image */}
            <div className="relative mt-[-2px] transition-transform duration-300">
              <div 
                className={`${img.size} bg-white p-2.5 pb-6 rounded-sm shadow-[0_12px_30px_rgba(30,86,105,0.12)] border border-[#C2A677]/15 flex flex-col`}
              >
                {/* Thin inner gold frame border */}
                <div className="relative w-full h-full overflow-hidden border border-[#C2A677]/10 bg-gray-50 rounded-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 150px, 300px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOREGROUND LAYER: Centered Invitation Headers */}
      <div className="relative z-20 w-full max-w-sm mx-auto text-center space-y-8 pointer-events-auto bg-white/45 sm:bg-transparent p-6 rounded-2xl backdrop-blur-[2px] sm:backdrop-blur-none border border-[#C2A677]/5 sm:border-none shadow-[0_10px_30px_rgba(30,86,105,0.02)] sm:shadow-none">
        
        {/* Diamond Header Accent */}
        <div className="flex items-center justify-center space-x-2 text-[#C2A677]/55 text-xs tracking-widest uppercase">
          <span>✦</span>
          <span className="h-[1px] w-6 bg-[#C2A677]/30" />
          <span>✦</span>
        </div>

        <BrandingHeader />
        
        <CalloutSection />
        
        {/* Heart Divider Accent */}
        <div className="flex items-center justify-center space-x-2 text-[#C2A677]/45 text-xs">
          <span className="h-[1px] w-8 bg-[#C2A677]/20" />
          <span>♥</span>
          <span className="h-[1px] w-8 bg-[#C2A677]/20" />
        </div>

      </div>

      {/* SCROLL-DOWN INDICATOR */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 z-20"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="font-sans text-[9px] tracking-[0.3em] text-[#C2A677] uppercase font-bold mb-2">
          Scroll to Reveal Details
        </span>
        <div className="w-5 h-8 rounded-full border border-[#C2A677]/50 flex justify-center p-1 bg-white/40 backdrop-blur-[1px]">
          <div className="w-1 h-2 bg-[#C2A677] rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
}
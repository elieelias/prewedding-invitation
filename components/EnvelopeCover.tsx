'use client';

import { useState } from 'react';

interface EnvelopeCoverProps {
  onOpen: () => void;
}

export default function EnvelopeCover({ onOpen }: EnvelopeCoverProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Play a gentle haptic or audio cue if desired, then trigger completion after animation finishes
    setTimeout(() => {
      setIsDone(true);
      onOpen();
    }, 1000); // 1s slide animation
  };

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FCFAF6] transition-all duration-1000 ease-in-out ${
        isOpening ? 'transform -translate-y-full opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative Background Leaf Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-[#C2A677]/25 pointer-events-none" />
      <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-[#C2A677]/25 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-[#C2A677]/25 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-[#C2A677]/25 pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative w-[90%] max-w-lg p-8 md:p-12 text-center bg-white shadow-[0_15px_50px_rgba(30,86,105,0.06)] rounded-2xl border border-[#C2A677]/20 gold-border-fancy">
        
        {/* Diamond Corner Accents */}
        <div className="absolute top-4 left-4 text-[#C2A677]/40 text-xs">◆</div>
        <div className="absolute top-4 right-4 text-[#C2A677]/40 text-xs">◆</div>
        <div className="absolute bottom-4 left-4 text-[#C2A677]/40 text-xs">◆</div>
        <div className="absolute bottom-4 right-4 text-[#C2A677]/40 text-xs">◆</div>

        <div className="space-y-6 my-4 select-none">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#1E5669]/60 uppercase font-semibold">
            You Are Cordially Invited
          </p>

          <div className="space-y-2 py-4">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#1E5669] font-light uppercase">
              Pre-Wedding
            </h2>
            <div className="flex items-center justify-center space-x-3">
              <div className="h-px w-8 bg-[#C2A677]/30" />
              <span className="font-script text-4xl text-[#C2A677] leading-none">Celebration</span>
              <div className="h-px w-8 bg-[#C2A677]/30" />
            </div>
          </div>

          <p className="font-sans text-xs tracking-wider text-[#1E5669]/70 max-w-xs mx-auto italic">
            Join us for an unforgettable bachelorette night as we toast to the bride-to-be before she wears white.
          </p>
        </div>

        {/* Wax Seal Button */}
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <button
            onClick={handleOpen}
            aria-label="Open Invitation"
            className="group relative w-24 h-24 rounded-full bg-gradient-to-br from-[#D4B895] via-[#C2A677] to-[#A38652] shadow-[0_8px_25px_rgba(194,166,119,0.4)] border border-white/20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 z-10"
          >
            {/* Wax Seal Outer Ring */}
            <div className="absolute inset-1 rounded-full border border-[#FCFAF6]/20 pointer-events-none" />
            
            {/* Rippling Pulse Background */}
            <div className="absolute inset-0 rounded-full bg-[#C2A677]/20 scale-100 group-hover:scale-110 opacity-70 group-hover:opacity-0 transition-all duration-1000 rounded-full animate-ping" />

            {/* Letter Emblem inside the seal */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-10 h-10 text-[#FCFAF6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            >
              {/* Beautiful Calligraphy Heart */}
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>

          <span className="font-sans text-[10px] tracking-[0.25em] text-[#C2A677] uppercase font-bold animate-pulse">
            Press Seal to Open
          </span>
        </div>

      </div>
    </div>
  );
}

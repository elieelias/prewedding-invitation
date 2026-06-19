'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import LocationDetails from '@/components/LocationDetails';
import RsvpCta from '@/components/RsvpCta';
import EnvelopeCover from '@/components/EnvelopeCover';
import MusicPlayer from '@/components/MusicPlayer';

export default function InvitationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setShouldPlayMusic(true);
  };

  // Add scroll lock when envelope is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);

  return (
    <main className="relative w-full bg-[#FCFAF6] text-[#1E5669] overflow-x-hidden min-h-screen">

      {/* 1. Introductory Envelope Cover */}
      <EnvelopeCover onOpen={handleOpenInvitation} />

      {/* 2. Floating Ambient Music Player 
      <MusicPlayer playTrigger={shouldPlayMusic} />
      */}

      {/* Main Content (Revealed after opening envelope) */}
      <div
        className={`transition-all duration-1000 ease-out ${isOpen ? 'opacity-100 filter blur-0 scale-100' : 'opacity-0 filter blur-md scale-95 pointer-events-none'
          }`}
      >
        {/* SECTION 1: Full-Screen Hero with Hanging Photo Parallax */}
        <HeroSection />

        {/* SECTION 2: Scrolling Wedding Details */}
        <section className="relative z-10 w-full py-20 px-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#FCFAF6] via-[#F2F8F9] to-[#FCFAF6]">

          {/* Top Delicate Gold Border Graphic */}
          <div className="flex items-center justify-center space-x-4 mb-16 w-full max-w-sm">
            <div className="h-px flex-1 bg-[#C2A677]/30" />
            <span className="text-[#C2A677] text-sm">✦</span>
            <div className="h-px flex-1 bg-[#C2A677]/30" />
          </div>

          <div className="w-full max-w-md mx-auto space-y-20 flex flex-col items-center text-center">

            {/* Event Details (Date & Scratch off) */}
            <EventDetails />

            {/* Event Location */}
            <LocationDetails />

            {/* Interactive RSVP Form */}
            <RsvpCta />

          </div>

          {/* Bottom Delicate Gold Border Graphic */}
          <div className="flex items-center justify-center space-x-4 mt-20 w-full max-w-sm">
            <div className="h-px flex-1 bg-[#C2A677]/30" />
            <span className="text-[#C2A677] text-sm">✦</span>
            <div className="h-px flex-1 bg-[#C2A677]/30" />
          </div>

        </section>

      </div>

    </main>
  );
}
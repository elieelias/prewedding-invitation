'use client';

import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  playTrigger: boolean;
}

export default function MusicPlayer({ playTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (playTrigger && audioRef.current) {
      audioRef.current.volume = 0.3; // Gentle background volume
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked or interupted:', err));
    }
  }, [playTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Playback error:', err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
      {/* Hidden audio element looping a soft piano wedding melody */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-wedding-grand-piano-2401.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/95 border border-[#C2A677]/40 shadow-[0_4px_15px_rgba(30,86,105,0.1)] text-[#C2A677] hover:text-[#1E5669] hover:border-[#1E5669]/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          // Sound Waves Animation or Speaker Icon
          <div className="flex items-end justify-center space-x-[2px] h-4">
            <span className="w-[3px] bg-[#C2A677] rounded-full animate-bounce [animation-duration:0.8s] h-3" />
            <span className="w-[3px] bg-[#C2A677] rounded-full animate-bounce [animation-duration:0.5s] h-4" />
            <span className="w-[3px] bg-[#C2A677] rounded-full animate-bounce [animation-duration:0.7s] h-2" />
            <span className="w-[3px] bg-[#C2A677] rounded-full animate-bounce [animation-duration:0.6s] h-3" />
          </div>
        ) : (
          // Muted Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V3.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

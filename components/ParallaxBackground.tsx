'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ParallaxBackground() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Use passive listener for optimized scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scattered across the full screen viewport height (vh) and width (vw)
    const backgroundImages = [
        {
            id: 1,
            src: '/bride-portrait.jpg', // Replace with your filename in /public
            alt: 'Bride-to-Be',
            position: 'top-[8vh] left-[4vw] rotate-[-4deg]',
            size: 'w-36 h-52 sm:w-48 sm:h-64',
            ribbonLength: 'h-32'
        },
        {
            id: 2,
            src: '/champagne-details.jpg', // Replace with your filename in /public
            alt: 'Event Details',
            position: 'top-[22vh] right-[4vw] rotate-[3deg]',
            size: 'w-32 h-32 sm:w-44 sm:h-44',
            ribbonLength: 'h-48'
        },
        {
            id: 3,
            src: '/garden-flowers.jpg', // Replace with your filename in /public
            alt: 'Floral Decor',
            position: 'top-[55vh] left-[6vw] rotate-[-2deg]',
            size: 'w-40 h-36 sm:w-52 sm:h-48',
            ribbonLength: 'h-64'
        },
    ];

    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            // A multiplier of 0.4 means the images move down by 40% of the scroll distance,
            // causing them to exit the top of the screen 60% slower than your text.
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
            {/* Top ceiling line anchor */}
            <div className="absolute top-0 inset-x-0 h-px bg-[#1E5669]/10" />

            {backgroundImages.map((img) => (
                <div key={img.id} className={`absolute flex flex-col items-center ${img.position}`}>
                    {/* Hanging Ribbon */}
                    <div className={`w-0.5 bg-[#C2A677]/40 ${img.ribbonLength}`} />

                    {/* Framed Photo */}
                    <div className="relative bottom-1 transition-transform duration-300">
                        <div className={`${img.size} rounded-lg overflow-hidden shadow-lg border-4 border-white opacity-40 sm:opacity-60`}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="300px"
                                priority={img.id === 1} // Optimizes loading for the first visible photo
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
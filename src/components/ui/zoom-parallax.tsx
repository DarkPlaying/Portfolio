'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxImage {
    src: string;
    alt?: string;
    description?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: ParallaxImage[];
    className?: string;
}

export function ZoomParallax({ images, className }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const scale12 = useTransform(scrollYProgress, [0, 1], [1, 12]);

    const pictures = [
        {
            src: images[0]?.src,
            alt: images[0]?.alt,
            description: images[0]?.description,
            scale: scale12, // Center zooms out aggressively
            className: "w-[25vw] h-[25vh] translate-y-[10vh]"
        },
        {
            src: images[1]?.src,
            alt: images[1]?.alt,
            scale: scale5,
            className: "top-[-22.5vh] left-[0] w-[30vw] h-[25vh]" // Top center, shifted down from -32.5
        },
        {
            src: images[2]?.src,
            alt: images[2]?.alt,
            scale: scale6,
            className: "top-[10vh] left-[-32.5vw] w-[25vw] h-[30vh]" // Left center, shifted down from 0
        },
        {
            src: images[3]?.src,
            alt: images[3]?.alt,
            scale: scale5,
            className: "top-[10vh] left-[32.5vw] w-[25vw] h-[30vh]" // Right center, shifted down from 0
        },
        {
            src: images[4]?.src,
            alt: images[4]?.alt,
            scale: scale6,
            className: "top-[42.5vh] left-[-20vw] w-[20vw] h-[25vh]" // Bottom left, shifted down from 32.5
        },
        {
            src: images[5]?.src,
            alt: images[5]?.alt,
            scale: scale8,
            className: "top-[42.5vh] left-[20vw] w-[20vw] h-[25vh]" // Bottom right, shifted down from 32.5
        },
        {
            src: images[6]?.src,
            alt: images[6]?.alt,
            scale: scale9,
            className: "top-[-17.5vh] left-[-27.5vw] w-[15vw] h-[15vh]" // Top Left Corner, shifted down from -27.5
        },
    ];

    return (
        <div ref={container} className={cn("relative h-[300vh] bg-black", className)}>
            <div className="sticky top-0 h-screen overflow-hidden">
                {pictures.map(({ src, alt, description, scale, className: imgClass }, index) => {
                    if (!src) return null;

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className="absolute top-0 flex h-full w-full items-center justify-center pointer-events-none"
                        >
                            <div className={cn("relative pointer-events-auto flex flex-col items-center justify-center", imgClass)}>
                                <img
                                    src={src}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="absolute inset-0 h-full w-full object-contain md:object-cover rounded-lg shadow-2xl border border-white/10"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-lg group-hover:bg-black/10 transition-colors duration-500" />
                                {description && (
                                    <div className="relative z-10 p-4 text-center max-w-[90%] md:max-w-[70%] drop-shadow-lg bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-sm md:text-xl font-black text-white mb-1 tracking-widest uppercase">{alt}</h3>
                                        <p className="text-white/80 font-medium text-[8px] md:text-xs leading-relaxed tracking-wider break-words">{description}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 87;

export function ScrollVideoPart2() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'] // Tracks scroll from top to the end of this section
    });

    // Map scroll progress (0 to 1) to frame index (1 to 87)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Fade out slightly at the end to transition smoothly
    const opacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
    const pointerEvents = useTransform(opacity, [0, 0.1], ["none", "auto"]);
    const visibility = useTransform(opacity, (val) => val <= 0 ? "hidden" : "visible");

    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Format number to 3 digits e.g., 000, 001... 086
            const formattedIndex = i.toString().padStart(3, '0');
            const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, ""); // Remove trailing slash if exists
            img.src = `${baseUrl}/part2/0315_${formattedIndex}.png`;

            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        // We start drawing even if only partially loaded to avoid a huge delay,
        // but wait for at least a few frames.
        if (images.length === 0 || imagesLoaded < 10) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set initial canvas size based on window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (index: number) => {
            // Arrays are 0-indexed, frame numbers are 1-indexed here natively but image logic starts at 000
            const imageArrayIndex = index - 1;
            if (images[imageArrayIndex] && images[imageArrayIndex].complete) {
                const img = images[imageArrayIndex];

                // Absolute Fit Logic for Mobile/Desktop
                const isMobileAspect = canvas.width / canvas.height < 0.8;
                let scale;

                if (isMobileAspect) {
                    // Force absolute fit on mobile to ensure 100% visibility of text/graphics
                    scale = canvas.width / img.width;
                } else {
                    scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                }

                // Framing Offsets
                const offsetX = 0.5;
                const offsetY = 0.5; // Perfect centering for absolute fit

                const x = (canvas.width * offsetX) - (img.width * scale * offsetX);
                const y = (canvas.height * offsetY) - (img.height * scale * offsetY);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        // Render initial frame
        render(1);

        // Subscribe to scroll changes
        const unsubscribe = frameIndex.on('change', (latest) => {
            render(Math.round(latest));
        });

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(Math.round(frameIndex.get()));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex, imagesLoaded]);

    return (
        <section id="projects" ref={sectionRef} className="relative h-[300vh] bg-black z-0 snap-start">
            <motion.div
                style={{ opacity, pointerEvents, visibility }}
                className="sticky top-0 left-0 w-full h-screen overflow-hidden block z-0"
            >
                {/* The Image Sequence Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover pointer-events-none"
                />

                {/* Loading Indicator purely optional for second sequence since it's lower down usually */}
                {imagesLoaded < FRAME_COUNT && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-opacity duration-1000" style={{ opacity: imagesLoaded > FRAME_COUNT * 0.8 ? 0 : 1, pointerEvents: 'none' }}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="tracking-widest text-xs font-semibold uppercase opacity-50">Buffering Sequence {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

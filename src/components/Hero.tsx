import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';




const FRAME_COUNT = 160;

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isMobile, setIsMobile] = useState(false);


    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'] // Tracks scroll from top to the end of this section
    });

    // Map scroll progress (0 to 1) to frame index (1 to 160)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Fade out as we reach the end of the hero section to transition smoothly to projects
    const opacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

    // Scroll Down Indicator opacity
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    // Hide the entire fixed container when it's fully faded out to prevent "leaks" at the bottom
    const pointerEvents = useTransform(opacity, [0, 0.1], ["none", "auto"]);
    const visibility = useTransform(opacity, (val) => val <= 0 ? "hidden" : "visible");


    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Format number to 3 digits e.g., 001, 002... 160
            const formattedIndex = i.toString().padStart(3, '0');
            const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, ""); // Remove trailing slash if exists
            img.src = `${baseUrl}/me/ezgif-frame-${formattedIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    useEffect(() => {
        if (images.length === 0 || imagesLoaded < FRAME_COUNT / 2) return; // Wait for at least half to load for initial render

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set initial canvas size based on window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (index: number) => {
            if (images[index - 1] && images[index - 1].complete) {
                const img = images[index - 1];

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
        <section id="home" ref={sectionRef} className="relative h-[500vh] bg-black z-0 snap-start">
            {/* Precise Nav anchors inside the scroll track */}
            {/* Frame 125 is at ~78% of the scroll track (400vh), which is 62.5% of total 500vh */}
            <div id="hero-start" className="absolute top-0 h-1 w-1" />
            <div id="about-trigger" className="absolute top-[62.5%] h-1 w-1" />

            <motion.div
                style={{ opacity, pointerEvents, visibility }}
                className="fixed top-0 left-0 w-full h-screen overflow-hidden block z-0"
            >

                {/* The Image Sequence Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover pointer-events-none"
                />

                {/* Loading Overlay */}
                {imagesLoaded < FRAME_COUNT && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-2 border-white/10 border-t-[#ff0050] rounded-full animate-spin shadow-[0_0_15px_rgba(255,0,80,0.3)]"></div>
                            <p className="tracking-[0.3em] text-[10px] font-mono uppercase text-[#ff0050] drop-shadow-[0_0_8px_rgba(255,0,80,0.5)]">Initializing Experience {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</p>
                        </div>
                    </div>
                )}

                {/* Mobile Scroll Down Indicator */}
                <AnimatePresence>
                    {isMobile && imagesLoaded >= FRAME_COUNT / 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
                            style={{
                                opacity: scrollIndicatorOpacity
                            }}
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Scroll Down</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown size={20} className="text-[#ff0050]" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </section>
    );
}

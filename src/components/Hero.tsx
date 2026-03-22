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
        offset: ['start start', 'end start']
    });

    const frameIndex = useTransform(scrollYProgress, [0, 0.8], [1, FRAME_COUNT], { clamp: true });
    const opacity = useTransform(scrollYProgress, [0.92, 0.98], [1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const pointerEvents = useTransform(opacity, [0, 0.1], ["none", "auto"]);
    const visibility = useTransform(opacity, (val) => val <= 0 ? "hidden" : "visible");

    useEffect(() => {
        const isMobileView = window.innerWidth < 768;
        if (isMobileView) {
            setIsMobile(true);
            return;
        }

        // Preload images for desktop sequence
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const formattedIndex = i.toString().padStart(3, '0');
            const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
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
        if (isMobile || images.length === 0 || imagesLoaded < FRAME_COUNT / 2) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (index: number) => {
            if (images[index - 1] && images[index - 1].complete) {
                const img = images[index - 1];
                const isMobileAspect = canvas.width / canvas.height < 0.8;
                let scale;

                if (isMobileAspect) {
                    scale = canvas.width / img.width;
                } else {
                    scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                }

                const offsetX = 0.5;
                const offsetY = 0.5;
                const x = (canvas.width * offsetX) - (img.width * scale * offsetX);
                const y = (canvas.height * offsetY) - (img.height * scale * offsetY);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        render(1);

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
    }, [images, frameIndex, imagesLoaded, isMobile]);

    return (
        <section id="home" ref={sectionRef} className="relative h-[500vh] bg-black z-0 snap-start">
            <div id="hero-start" className="absolute top-0 h-1 w-1" />
            <div id="about" className="absolute top-[79%] bottom-0 w-full pointer-events-none" />

            <motion.div
                style={{ opacity, pointerEvents, visibility }}
                className="fixed top-0 left-0 w-full h-screen overflow-hidden block z-0"
            >
                {!isMobile ? (
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover pointer-events-none"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6">
                        <div className="relative w-full max-w-md flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative w-48 h-48 md:w-64 md:h-64"
                            >
                                <div className="absolute inset-0 bg-[#ff0050]/20 blur-[40px] rounded-full animate-pulse" />
                                <div className="relative w-full h-full rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                                    <img
                                        src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/me/Sanjay%20M%20(375%20x%20667%20px).png`}
                                        className="w-full h-full object-cover"
                                        alt="Sanjay M"
                                    />
                                </div>
                            </motion.div>

                            <div className="flex flex-col items-center text-center gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="relative"
                                >
                                    <h2 className="font-signature text-5xl md:text-6xl text-[#EAB308] drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                        About Me
                                    </h2>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="text-white/80 font-mono text-[11px] md:text-xs leading-relaxed tracking-[0.15em] uppercase max-w-[280px] drop-shadow-sm"
                                >
                                    I'M SANJAY M, AN ASPIRING SOFTWARE DEVELOPER AND CYBERSECURITY ENTHUSIAST FROM CHENNAI, CURRENTLY PURSUING A B.SC. COMPUTER SCIENCE AT VEL TECH RANGA SANKU ARTS COLLEGE.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                )}

                {!isMobile && imagesLoaded < FRAME_COUNT && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-2 border-white/10 border-t-[#ff0050] rounded-full animate-spin shadow-[0_0_15px_rgba(255,0,80,0.3)]"></div>
                            <p className="tracking-[0.3em] text-[10px] font-mono uppercase text-[#ff0050] drop-shadow-[0_0_8px_rgba(255,0,80,0.5)]">Initializing Experience {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</p>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {isMobile && (
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

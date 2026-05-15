import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FRAME_COUNT = 160;

const paragraphWordsRaw = [
    { text: "I'M", highlight: false },
    { text: "SANJAY", highlight: true },
    { text: "M,", highlight: true },
    { text: "AN", highlight: false },
    { text: "ASPIRING", highlight: false },
    { text: "SOFTWARE", highlight: false },
    { text: "DEVELOPER", highlight: false },
    { text: "AND", highlight: false },
    { text: "CYBERSECURITY", highlight: false },
    { text: "ENTHUSIAST", highlight: false },
    { text: "FROM", highlight: false },
    { text: "CHENNAI,", highlight: true },
    { text: "HOLDING", highlight: false },
    { text: "A", highlight: false },
    { text: "B.SC.", highlight: true },
    { text: "IN", highlight: false },
    { text: "COMPUTER", highlight: false },
    { text: "SCIENCE", highlight: false },
    { text: "FROM", highlight: false },
    { text: "VEL", highlight: true },
    { text: "TECH", highlight: true },
    { text: "RANGA", highlight: true },
    { text: "SANKU", highlight: true },
    { text: "ARTS", highlight: true },
    { text: "COLLEGE", highlight: true },
    { text: "AND", highlight: false },
    { text: "CURRENTLY", highlight: false },
    { text: "PURSUING", highlight: false },
    { text: "AN", highlight: false },
    { text: "M.C.A.", highlight: true },
    { text: "IN", highlight: true },
    { text: "COMPUTER", highlight: true },
    { text: "APPLICATIONS.", highlight: true },
];

let cumulative = 0;
const paragraphWordsData = paragraphWordsRaw.map(w => {
    const start = cumulative;
    cumulative += w.text.length;
    return { ...w, start };
});
const TOTAL_CHARS = cumulative;

function TypingChar({ char, charIndex, totalChars, frameIndex, highlight }: { char: string, charIndex: number, totalChars: number, frameIndex: any, highlight: boolean }) {
    // Typing starts exactly at frame 75 and completes gracefully by frame 120
    const startFrame = 75 + (charIndex * 45 / totalChars);
    const endFrame = startFrame + 1.5;
    const opacity = useTransform(frameIndex, [startFrame, endFrame], [0, 1]);

    return (
        <motion.span style={{ opacity }} className={highlight ? "text-[#EAB308] font-bold drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]" : "text-white/90"}>
            {char}
        </motion.span>
    );
}

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

    // Drive frameIndex directly from Lenis-smoothed scroll progress to eliminate double-spring rubber-banding lag
    const frameIndex = useTransform(scrollYProgress, [0, 0.8], [1, FRAME_COUNT], { clamp: true });
    const opacity = useTransform(scrollYProgress, [0.92, 0.98], [1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const pointerEvents = useTransform(opacity, [0, 0.1], ["none", "auto"]);
    const visibility = useTransform(opacity, (val) => val <= 0 ? "hidden" : "visible");

    // Desktop "About Me" text overlay transforms synchronized with video frame sequence
    const aboutTextOpacity = useTransform(frameIndex, [73, 75, 145, 155], [0, 1, 1, 0]);
    const aboutTextY = useTransform(frameIndex, [73, 75], [30, 0]);
    const aboutTextPointerEvents = useTransform(aboutTextOpacity, (val) => val > 0.1 ? "auto" : "none");

    useEffect(() => {
        const isMobileView = window.innerWidth < 1024;
        if (isMobileView) {
            setIsMobile(true);
            return;
        }

        // Aggressive parallel loading strategy
        const preloadImages = () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const formattedIndex = i.toString().padStart(3, '0');
                const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
                const extension = i <= 3 ? 'jpg' : 'webp';
                img.src = `${baseUrl}/me/ezgif-frame-${formattedIndex}.${extension}`;
                
                img.onload = () => {
                    loadedCount++;
                    setImagesLoaded(loadedCount);
                    // Signal ready after the first 10 frames are loaded (fast entry)
                    if (loadedCount === 10) {
                        window.dispatchEvent(new CustomEvent('heroImagesLoaded'));
                    }
                };
                img.onerror = () => {
                    loadedCount++;
                    setImagesLoaded(loadedCount);
                };
                loadedImages[i - 1] = img;
            }
            setImages(loadedImages);
        };

        preloadImages();

        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
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

        let lastRenderedIndex = -1;
        const render = (index: number) => {
            if (index === lastRenderedIndex) return; // Prevent duplicate expensive drawImage calls on sub-pixel scroll ticks
            if (images[index - 1] && images[index - 1].complete) {
                lastRenderedIndex = index;
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
        <section id="home" ref={sectionRef} className={`relative ${isMobile ? 'h-screen' : 'h-[300vh]'} bg-black z-0 snap-start`}>
            <div id="hero-start" className="absolute top-0 h-1 w-1" />
            <div id="about" className="absolute top-[79%] bottom-0 w-full pointer-events-none" />

            <motion.div
                style={{
                    opacity: isMobile ? 1 : opacity,
                    pointerEvents: isMobile ? "auto" : pointerEvents,
                    visibility: isMobile ? "visible" : visibility
                }}
                className={`${isMobile ? 'relative' : 'fixed'} top-0 left-0 w-full h-screen overflow-hidden block z-0`}
            >
                {!isMobile ? (
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover pointer-events-none"
                    />
                ) : (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full h-full relative"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/me/Sanjay%20M%20(375%20x%20667%20px).png`}
                                className="w-full h-full object-contain"
                                alt="Sanjay M"
                            />
                        </motion.div>
                    </div>
                )}

                {/* Desktop Overlay Text synchronized to display starting at frame 75 */}
                <motion.div
                    id="about-details"
                    style={{
                        opacity: aboutTextOpacity,
                        y: aboutTextY,
                        pointerEvents: aboutTextPointerEvents as any
                    }}
                    className="absolute top-0 right-0 w-[50%] h-full hidden lg:flex flex-col justify-center pl-2 xl:pl-4 pr-12 xl:pr-20 z-30"
                >
                    <div className="flex flex-col items-start text-left gap-8 max-w-xl">
                        {/* Stylized Heading */}
                        <div className="relative">
                            <h2 className="font-signature text-7xl xl:text-8xl text-[#EAB308] drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                About Me
                            </h2>
                        </div>

                        {/* Paragraph Text with real-time scrolling typing animation */}
                        <div className="font-mono text-sm md:text-base xl:text-lg leading-relaxed md:leading-loose tracking-[0.15em] xl:tracking-[0.2em] uppercase drop-shadow-md flex flex-wrap gap-x-[0.4em] gap-y-[0.2em]">
                            {paragraphWordsData.map((wordObj, wIdx) => (
                                <span key={wIdx} className="inline-block whitespace-nowrap">
                                    {wordObj.text.split('').map((char, cIdx) => (
                                        <TypingChar
                                            key={cIdx}
                                            char={char}
                                            charIndex={wordObj.start + cIdx}
                                            totalChars={TOTAL_CHARS}
                                            frameIndex={frameIndex}
                                            highlight={wordObj.highlight}
                                        />
                                    ))}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>


                <AnimatePresence>
                    {isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-2 z-20 pointer-events-none text-center"
                            style={{ opacity: scrollIndicatorOpacity }}
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/60 block w-full">Scroll Down</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown size={24} className="text-[#ff0050] drop-shadow-[0_0_8px_rgba(255,0,80,0.5)]" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

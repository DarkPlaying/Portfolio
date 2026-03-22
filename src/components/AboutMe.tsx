import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AboutMe() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    return (
        <section id="about-section" ref={containerRef} className="relative py-24 bg-black overflow-hidden lg:hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center gap-12">
                    {/* Stylized Heading */}
                    <motion.div
                        style={{ y: y1, opacity, scale }}
                        className="relative"
                    >
                        <h2 className="font-signature text-6xl text-[#EAB308] drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            About Me
                        </h2>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#ff0050] to-transparent" />
                    </motion.div>

                    {/* Bio Text with Word Stagger */}
                    <motion.div
                        style={{ y: y2, opacity }}
                        className="text-white/80 font-mono text-[11px] md:text-sm leading-relaxed tracking-[0.15em] uppercase max-w-sm drop-shadow-sm flex flex-wrap justify-center gap-x-2"
                    >
                        {"I'M SANJAY M, AN ASPIRING SOFTWARE DEVELOPER AND CYBERSECURITY ENTHUSIAST FROM CHENNAI, CURRENTLY PURSUING A B.SC. COMPUTER SCIENCE AT VEL TECH RANGA SANKU ARTS COLLEGE.".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.05,
                                    ease: "easeOut"
                                }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Decorative element */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        className="w-full max-w-xs h-px bg-white/10"
                    />
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-80 h-80 bg-[#ff0050]/10 blur-[120px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -50, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#EAB308]/10 blur-[120px] rounded-full" 
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

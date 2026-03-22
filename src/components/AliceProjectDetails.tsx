import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Zap, Database, ShieldCheck, Smartphone,
    Terminal, Spade, Diamond, Club, Heart
} from "lucide-react";
import { resumeData } from '../data/resume';

const rules = [
    {
        id: "1",
        title: "4 games",
        desc: "Each harder. Each deadlier.",
        color: "text-cyan-400",
        shadowColor: "rgba(34,211,238,0.2)",
        borderColor: "border-cyan-400/50",
        suit: "♠",
        icon: Spade
    },
    {
        id: "2",
        title: "No second chances",
        desc: "One move. One shot.",
        color: "text-blue-400",
        shadowColor: "rgba(96,165,250,0.2)",
        borderColor: "border-blue-400/50",
        suit: "♦",
        icon: Diamond
    },
    {
        id: "3",
        title: "Trust no one",
        desc: "Allies can betray you.",
        color: "text-purple-400",
        shadowColor: "rgba(192,132,252,0.2)",
        borderColor: "border-purple-400/50",
        suit: "♣",
        icon: Club
    },
    {
        id: "4",
        title: "Time is running",
        desc: "Decide fast - or die.",
        color: "text-[#ff0050]",
        shadowColor: "rgba(255,0,80,0.2)",
        borderColor: "border-[#ff0050]/50",
        suit: "♥",
        icon: Heart
    }
];

export function AliceProjectDetails() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % rules.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [isHovering]);

    const yCardsUp = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const yCardsDown = useTransform(scrollYProgress, [0, 1], [0, 400]);

    // Enhanced Parallax for System Objective
    const projectImageY = useTransform(scrollYProgress, [0.3, 0.8], [60, -60]);
    const projectTextY = useTransform(scrollYProgress, [0.3, 0.8], [-40, 40]);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Outfit:wght@400;700;900&family=Great+Vibes&family=DM+Serif+Display:ital@0;1&display=swap');
                
                .font-outfit { font-family: 'Outfit', sans-serif; }
                .font-serif-display { font-family: 'DM Serif Display', serif; }
                .font-great-vibes { font-family: 'Great Vibes', cursive; }
                
                @keyframes drift {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(10px, -10px) rotate(2deg); }
                }
                `}
            </style>

            <section ref={containerRef} className="relative min-h-[150vh] py-20 overflow-hidden z-10 snap-start">
                {/* Background Floating Playing Cards */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] z-0">
                    <motion.img
                        animate={{ y: [0, -400, 0], rotate: [0, 15, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Playing_card_heart_A.svg" className="absolute top-[10%] left-[5%] w-20 md:w-32 blur-[1px] brightness-50"
                    />
                    <motion.img
                        animate={{ y: [0, 400, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_K.svg" className="absolute top-[40%] left-[8%] w-24 md:w-40 blur-[2px] brightness-50"
                    />
                    <motion.img
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_9.svg" className="absolute top-[70%] left-[3%] w-20 md:w-36 blur-[1px] brightness-50"
                    />
                    <motion.img
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Playing_card_diamond_10.svg" className="absolute top-[15%] right-[5%] w-20 md:w-32 blur-[1px] brightness-50"
                    />
                    <motion.img
                        animate={{ y: [0, -200, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Playing_card_heart_8.svg" className="absolute top-[45%] right-[8%] w-24 md:w-40 blur-[2px] brightness-50"
                    />
                    <motion.img
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Playing_card_club_10.svg" className="absolute top-[75%] right-[4%] w-20 md:w-36 blur-[1px] brightness-50"
                    />
                </div>

                <div className="max-w-[100rem] mx-auto relative z-10 w-full px-6 md:px-0">
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center text-center mt-32 mb-16 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 mb-6"
                        >
                            今 際の国のアリス
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center text-white mb-20 flex flex-col items-center justify-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <div className="flex items-baseline justify-center -mb-8 md:-mb-16 text-8xl md:text-[14rem]">
                                <span className="font-bold text-[12rem] md:text-[18rem] leading-[0.7]" style={{ fontFamily: "'UnifrakturCook', cursive" }}>A</span>
                                <span style={{ fontFamily: "'UnifrakturCook', cursive" }}>bout</span>
                            </div>
                            <div className="text-6xl md:text-[8rem] ml-4 md:ml-8 mt-8" style={{ fontFamily: "'UnifrakturCook', cursive" }}>Project</div>
                        </motion.h1>

                    </div>
                    {/* Integrated Rotating Rules UI */}
                    <div className="py-12 md:py-20 relative text-white font-sans overflow-hidden w-full mb-16">
                        <div className="absolute top-20 left-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none">♠</div>
                        <div className="absolute bottom-40 right-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none">♥</div>

                        <div className="max-w-7xl mx-auto relative z-10 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-center mb-4 relative"
                            >
                                <h2 className="text-3xl md:text-5xl font-outfit uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ff0050] to-[#a00032] drop-shadow-[0_0_15px_rgba(255,0,80,0.5)]">
                                    Rules <span className="text-lg md:text-xl tracking-[0.5em] block mt-1 text-white font-light">Of Survival</span>
                                </h2>

                                <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-12 flex gap-4 md:gap-6">
                                    <Spade size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 0 ? 'text-cyan-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Diamond size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 1 ? 'text-blue-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Club size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 2 ? 'text-purple-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Heart size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 3 ? 'text-[#ff0050] opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(255,0,80,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                </div>
                            </motion.div>

                            <div className="text-center mb-10 md:mb-16">
                                <p className="text-white font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse cursor-pointer hover:text-white transition-colors">
                                    CLICK TO FEEL THE POWER OF CARD
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10 w-full" onMouseLeave={() => setIsHovering(false)}>
                                {rules.map((rule, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <motion.div
                                            key={rule.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            onViewportEnter={() => { setActiveIndex(index); setIsHovering(true); }}
                                            onMouseEnter={() => { setIsHovering(true); setActiveIndex(index); }}
                                            className="group relative p-8 md:p-10 flex flex-col justify-center items-center text-center transition-all duration-700 overflow-hidden z-20 rounded-[2.5rem] md:rounded-[3rem] h-[350px] md:h-[450px] bg-black/60 backdrop-blur-3xl"
                                            style={{
                                                boxShadow: isActive ? `0 0 120px -10px ${rule.shadowColor}` : `0 0 40px -20px ${rule.shadowColor}`,
                                                borderColor: isActive ? rule.shadowColor.replace('0.2', '0.8') : 'rgba(255,255,255,0.05)',
                                                borderWidth: "1px",
                                                borderStyle: "solid"
                                            }}
                                        >
                                            {isActive && (
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] blur-[1px] animate-pulse" style={{ backgroundColor: rule.shadowColor.replace('0.2', '1'), boxShadow: `0 0 20px ${rule.shadowColor.replace('0.2', '0.8')}` }} />
                                            )}
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] transition-all duration-1000 font-serif select-none pointer-events-none ${rule.color} ${isActive ? 'opacity-20 scale-125 rotate-6 blur-[2px]' : 'opacity-0 scale-50'}`}>
                                                {rule.suit}
                                            </div>
                                            <div className={`absolute top-8 left-8 md:top-10 md:left-10 text-3xl md:text-4xl font-black font-outfit uppercase transition-all duration-500 ${rule.color} ${isActive ? 'opacity-100 drop-shadow-[0_0_15px_currentColor]' : 'opacity-20'}`}>
                                                {rule.id}
                                            </div>
                                            <div className="relative z-10 flex flex-col items-center">
                                                <motion.div
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 ${isActive ? 'bg-white/10 border-white/20' : ''}`}
                                                >
                                                    <rule.icon size={isMobile ? 24 : 32} fill={isActive ? "currentColor" : "none"} className={`transition-all duration-500 ${rule.color} ${isActive ? 'drop-shadow-[0_0_20px_currentColor]' : 'opacity-40'}`} />
                                                </motion.div>
                                                <h3 className={`text-xl md:text-2xl font-black font-outfit uppercase tracking-widest mb-3 md:mb-4 text-white transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'opacity-80'}`}>
                                                    {rule.title}
                                                </h3>
                                                <p className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-[140px] md:max-w-[150px] transition-all duration-500 ${isActive ? 'text-white opacity-100' : 'text-white/40 opacity-60'}`}>
                                                    {rule.desc}
                                                </p>
                                            </div>
                                            <div className={`absolute bottom-8 right-8 md:bottom-10 md:right-10 text-3xl md:text-4xl font-serif rotate-180 transition-all duration-500 ${rule.color} ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                                                {rule.suit}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Elegant Canva-Inspired System Objective Section */}
                    <div className="w-full mb-0 py-10 relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            {/* Left Column: Stylized Image (Col-6) */}
                            <div className="lg:col-span-6 relative mt-16 lg:mt-0 order-2 lg:order-1">
                                <div className="absolute -top-10 -left-6 text-white/40 animate-pulse">
                                    <span className="text-3xl">✦</span>
                                </div>
                                <div className="absolute top-1/4 -right-8 text-[#ff0050]/30 animate-pulse delay-300">
                                    <span className="text-2xl">✦</span>
                                </div>
                                <div className="absolute -bottom-12 left-1/4 text-[#ff0050]/20 animate-bounce delay-700">
                                    <span className="text-5xl">✦</span>
                                </div>

                                <motion.div
                                    style={{ y: projectImageY }}
                                    initial={{ opacity: 0, scale: 0.98, rotate: -1 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    animate={{
                                        filter: [
                                            "drop-shadow(0 0 60px rgba(255,0,80,0.3))",
                                            "drop-shadow(0 0 100px rgba(255,0,80,0.5))",
                                            "drop-shadow(0 0 60px rgba(255,0,80,0.3))"
                                        ]
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeOut",
                                        filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="relative group p-4"
                                >
                                    <div className="relative overflow-hidden rounded-2xl border border-white/30 aspect-video bg-zinc-950/50 transition-all duration-700">
                                        <img
                                            src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/projects/alice.png`}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                            alt="Alice Vision Objective"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0050]/10 via-transparent to-transparent opacity-40 mix-blend-soft-light" />
                                    </div>
                                    <div className="absolute -inset-2 border border-[#ff0050]/10 rounded-[1.5rem] -z-10 animate-[drift_6s_infinite_ease-in-out]" />
                                </motion.div>
                            </div>

                            {/* Right Column: Content (Col-6) */}
                            <div className="lg:col-span-6 flex flex-col items-start text-left relative z-10 order-1 lg:order-2 lg:pl-12">
                                <div className="absolute -top-12 -right-6 text-white/20 animate-pulse pointer-events-none">
                                    <span className="text-4xl">✦</span>
                                </div>
                                <div className="absolute top-1/2 -left-12 text-[#ff0050]/10 animate-pulse delay-500">
                                    <span className="text-6xl">✦</span>
                                </div>

                                <div className="relative mb-14 flex flex-col items-start">
                                    <motion.span
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="block font-great-vibes text-6xl md:text-8xl text-[#ff0050] mb-[-0.4em] ml-2 relative z-20 drop-shadow-[0_4px_10px_rgba(255,0,80,0.3)]"
                                    >
                                        System
                                    </motion.span>
                                    <motion.h2
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-7xl md:text-[6.5rem] lg:text-[7.5rem] font-serif-display text-white uppercase tracking-tight leading-none italic"
                                    >
                                        Objective
                                    </motion.h2>
                                    <span className="absolute -bottom-6 -right-16 font-great-vibes text-4xl md:text-5xl text-[#ff0050]/30 rotate-[-12deg] pointer-events-none select-none">
                                        Technical
                                    </span>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-zinc-400 text-lg md:text-xl font-outfit font-light max-w-xl mb-12 leading-relaxed tracking-wide"
                                >
                                    Exploring the boundaries of <span className="text-white font-medium">multiplayer architecture</span> and <span className="text-white font-medium">real-time synchronization</span>.
                                    A technical pursuit for immersive digital experiences.
                                </motion.p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-2xl">
                                    {[
                                        { title: "Real-time Loop", icon: Zap },
                                        { title: "Distributed Core", icon: Database },
                                        { title: "State Authority", icon: ShieldCheck },
                                        { title: "Dynamic UX", icon: Smartphone }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                            className="relative group pb-4 border-b border-white/5 w-full flex flex-col items-start"
                                        >
                                            <div className="flex items-center gap-4 mb-2">
                                                <motion.div
                                                    animate={{ rotate: [0, 10, -10, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                                                    className="w-8 h-8 rounded-full border border-[#ff0050]/20 flex items-center justify-center p-1.5 group-hover:bg-[#ff0050]/10 transition-colors"
                                                >
                                                    <item.icon className="text-[#ff0050] w-full h-full opacity-60 group-hover:opacity-100" />
                                                </motion.div>
                                                <h4 className="text-white font-bold font-outfit uppercase tracking-[0.2em] text-[11px] lg:text-xs">{item.title}</h4>
                                            </div>
                                            <motion.div
                                                animate={{
                                                    width: ["0%", "100%", "0%"],
                                                    opacity: [0.3, 0.8, 0.3]
                                                }}
                                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.8 }}
                                                className="absolute bottom-0 left-0 h-[1px] bg-[#ff0050]"
                                            />
                                            <div className="absolute -top-2 -right-2 text-[#ff0050]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px]">✦</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background Detail */}
                    <div className="absolute -bottom-20 -right-20 text-[20rem] font-serif text-[#ff0050] opacity-[0.03] select-none pointer-events-none rotate-12">♥</div>
                </div>
            </section>
        </div>
    );
}

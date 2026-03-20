import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Database, Gamepad2, Network, ShieldCheck, Zap, Terminal, Spade, Diamond, Club, Heart } from 'lucide-react';
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

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-[#050505] text-white py-32 overflow-hidden z-10 snap-start font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Outfit:wght@400;700;900&display=swap');
                
                .font-outfit {
                    font-family: 'Outfit', sans-serif;
                }
                `}
            </style>

            {/* Background Floating Playing Cards */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] z-0">
                <motion.img style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Playing_card_heart_A.svg" className="absolute top-[10%] left-[5%] w-20 md:w-32 -rotate-12 blur-[1px] brightness-50" />
                <motion.img style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_K.svg" className="absolute top-[40%] left-[8%] w-24 md:w-40 rotate-12 blur-[2px] brightness-50" />
                <motion.img style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_9.svg" className="absolute top-[70%] left-[3%] w-20 md:w-36 -rotate-6 blur-[1px] brightness-50" />
                <motion.img style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Playing_card_diamond_10.svg" className="absolute top-[15%] right-[5%] w-20 md:w-32 rotate-12 blur-[1px] brightness-50" />
                <motion.img style={{ y: yCardsUp }} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Playing_card_heart_8.svg" className="absolute top-[45%] right-[8%] w-24 md:w-40 -rotate-12 blur-[2px] brightness-50" />
                <motion.img style={{ y: yCardsDown }} src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Playing_card_club_10.svg" className="absolute top-[75%] right-[4%] w-20 md:w-36 rotate-6 blur-[1px] brightness-50" />
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

                    {/* Integrated Rotating Rules UI from User */}
                    <div className="py-12 md:py-20 relative text-white font-sans overflow-hidden w-full mb-16">
                        {/* Background Symbols - keep or modify if needed */}
                        <div className="absolute top-20 left-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none">♠</div>
                        <div className="absolute bottom-40 right-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none">♥</div>

                        <div className="max-w-7xl mx-auto relative z-10 w-full">

                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                className="text-center mb-4 relative"
                            >
                                <h2 className="text-3xl md:text-5xl font-outfit uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ff0050] to-[#a00032] drop-shadow-[0_0_15px_rgba(255,0,80,0.5)]">
                                    Rules <span className="text-lg md:text-xl tracking-[0.5em] block mt-1 text-white font-light">Of Survival</span>
                                </h2>

                                {/* Decorative Symbols - Syncs with Active Index */}
                                <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-12 flex gap-4 md:gap-6">
                                    <Spade size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 0 ? 'text-cyan-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Diamond size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 1 ? 'text-blue-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Club size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 2 ? 'text-purple-400 opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                    <Heart size={isMobile ? 16 : 20} fill="currentColor" className={`transition-all duration-500 ${activeIndex === 3 ? 'text-[#ff0050] opacity-100 scale-125 drop-shadow-[0_0_15px_rgba(255,0,80,0.8)]' : 'text-zinc-800 opacity-20'}`} />
                                </div>
                            </motion.div>

                            {/* View Details Indicator - Between Header and Grid */}
                            <div className="text-center mb-10 md:mb-16">
                                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse cursor-pointer hover:text-white transition-colors">
                                    CLICK TO FEEL THE POWER OF CARD
                                </p>
                            </div>

                            {/* Floating Card Grid */}
                            <div
                                className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10 w-full"
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {rules.map((rule, index) => {
                                    const isActive = index === activeIndex;

                                    return (
                                        <motion.div
                                            key={rule.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: false, margin: "-50px" }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            onViewportEnter={() => { setActiveIndex(index); setIsHovering(true); }}
                                            onMouseEnter={() => { setIsHovering(true); setActiveIndex(index); }}
                                            className={`group relative p-8 md:p-10 flex flex-col justify-center items-center text-center transition-all duration-700 overflow-hidden z-20 rounded-[2.5rem] md:rounded-[3rem] h-[350px] md:h-[450px] bg-black/60 backdrop-blur-3xl border border-white/10`}
                                            style={{
                                                boxShadow: isActive ? `0 0 ${isMobile ? '30px' : '60px'} -10px ${rule.shadowColor}, 0 0 ${isMobile ? '10px' : '20px'} -5px ${rule.shadowColor}` : 'none',
                                                borderColor: isActive ? rule.shadowColor : 'rgba(255,255,255,0.08)'
                                            }}
                                        >
                                            {/* Glow Top Border */}
                                            {isActive && (
                                                <div
                                                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] blur-[1px] animate-pulse`}
                                                    style={{ backgroundColor: rule.shadowColor.replace('0.2', '1'), boxShadow: `0 0 20px ${rule.shadowColor.replace('0.2', '0.8')}` }}
                                                />
                                            )}

                                            {/* Watermark Suit - Centered and Large */}
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] transition-all duration-1000 font-serif select-none pointer-events-none ${rule.color} ${isActive ? 'opacity-20 scale-125 rotate-6 blur-[2px]' : 'opacity-0 scale-50'}`}>
                                                {rule.suit}
                                            </div>

                                            {/* Number - Top Left Aesthetic */}
                                            <div className={`absolute top-8 left-8 md:top-10 md:left-10 text-3xl md:text-4xl font-black font-outfit uppercase transition-all duration-500 ${rule.color} ${isActive ? 'opacity-100 drop-shadow-[0_0_15px_currentColor]' : 'opacity-20'}`}>
                                                {rule.id}
                                            </div>

                                            {/* Main Content Container */}
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:scale-110 ${isActive ? 'bg-white/10 border-white/20' : ''}`}>
                                                    <rule.icon
                                                        size={isMobile ? 24 : 32}
                                                        fill={isActive ? "currentColor" : "none"}
                                                        className={`transition-all duration-500 ${rule.color} ${isActive ? 'drop-shadow-[0_0_20px_currentColor]' : 'opacity-40'}`}
                                                    />
                                                </div>

                                                <h3 className={`text-xl md:text-2xl font-black font-outfit uppercase tracking-widest mb-3 md:mb-4 text-white transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'opacity-80'}`}>
                                                    {rule.title}
                                                </h3>
                                                <p className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-[140px] md:max-w-[150px] transition-all duration-500 ${isActive ? 'text-zinc-300 opacity-100' : 'text-zinc-600 opacity-60'}`}>
                                                    {rule.desc}
                                                </p>
                                            </div>

                                            {/* Bottom Suit - Mirror Top Left */}
                                            <div className={`absolute bottom-8 right-8 md:bottom-10 md:right-10 text-3xl md:text-4xl font-serif rotate-180 transition-all duration-500 ${rule.color} ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                                                {rule.suit}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Architecture and Team Content */}
                <div className="max-w-[100rem] mx-auto px-6 relative z-10">
                    {/* System Architecture Bento Box */}
                    <div className="mb-40 overflow-hidden relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ amount: 0.2 }}
                            className="flex items-center gap-4 mb-16"
                        >
                            <h3 className="text-sm md:text-xl font-black font-outfit uppercase tracking-[0.3em] text-[#ff0050] whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,0,80,0.5)]">System Architecture</h3>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#ff0050]/50 to-transparent" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-6">
                            {/* Box 1: Real-time (Span 8) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="md:col-span-8 row-span-1 rounded-[2.5rem] md:rounded-[3rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 flex flex-col relative overflow-hidden group hover:border-[#ff0050]/50 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,80,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0050]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-110 z-0">
                                    <Network size={220} className="text-[#ff0050]" strokeWidth={0.5} />
                                </div>
                                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#ff0050]/10 flex items-center justify-center mb-8 border border-[#ff0050]/20 shadow-[0_0_30px_rgba(255,0,80,0.2)] backdrop-blur-md">
                                    <Zap className="text-[#ff0050]" />
                                </div>
                                <h4 className="relative z-10 text-2xl md:text-4xl font-black font-outfit mb-4 uppercase tracking-widest md:tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Real-time Multiplayer</h4>
                                <p className="relative z-10 text-zinc-400 max-w-lg leading-relaxed text-xl font-light">Powered by <span className="text-[#ff0050] font-bold">Supabase Realtime</span> to strictly synchronize phase timers, game events, and active player lists.</p>

                                <div className="absolute bottom-6 right-10 text-8xl font-serif text-[#ff0050] opacity-10 select-none pointer-events-none">♠</div>
                            </motion.div>

                            {/* Box 2: Database (Span 4) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="md:col-span-4 row-span-1 rounded-[2.5rem] md:rounded-[3rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 flex flex-col group relative overflow-hidden hover:border-[#ff0050]/50 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,80,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-bl from-[#ff0050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-20 transition-all duration-1000 z-0">
                                    <Database size={220} className="text-zinc-200" strokeWidth={0.5} />
                                </div>
                                <h4 className="relative z-10 text-2xl md:text-4xl font-black font-outfit mb-4 uppercase tracking-widest md:tracking-[0.2em] text-white drop-shadow-md">PostgreSQL Core</h4>
                                <p className="relative z-10 text-zinc-400 leading-relaxed font-light mt-auto text-lg">Absolute source of truth, persistently storing relational schemas.</p>
                                <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#ff0050] uppercase tracking-widest bg-[#ff0050]/5 backdrop-blur-md w-fit px-5 py-2.5 rounded-xl border border-[#ff0050]/20 relative z-10 shadow-[0_0_20px_rgba(255,0,80,0.1)]">
                                    <span className="w-2 h-2 bg-[#ff0050] rounded-full animate-ping shadow-[0_0_10px_#ff0050]" /> Connected
                                </div>
                                <div className="absolute top-6 right-10 text-6xl font-serif text-[#ff0050] opacity-10 select-none pointer-events-none">♦</div>
                            </motion.div>

                            {/* Box 3: Game Master (Span 5) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="md:col-span-5 row-span-1 rounded-[2.5rem] md:rounded-[3rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 flex flex-col group hover:border-[#ff0050]/50 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,80,0.2)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="flex items-center justify-between mb-10 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                        <ShieldCheck size={32} className="text-zinc-200" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black font-outfit text-[#ff0050] border border-[#ff0050]/40 bg-[#ff0050]/10 backdrop-blur-md px-5 py-2 rounded-xl">Clearance V</span>
                                </div>
                                <h4 className="relative z-10 text-2xl md:text-4xl font-black font-outfit mb-4 uppercase tracking-widest md:tracking-[0.2em] text-white drop-shadow-md">Game Master</h4>
                                <p className="relative z-10 text-zinc-400 leading-relaxed font-light text-lg">Centralized architecture controlling phase loops, durations, and logic dispute resolution.</p>
                                <div className="absolute bottom-6 right-10 text-8xl font-serif text-[#ff0050] opacity-10 select-none pointer-events-none">♣</div>
                            </motion.div>

                            {/* Box 4: UI & Stack (Span 7) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="md:col-span-7 row-span-1 min-h-[400px] md:min-h-0 rounded-[2.5rem] md:rounded-[3rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 flex flex-col justify-between hover:border-[#ff0050]/50 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,80,0.2)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tl from-[#ff0050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                                <div className="relative z-10">
                                    <h4 className="text-xl md:text-4xl font-black font-outfit mb-5 uppercase tracking-widest md:tracking-[0.2em] text-white flex items-center gap-4 md:gap-5">
                                        <Gamepad2 size={isMobile ? 28 : 40} className="text-[#ff0050] drop-shadow-[0_0_15px_#ff0050]" /> <span className="text-xl md:text-4xl">Cinematic Experience</span>
                                    </h4>
                                    <p className="text-zinc-400 font-light leading-relaxed max-w-xl text-lg">A dark, premium aesthetic focusing on glitch effects, and precise utility styling to evoke an atmosphere of imminent danger.</p>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-10 relative z-10">
                                    {["React 19", "TS", "Vite", "Tailwind", "Framer", "Supabase"].map(tech => (
                                        <span key={tech} className="px-5 py-2.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-[10px] font-black font-outfit text-zinc-200 uppercase tracking-widest hover:bg-[#ff0050]/20 hover:text-white transition-all hover:border-[#ff0050]/50 hover:shadow-[0_0_20px_rgba(255,0,80,0.3)] cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="absolute -bottom-8 -right-8 text-[12rem] font-serif text-[#ff0050] opacity-[0.05] select-none pointer-events-none -rotate-12">♥</div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Team Section (Only Sanjay) */}
                    <div className="pb-32 pt-20 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ amount: 0.2 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-sm font-bold font-outfit text-[#ff0050] uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_10px_rgba(255,0,80,0.5)]">Architects of the Borderland</h2>
                            <h3 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter text-white">The Makers</h3>
                        </motion.div>

                        <div className="flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ amount: 0.2 }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-[650px] rounded-[2.5rem] md:rounded-[3.5rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-14 flex flex-col md:flex-row items-center text-center md:text-left gap-8 md:gap-14 hover:border-[#ff0050]/50 transition-all duration-700 group shadow-[0_0_50px_rgba(0,0,0,0.6)] hover:shadow-[0_0_80px_rgba(255,0,80,0.25)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center text-4xl md:text-6xl font-black font-outfit shadow-2xl group-hover:border-[#ff0050]/50 group-hover:text-[#ff0050] group-hover:shadow-[0_0_40px_rgba(255,0,80,0.5)] transition-all duration-500 backdrop-blur-xl relative z-10 text-white">
                                    S
                                </div>
                                <div className="relative z-10 flex flex-col items-center md:items-start">
                                    <h4 className="text-2xl md:text-4xl font-black font-outfit uppercase tracking-widest md:tracking-[0.2em] text-white mb-2 md:mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Sanjay M</h4>
                                    <p className="text-[10px] md:text-sm font-mono text-zinc-500 mb-6 md:mb-8 uppercase tracking-widest md:tracking-[0.3em]">Lead Architect</p>
                                    <a href={`mailto:${resumeData.contact.email}`} className="text-[9px] md:text-xs text-white transition-all duration-300 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-md w-fit px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10 hover:border-[#ff0050]/60 hover:bg-[#ff0050]/20 shadow-lg hover:shadow-[0_0_30px_rgba(255,0,80,0.3)] group/btn">
                                        <Terminal size={16} className="text-[#ff0050] transition-transform group-hover/btn:scale-125" /> Establish Link
                                    </a>
                                </div>
                                {/* Watermark for Sanjay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-serif text-[#ff0050] opacity-[0.03] select-none pointer-events-none transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 group-hover:opacity-[0.08]">♠</div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

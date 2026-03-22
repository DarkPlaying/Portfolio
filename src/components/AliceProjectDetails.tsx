import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Zap, Database, ShieldCheck, Smartphone,
    GraduationCap, BrainCircuit, Sparkles,
    Calendar, Users, Rocket,
    Shield, Lock, Terminal, Activity
} from "lucide-react";
import { ProjectDetailSection } from './ProjectDetailSection';

const projectOverviews = [
    {
        id: "01",
        title: "Educationfyp",
        desc: "AI-driven education platform with smart learning.",
        color: "text-pink-500",
        shadowColor: "rgba(236,72,153,0.2)",
        icon: GraduationCap,
        anchor: "#education"
    },
    {
        id: "02",
        title: "Alice Vision",
        desc: "Dynamic gaming platform with real-time features.",
        color: "text-[#ff0050]",
        shadowColor: "rgba(255,0,80,0.2)",
        icon: Zap,
        anchor: "#alice"
    },
    {
        id: "03",
        title: "Ignixion",
        desc: "Modern event platform with streamlined logic.",
        color: "text-blue-500",
        shadowColor: "rgba(59,130,246,0.2)",
        icon: Rocket,
        anchor: "#ignixion"
    },
    {
        id: "04",
        title: "Cyber25",
        desc: "Cybersecurity CTF with hands-on labs.",
        color: "text-emerald-400",
        shadowColor: "rgba(16,185,129,0.2)",
        icon: Shield,
        anchor: "#cyber"
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
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projectOverviews.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovering]);

    return (
        <div id="projects" className="min-h-screen bg-[#050505] text-white pt-20 md:pt-32 pb-20 relative overflow-hidden font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Outfit:wght@400;700;900&family=Great+Vibes&family=DM+Serif+Display:ital@0;1&display=swap');
                
                .font-unifraktur { font-family: 'UnifrakturCook', cursive; }
                .font-outfit { font-family: 'Outfit', sans-serif; }
                .font-serif-display { font-family: 'DM Serif Display', serif; }
                .font-great-vibes { font-family: 'Great Vibes', cursive; }
                `}
            </style>

            <section ref={containerRef} className="relative z-10">
                <div className="container mx-auto px-4 md:px-8">

                    {/* About Project Header */}
                    <div className="pt-10 mb-20 flex flex-col items-center text-center px-4 relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-[0.8em] mb-4 font-sans">
                                今 際の国のアリス
                            </span>
                            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-unifraktur text-white leading-[0.8] drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    Project
                                </motion.span>
                                <br />
                                <motion.div
                                    initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                    className='text-8xl mt-7'
                                >
                                    portfolio
                                </motion.div>
                            </h2>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="mt-12 relative group"
                            >
                                <div className="absolute -inset-4 bg-white/5 blur-xl group-hover:bg-white/10 transition-all rounded-full" />

                            </motion.div>
                        </motion.div>
                    </div>
                    {/* Integrated Rotating Projects UI */}
                    <div className="py-12 md:py-20 relative text-white font-sans overflow-hidden w-full mb-16">
                        <div className="absolute top-20 left-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none select-none">01</div>
                        <div className="absolute bottom-40 right-10 text-neutral-800 opacity-20 text-9xl font-serif pointer-events-none select-none">04</div>

                        <div className="max-w-7xl mx-auto relative z-10 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-center mb-4 relative"
                            >
                                <h2 className="text-3xl md:text-5xl font-outfit uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                                    Overview <span className="text-lg md:text-xl tracking-[0.5em] block mt-1 text-white font-light">Of Projects</span>
                                </h2>

                                <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-12 flex gap-4 md:gap-6">
                                    {projectOverviews.map((proj, idx) => (
                                        <proj.icon key={idx} size={isMobile ? 16 : 20} className={`transition-all duration-500 ${activeIndex === idx ? `${proj.color} opacity-100 scale-125 drop-shadow-[0_0_15px_currentColor]` : 'text-zinc-800 opacity-20'}`} />
                                    ))}
                                </div>
                            </motion.div>

                            <div className="text-center mb-10 md:mb-16">
                                <p className="text-white font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
                                    EXPLORE THE DIGITAL FRONTIER
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10 w-full" onMouseLeave={() => setIsHovering(false)}>
                                {projectOverviews.map((rule, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <motion.div
                                            key={rule.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            onViewportEnter={() => { if (!isHovering) setActiveIndex(index); }}
                                            onMouseEnter={() => { setIsHovering(true); setActiveIndex(index); }}
                                            onClick={() => document.querySelector(rule.anchor)?.scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative p-8 md:p-10 flex flex-col justify-center items-center text-center transition-all duration-700 overflow-hidden z-20 rounded-[2.5rem] md:rounded-[3rem] h-[350px] md:h-[450px] bg-black/60 backdrop-blur-3xl cursor-pointer hover:bg-black/40"
                                            style={{
                                                boxShadow: isActive ? `0 0 120px -10px ${rule.shadowColor}` : `0 0 40px -20px ${rule.shadowColor}`,
                                                borderColor: isActive ? rule.shadowColor.replace('0.2', '0.8') : 'rgba(255,255,255,0.05)',
                                                borderWidth: "1px",
                                                borderStyle: "solid"
                                            }}
                                        >
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] transition-all duration-1000 font-signature select-none pointer-events-none ${rule.color} ${isActive ? 'opacity-10 scale-125 rotate-6 blur-[2px]' : 'opacity-0 scale-50'}`}>
                                                {rule.id}
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
                                                    <rule.icon size={isMobile ? 24 : 32} className={`transition-all duration-500 ${rule.color} ${isActive ? 'drop-shadow-[0_0_20px_currentColor]' : 'opacity-40'}`} />
                                                </motion.div>
                                                <h3 className={`text-xl md:text-2xl font-black font-outfit uppercase tracking-widest mb-3 md:mb-4 text-white transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-80'}`}>
                                                    {rule.title}
                                                </h3>
                                                <p className={`font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] leading-relaxed transition-all duration-500 ${isActive ? 'text-white opacity-100' : 'text-white/40 opacity-60'}`}>
                                                    {rule.desc}
                                                </p>
                                            </div>
                                            <div className={`absolute bottom-8 right-8 md:bottom-10 md:right-10 text-3xl md:text-4xl font-outfit transition-all duration-500 ${rule.color} ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                                                {rule.id}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Project Sections */}
                    <div id="education" className="w-full  mb-32 md:mb-52 py-10 relative overflow-hidden scroll-mt-24">
                        <ProjectDetailSection
                            projId="01"
                            titleMain="Education"
                            titleSub="Starter"
                            subtitle="AI Learning"
                            description="AI-driven education platform with Firebase-backed intelligence for scalable and personalized learning path generation."
                            imagePath="/projects/education.png"
                            colorClass="text-pink-500"
                            glowColor="rgba(236,72,153,0.3)"
                            features={[
                                { title: "AI Tutoring", icon: BrainCircuit },
                                { title: "Smart Sync", icon: Database },
                                { title: "Adaptive Flow", icon: Sparkles },
                                { title: "Mobile First", icon: Smartphone }
                            ]}
                            scrollYProgress={scrollYProgress}
                            parallaxValue={[0.2, 0.45]}
                        />
                    </div>


                    <div id="alice" className="w-full mb-32 md:mb-52 py-10 relative overflow-hidden scroll-mt-24">
                        <ProjectDetailSection
                            projId="02"
                            titleMain="Alice"
                            titleSub="Mission"
                            subtitle="Objective"
                            description="Exploring the boundaries of real-time synchronization in a high-stakes, competitive digital gaming environment."
                            imagePath="/projects/alice.png"
                            colorClass="text-[#ff0050]"
                            glowColor="rgba(255,0,80,0.3)"
                            features={[
                                { title: "Real-time Loop", icon: Zap },
                                { title: "Distributed Core", icon: Database },
                                { title: "State Authority", icon: ShieldCheck },
                                { title: "Dynamic UX", icon: Smartphone }
                            ]}
                            scrollYProgress={scrollYProgress}
                            parallaxValue={[0.45, 0.7]}
                        />
                    </div>

                    <div id="ignixion" className="w-full mb-32 md:mb-52 py-10 relative overflow-hidden scroll-mt-24">
                        <ProjectDetailSection
                            projId="03"
                            titleMain="Ignixion"
                            titleSub="System"
                            subtitle="Flow"
                            description="Modern event management with intelligent form processing and high-performance server-side logic."
                            imagePath="/projects/ignixion.png"
                            colorClass="text-blue-500"
                            glowColor="rgba(59,130,246,0.3)"
                            features={[
                                { title: "Event Logic", icon: Calendar },
                                { title: "Member Portal", icon: Users },
                                { title: "High Speed", icon: Zap },
                                { title: "Launch Control", icon: Rocket }
                            ]}
                            scrollYProgress={scrollYProgress}
                            parallaxValue={[0.7, 0.9]}
                        />
                    </div>

                    <div id="cyber" className="w-full mb-20 py-10 relative overflow-hidden scroll-mt-24">
                        <ProjectDetailSection
                            projId="04"
                            titleMain="Cyber25"
                            titleSub="Protocol"
                            subtitle="Security"
                            description="Advanced cybersecurity CTF platform featuring OSWP-inspired challenges and interactive vulnerability labs."
                            imagePath="/projects/cyber.png"
                            colorClass="text-emerald-400"
                            glowColor="rgba(16,185,129,0.3)"
                            features={[
                                { title: "Secure Core", icon: Shield },
                                { title: "Access Control", icon: Lock },
                                { title: "Shell Access", icon: Terminal },
                                { title: "Real-time CTF", icon: Activity }
                            ]}
                            scrollYProgress={scrollYProgress}
                            parallaxValue={[0.85, 1.0]}
                        />
                    </div>

                    {/* Background Detail */}
                    <div className="absolute -bottom-20 -right-20 text-[20rem] font-serif text-[#ff0050] opacity-[0.03] select-none pointer-events-none rotate-12">04</div>
                </div>
            </section>
        </div>
    );
}

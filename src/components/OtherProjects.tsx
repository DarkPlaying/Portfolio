import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldAlert, Code2, Award, Terminal, Database, Smartphone } from 'lucide-react';

export function OtherProjects() {
    const [mouseGradientStyle, setMouseGradientStyle] = useState({
        left: '0px',
        top: '0px',
        opacity: 0,
    });
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const floatingElementsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const animateWords = () => {
            const wordElements = document.querySelectorAll('.word-animate');
            wordElements.forEach(word => {
                const delayStr = word.getAttribute('data-delay');
                const delay = delayStr ? parseInt(delayStr) : 0;
                setTimeout(() => {
                    if (word instanceof HTMLElement) word.style.animation = 'word-appear 0.8s ease-out forwards';
                }, delay);
            });
        };
        const timeoutId = setTimeout(animateWords, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseGradientStyle({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`,
                opacity: 1,
            });
        };
        const handleMouseLeave = () => {
            setMouseGradientStyle(prev => ({ ...prev, opacity: 0 }));
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const wordElements = document.querySelectorAll('.word-animate');
        const handleMouseEnter = (e: Event) => { if (e.target instanceof HTMLElement) e.target.style.textShadow = '0 0 20px rgba(255, 0, 80, 0.4)'; };
        const handleMouseLeave = (e: Event) => { if (e.target instanceof HTMLElement) e.target.style.textShadow = 'none'; };
        wordElements.forEach(word => {
            word.addEventListener('mouseenter', handleMouseEnter);
            word.addEventListener('mouseleave', handleMouseLeave);
        });
        return () => {
            wordElements.forEach(word => {
                if (word) {
                    word.removeEventListener('mouseenter', handleMouseEnter);
                    word.removeEventListener('mouseleave', handleMouseLeave);
                }
            });
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('.floating-element-animate');
        floatingElementsRef.current = Array.from(elements) as HTMLDivElement[];
        const handleScroll = () => {
            if (!scrolled) {
                setScrolled(true);
                floatingElementsRef.current.forEach((el, index) => {
                    setTimeout(() => {
                        if (el) {
                            el.style.animationPlayState = 'running';
                            el.style.opacity = '';
                        }
                    }, (parseFloat(el.style.animationDelay || "0") * 1000) + index * 100);
                });
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;700;900&display=swap');
    
    .font-bebas { font-family: 'Bebas Neue', cursive; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    #mouse-gradient-other {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(255, 0, 80, 0.1), rgba(255, 0, 80, 0.05), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
      z-index: 100;
    }
    @keyframes word-appear { 0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes grid-draw-red { 0% { stroke-dashoffset: 1000; opacity: 0; } 50% { opacity: 0.3; } 100% { stroke-dashoffset: 0; opacity: 0.15; } }
    @keyframes pulse-glow-red { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
    
    .word-animate { display: inline-block; opacity: 0; margin: 0 0.1em; transition: color 0.3s ease, transform 0.3s ease; }
    .word-animate:hover { color: #ff0050; transform: translateY(-2px); }
    
    .grid-line-red { stroke: #ff0050; stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw-red 3s ease-out forwards; }
    .detail-dot-red { fill: #ff0050; opacity: 0; animation: pulse-glow-red 3s ease-in-out infinite; }
    
    .floating-element-animate { position: absolute; width: 2px; height: 2px; background: #ff0050; border-radius: 50%; opacity: 0; animation: float-red 4s ease-in-out infinite; animation-play-state: paused; }
    @keyframes float-red { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } }
    
    .ripple-effect-red { position: fixed; width: 4px; height: 4px; background: rgba(255, 0, 80, 0.6); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: pulse-glow-red 1s ease-out forwards; z-index: 9999; }

    /* Scanline Effect */
    @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
    .scanline-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(255, 0, 80, 0.03), transparent); height: 100px; animation: scanline 8s linear infinite; pointer-events: none; z-index: 50; }
    
    /* Decryption Bar */
    @keyframes decrypt { 0% { width: 0%; opacity: 0; } 5% { opacity: 1; } 100% { width: 100%; opacity: 1; } }
    .decrypt-bar { height: 2px; background: #ff0050; box-shadow: 0 0 10px #ff0050; animation: decrypt 3s ease-out infinite; }

    /* Glitch Animation */
    @keyframes glitch {
      0% { transform: translate(0); text-shadow: none; }
      20% { transform: translate(-2px, 2px); text-shadow: 2px 0 #ff0050, -2px 0 #00ffff; }
      40% { transform: translate(-2px, -2px); text-shadow: -2px 0 #ff0050, 2px 0 #00ffff; }
      60% { transform: translate(2px, 2px); text-shadow: 2px 0 #ff0050, -2px 0 #00ffff; }
      80% { transform: translate(2px, -2px); text-shadow: -2px 0 #ff0050, 2px 0 #00ffff; }
      100% { transform: translate(0); text-shadow: none; }
    }
    .glitch-hover:hover .word-animate { animation: glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite !important; }
  `;

    return (
        <section id="other-projects" className="py-32 bg-[#050505] relative z-10 overflow-hidden border-t border-white/[0.05]">
            <style>{pageStyles}</style>

            {/* Holographic Overlays */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="scanline-overlay"></div>

            {/* Neon Red Grid System */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <pattern id="gridAlice" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 0, 80, 0.05)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridAlice)" />
                <line x1="0" y1="25%" x2="100%" y2="25%" className="grid-line-red" style={{ animationDelay: '0.5s' }} />
                <line x1="0" y1="75%" x2="100%" y2="75%" className="grid-line-red" style={{ animationDelay: '1s' }} />
                <line x1="15%" y1="0" x2="15%" y2="100%" className="grid-line-red" style={{ animationDelay: '1.5s' }} />
                <line x1="85%" y1="0" x2="85%" y2="100%" className="grid-line-red" style={{ animationDelay: '2s' }} />

                <circle cx="15%" cy="25%" r="2" className="detail-dot-red" style={{ animationDelay: '3s' }} />
                <circle cx="85%" cy="25%" r="2" className="detail-dot-red" style={{ animationDelay: '3.2s' }} />
                <circle cx="15%" cy="75%" r="2" className="detail-dot-red" style={{ animationDelay: '3.4s' }} />
                <circle cx="85%" cy="75%" r="2" className="detail-dot-red" style={{ animationDelay: '3.6s' }} />
            </svg>

            {/* Floating Particles */}
            <div className="floating-element-animate" style={{ top: '20%', left: '10%', animationDelay: '0.2s' }}></div>
            <div className="floating-element-animate" style={{ top: '70%', left: '80%', animationDelay: '0.8s' }}></div>
            <div className="floating-element-animate" style={{ top: '40%', left: '5%', animationDelay: '1.2s' }}></div>

            <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">

                {/* Animated Header */}
                <div className="text-center mb-20 md:mb-32 group/header glitch-hover">
                    <h2 className="text-4xl md:text-8xl font-black font-bebas text-white tracking-[0.05em] uppercase mb-4 leading-none inline-flex flex-wrap justify-center gap-x-4 md:gap-x-8 relative">
                        <span className="word-animate" data-delay="100">Hidden</span>
                        <span className="word-animate text-transparent bg-clip-text bg-gradient-to-b from-[#ff0050] to-[#ff0050]/40 drop-shadow-[0_0_30px_rgba(255,0,80,0.5)]" data-delay="300">Archives</span>
                    </h2>
                    <div className="mt-8 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#ff0050] to-transparent opacity-50 mx-auto relative">
                        <div className="absolute top-0 left-0 h-full w-full bg-[#ff0050] blur-[2px] opacity-30 animate-pulse"></div>
                    </div>
                    <p className="mt-8 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.8em] opacity-60">
                        <span className="word-animate" data-delay="600">Accessing</span>
                        <span className="word-animate" data-delay="800">system</span>
                        <span className="word-animate" data-delay="1000">repository</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* WEB APPS BENTO */}
                    <div className="lg:col-span-7 bg-black/60 backdrop-blur-3xl border border-white/[0.08] border-t-[#ff0050]/40 rounded-[2.5rem] p-8 md:p-14 group relative overflow-hidden shadow-[0_-10px_40px_rgba(255,0,80,0.05)] transition-transform duration-500 hover:scale-[1.01] hover:border-[#ff0050]/20">
                        <div className="absolute top-0 left-0 w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="decrypt-bar"></div>
                            <span className="absolute top-2 left-4 text-[8px] font-mono text-[#ff0050] uppercase tracking-[0.3em] animate-pulse">DECRYPTING_REPOSITORY...</span>
                        </div>
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-[2] rotate-12 group-hover:rotate-0 transition-transform duration-1000 select-none pointer-events-none">
                            <Database size={200} className="text-[#ff0050]" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 opacity-[0.02] pointer-events-none">
                            <Code2 size={120} className="text-white" />
                        </div>

                        <div className="flex items-center gap-4 mb-10 md:mb-14 relative z-10">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#ff0050]/10 border border-[#ff0050]/20 flex items-center justify-center text-[#ff0050] shadow-[0_0_15px_rgba(255,0,80,0.2)]">
                                <Code2 size={24} />
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black font-bebas text-white uppercase tracking-widest">Web Systems</h4>
                        </div>

                        <div className="space-y-10 relative z-10">
                            {[
                                { name: "Education", title: "AI Education Hub", link: "https://Educationfyp.vercel.app" },
                                { name: "Alice", title: "Gaming State Engine", link: "https://Alice14.vercel.app" },
                                { name: "Ignixion", title: "Event Routing App", link: "https://Ignixion.vercel.app" }
                            ].map((item, idx) => (
                                <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="block group/item">
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-xl font-bold font-outfit text-white group-hover/item:text-[#ff0050] transition-colors uppercase">{item.title}</h5>
                                        <ExternalLink size={16} className="text-zinc-600" />
                                    </div>
                                    <div className="h-[1px] w-full bg-white/[0.05] group-hover:bg-[#ff0050]/20 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* SECURITY OPS */}
                    <div className="lg:col-span-5 bg-black/60 backdrop-blur-3xl border border-white/[0.08] border-t-[#ff0050]/40 rounded-[2.5rem] p-10 group relative overflow-hidden shadow-[0_-10px_40px_rgba(255,0,80,0.05)] transition-transform duration-500 hover:scale-[1.01] hover:border-[#ff0050]/20">
                        <div className="absolute top-0 left-0 w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="decrypt-bar"></div>
                            <span className="absolute top-2 left-4 text-[8px] font-mono text-[#ff0050] uppercase tracking-[0.3em] animate-pulse">SCANNING_VULNERABILITIES...</span>
                        </div>
                        <div className="absolute -bottom-10 -right-10 p-12 opacity-[0.03] scale-150 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 select-none pointer-events-none">
                            <ShieldAlert size={150} className="text-white" />
                        </div>
                        <div className="flex items-center gap-4 mb-8 md:mb-10 relative z-10">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#ff0050]/10 border border-[#ff0050]/20 flex items-center justify-center text-[#ff0050] shadow-[0_0_15px_rgba(255,0,80,0.2)]">
                                <Terminal size={24} />
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black font-bebas text-white uppercase tracking-widest">Security Ops</h4>
                        </div>

                        <div className="space-y-12 relative z-10">
                            <div>
                                <h5 className="text-sm font-bold font-mono text-zinc-500 uppercase mb-2 tracking-widest">Ahold Delhaize</h5>
                                <p className="text-zinc-300 font-light border-l-2 border-[#ff0050]/40 pl-4 italic">Credit data leakage exposure.</p>
                            </div>
                            <div>
                                <h5 className="text-sm font-bold font-mono text-zinc-500 uppercase mb-2 tracking-widest">ManageEngine</h5>
                                <p className="text-zinc-300 font-light border-l-2 border-[#ff0050]/40 pl-4 italic">Production JS library vulnerability.</p>
                            </div>
                        </div>
                    </div>

                    {/* UX & ACHIEVEMENTS SMALL BENTOS */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Achievements */}
                        <div className="bg-black/60 backdrop-blur-3xl border border-white/[0.08] border-t-[#ff0050]/40 rounded-[2.5rem] p-10 flex flex-col items-center text-center group relative overflow-hidden shadow-[0_-10px_40px_rgba(255,0,80,0.05)] transition-transform duration-500 hover:scale-[1.01] hover:border-[#ff0050]/20">
                            <div className="absolute top-0 left-0 w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="decrypt-bar"></div>
                                <span className="absolute top-2 left-4 text-[8px] font-mono text-[#ff0050] uppercase tracking-[0.3em] animate-pulse">VERIFYING_CREDENTIALS...</span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-[#ff0050]/10 border border-[#ff0050]/20 flex items-center justify-center text-[#ff0050] mb-6 group-hover:shadow-[0_0_20px_rgba(255,0,80,0.3)] transition-shadow">
                                <Award size={28} />
                            </div>
                            <h4 className="text-2xl font-black font-bebas text-white uppercase tracking-widest mb-4">Core Achievements</h4>
                            <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-[200px]">Pen-testing, CTF Laboratory, and Voice AI modules.</p>
                        </div>

                        {/* UI/UX App 1 */}
                        <a href="https://app.spline.design/file/168b935a-380c-4386-a6a4-41db5722f999" target="_blank" rel="noreferrer" className="bg-black/60 backdrop-blur-3xl border border-white/[0.08] border-t-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center group relative overflow-hidden hover:border-t-[#ff0050]/40 transition-all duration-500 hover:scale-[1.01] shadow-xl">
                            <div className="absolute top-0 left-0 w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="decrypt-bar"></div>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#ff0050] mb-6 transition-all group-hover:bg-[#ff0050]/10 group-hover:border-[#ff0050]/20">
                                <Smartphone size={28} />
                            </div>
                            <h4 className="text-2xl font-black font-bebas text-white uppercase tracking-widest mb-4">AI Voice UI</h4>
                            <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-[200px]">Interactive 3D controls via Spline. [Preview Available]</p>
                        </a>

                        {/* UI/UX App 2 */}
                        <a href="https://app.flutterflow.io/preview/recipe2-wrkboz?WelcomePage" target="_blank" rel="noreferrer" className="bg-black/60 backdrop-blur-3xl border border-white/[0.08] border-t-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center group relative overflow-hidden hover:border-t-[#ff0050]/40 transition-all duration-500 shadow-xl">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#ff0050] mb-6 transition-all group-hover:bg-[#ff0050]/10 group-hover:border-[#ff0050]/20">
                                <Code2 size={28} />
                            </div>
                            <h4 className="text-2xl font-black font-bebas text-white uppercase tracking-widest mb-4">Culinary App</h4>
                            <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-[200px]">Modern UX/UI developed in FlutterFlow. [Preview Available]</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Neon Red Mouse Gradient */}
            <div
                id="mouse-gradient-other"
                className="w-80 h-80 blur-[80px]"
                style={{
                    left: mouseGradientStyle.left,
                    top: mouseGradientStyle.top,
                    opacity: mouseGradientStyle.opacity,
                }}
            ></div>

            {/* Ripple Effects */}
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className="ripple-effect-red"
                    style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
                ></div>
            ))}
        </section>
    );
}

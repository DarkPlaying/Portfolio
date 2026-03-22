import { useState, useEffect } from 'react';
import { ShieldAlert, Code2, Smartphone, GraduationCap, Briefcase, Trophy, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function OtherProjects() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;700;900&family=Yellowtail&display=swap');
    
    .font-bebas { font-family: 'Bebas Neue', cursive; }
    .font-outfit { font-family: 'Outfit', sans-serif; }
    .font-signature { font-family: 'Yellowtail', cursive; }

    .text-yellow-accent { color: #FFB800; }
    .bg-yellow-accent { background-color: #FFB800; }
    .border-yellow-accent { border-color: #FFB800; }
    
    .grid-bg {
        background-image: 
            linear-gradient(to right, rgba(255, 184, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 184, 0, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
    }

    .numbered-block::before {
        content: attr(data-number);
        position: absolute;
        top: -20px;
        left: -10px;
        font-family: 'Bebas Neue', cursive;
        font-size: 120px;
        color: rgba(255, 255, 255, 0.03);
        z-index: 0;
        line-height: 1;
    }

    @keyframes drift {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(10px, 10px); }
    }
    `;

    return (
        <section id="about-details" className="py-32 bg-black relative z-10 overflow-hidden border-t border-white/[0.05]">
            <style>{pageStyles}</style>

            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-40"></div>

            {/* Mouse Glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-50"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 184, 0, 0.08), transparent 80%)`,
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">

                {/* Career Objective & Contact (Mini) */}
                <div
                    className="flex flex-col md:flex-row justify-between items-start gap-8 mb-24 p-8 rounded-[2rem] bg-black/40 backdrop-blur-sm relative overflow-hidden shadow-[0_0_200px_rgba(255,184,0,0.3)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-accent/10 to-transparent opacity-60" />
                    <div className="max-w-xl relative z-10">
                        <h4 className="text-[15px] font-mono text-yellow-accent font-bold uppercase tracking-[0.5em] mb-4 drop-shadow-[0_0_25px_rgba(255,184,0,1)]">
                            System_Objective
                        </h4>
                        <p className="text-zinc-400 text-xs font-mono leading-relaxed uppercase tracking-wider italic opacity-80">
                            Aspiring Computer Science student with practical experience in web development, programming, and cybersecurity.
                            Passionate about building AI-driven systems and secure digital platforms. Eager to contribute and grow in a dynamic tech environment.
                        </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2 font-mono text-[9px] uppercase tracking-widest text-white/50 relative z-10 transition-colors hover:text-white">
                        <span>Puzhal, chennai-600006</span>
                        <span>sanjaymofficialmail@gmail.com</span>
                        <span className="text-yellow-accent font-bold">
                            +91 8438509355
                        </span>
                    </div>
                </div>

                {/* Header Style from Image */}
                <div className="relative mb-32 text-center">
                    <h2 className="text-7xl md:text-9xl font-bebas text-white tracking-tight leading-none uppercase select-none">
                        Skills & <span className="opacity-80">Tools</span>
                    </h2>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-signature text-4xl md:text-7xl text-yellow-accent opacity-90 rotate-[-5deg] pointer-events-none drop-shadow-xl">
                        Sanjay M
                    </span>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div className="h-px w-12 bg-yellow-accent/40" />
                        <span className="text-[10px] font-mono font-bold text-yellow-accent uppercase tracking-[0.8em] drop-shadow-[0_0_15px_rgba(255,184,0,1)]">
                            Archive_Node_01
                        </span>
                        <div className="h-px w-12 bg-yellow-accent/40" />
                    </div>
                </div>

                {/* Main 4-Block Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32">

                    {/* 01: EDUCATION */}
                    <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-sm shadow-[0_0_150px_rgba(255,184,0,0.15)] overflow-hidden">
                        <span className="text-8xl font-bebas text-white/10 absolute -top-4 -right-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none pointer-events-none">01</span>
                        <div className="flex items-center gap-4 mb-8">
                            <GraduationCap className="text-yellow-accent" size={32} />
                            <h3 className="text-2xl font-bold font-outfit text-white uppercase tracking-widest">Education</h3>
                        </div>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <h4 className="text-sm font-bold font-mono text-yellow-accent uppercase mb-2 tracking-widest">B.Sc Computer Science</h4>
                                <p className="text-white text-sm font-light leading-relaxed opacity-90">Vel Tech Ranga Sanku Arts College</p>
                                <p className="text-white text-xs font-mono font-bold mt-1">CGPA: 9.1 (Till 5 Semester)</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold font-mono text-white/60 uppercase mb-2 tracking-widest leading-none">High School</h4>
                                <p className="text-white text-sm font-light leading-relaxed opacity-80">Dr. Sivanthi Adithanar Matriculation School</p>
                                <p className="text-white text-[10px] font-mono font-bold mt-1 uppercase opacity-90">12th Score: 78% | Computer Science: 99/100</p>
                            </div>
                        </div>
                    </div>

                    {/* 02: SKILLS */}
                    <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-sm shadow-[0_0_150px_rgba(255,184,0,0.15)] overflow-hidden">
                        <span className="text-8xl font-bebas text-white/10 absolute -top-4 -right-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none pointer-events-none">02</span>
                        <div className="flex items-center gap-4 mb-8">
                            <Code2 className="text-yellow-accent" size={32} />
                            <h3 className="text-2xl font-bold font-outfit text-white uppercase tracking-widest">Technical Arsenal</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6 relative z-10">
                            {[
                                { label: 'Languages', items: 'C, C++, Java, Python' },
                                { label: 'Web Tech', items: 'HTML, CSS, JavaScript, Tailwind, React' },
                                { label: 'Design & Tools', items: 'UI/UX, Video Editing, Webflow, Flutterflow' },
                                { label: 'Databases', items: 'SQL, SQLite' },
                                { label: 'Cybersecurity', items: 'Pen-Testing, CTFs, Bug Hunting' }
                            ].map((skill, idx) => (
                                <div key={idx}>
                                    <h4 className="text-[10px] font-mono font-bold text-white/50 uppercase mb-2 tracking-widest">{skill.label}</h4>
                                    <p className="text-white text-sm font-light tracking-wide opacity-90">{skill.items}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 03: ACHIEVEMENTS & INTERNSHIP */}
                    <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-sm shadow-[0_0_150px_rgba(255,184,0,0.15)] overflow-hidden md:col-span-2">
                        <span className="text-8xl font-bebas text-white/10 absolute -top-4 -right-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none pointer-events-none">03</span>
                        <div className="flex items-center gap-4 mb-8">
                            <Trophy className="text-yellow-accent" size={32} />
                            <h3 className="text-2xl font-bold font-outfit text-white uppercase tracking-widest">Milestones</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold font-mono text-yellow-accent uppercase mb-3 tracking-widest">
                                    <Briefcase size={14} /> Internship
                                </h4>
                                <p className="text-white text-xs font-light leading-relaxed italic opacity-85">
                                    Web Development Intern – Gained hands-on experience in front-end development, crafting responsive,
                                    user-friendly interfaces and collaborating on intuitive UI design improvements.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">Key Accomplishments</h4>
                                    <ul className="space-y-2 text-white text-sm font-light opacity-90">
                                        <li className="flex items-start gap-2">• State-Level Chess Winner – Peri College</li>
                                        <li className="flex items-start gap-2">• Active participant in CTF games & Hack The Box labs</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">Certifications</h4>
                                    <div className="text-xs text-white/70 space-x-4">
                                        <span className="border-b border-white/10 pb-1">Mastering C Programming (Udemy)</span>
                                        <span className="border-b border-white/10 pb-1">Cybersecurity (Cisco)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Additional Content: Cybersecurity Disclosures & UI/UX Links */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16 border-t border-white/5">

                    {/* Cybersecurity Disclosures */}
                    <div className="bg-zinc-950/40 p-10 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_100px_rgba(255,184,0,0.1)]">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <ShieldAlert size={80} className="text-yellow-accent" />
                        </div>
                        <h4 className="text-sm font-black font-bebas text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-yellow-accent" />
                            Cybersecurity Disclosures
                        </h4>
                        <div className="space-y-6">
                            <div className="border-l border-yellow-accent/40 pl-6">
                                <h5 className="text-[10px] font-mono font-bold text-yellow-accent uppercase mb-1">Ahold Delhaize</h5>
                                <p className="text-white/80 text-xs font-light italic opacity-90">Found exposed credit card details in site source code.</p>
                            </div>
                            <div className="border-l border-yellow-accent/40 pl-6">
                                <h5 className="text-[10px] font-mono font-bold text-yellow-accent uppercase mb-1">ManageEngine</h5>
                                <p className="text-white/80 text-xs font-light italic opacity-90">Reported outdated jQuery in production environment.</p>
                            </div>
                        </div>
                    </div>

                    {/* UI/UX & Voice System */}
                    <div className="flex flex-col gap-6">
                        <a href="https://app.spline.design/file/168b935a-380c-4386-a6a4-41db5722f999" target="_blank" rel="noreferrer"
                            className="flex-1 bg-zinc-950/40 p-10 rounded-[2.5rem] transition-all flex flex-col justify-center shadow-[0_0_100px_rgba(255,184,0,0.1)]">
                            <div className="flex items-center gap-4 mb-3">
                                <Smartphone className="text-white group-hover:text-yellow-accent transition-colors opacity-60" size={20} />
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest">AI Voice-Controlled System</h4>
                            </div>
                            <p className="text-white/80 text-[10px] font-light leading-relaxed max-w-sm opacity-90">
                                Built an intelligent assistant with voice command capabilities to automate tasks and control system functions via Spline.
                            </p>
                        </a>
                        <a href="https://app.flutterflow.io/preview/recipe2-wrkboz?WelcomePage" target="_blank" rel="noreferrer"
                            className="flex-1 bg-zinc-950/40 p-8 rounded-3xl transition-all group flex flex-col justify-center shadow-[0_0_100px_rgba(255,184,0,0.1)]">
                            <div className="flex items-center gap-4 mb-3">
                                <Globe className="text-white group-hover:text-yellow-accent transition-colors opacity-60" size={20} />
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Culinary UI/UX Project</h4>
                            </div>
                            <p className="text-white/80 text-[10px] font-light leading-relaxed max-w-sm opacity-90">
                                Modern recipe management ecosystem developed in FlutterFlow with advanced user journeys.
                            </p>
                        </a>
                    </div>

                </div>

                {/* Footer Signature */}
                <motion.div
                    animate={{
                        opacity: [0.7, 1, 0.7],
                        filter: [
                            "drop-shadow(0 0 30px rgba(255,255,255,0.4))",
                            "drop-shadow(0 0 50px rgba(255,255,255,0.8))",
                            "drop-shadow(0 0 30px rgba(255,255,255,0.4))"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-32 text-center"
                >
                    <span className="font-signature text-6xl md:text-8xl text-white pointer-events-none select-none">
                        Browse my projects
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

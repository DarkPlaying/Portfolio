import { Github, Linkedin, Mail, Twitter, ChevronUp } from 'lucide-react';

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="relative bg-[#050505] py-20 border-t border-white/[0.05] overflow-hidden z-30 snap-start">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#ff0050]/20 via-transparent to-transparent opacity-30" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#ff0050]/20 via-transparent to-transparent opacity-30" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-black font-outfit text-white tracking-tighter uppercase mb-6">
                            Sanjay <span className="text-[#ff0050]">M</span>
                        </h3>
                        <p className="text-zinc-500 text-sm font-mono leading-relaxed max-w-sm mb-8 opacity-70">
                            Building secure, high-performance digital architectures with a focus on AI-driven systems and modern web technologies.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: "https://github.com/DarkPlaying", label: "GitHub" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/m-sanjay105623258/", label: "LinkedIn" },
                                { icon: Mail, href: "mailto:sanjaymofficialmail@gmail.com", label: "Email" },
                                { icon: Twitter, href: "#", label: "Twitter" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#ff0050] hover:border-[#ff0050]/40 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[10px] font-mono font-bold text-[#ff0050] uppercase tracking-[0.4em] mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Home', href: '#home' },
                                { label: 'About', href: '#about' },
                                { label: 'Projects', href: '#projects' },
                                { label: 'Contact', href: '#contact' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-zinc-500 hover:text-white text-sm transition-colors uppercase tracking-widest">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Status Column */}
                    <div>
                        <h4 className="text-[10px] font-mono font-bold text-[#ff0050] uppercase tracking-[0.4em] mb-6">System Status</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Interface Online</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff0050] shadow-[0_0_8px_rgba(255,0,80,0.6)]" />
                                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">v2.0 Deploy Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} SANJAY M. ALL SYSTEMS OPERATIONAL.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Back to Surface</span>
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#ff0050]/20 group-hover:border-[#ff0050]/40 transition-all">
                            <ChevronUp size={16} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Sub-footer detail */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ff0050]/30 to-transparent mt-12 opacity-50" />
        </footer>
    );
}

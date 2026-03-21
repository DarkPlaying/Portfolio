import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Download, Send } from 'lucide-react';
import { resumeData } from '@/data/resume';

export function Contact() {
    return (
        <section id="contact" className="py-32 bg-[#050505] border-t border-white/[0.05] relative overflow-hidden z-20 snap-start">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                .font-outfit { font-family: 'Outfit', sans-serif; }
                `}
            </style>

            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#ff0050]/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-60">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ff0050]" />
                        <span className="text-[10px] font-mono font-bold text-[#ff0050] uppercase tracking-[0.5em]">Transmission</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ff0050]" />
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold font-outfit text-white tracking-tight uppercase mb-6 leading-none">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#ff0050]/60 drop-shadow-[0_0_15px_rgba(255,0,80,0.2)]">Touch</span>
                    </h2>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider max-w-md mx-auto opacity-70">
                        Ready to collaborate on secure digital architecture or next-gen web platforms?
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    {/* Contact Channels */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-black/60 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 shadow-2xl space-y-8 md:space-y-10 relative overflow-hidden group hover:border-[#ff0050]/20 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                            <Send size={150} className="text-[#ff0050]" strokeWidth={1} />
                        </div>

                        {[
                            { icon: Mail, label: 'Email', value: resumeData.contact.email, link: `mailto:${resumeData.contact.email}` },
                            { icon: Phone, label: 'Phone', value: resumeData.contact.phone, link: `tel:${resumeData.contact.phone.replace(/\s/g, '')}` },
                            { icon: MapPin, label: 'Coordinates', value: resumeData.contact.location, link: '#' }
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className="flex items-center gap-6 group/item relative z-10"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#ff0050]/10 border border-[#ff0050]/20 flex items-center justify-center text-[#ff0050] group-hover/item:bg-[#ff0050] group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-[0_0_20px_rgba(255,0,80,0.3)]">
                                    <item.icon size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-lg md:text-xl font-bold font-outfit text-zinc-300 group-hover/item:text-white transition-colors tracking-wide break-all">{item.value}</p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                    {/* Quick Access & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Resume Card */}
                        <div className="flex-1 bg-black/60 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-[#ff0050]/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff0050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 mb-8 relative z-10 group-hover:bg-[#ff0050]/10 group-hover:border-[#ff0050]/30 group-hover:text-[#ff0050] transition-all">
                                <Download size={28} />
                            </div>

                            <h4 className="text-2xl font-bold font-outfit text-white uppercase tracking-widest mb-4 relative z-10">Resume File</h4>
                            <p className="text-zinc-500 text-sm font-light mb-8 max-w-[240px] relative z-10 opacity-70">Download the detailed technical dossier (Resume).</p>

                            <a
                                href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/resume.pdf`}
                                download="Sanjay_Resume.pdf"
                                className="w-full bg-[#ff0050] hover:bg-[#ff0050]/90 text-white font-bold font-outfit uppercase tracking-widest py-4 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(255,0,80,0.3)] relative z-10"
                            >
                                Download File
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-center justify-between px-8 md:px-10">
                            <span className="text-[9px] md:text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Secure Channels</span>
                            <div className="flex gap-4">
                                <a
                                    href={resumeData.contact.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#ff0050] hover:border-[#ff0050]/40 transition-all hover:scale-110"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href={resumeData.contact.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#ff0050] hover:border-[#ff0050]/40 transition-all hover:scale-110"
                                >
                                    <Linkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

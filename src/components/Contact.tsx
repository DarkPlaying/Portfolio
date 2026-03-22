import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Globe } from 'lucide-react';
import { resumeData } from '@/data/resume';

export function Contact() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const mailtoUrl = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <section id="contact" className="py-24 bg-[#0F0A0A] relative overflow-hidden z-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* Left Column: Get In Touch */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <p className="text-yellow-accent font-bold uppercase tracking-[0.4em] text-[10px]">Keep Close</p>
                            <h2 className="text-5xl md:text-7xl font-black font-outfit text-white uppercase tracking-tight leading-none">Get In Touch</h2>
                            <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean que commodo ligula eget dolor. Aenean massa. Cum sociis nec natoqueque penatibus et magnis dis parturient montes, nascetur ridiculusser mus. Donec quam felis, ultricies nec, pellentesque eu, pretiumqu quis, sem. Nulla consequat massa quis enim.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            {[
                                { icon: MapPin, text: resumeData.contact.location, sub: 'Puzhal, Chennai-600066' },
                                { icon: Phone, text: resumeData.contact.phone, sub: '+91 843 8509 355' },
                                { icon: Mail, text: resumeData.contact.email, sub: 'Mail Me Directly' },
                                { icon: Globe, text: 'Always Online', sub: 'Global Connectivity' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="text-yellow-accent mt-1">
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-bold text-sm tracking-tight">{item.text}</p>
                                        <p className="text-white/30 text-[10px] uppercase tracking-wider">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-6 pt-10">
                            <p className="text-yellow-accent font-bold uppercase tracking-[0.4em] text-[10px]">Follow Us</p>
                            <div className="flex gap-8">
                                {[
                                    { icon: Github, href: resumeData.contact.github },
                                    { icon: Linkedin, href: resumeData.contact.linkedin },
                                    { icon: Mail, href: `mailto:${resumeData.contact.email}` },
                                    { icon: Instagram, href: 'https://www.instagram.com/sanjay_m2356/' }
                                ].map((item, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        className="text-white hover:text-yellow-accent transition-all hover:scale-125"
                                    >
                                        <item.icon size={18} strokeWidth={2.5} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Your Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black font-outfit text-white uppercase tracking-tight">Your Details</h2>
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em]">Let us know how to get back to you.</p>
                        </div>

                        <form className="space-y-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                <div className="space-y-3 relative group">
                                    <label className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em] ml-6">Name *</label>
                                    <input name="name" type="text" required placeholder="Jhon" className="w-full bg-white/5 border-b border-white/20 px-6 py-4 text-white placeholder:text-white/10 focus:border-yellow-accent focus:outline-none transition-all leading-none" />
                                </div>
                                <div className="space-y-3 relative group">
                                    <label className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em] ml-6">Email Address *</label>
                                    <input name="email" type="email" required placeholder="email@email.com" className="w-full bg-white/5 border-b border-white/20 px-6 py-4 text-white placeholder:text-white/10 focus:border-yellow-accent focus:outline-none transition-all leading-none" />
                                </div>
                            </div>

                            <div className="space-y-3 relative group">
                                <label className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em] ml-6">Subject *</label>
                                <input name="subject" type="text" required placeholder="Subject" className="w-full bg-white/5 border-b border-white/20 px-6 py-4 text-white placeholder:text-white/10 focus:border-yellow-accent focus:outline-none transition-all leading-none" />
                            </div>

                            <div className="space-y-3 relative group">
                                <label className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em] ml-6">Comments / Questions *</label>
                                <textarea name="message" rows={4} required placeholder="Question" className="w-full bg-white/5 border-b border-white/20 px-6 py-4 text-white placeholder:text-white/10 focus:border-yellow-accent focus:outline-none transition-all resize-none"></textarea>
                            </div>

                            <button type="submit" className="bg-yellow-accent hover:shadow-[0_0_40px_rgba(255,184,0,0.3)] text-black font-black py-5 px-14 rounded-sm transition-all uppercase tracking-[0.3em] text-[10px] mt-4">
                                Contact Us
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

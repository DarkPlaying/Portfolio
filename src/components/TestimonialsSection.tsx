import { CircularTestimonials } from './ui/circular-testimonials';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote:
            "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
        name: "Tamar Mendelson",
        designation: "Restaurant Critic",
        src:
            "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote:
            "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
        name: "Joe Charlescraft",
        designation: "Frequent Visitor",
        src:
            "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
    {
        quote:
            "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Martina Edelweist",
        designation: "Satisfied Customer",
        src:
            "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
];

export const TestimonialsSection = () => (
    <section id="testimonials" className="pt-4 pb-24 bg-black relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="relative mb-20 flex flex-col items-center text-center w-full">
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="block font-great-vibes text-4xl md:text-6xl mb-[-0.4em] relative z-20 drop-shadow-[0_4px_10px_rgba(255,0,80,0.3)] text-[#ff0050]"
                >
                    What They
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-[4.5rem] lg:text-[6.5rem] font-serif-display text-white uppercase tracking-tighter leading-none italic"
                >
                    Think
                </motion.h2>

                <div className="mt-2 relative group">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]"
                    >
                        Feedback From the
                    </motion.p>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]"
                    >
                        System
                    </motion.span>
                </div>
            </div>

            {/* Global Unified Design Style */}
            <motion.div
                animate={{
                    borderColor: ["rgba(255,255,255,0.08)", "rgba(255,0,80,0.2)", "rgba(255,255,255,0.08)"],
                    boxShadow: ["0 0 20px rgba(255,0,80,0)", "0 0 50px rgba(255,0,80,0.15)", "0 0 20px rgba(255,0,80,0)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-zinc-950/40 backdrop-blur-2xl border p-12 md:p-20 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0050]/10 to-transparent pointer-events-none opacity-60" />

                <CircularTestimonials
                    testimonials={testimonials}
                    autoplay={true}
                    colors={{
                        name: "#f7f7ff",
                        designation: "#e1e1e1",
                        testimony: "#f1f1f7",
                        arrowBackground: "#141414",
                        arrowForeground: "#f1f1f7",
                        arrowHoverBackground: "#ff0050",
                    }}
                    fontSizes={{
                        name: "28px",
                        designation: "20px",
                        quote: "20px",
                    }}
                />
            </motion.div>
        </div>
    </section>
);

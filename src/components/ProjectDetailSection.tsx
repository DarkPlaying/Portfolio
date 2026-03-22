import { motion, useTransform } from 'framer-motion';

interface ProjectDetailProps {
    projId: string;
    titleMain: string;
    titleSub: string;
    subtitle: string;
    description: string;
    imagePath: string;
    colorClass: string;
    glowColor: string;
    features: { title: string; icon: any }[];
    scrollYProgress: any;
    parallaxValue: [number, number];
}

export function ProjectDetailSection({ titleMain, titleSub, subtitle, description, imagePath, colorClass, glowColor, features, scrollYProgress, parallaxValue }: ProjectDetailProps) {
    const projectImageY = useTransform(scrollYProgress, parallaxValue, [60, -60]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center w-full max-w-full overflow-hidden">
            {/* Left Column: Stylized Image (Col-6) */}
            <div className="lg:col-span-6 relative mt-16 lg:mt-0 order-1 lg:order-1 px-4 lg:px-0">
                <div className="absolute -top-10 -left-6 text-white/40 animate-pulse">
                    <span className="text-3xl">✦</span>
                </div>
                <div className="absolute top-1/4 -right-8 opacity-30 animate-pulse delay-300" style={{ color: glowColor.replace('0.2', '1').replace('0.3', '1') }}>
                    <span className="text-2xl">✦</span>
                </div>
                <div className="absolute -bottom-12 left-1/4 opacity-20 animate-bounce delay-700" style={{ color: glowColor.replace('0.2', '1').replace('0.3', '1') }}>
                    <span className="text-5xl">✦</span>
                </div>

                <motion.div
                    style={{ y: projectImageY }}
                    initial={{ opacity: 0, scale: 0.98, rotate: -1 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                        filter: [
                            `drop-shadow(0 0 60px ${glowColor})`,
                            `drop-shadow(0 0 100px ${glowColor.replace('0.2', '0.4').replace('0.3', '0.5')})`,
                            `drop-shadow(0 0 60px ${glowColor})`
                        ]
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative group p-2 md:p-4"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-white/30 aspect-video bg-zinc-950/50 shadow-2xl transition-all duration-700">
                        <img
                            src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${imagePath}`}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            alt={titleMain}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 mix-blend-soft-light" />
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Content (Col-6) */}
            <div className="lg:col-span-6 flex flex-col items-start text-left relative z-10 order-2 lg:order-2 lg:pl-6 px-4 md:px-0 w-full max-w-full overflow-visible">
                <div className="absolute -top-12 -right-6 text-white/20 animate-pulse pointer-events-none">
                    <span className="text-4xl">✦</span>
                </div>
                <div className="absolute top-1/2 -left-12 opacity-10 animate-pulse delay-500" style={{ color: glowColor.replace('0.2', '1').replace('0.3', '1') }}>
                    <span className="text-6xl">✦</span>
                </div>

                <div className="relative mb-14 flex flex-col items-start pt-16 lg:pt-0 max-w-full overflow-visible">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`block font-great-vibes text-4xl md:text-6xl mb-[-0.4em] ml-2 relative z-20 drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)] ${colorClass}`}
                    >
                        {titleMain}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-serif-display text-white uppercase tracking-tighter leading-none italic break-words w-full"
                    >
                        {titleSub}
                    </motion.h2>
                    <span className={`absolute -bottom-6 -right-2 font-great-vibes text-3xl md:text-4xl opacity-40 rotate-[-12deg] pointer-events-none select-none ${colorClass}`}>
                        {subtitle}
                    </span>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 text-base md:text-lg font-outfit font-light max-w-lg mb-10 leading-relaxed tracking-wide"
                >
                    {description}
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
                    {features.map((item, idx) => (
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
                                    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center p-1.5 transition-colors group-hover:bg-white/10`}
                                >
                                    <item.icon className={`${colorClass} w-full h-full opacity-60 group-hover:opacity-100`} />
                                </motion.div>
                                <h4 className="text-white font-bold font-outfit uppercase tracking-[0.2em] text-[10px] lg:text-[11px]">{item.title}</h4>
                            </div>
                            <motion.div
                                animate={{
                                    width: ["0%", "100%", "0%"],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.8 }}
                                className="absolute bottom-0 left-0 h-[1px] bg-white opacity-20"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

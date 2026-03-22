import { motion } from 'framer-motion';

export function AboutMe() {
    return (
        <section id="about-section" className="relative py-20 bg-black overflow-hidden lg:hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center gap-12">
                    {/* Stylized Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <h2 className="font-signature text-6xl text-[#EAB308] drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            About Me
                        </h2>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#ff0050] to-transparent" />
                    </motion.div>

                    {/* Bio Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-white/80 font-mono text-[11px] md:text-sm leading-relaxed tracking-[0.15em] uppercase max-w-sm drop-shadow-sm"
                    >
                        I'M SANJAY M, AN ASPIRING SOFTWARE DEVELOPER AND CYBERSECURITY ENTHUSIAST FROM CHENNAI, CURRENTLY PURSUING A B.SC. COMPUTER SCIENCE AT VEL TECH RANGA SANKU ARTS COLLEGE.
                    </motion.p>

                    {/* Decorative element */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        className="w-full max-w-xs h-px bg-white/10"
                    />
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#ff0050]/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#EAB308]/5 blur-[100px] rounded-full" />
            </div>
        </section>
    );
}

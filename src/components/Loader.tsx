"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoaderProps {
    children: React.ReactNode
}

export function Loader({ children }: LoaderProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
                >
                    <div className="flex flex-col items-center gap-12 relative">
                        {/* 4 Professional Dots Sequence */}
                        <div className="flex gap-4 md:gap-6">
                            {[
                                { color: "bg-cyan-400", delay: 0 },
                                { color: "bg-blue-500", delay: 0.1 },
                                { color: "bg-purple-400", delay: 0.2 },
                                { color: "bg-[#ff0050]", delay: 0.3 }
                            ].map((dot, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        opacity: [0.2, 1, 0.2],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        ease: "easeInOut", 
                                        delay: dot.delay 
                                    }}
                                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${dot.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col items-center"
                            >
                                <h1
                                    className="text-white text-xl md:text-2xl tracking-[1em] font-light uppercase mb-1 ml-[1em]"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Sanjay M
                                </h1>
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ff0050] to-transparent opacity-50" />
                            </motion.div>

                            <div className="flex flex-col items-center gap-3">
                                <span className="text-[9px] text-zinc-500 tracking-[0.5em] uppercase font-mono">
                                    Developer Portfolio
                                </span>
                                
                                {/* Professional progress bar */}
                                <div className="h-[1px] w-32 bg-white/5 overflow-hidden relative">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                        className="h-full w-1/2 absolute bg-gradient-to-r from-transparent via-[#ff0050]/50 to-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="contents"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

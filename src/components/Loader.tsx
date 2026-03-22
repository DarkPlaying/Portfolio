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
                    <div className="flex flex-col items-center gap-16 relative">
                        {/* 4 Cards Hovering Sequence */}
                        <div className="flex gap-4 md:gap-8 text-4xl md:text-7xl font-serif">
                            <motion.span
                                animate={{ opacity: [0.1, 1, 0.1], scale: [0.9, 1.1, 0.9], filter: ['blur(4px)', 'blur(0px)', 'blur(4px)'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                            >
                                ♠
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0.1, 1, 0.1], scale: [0.9, 1.1, 0.9], filter: ['blur(4px)', 'blur(0px)', 'blur(4px)'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                            >
                                ♦
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0.1, 1, 0.1], scale: [0.9, 1.1, 0.9], filter: ['blur(4px)', 'blur(0px)', 'blur(4px)'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                className="text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.8)]"
                            >
                                ♣
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0.1, 1, 0.1], scale: [0.9, 1.1, 0.9], filter: ['blur(4px)', 'blur(0px)', 'blur(4px)'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                                className="text-[#ff0050] drop-shadow-[0_0_20px_rgba(255,0,80,0.8)]"
                            >
                                ♥
                            </motion.span>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <motion.h1
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-white text-xl md:text-2xl tracking-[0.5em] uppercase font-bold"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Initializing
                            </motion.h1>

                            {/* Scanning bar */}
                            <div className="h-[2px] w-48 bg-white/10 overflow-hidden rounded-full mt-2 relative">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full w-full absolute bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,1)]"
                                />
                            </div>
                            <span className="text-[9px] text-zinc-500 tracking-[0.6em] uppercase font-mono mt-2">
                                Entering The Borderland
                            </span>
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

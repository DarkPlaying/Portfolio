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
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col items-center"
                            >
                                <h1
                                    className="text-white text-2xl md:text-5xl tracking-[0.6em] font-medium uppercase mb-0 ml-[0.6em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Sanjay M
                                </h1>
                            </motion.div>

                            <div className="flex flex-col items-center gap-6">
                                <span className="text-sm text-zinc-400 tracking-[0.8em] uppercase font-mono">
                                    Developer Portfolio
                                </span>

                                {/* Professional progress bar */}
                                <div className="h-[3px] w-64 bg-white/10 overflow-hidden relative rounded-full">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                        className="h-full w-1/2 absolute bg-gradient-to-r from-transparent via-[#ff0050] to-transparent shadow-[0_0_25px_rgba(255,0,80,1)]"
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

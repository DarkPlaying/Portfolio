"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loading as CircleLoader } from "./ui/circle-unique-load"

interface LoaderProps {
    children: React.ReactNode
}

export function Loader({ children }: LoaderProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleLoad = () => {
            // Small extra delay for visual smoothness before revealing content
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
                >
                    <CircleLoader screenHFull={false} />
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="contents"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

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
        let assetsLoaded = false;
        let heroImagesReady = false;

        const checkReady = () => {
            if (assetsLoaded && heroImagesReady) {
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        };

        const handleWindowLoad = () => {
            assetsLoaded = true;
            checkReady();
        };

        const handleHeroImagesLoad = () => {
            heroImagesReady = true;
            checkReady();
        };

        if (document.readyState === "complete") {
            assetsLoaded = true;
            checkReady();
        } else {
            window.addEventListener("load", handleWindowLoad);
        }

        window.addEventListener("heroImagesLoaded", handleHeroImagesLoad);

        // Fail-safe
        const fallback = setTimeout(() => {
            heroImagesReady = true;
            assetsLoaded = true;
            checkReady();
        }, 8000);

        return () => {
            window.removeEventListener("load", handleWindowLoad);
            window.removeEventListener("heroImagesLoaded", handleHeroImagesLoad);
            clearTimeout(fallback);
        };
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

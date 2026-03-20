import { cva } from "class-variance-authority"
import type { HTMLMotionProps } from "framer-motion"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const morphingSquareVariants = cva("flex gap-2 items-center justify-center", {
    variants: {
        messagePlacement: {
            bottom: "flex-col",
            top: "flex-col-reverse",
            right: "flex-row",
            left: "flex-row-reverse",
        },
    },
    defaultVariants: {
        messagePlacement: "bottom",
    },
})

export interface MorphingSquareProps {
    message?: string
    /**
     * Position of the message relative to the spinner.
     * @default bottom
     */
    messagePlacement?: "top" | "bottom" | "left" | "right"
}

export function MorphingSquare({
    className,
    message,
    messagePlacement = "bottom",
    ...props
}: HTMLMotionProps<"div"> & MorphingSquareProps) {
    return (
        <div className={cn(morphingSquareVariants({ messagePlacement }))}>
            <motion.div
                className={cn("w-16 h-16 bg-blue-500", className)}
                animate={{
                    borderRadius: ["6%", "50%", "6%"],
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                {...props}
            />
            {message && (
                <div className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase mt-6 animate-pulse">
                    {message}
                </div>
            )}
        </div>
    )
}

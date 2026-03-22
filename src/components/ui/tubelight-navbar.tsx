import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    activeTab?: string
}

export function NavBar({ items, className, activeTab: activeTabProp }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(activeTabProp || items[0].name)

    // Sync internal state with prop
    useEffect(() => {
        if (activeTabProp) {
            setActiveTab(activeTabProp)
        }
    }, [activeTabProp])

    // Update active tab based on scroll position/hash
    useEffect(() => {
        const handleHashChange = () => {
            // Only use hash if we don't have a prop controlling us
            if (activeTabProp) return;

            const currentHash = window.location.hash || "#home"
            const activeItem = items.find(item => item.url === currentHash)
            if (activeItem) setActiveTab(activeItem.name)
        }
        window.addEventListener("hashchange", handleHashChange)
        handleHashChange() // initial check
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [items, activeTabProp])

    return (
        <div
            className={cn(
                "fixed bottom-0 md:top-4 left-1/2 -translate-x-1/2 z-[100] mb-6 md:mb-0",
                className,
            )}
        >
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-[0_0_20px_rgba(255,0,80,0.1)]">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-[10px] md:text-xs font-bold px-4 md:px-6 py-2 rounded-full transition-all duration-300 uppercase tracking-widest",
                                "text-white/50 hover:text-white",
                                isActive && "text-[#ff0050]",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-[#ff0050]/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#ff0050] rounded-t-full shadow-[0_0_15px_rgba(255,0,80,0.5)]">
                                        <div className="absolute w-12 h-6 bg-[#ff0050]/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-[#ff0050]/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-[#ff0050]/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

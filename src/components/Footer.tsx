

export function Footer() {
    return (
        <footer className="bg-[#050505] py-12 border-t border-white/[0.05]">
            <div className="container mx-auto px-6 text-center">
                <p className="text-zinc-500 text-xs font-mono tracking-[0.3em] uppercase mb-4">
                    © {new Date().getFullYear()} <span className="text-white font-bold italic">SANJAY M</span>. All rights reserved.
                </p>
                <div className="h-[1px] w-8 bg-[#ff0050]/30 mx-auto mb-4" />
                <p className="text-gray-600 text-xs mt-2">
                    Designed and built with React & Tailwind CSS
                </p>
            </div>
        </footer>
    );
}

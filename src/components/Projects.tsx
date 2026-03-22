

export function Projects() {
    const basePath = import.meta.env.BASE_URL;

    const projects = [
        {
            id: 'alice',
            src: `${basePath}projects/alice.png`,
            alt: 'Alice Gaming Website',
            description: 'ONLINE GAMING WEBSITE DEVELOPED IN REACT AND SUPABASE. 4 SHAPES, 4 TYPES OF GAMES.',
            className: "col-start-2 col-span-2 row-start-2 row-span-2 z-20 scale-110", // Center prominent
        },
        {
            id: 'education',
            src: `${basePath}projects/education.png`,
            alt: 'Education Platform',
            className: "col-start-3 col-span-1 row-start-1 row-span-1 z-10", // Top Right
        },
        {
            id: 'weather',
            src: `${basePath}projects/recipe .png`, // Reusing recipe as weather based on mockup position
            alt: 'Weather App',
            className: "col-start-1 col-span-1 row-start-2 row-span-1 z-10 scale-90", // Middle Left
        },
        {
            id: 'ignixion',
            src: `${basePath}projects/ignixion.png`,
            alt: 'Ignixion Events',
            className: "col-start-1 col-span-1 row-start-1 row-span-1 z-10 scale-90", // Top Left
        },
        {
            id: 'voice',
            src: `${basePath}projects/spline.png`, // Reusing spline as voice/recipe based on mockup position
            alt: 'Voice Assistant',
            className: "col-start-4 col-span-1 row-start-2 row-span-1 z-10 scale-90", // Middle Right
        },
        {
            id: 'ctf',
            src: `${basePath}projects/cyber.png`,
            alt: 'Hackathon CTF',
            className: "col-start-2 col-span-1 row-start-4 row-span-1 z-10", // Bottom Middle-Left
        },
        {
            id: 'squid',
            src: `${basePath}projects/squid.png`,
            alt: 'SQUID AI',
            className: "col-start-3 col-span-1 row-start-4 row-span-1 z-10", // Bottom Middle-Right
        }
    ];

    return (
        <section id="projects" className="relative z-10 bg-black min-h-screen py-24 snap-start scroll-mt-24 overflow-hidden">
            {/* Header */}
            <div className="relative z-50 text-center container mx-auto px-4 mb-32">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap');
                    .font-outfit { font-family: 'Outfit', sans-serif; }
                    `}
                </style>
                <div className="flex items-center justify-center gap-4 mb-6 opacity-60">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ff0050]" />
                    <span className="text-[10px] font-mono font-bold text-[#ff0050] uppercase tracking-[0.5em]">System Storage</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ff0050]" />
                </div>
                <h2 className="text-5xl md:text-8xl font-black font-bebas text-white tracking-[0.05em] uppercase mb-4 leading-none inline-flex flex-wrap justify-center gap-x-4 md:gap-x-8 relative group cursor-default">
                    <span className="relative z-10 hover:text-[#ff0050] transition-colors duration-300">Inven</span>
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#ff0050] to-[#ff0050]/40 drop-shadow-[0_0_30px_rgba(255,0,80,0.5)]">tory</span>
                </h2>
                <p className="text-[#ff0050]/60 tracking-[0.4em] md:tracking-[0.6em] uppercase text-[8px] md:text-xs font-mono font-bold drop-shadow-[0_0_5px_rgba(255,0,80,0.2)]">
                    [ ACCESSING_SECURE_REPOSITORY ]
                </p>
            </div>

            {/* Static Roadmap Grid */}
            <div className="relative container mx-auto px-4 min-h-[600px] md:h-[800px] w-full max-w-6xl">

                {/* SVG Connectors Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,0,80,0.4))' }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ff0050" />
                        </marker>
                    </defs>

                    {/* Education to Alice */}
                    <path
                        d="M 70% 25% C 60% 30%, 65% 40%, 55% 45%"
                        fill="none" stroke="#ff0050" strokeWidth="1.5" strokeDasharray="6 8"
                        strokeOpacity="0.3"
                        markerEnd="url(#arrowhead)"
                        className="animate-[dash_25s_linear_infinite]"
                    />

                    {/* Ignixion to Weather */}
                    <path
                        d="M 25% 25% C 20% 35%, 15% 40%, 20% 50%"
                        fill="none" stroke="#ff0050" strokeWidth="1.5" strokeDasharray="6 8"
                        strokeOpacity="0.3"
                        markerEnd="url(#arrowhead)"
                        className="animate-[dash_25s_linear_infinite]"
                    />

                    {/* Left edge to Center Bottom */}
                    <path
                        d="M 25% 70% C 30% 80%, 35% 85%, 45% 85%"
                        fill="none" stroke="#ff0050" strokeWidth="1.5" strokeDasharray="6 8"
                        strokeOpacity="0.3"
                        markerEnd="url(#arrowhead)"
                        className="animate-[dash_25s_linear_infinite]"
                    />

                    {/* Voice to SQUID */}
                    <path
                        d="M 80% 60% C 85% 75%, 80% 85%, 70% 85%"
                        fill="none" stroke="#ff0050" strokeWidth="1.5" strokeDasharray="6 8"
                        strokeOpacity="0.3"
                        markerEnd="url(#arrowhead)"
                        className="animate-[dash_25s_linear_infinite]"
                    />
                </svg>

                <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 gap-4 md:gap-10 h-full w-full relative z-10">
                    {projects.map((project) => (
                        <div key={project.id} className={`relative group rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:z-50 hover:border-[#ff0050]/40 hover:shadow-[0_0_30px_rgba(255,0,80,0.15)] bg-black/40 backdrop-blur-xl flex items-center justify-center ${project.id === 'alice' ? 'col-span-2 row-span-2 md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2 scale-100 md:scale-110' : 'col-span-1 row-span-1'}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <img
                                src={project.src}
                                alt={project.alt}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                            />
                            {project.description && (
                                <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <h3 className="text-xl font-black font-outfit text-white mb-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{project.alt}</h3>
                                    <div className="w-10 h-[2px] bg-[#ff0050] mb-4" />
                                    <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase tracking-wider">{project.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </section>
    );
}

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, MessageSquare, Star } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';
export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = useMemo(() => [
        { name: 'Home', url: '#home', icon: Home },
        { name: 'About', url: '#about', icon: User },
        { name: 'Projects', url: '#projects', icon: Briefcase },
        { name: 'Testimonials', url: '#testimonials', icon: Star },
        { name: 'Contact', url: '#contact', icon: MessageSquare },
    ], []);

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = navLinks.map(link => {
                const id = link.url.startsWith('#') ? link.url.slice(1) : null;
                if (!id) return null;
                const element = document.getElementById(id);
                if (!element) return null;
                const rect = element.getBoundingClientRect();
                return { name: link.name, top: rect.top, bottom: rect.bottom };
            }).filter(Boolean) as { name: string, top: number, bottom: number }[];

            // Add about-details manually to the observed sections for mapping
            const aboutDetails = document.getElementById('about-details');
            if (aboutDetails) {
                const rect = aboutDetails.getBoundingClientRect();
                sections.push({ name: 'About', top: rect.top, bottom: rect.bottom });
            }

            // Same for projects-details
            const projectDetails = document.getElementById('projects-details');
            if (projectDetails) {
                const rect = projectDetails.getBoundingClientRect();
                sections.push({ name: 'Projects', top: rect.top, bottom: rect.bottom });
            }

            const viewportHeight = window.innerHeight;
            const triggerPoint = viewportHeight * 0.3;

            let current = 'Home';
            // Reverse loop to give precedence to sections further down the page
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.top <= triggerPoint && section.bottom >= triggerPoint) {
                    current = section.name;
                    break;
                }
            }
            
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScrollSpy);
        handleScrollSpy();
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, [navLinks]);

    return (
        <nav
            className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <a href="#home" className="text-2xl font-black font-outfit tracking-tighter text-white uppercase group flex items-center">
                    <span className="absolute font-signature text-2xl  mt-5 md:text-3xl text-white opacity-90 rotate-[-5deg] pointer-events-none drop-shadow-xl">SANJAY M</span>
                </a>

                {/* Tubelight Nav - Centered */}
                <div className="hidden md:block">
                    <NavBar items={navLinks} activeTab={activeSection} />
                </div>

                <div className="hidden md:block">
                    <motion.a
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0 0 0px rgba(255,0,80,0)", "0 0 15px rgba(255,0,80,0.3)", "0 0 0px rgba(255,0,80,0)"]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/resume.pdf`}
                        download="Sanjay_Resume.pdf"
                        className="bg-white text-black px-6 py-2.5 rounded-xl font-black font-outfit text-xs uppercase tracking-widest hover:bg-[#ff0050] hover:text-white transition-all relative z-10"
                    >
                        Grab Resume
                    </motion.a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-gray-800 flex flex-col items-center py-6 gap-6 shadow-2xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-300 hover:text-white text-lg font-medium tracking-wide"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        download="Sanjay_Resume.pdf"
                        className="bg-white text-black px-6 py-3 rounded-full font-semibold mt-4 hover:bg-gray-200 transition-colors text-center w-3/4"
                    >
                        Grab Resume
                    </a>
                </div>
            )}
        </nav>
    );
}

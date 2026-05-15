import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AliceProjectDetails } from './components/AliceProjectDetails';
import { Contact } from './components/Contact';
import { OtherProjects } from './components/OtherProjects';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

import { AboutMe } from './components/AboutMe';
import { ScrollVideoPart2 } from './components/ScrollVideoPart2';
import { SpotlightCursor } from './components/ui/spotlight-cursor';

function App() {
  useEffect(() => {
    // Force start at top on reload
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 0.4,
      lerp: 0.4,
      syncTouch: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.0,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <SpotlightCursor config={{ color: '#FFFFFF', radius: 400, brightness: 0.15 }} />
      <Navbar />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 pb-0 relative">
        <main>
          <Hero />
          <AboutMe />
          <OtherProjects />
          {/* ScrollVideoPart2 - Only on Laptops */}
          <div className="hidden lg:block">
            <ScrollVideoPart2 />
          </div>
          <AliceProjectDetails />
          <TestimonialsSection />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;

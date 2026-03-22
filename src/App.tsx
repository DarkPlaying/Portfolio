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
import { Loader } from './components/Loader';
import { ScrollVideoPart2 } from './components/ScrollVideoPart2';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
    <Loader>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 scroll-smooth pb-0 relative">
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
    </Loader >
  );
}

export default App;

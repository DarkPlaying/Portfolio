import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollVideoPart2 } from './components/ScrollVideoPart2';
import { AliceProjectDetails } from './components/AliceProjectDetails';
import { Contact } from './components/Contact';
import { OtherProjects } from './components/OtherProjects';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

import { Loader } from './components/Loader';

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
      <div className="min-h-screen bg-black text-white font-sans overflow-clip selection:bg-blue-500/30 snap-y snap-mandatory scroll-smooth pb-0">
        <Navbar />
        <main>
          <Hero />
          <OtherProjects />
          <ScrollVideoPart2 />
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

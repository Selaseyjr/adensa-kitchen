import React from 'react';

import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar } from './components';
import './App.css';

const App = () => {
  React.useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    const revealAll = () => revealElements.forEach((element) => element.classList.add('is-revealed'));

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return undefined;
    }

    // Embedded browsers that never produce rendering frames cannot fire
    // IntersectionObserver callbacks; reveal everything statically there.
    let frames = 0;
    const countFrame = () => {
      frames += 1;
      if (frames < 3) window.requestAnimationFrame(countFrame);
    };
    window.requestAnimationFrame(countFrame);
    const fallbackTimer = window.setTimeout(() => {
      if (frames === 0) {
        document.documentElement.classList.remove('frames-ok');
        revealAll();
      }
    }, 400);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <AboutUs />
      <SpecialMenu />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUs />
      <Footer />
    </div>
  );
};

export default App;

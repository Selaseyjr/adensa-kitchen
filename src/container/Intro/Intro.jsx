import React from 'react';

import { meal } from '../../constants';
import './Intro.css';

const VISIBLE_THRESHOLD = 0.5;

const Intro = () => {
  const vidRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const video = vidRef.current;
    const section = sectionRef.current;

    if (!video || !section || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= VISIBLE_THRESHOLD) {
            video.play().catch(() => {
              // Autoplay can be rejected by the browser; fail silently.
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [VISIBLE_THRESHOLD] }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app__video" ref={sectionRef}>
      <video
        ref={vidRef}
        src={meal}
        type="video/mp4"
        loop
        controls={false}
        muted
        playsInline
      />
    </div>
  );
};

export default Intro;

import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { Lightbox, SubHeading } from '../../components';
import { images } from '../../constants';
import './Gallery.css';

const galleryImages = [images.gallery01, images.gallery02, images.gallery03, images.gallery04];

const Gallery = () => {
  const scrollRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const [lightboxIndex, setLightboxIndex] = React.useState(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  const showPrevious = React.useCallback(() => {
    setLightboxIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const showNext = React.useCallback(() => {
    setLightboxIndex((current) => (current + 1) % galleryImages.length);
  }, []);

  const closeLightbox = React.useCallback(() => {
    const previousIndex = lightboxIndex;
    setLightboxIndex(null);
    window.requestAnimationFrame(() => {
      cardRefs.current[previousIndex]?.focus();
    });
  }, [lightboxIndex]);

  return (
    <div className="app__gallery flex__center" data-reveal>
      <div className="app__gallery-content">
        <SubHeading title="Instagram" />
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>
          Moments from our kitchen — Ghanaian heritage, plated with a contemporary
          eye, from Accra traditions to the Darmstadt table.
        </p>
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={`gallery_image-${index + 1}`}
              ref={(element) => { cardRefs.current[index] = element; }}
              className="app__gallery-images_card flex__center"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open gallery image ${index + 1} of ${galleryImages.length}`}
            >
              <img src={image} alt={`Adensa Kitchen gallery photograph ${index + 1}`} />
              <BsInstagram className="gallery__image-icon" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <button
            type="button"
            className="gallery__arrow-button"
            aria-label="Scroll gallery backwards"
            onClick={() => scroll('left')}
          >
            <BsArrowLeftShort className="gallery__arrow-icon" />
          </button>
          <button
            type="button"
            className="gallery__arrow-button"
            aria-label="Scroll gallery forwards"
            onClick={() => scroll('right')}
          >
            <BsArrowRightShort className="gallery__arrow-icon" />
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrevious}
          onNext={showNext}
        />
      )}
    </div>
  );
};

export default Gallery;

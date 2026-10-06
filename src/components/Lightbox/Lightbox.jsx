import React from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

import './Lightbox.css';

const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
  const closeButtonRef = React.useRef(null);

  React.useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${images.length}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        ref={closeButtonRef}
        aria-label="Close image view"
        onClick={onClose}
      >
        <FiX />
      </button>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        aria-label="Previous image"
        onClick={(event) => { event.stopPropagation(); onPrev(); }}
      >
        <FiChevronLeft />
      </button>

      <img
        src={images[index]}
        alt={`Adensa Kitchen gallery photograph ${index + 1}`}
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        aria-label="Next image"
        onClick={(event) => { event.stopPropagation(); onNext(); }}
      >
        <FiChevronRight />
      </button>

      <p className="lightbox__counter">{index + 1} / {images.length}</p>
    </div>,
    document.body
  );
};

export default Lightbox;

import React from 'react';

import { ReservationModal, ReservationToast, SubHeading } from '../../components';
import { images } from '../../constants';

const FindUs = () => {
  const triggerRef = React.useRef(null);
  const [reservationOpen, setReservationOpen] = React.useState(false);
  const [toastVisible, setToastVisible] = React.useState(false);

  const openReservation = React.useCallback(() => {
    setToastVisible(false);
    setReservationOpen(true);
  }, []);

  const closeReservation = React.useCallback(() => {
    setReservationOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const confirmReservation = React.useCallback(() => {
    setReservationOpen(false);
    setToastVisible(true);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const dismissToast = React.useCallback(() => setToastVisible(false), []);

  return (
  <div className="app__bg app__wrapper section__padding" id="contact" data-reveal>
    <div className="app__wrapper_info">
      <SubHeading title="Visit Adensa" />
      <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>
        Find Us
      </h1>

      <div className="app__wrapper-content">
        <p className="p__opensans">
          Adensa Kitchen
        </p>
        <p className="p__opensans">
          Neckarstraße 15
        </p>
        <p className="p__opensans">
          64293 Darmstadt
        </p>
        <p className="p__opensans">
          Hessen, Germany
        </p>

        <p
          className="p__cormorant"
          style={{ color: '#DCCA87', margin: '2rem 0' }}
        >
          Opening Hours
        </p>

        <p className="p__opensans">Monday - Friday: 12:00 - 22:00</p>
        <p className="p__opensans">Saturday - Sunday: 12:00 - 23:00</p>
      </div>

      <button
        type="button"
        className="custom__button"
        style={{ marginTop: '2rem' }}
        ref={triggerRef}
        onClick={openReservation}
      >
        Plan Your Visit
      </button>
    </div>

    <div className="app__wrapper_img">
      <img
        src={images.findus}
        alt="Adensa Kitchen in Darmstadt"
        loading="lazy"
        decoding="async"
      />
    </div>

    {reservationOpen && (
      <ReservationModal
        onClose={closeReservation}
        onConfirmed={confirmReservation}
      />
    )}

    <ReservationToast open={toastVisible} onDismissed={dismissToast} />
  </div>);
};

export default FindUs;
import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';

const FindUs = () => (
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
  </div>
);

export default FindUs;
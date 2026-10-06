import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg flex__center section__padding" id="about" data-reveal>
    <div className="app__aboutus-overlay flex__center">
      <img src={images.adensaMark} alt="Adensa Kitchen decorative mark" />
    </div>

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">Our Story</h1>
        <img src={images.spoon} alt="" className="spoon__img" />
        <p className="p__opensans">
          Adensa Kitchen was imagined as a meeting point between heritage and modern
          dining. Inspired by the rich culinary traditions of Ghana and shaped by life
          in Germany, the concept brings familiar West African flavours into a
          contemporary setting.
        </p>
        <button type="button" className="custom__button">Discover Our Story</button>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.knife} alt="" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Our Philosophy</h1>
        <img src={images.spoon} alt="" className="spoon__img" />
        <p className="p__opensans">
          From aromatic spices and slow-cooked dishes to grilled seafood and vibrant
          drinks, every part of the experience is designed around the idea that food
          can connect cultures, places and people.
        </p>
      </div>
    </div>
  </div>
);

export default AboutUs;
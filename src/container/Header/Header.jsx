import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <div className="hero-enter">
        <SubHeading title="A taste of West Africa" />
      </div>
      <h1 className="app__header-h1 hero-enter d1">Where Ghanaian heritage meets contemporary dining.</h1>
      <p className="app__header-tagline hero-enter d2">
        Rooted in the flavours of West Africa and shaped by a modern European perspective,
        Adensa Kitchen brings Ghanaian culinary traditions to the heart of Darmstadt.
      </p>
    </div>
    <div className="app__wrapper_img">
      <img
        src={images.welcome}
        alt="Adensa Kitchen dining experience"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  </div>
);

export default Header;
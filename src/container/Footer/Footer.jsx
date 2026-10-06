import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="login">
    <FooterOverlay />
    <Newsletter />

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Visit Us</h1>
        <p className="p__opensans">Adensa Kitchen</p>
        <p className="p__opensans">Neckarstraße 15</p>
        <p className="p__opensans">64293 Darmstadt</p>
        <p className="p__opensans">Hessen, Germany</p>
        <p className="p__opensans">+49 6151 000000</p>
        <p className="p__opensans">hello@adensa-kitchen.de</p>
      </div>

      <div className="app__footer-links_logo">
        <img src={images.adensaMark} alt="Adensa Kitchen logo" />

        <p className="p__opensans app__footer-tagline">
          ADENSA KITCHEN
        </p>

        <p className="p__opensans">
          Contemporary Ghanaian Dining
        </p>

        <p className="p__opensans">
          Darmstadt, Germany
        </p>

        <img src={images.spoon} alt="" className="spoon__img" style={{ marginTop: 15 }} />

        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Opening Hours</h1>
        <p className="p__opensans">Monday-Friday:</p>
        <p className="p__opensans">12:00 - 22:00</p>
        <p className="p__opensans">Saturday-Sunday:</p>
        <p className="p__opensans">12:00 - 23:00</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">
        © 2026 Adensa Kitchen
      </p>
    </div>
  </div>
);

export default Footer;
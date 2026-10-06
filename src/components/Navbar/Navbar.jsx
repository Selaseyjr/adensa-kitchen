import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.adensaMark} alt="Adensa Kitchen" />
        <div className="app__navbar-logo_text">
          <p className="app__navbar-logo_title">Adensa Kitchen</p>
          <p className="app__navbar-logo_subtitle">Contemporary Ghanaian Dining</p>
        </div>
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#about">Our Story</a></li>
        <li className="p__opensans"><a href="#menu">Menu</a></li>
        <li className="p__opensans"><a href="#experience">Experience</a></li>
        <li className="p__opensans"><a href="#contact">Visit</a></li>
      </ul>

      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Newsletter</a>
        <div />
        <a href="#contact" className="p__opensans">Plan a Visit</a>
      </div>

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />

            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>Our Story</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#experience" onClick={() => setToggleMenu(false)}>Experience</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Visit</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

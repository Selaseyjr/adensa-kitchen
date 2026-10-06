import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

import images from '../../constants/images';
import './Navbar.css';

const NAV_LINKS = [
  ['Home', '#home'],
  ['Our Story', '#about'],
  ['Menu', '#menu'],
  ['Chef', '#chef'],
  ['Experience', '#experience'],
  ['Visit', '#contact'],
];

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('#home');
  const toggleButtonRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);

  React.useEffect(() => {
    const sections = NAV_LINKS
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!toggleMenu) return undefined;

    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setToggleMenu(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      toggleButtonRef.current?.focus();
    };
  }, [toggleMenu]);

  return (
    <nav className="app__navbar" aria-label="Primary">
      <div className="app__navbar-logo">
        <img src={images.adensaMark} alt="Adensa Kitchen" />
        <div className="app__navbar-logo_text">
          <p className="app__navbar-logo_title">Adensa Kitchen</p>
          <p className="app__navbar-logo_subtitle">Contemporary Ghanaian Dining</p>
        </div>
      </div>

      <ul className="app__navbar-links">
        {NAV_LINKS.map(([label, href]) => (
          <li key={href} className="p__opensans">
            <a
              href={href}
              className={activeSection === href ? 'active' : undefined}
              aria-current={activeSection === href ? 'true' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Newsletter</a>
        <div />
        <a href="#contact" className="p__opensans">Plan a Visit</a>
      </div>

      <div className="app__navbar-smallscreen">
        <button
          type="button"
          className="app__navbar-smallscreen_toggle"
          aria-label="Open navigation menu"
          aria-expanded={toggleMenu}
          ref={toggleButtonRef}
          onClick={() => setToggleMenu(true)}
        >
          <GiHamburgerMenu fontSize={27} />
        </button>

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <button
              type="button"
              className="overlay__close"
              aria-label="Close navigation menu"
              ref={closeButtonRef}
              onClick={() => setToggleMenu(false)}
            >
              <MdOutlineRestaurantMenu fontSize={27} />
            </button>

            <ul className="app__navbar-smallscreen_links">
              {NAV_LINKS.map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={() => setToggleMenu(false)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

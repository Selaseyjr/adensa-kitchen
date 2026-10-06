import React from 'react';

import { SubHeading, MenuItem } from '../../components';
import { data, images } from '../../constants';
import './SpecialMenu.css';

const INITIAL_VISIBLE_ITEMS = 2;

const featuredDishes = [
  ...data.mainDishes,
  data.iceChilledBeverages[0],
];

const SpecialMenu = () => {
  const [showAllItems, setShowAllItems] = React.useState(false);
  const menuRef = React.useRef(null);

  const visibleBeverages = showAllItems
    ? data.iceChilledBeverages
    : data.iceChilledBeverages.slice(0, INITIAL_VISIBLE_ITEMS);
  const visibleDishes = showAllItems
    ? data.mainDishes
    : data.mainDishes.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleToggle = () => {
    setShowAllItems((prev) => !prev);
  };

  React.useEffect(() => {
    if (showAllItems && menuRef.current) {
      menuRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showAllItems]);

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu" data-reveal>
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palatte" />
        <h1 className="headtext__cormorant">Today&apos;s Special</h1>
      </div>

      <div className="app__specialMenu-menu" ref={menuRef}>
        <div className="app__specialMenu-menu_beverages  flex__center">
          <p className="app__specialMenu-menu_heading">Ice-Chilled Beverages</p>
          <div className="app__specialMenu_menu_items">
            {visibleBeverages.map((beverage, index) => (
              <MenuItem
                key={beverage.title + index}
                title={beverage.title}
                price={beverage.price}
                tags={beverage.tags}
              />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_img">
          <div className="app__specialMenu-menu_collage">
            {featuredDishes.map((dish) => (
              <img key={dish.title} src={dish.img} alt={dish.title} data-reveal />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_dishes  flex__center">
          <p className="app__specialMenu-menu_heading">Main Dishes</p>
          <div className="app__specialMenu_menu_items">
            {visibleDishes.map((dish, index) => (
              <MenuItem
                key={dish.title + index}
                title={dish.title}
                price={dish.price}
                tags={dish.tags}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 15 }}>
        <button type="button" className="custom__button" onClick={handleToggle}>
          {showAllItems ? 'View Less' : 'View More'}
        </button>
      </div>
    </div>
  );
};

export default SpecialMenu;

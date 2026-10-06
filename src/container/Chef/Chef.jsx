import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => (
  <div className="app__bg app__wrapper section__padding" id="chef" data-reveal>
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.chef} alt="Adensa Kitchen chef" />
    </div>

    <div className="app__wrapper_info">
      <SubHeading title="The kitchen" />
      <h1 className="headtext__cormorant">Food with a sense of place.</h1>

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="" />
          <p className="p__opensans">
            Food has a way of carrying memories across borders. At Adensa Kitchen,
            every dish begins with that connection to home and evolves through a
            contemporary perspective.
          </p>
        </div>

        <p className="p__opensans">
          Our approach is simple: respect the ingredients, honour the traditions,
          and create an experience that feels at home in both Ghana and Germany.
        </p>
      </div>

      <div className="app__chef-sign">
        <p>Selasey Gbeddy</p>
        <p className="p__opensans">Chef &amp; Founder</p>
      </div>
    </div>
  </div>
);

export default Chef;
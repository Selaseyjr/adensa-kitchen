import React from 'react';

import { SubHeading } from '../../components';
import { data } from '../../constants';
import './Laurels.css';

const AwardCard = ({ award: { title, subtitle } }) => (
  <div className="app__laurels_awards-card" data-reveal>
    <span className="app__laurels_awards-card_rule" aria-hidden="true" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => (
  <div className="app__bg app__wrapper section__padding" id="experience" data-reveal>
    <div className="app__wrapper_info">
      <SubHeading title="What guides us" />
      <h1 className="headtext__cormorant">Our Philosophy</h1>
      <span className="app__laurels_goldline" aria-hidden="true" />

      <div className="app__laurels_awards">
        {data.awards.map((award) => (
          <AwardCard award={award} key={award.title} />
        ))}
      </div>
    </div>
  </div>
);

export default Laurels;

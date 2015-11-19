import './about.less';

import React from 'react/addons';
import Header from '../../molecules/header/header';

const About = React.createClass({

  render: function() {
    return (
      <div className="about">
        <Header headerText='About' />
        <div className="main">
        </div>
      </div>
    );
  }
});

export default About;

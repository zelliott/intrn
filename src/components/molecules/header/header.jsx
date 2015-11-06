import './header.less';

import React from 'react/addons';
import {Link} from 'react-router';

var Header = React.createClass({

  propTypes: {
    headerText: React.PropTypes.string
  },

  render: function() {
    return (
      <div className='header'>
        <div className='logo'>Logo</div>
        <div className='header-links'>
          <Link to='app'>
            <i className='material-icons'>view_agenda</i> The List
          </Link>
          <Link to='trends'>
            <i className='material-icons'>trending_up</i>Trends
          </Link>
        </div>
      </div>
    );
  }
});

export default Header;

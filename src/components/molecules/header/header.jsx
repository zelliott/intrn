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
          <div><i className='material-icons'>view_agenda</i> The List</div>
          <div><i className='material-icons'>trending_up</i>Trends</div>
        </div>
      </div>
    );
  }
});

export default Header;

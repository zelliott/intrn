import './header.less';
import React from 'react/addons';
import Button from '../../atoms/button/button.jsx'
import {Link} from 'react-router';
import SearchFilter from '../search-filter/search-filter.jsx';
import AppActions from '../../../js/actions/app-actions';

var Header = React.createClass({

  propTypes: {
    headerText: React.PropTypes.string
  },

  showAddCompanyModal: function() {
    AppActions.showModal('add_company');
  },

  render: function() {
    return (
      <div className='header'>
        <div className='header-links'>
          <Link to='app' className='the-list-link'>
            <i className='material-icons'>view_agenda</i> The List
          </Link>
          <Link to='trends' className='trends-link'>
            <i className='material-icons'>trending_up</i>Trends
          </Link>
        </div>
        <div className='header-actions'>
          <Button className='add-company'
            action={this.showAddCompanyModal}
            icon='add' />
          <SearchFilter />
        </div>
        <div className='logo'>
          intrn
        </div>
      </div>
    );
  }
});

export default Header;

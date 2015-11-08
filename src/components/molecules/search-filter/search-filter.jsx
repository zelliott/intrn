import './search-filter.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import InputText from '../../atoms/input-text/input-text.jsx';

const SearchFilter = React.createClass({

  getInitialState: function() {
    return ({
      value: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });

    AppActions.updateSearchFilter(event.target.value);
  },

  render: function() {
    return (
      <div className='search-filter'>
        <i className='material-icons'>search</i>
        <InputText
          name='search-filter'
          value={this.state.value}
          placeholder='Search for companies'
          onChange={this._onChange} />
      </div>
    );
  }
});

export default SearchFilter;

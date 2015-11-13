import './search-filter.less';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import InputText from '../../atoms/input-text/input-text.jsx';

const SearchFilter = React.createClass({

  propTypes: {
    search: React.PropTypes.string
  },

  getInitialState: function() {
    return ({
      search: this.props.search
    });
  },

  _onChange: function(event) {
    this.setState({
      search: event.target.value
    });

    AppActions.setSearch(event.target.value);
  },

  render: function() {
    return (
      <div className='search-filter'>
        <i className='material-icons'>search</i>
        <InputText
          name='search-filter'
          value={this.state.search}
          placeholder='Search for companies'
          onChange={this._onChange} />
      </div>
    );
  }
});

export default SearchFilter;

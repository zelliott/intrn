import './company-list-header.less';
import 'lodash';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions.js';
import ListHeaderButton from '../../molecules/list-header-button/list-header-button.jsx';

const CompanyListHeader = React.createClass({

  propTypes: {
    sortableProps: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState: function() {
    return {
      property: this.props.sortableProps[0],
      comparator: true
    };
  },

  /**
   * This function is bound to each ListHeaderButton, and handles sorting.
   * @param {String} p - name of the property we're sorting
   * @param {Boolean} c - 'asc' if true, 'desc' if false
   */
  _onChange: function(p, c) {
    AppActions.sortCompanies(p, c);

    this.setState({
      property: p,
      comparator: c
    });
  },

  render: function() {
    let headerButtons = this.props.sortableProps.map((p, i) => {

      let active = this.state.property === p;
      let comparator = active ? this.state.comparator : 0;

      return (
        <ListHeaderButton
          className='sortListButton'
          key={i}
          active={active}
          comparator={comparator}
          action={this._onChange}
          text={p} />
      );
    });

    return (
      <div>{headerButtons}</div>
    );
  }
});

export default CompanyListHeader;

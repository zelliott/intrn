import './company-list-header.less';
import 'lodash';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions.js';
import ListHeaderButton from '../../molecules/list-header-button/list-header-button.jsx';

const CompanyListHeader = React.createClass({

  propTypes: {
    defaultProperty: React.PropTypes.string,
    defaultComparator: React.PropTypes.bool,
    comparableProps: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getInitialState: function() {
    return {
      property: this.props.defaultProperty,
      comparator: this.props.defaultComparator
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
    let comparablePropsKeys = _.keys(this.props.comparableProps);
    let headerButtons = comparablePropsKeys.map((p, i) => {

      let active = this.state.property === p;
      let comparator = active ? this.state.comparator : 0;
      let isName = p === 'name';

      let classes = React.addons.classSet({
        'button-section': true,
        'wide-button-section': isName
      });

      return (
        <div className={classes}>
          <ListHeaderButton
            className='header-sort-button'
            key={i}
            active={active}
            property={p}
            comparator={comparator}
            action={this._onChange}
            text={this.props.comparableProps[p]} />
          </div>
      );
    });

    return (
      <div className='list-header'>
        {headerButtons}
      </div>
    );
  }
});

export default CompanyListHeader;

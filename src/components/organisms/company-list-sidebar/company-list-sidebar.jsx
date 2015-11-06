import './company-list-sidebar.less';
import AppActions from '../../../js/actions/app-actions';
import Button from '../../atoms/button/button.jsx';
import SidebarFilter from '../../molecules/sidebar-filter/sidebar-filter.jsx';
import CompanyStore from '../../../js/stores/company-store';

import React from 'react/addons';
import 'lodash';

const CompanyListSidebar = React.createClass({

  propTypes: {
    filters: React.PropTypes.object
  },

  /**
   * This `_.cloneDeep` seems very much like an anti-pattern to me
   */
  getInitialState: function() {
    return ({
      updatedState: true,
      filters: _.cloneDeep(this.props.filters)
    });
  },

  /**
   * This is called whenever any one of the internal <SidebarFilter>
   * elements changes.
   */
  _onFilterChange: function(property, filter) {
    let updatedFilters = this.state.filters;

    updatedFilters[property] = filter;
    this.setState({
      filters: updatedFilters,
      updatedState: this.state.filters === this.props.filters
    });
  },

  /**
   * Called when the update filters button is pressed.
   */
  updateFilters: function() {
    this.setState({
      updatedState: true
    });

    AppActions.updateFilters(this.state.filters);
  },

  render: function() {
    let filters = _.map(this.state.filters, (filter, property) => {
      return (
        <SidebarFilter
          property={property}
          filter={filter}
          action={this._onFilterChange} />
      );
    });

    let classes = React.addons.classSet({
      'update-filters': true,
      disabled: this.state.updatedState,
    });

    return (
      <div>
        <div className='filters'>{filters}</div>
        <div>
          <Button
            className={classes}
            text='Filter list'
            icon='refresh'
            action={this.updateFilters} />
        </div>
      </div>
    );
  }
});

export default CompanyListSidebar;

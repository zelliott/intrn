import './company-list-sidebar.less';
import AppActions from '../../../js/actions/app-actions';
import Button from '../../atoms/button/button.jsx';
import SidebarRangeFilter from '../../molecules/sidebar-range-filter/sidebar-range-filter.jsx';
import CompanyStore from '../../../js/stores/company-store';

import React from 'react/addons';
import 'lodash';

const CompanyListSidebar = React.createClass({

  propTypes: {
    filters: React.PropTypes.object,
    filterableProps: React.PropTypes.object
  },

  /**
   * FIXME: This `_.cloneDeep` seems very much like an anti-pattern to me
   */
  getInitialState: function() {
    return ({
      updatedState: true,
      filters: _.cloneDeep(this.props.filters)
    });
  },

  /**
   * This is called whenever any one of the internal <SidebarRangeFilter>
   * elements changes.
   */
  _onRangeFilterChange: function(property, values) {
    let updatedFilters = this.state.filters;

    updatedFilters[property].values = values;

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
        <div className='sidebar-filter'>
          <div className='filter-name'>{this.props.filterableProps[property]}</div>
          <SidebarRangeFilter
            property={property}
            values={filter.values}
            range={filter.range}
            step={filter.step}
            action={this._onRangeFilterChange} />
        </div>
      );
    });

    let classes = React.addons.classSet({
      'update-filters-button': true,
      disabled: this.state.updatedState,
    });

    return (
      <div>
        <div className='filters'>{filters}</div>
        <div className='update-filters'>
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

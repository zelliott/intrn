import './company-list-sidebar.less';
import AppActions from '../../../js/actions/app-actions';
import Button from '../../atoms/button/button.jsx';
import SidebarRangeFilter from '../../molecules/sidebar-range-filter/sidebar-range-filter.jsx';
import CompanyStore from '../../../js/stores/company-store';
import React from 'react/addons';
import 'lodash';
import $ from 'jquery';
import 'jquery-ui';

const CompanyListSidebar = React.createClass({

  propTypes: {
    filters: React.PropTypes.array
  },

  getInitialState: function() {
    return ({
      updatedState: true,
      filters: _.cloneDeep(this.props.filters)
    });
  },

  componentDidMount: function() {

    // FIXME: Bad to use JQuery for this
    $($(this.getDOMNode()).find('.filter-name i')).tooltip({
      tooltipClass: 'filter-name-tooltip',
      position: {
        my: 'left+25',
        at: 'center'
      },
      hide: false,
      show: {
        effect: 'none',
        delay: 300
      }
    });
  },

  /**
   * This is called whenever any one of the internal <SidebarRangeFilter>
   * elements changes.
   */
  _onRangeFilterChange: function(name, values) {
    let updatedFilters = this.state.filters;

    updatedFilters[name].values = values;

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

    AppActions.setFilters(this.state.filters);
  },

  render: function() {

    let filters = _.map(this.state.filters, (filter, i) => {
      return (
        <div className='sidebar-filter'>
          <div className='filter-name'>
            {filter.displayName}
            <i className='material-icons'
              title={filter.description}>
              info_outline
            </i>
          </div>
          <SidebarRangeFilter
            name={filter.name}
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

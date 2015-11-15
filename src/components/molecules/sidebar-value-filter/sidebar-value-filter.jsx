import './sidebar-value-filter.less';
import React from 'react/addons';
import $ from 'jquery';
import 'jquery-ui';

const SidebarValueFilter = React.createClass({

  propTypes: {
    action: React.PropTypes.func,
    name: React.PropTypes.string,
    values: React.PropTypes.array(React.PropTypes.object)
  },

  getInitialState: function() {
    return ({
      values: _.cloneDeep(this.props.values)
    });
  },

  _onClick: function(event) {
    let updatedValues = this.state.values;
    let value = $(event.target).data('value');

    _.each(updatedValues, (updatedValue, i) => {
      if (updatedValue.value === value) {
        updatedValues[i].selected = !updatedValues[i].selected;
      }
    });

    this.setState({
      values: updatedValues
    });

    this.props.action.call(this, this.props.name, updatedValues);
  },

  render: function() {

    let filterOptions = _.map(this.state.values, value => {
      let classes = React.addons.classSet({
        'selected': value.selected
      });

      return (
        <button
          className={classes}
          onClick={this._onClick}
          data-value={value.value}>
          {value.value}
        </button>
      );
    });

    return (
      <div className='value-filter'>
        {filterOptions}
      </div>
    );
  }
});

export default SidebarValueFilter;

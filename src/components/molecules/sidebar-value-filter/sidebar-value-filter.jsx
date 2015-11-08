import './sidebar-value-filter.less';
import React from 'react/addons';
import $ from 'jquery';
import 'jquery-ui';

const SidebarValueFilter = React.createClass({

  propTypes: {
    action: React.PropTypes.func,
    property: React.PropTypes.string,
    range: React.PropTypes.arrayOf(React.PropTypes.number),
    values: React.PropTypes.arrayOf(React.PropTypes.number),
    step: React.PropTypes.number
  },

  getInitialState: function() {
    return ({
      values: this.props.values
    });
  },

  componentDidMount: function() {
    $(this.getDOMNode()).find('.range').slider({
      range: true,
      min: this.props.range[0],
      max: this.props.range[1],
      step: this.props.step,
      values: this.state.values,
      slide: this._onChange.bind(this)
    });
  },

  componentWillUnmount: function() {
    $(this.getDOMNode()).find('.range').slider('destroy');
  },

  _onChange: function(event, data) {
    this.setState({
      values: data.values
    });

    this.props.action.call(this, this.props.property, data.values);
  },

  render: function() {
    let minValue = this.state.values[0];
    let maxValue = this.state.values[1];

    if (this.props.property === 'salary') {
      minValue = '$' + minValue;
      maxValue = '$' + maxValue;
    }

    return (
      <div className='range-filter clearfix'>
        <div className='range'></div>
        <div className='min'>{minValue}</div>
        <div className='max'>{maxValue}</div>
      </div>
    );
  }
});

export default SidebarValueFilter;

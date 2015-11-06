import './sidebar-range-filter.less';
import InputText from '../../atoms/input-text/input-text.jsx';
import React from 'react/addons';
import $ from 'jquery';
import 'jquery-ui';

const SidebarRangeFilter = React.createClass({

  propTypes: {
    action: React.PropTypes.func,
    property: React.PropTypes.string,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },

  getInitialState: function() {
    return ({
      min: this.props.min,
      max: this.props.max
    });
  },

  componentDidMount: function() {
    $(this.getDOMNode()).find('.range').slider({
      range: true,
      min: 0,
      max: 10000,
      step: Math.floor((10000 - 0) / 20),
      values: [this.state.min, this.state.max],
      slide: this._onChange.bind(this)
    });
  },

  componentWillUnmount: function() {
    $(this.getDOMNode()).find('.range').slider('destroy');
  },

  _onChange: function(event, data) {
    let min = data.values[0];
    let max = data.values[1];

    this.setState({
      min: min,
      max: max
    });

    this.props.action.call(this, this.props.property, min, max);
  },

  render: function() {
    return (
      <div className='range-filter clearfix'>
        <div className='range'></div>
        <div className='min'>{this.state.min}</div>
        <div className='max'>{this.state.max}</div>
      </div>
    );
  }
});

export default SidebarRangeFilter;

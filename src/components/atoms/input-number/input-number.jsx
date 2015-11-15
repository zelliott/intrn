import './input-number.less';

import React from 'react/addons';

const InputNumber = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },

  render: function() {
    return (
      <input className='input-number'
        type='number'
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        min={this.props.min}
        max={this.props.max} />
    );
  }
});

export default InputNumber;

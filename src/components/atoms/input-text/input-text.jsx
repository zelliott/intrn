import './input-text.less';

import React from 'react/addons';

const InputText = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  render: function() {
    return (
      <input className='input-text'
        type='text'
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus} />
    );
  }
});

export default InputText;

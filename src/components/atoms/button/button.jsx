import './button.less';

import React from 'react/addons';

const Button = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    action: React.PropTypes.func,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    onMouseDown: React.PropTypes.func
  },

  render: function() {
    let icon;

    if (this.props.icon) {
      icon = <i className='material-icons'>{this.props.icon}</i>;
    }

    return (
      <button className={this.props.className}
        onClick={this.props.action}
        onMouseDown={this.props.onMouseDown}>
        {this.props.text}
        {icon}
      </button>
    );
  }
});

export default Button;

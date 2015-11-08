import './data-bar.less';

import React from 'react/addons';

var DataBar = React.createClass({

  propTypes: {
    percent: React.PropTypes.number,
  },

  render: function() {
    let flooredPercent = Math.floor(this.props.percent / 10) * 10;

    return (
      <div className='data-bar'>
        <div className='data-value'>{this.props.percent}</div>
        <div className={'bar-value bar-value-' + flooredPercent}></div>
      </div>
    );
  }
});

export default DataBar;

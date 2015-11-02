import './company.less';

import React from 'react/addons';

var Company = React.createClass({

  render: function() {
    return (
      <div className='company'>
        {this.props.children}
      </div>
    );
  }
});

export default Company;

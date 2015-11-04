import './company.less';

import React from 'react/addons';

var Company = React.createClass({

  render: function() {
    let company = this.props.children;

    return (
      <div className='company'>
        <div>{company.rating}</div>
        <div className='company-name'>{company.name}</div>
        <div>{company.salary}</div>
        <div>{company.funness}</div>
        <div>{company.perks}</div>
        <div>{company.difficulty}</div>
        <div>{company.classSize}</div>
        <div>{company.length}</div>
      </div>
    );
  }
});

export default Company;

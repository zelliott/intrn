import './company.less';

import React from 'react/addons';
import DataBar from '../data-bar/data-bar.jsx';

var Company = React.createClass({

  render: function() {
    let company = this.props.children;

    return (
      <div className='company'>
        <div className='data-text company-rating'>{company.rating}</div>
        <div className='data-text company-name'>{company.name}</div>
        <div className='data-text company-salary'>{'$ ' + company.salary}</div>
        <DataBar percent={company.funness} />
        <DataBar percent={company.perks} />
        <DataBar percent={company.difficulty} />
      </div>
    );
  }
});

export default Company;

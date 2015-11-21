import './company-list.less';
import 'lodash';
import React from 'react/addons';
import Company from '../../molecules/company/company.jsx';

const CompanyList = React.createClass({

  propTypes: {
    companies: React.PropTypes.array,
  },

  render: function() {
    let companies = _.map(this.props.companies, company => {
      return (
        <Company key={company.id}>
          {company}
        </Company>
      );
    });

    if (this.props.companies.length > 0) {
      return (
        <div className='company-list'>
          {companies}
        </div>
      );
    } else {
      return (
        <div className='no-companies'>No companies match this search</div>
      );
    }
  }
});

export default CompanyList;

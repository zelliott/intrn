import './company-list.less';
import 'lodash';
import React from 'react/addons';
import Company from '../../molecules/company/company.jsx';

const CompanyList = React.createClass({

  propTypes: {
    companies: React.PropTypes.object,
    comparableProps: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getDefaultProps: function() {
    return {
      companies: {}
    };
  },

  render: function() {
    let companies = _.map(this.props.companies, company => {
      let comparableProperties = _.keys(this.props.comparableProps);

      // Define each company, but only keep the comparable properties.
      company = _.pick(company, comparableProperties);

      return (
        <Company key={company.id}>
          {company}
        </Company>
      );
    });

    return (
      <div className='company-list'>
        {companies}
      </div>
    );
  }
});

export default CompanyList;

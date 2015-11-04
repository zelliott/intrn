import './company-list.less';
import 'lodash';
import React from 'react/addons';
import Company from '../../molecules/company/company.jsx';

const CompanyList = React.createClass({

  propTypes: {
    companies: React.PropTypes.object,
    sortableProps: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps: function() {
    return {
      companies: {}
    };
  },

  render: function() {
    let companies = _.keys(this.props.companies).map(company_id => {

      // Define each company, but only keep the comparable properties.
      let company = _.pick(this.props.companies[company_id], this.props.sortableProps);

      return (
        <Company key={company.id}>
          {company}
        </Company>
      );
    });

    return (
      <div>{companies}</div>
    );
  }
});

export default CompanyList;

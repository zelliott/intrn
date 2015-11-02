import './company-list.less';

import React from 'react/addons';

import Company from '../../molecules/company/company.jsx';

const CompanyList = React.createClass({

  propTypes: {
    todos: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      todos: {}
    };
  },

  render: function() {
    let companies = Object.keys(this.props.companies).map(company_id => {
      let company = this.props.companies[company_id];
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

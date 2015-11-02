import './intrn-app.less';

import React from 'react/addons';

import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';

import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';

const IntrnApp = React.createClass({
  getInitialState: function() {
    return ({ companies: CompanyStore.getAll() });
  },

  componentDidMount: function() {
    CompanyStore.addChangeListener(this._onChange);

    // fetch the initial list of todos from the server
    AppActions.getCompanies();
  },

  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ companies: CompanyStore.getAll() });
  },

  render: function() {
    return (
      <div className="intrnApp">
        <Header headerText='intrn' />
        <div className="main">
          <CompanyList companies={this.state.companies} />
        </div>
      </div>
    );
  }
});

export default IntrnApp;

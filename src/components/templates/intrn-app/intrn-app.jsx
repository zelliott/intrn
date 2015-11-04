import './intrn-app.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';
import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';
import CompanyListHeader from '../../organisms/company-list-header/company-list-header.jsx';
import CompanyListSidebar from '../../organisms/company-list-sidebar/company-list-sidebar.jsx';

const IntrnApp = React.createClass({
  getInitialState: function() {
    return ({
      companies: CompanyStore.getAll()
    });
  },

  getDefaultProps: function() {
    return ({
      sortableProps: ['name', 'rating', 'salary', 'classSize', 'length', 'difficulty']
    });
  },

  componentDidMount: function() {
    CompanyStore.addChangeListener(this._onChange);

    // Fetch the initial list of todos from the server
    AppActions.getCompanies();
  },

  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      companies: CompanyStore.getAll()
    });
  },

  render: function() {
    return (
      <div className="intrnApp">
        <Header headerText='intrn' />
        <div className="main">
          <CompanyListHeader
            sortableProps={this.props.sortableProps}/>
          <CompanyList
            companies={this.state.companies}
            sortableProps={this.props.sortableProps} />
        </div>
        <CompanyListSidebar />
      </div>
    );
  }
});

export default IntrnApp;

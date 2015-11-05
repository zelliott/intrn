import './intrn-app.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';
import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';
import CompanyListHeader from '../../organisms/company-list-header/company-list-header.jsx';
import CompanyListSidebar from '../../organisms/company-list-sidebar/company-list-sidebar.jsx';

const IntrnApp = React.createClass({

  getDefaultProps: function() {
    return ({
      defaultListProps: CompanyStore.getDefaultListProps()
    });
  },

  getInitialState: function() {
    return ({
      companies: CompanyStore.getCompanies()
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
      companies: CompanyStore.getCompanies()
    });
  },

  render: function() {

    let defaultProperty = this.props.defaultListProps.defaultProperty;
    let defaultComparator = this.props.defaultListProps.defaultComparator;
    let comparableProps = this.props.defaultListProps.comparableProps;

    return (
      <div className='intrn-app'>
        <div className='container'>
          <div className='main-section'>
            <Header headerText='app' />
            <div className='list-section'>
              <CompanyListHeader
                defaultProperty={defaultProperty}
                defaultComparator={defaultComparator}
                comparableProps={comparableProps} />
              <CompanyList
                companies={this.state.companies}
                comparableProps={comparableProps} />
            </div>
          </div>
          <div className='sidebar-section'>
            <CompanyListSidebar />
          </div>
        </div>
      </div>
    );
  }
});

export default IntrnApp;

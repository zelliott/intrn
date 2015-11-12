import './intrn-app.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';
import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';
import CompanyListHeader from '../../organisms/company-list-header/company-list-header.jsx';
import CompanyListSidebar from '../../organisms/company-list-sidebar/company-list-sidebar.jsx';
import Modal from '../../organisms/modal/modal.jsx';

const IntrnApp = React.createClass({

  getDefaultProps: function() {
    return ({
      defaultListProps: CompanyStore.getDefaultListProps()
    });
  },

  getInitialState: function() {
    return ({
      companies: CompanyStore.getCompanies(),
      filters: CompanyStore.getFilters()
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
    let filterableProps = this.props.defaultListProps.filterableProps;

    return (
      <div className='intrn-app'>

        <Modal></Modal>

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
            <CompanyListSidebar
              filters={this.state.filters}
              filterableProps={filterableProps} />
          </div>
        </div>
      </div>
    );
  }
});

export default IntrnApp;

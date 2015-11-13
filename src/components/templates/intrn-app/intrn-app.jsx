import './intrn-app.less';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';
import FilterStore from '../../../js/stores/filter-store';
import SortStore from '../../../js/stores/sort-store';
import SearchStore from '../../../js/stores/search-store';
import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';
import CompanyListHeader from '../../organisms/company-list-header/company-list-header.jsx';
import CompanyListSidebar from '../../organisms/company-list-sidebar/company-list-sidebar.jsx';
import Modal from '../../organisms/modal/modal.jsx';

const IntrnApp = React.createClass({

  getInitialState: function() {
    return ({
      companies: CompanyStore.getCompanies(),
      filters: FilterStore.getFilters(),
      sorts: SortStore.getSorts(),
      search: SearchStore.getSearch()
    });
  },

  componentDidMount: function() {
    CompanyStore.addChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
    SortStore.addChangeListener(this._onChange);
    SearchStore.addChangeListener(this._onChange);

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

    return (
      <div className='intrn-app'>

        <Modal></Modal>

        <div className='container'>
          <div className='main-section'>
            <Header headerText='app'
              search={this.state.search} />
            <div className='list-section'>
              <CompanyListHeader
                sorts={this.state.sorts} />
              <CompanyList
                companies={this.state.companies} />
            </div>
          </div>
          <div className='sidebar-section'>
            <CompanyListSidebar
              filters={this.state.filters} />
          </div>
        </div>
      </div>
    );
  }
});

export default IntrnApp;

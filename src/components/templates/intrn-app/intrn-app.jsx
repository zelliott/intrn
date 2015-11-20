import './intrn-app.less';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import CompanyStore from '../../../js/stores/company-store';
import FilterStore from '../../../js/stores/filter-store';
import SortStore from '../../../js/stores/sort-store';
import SearchStore from '../../../js/stores/search-store';
import ModalStore from '../../../js/stores/modal-store';
import Header from '../../molecules/header/header.jsx';
import CompanyList from '../../organisms/company-list/company-list.jsx';
import CompanyListHeader from '../../organisms/company-list-header/company-list-header.jsx';
import CompanyListSidebar from '../../organisms/company-list-sidebar/company-list-sidebar.jsx';
import Modal from '../../organisms/modal/modal.jsx';
import AddCompanyForm from '../../organisms/modal-form/add-company-form.jsx';

const IntrnApp = React.createClass({

  getInitialState: function() {
    return ({
      companies: CompanyStore.getCompanies(),
      filters: FilterStore.getFilters(),
      sorts: SortStore.getSorts(),
      search: SearchStore.getSearch(),
      modals: ModalStore.getModals()
    });
  },

  componentDidMount: function() {
    CompanyStore.addChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
    SortStore.addChangeListener(this._onChange);
    SearchStore.addChangeListener(this._onChange);
    ModalStore.addChangeListener(this._onModalChange);

    // Fetch the initial list of todos from the server
    AppActions.getCompanies();
  },

  componentWillUnmount: function() {
    CompanyStore.removeChangeListener(this._onChange);
    FilterStore.removeChangeListener(this._onChange);
    SortStore.removeChangeListener(this._onChange);
    SearchStore.removeChangeListener(this._onChange);
    ModalStore.removeChangeListener(this._onModalChange);
  },

  _onChange: function() {
    this.setState({
      companies: CompanyStore.getCompanies(),
      filters: FilterStore.getFilters(),
      sorts: SortStore.getSorts(),
      search: SearchStore.getSearch()
    });
  },

  _onModalChange: function() {
    this.setState({
      modals: ModalStore.getModals()
    });
  },

  render: function() {

    return (
      <div className='intrn-app'>

        <Modal
          open={this.state.modals['add_company'].open}
          name='add_company'>
          <AddCompanyForm />
        </Modal>

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

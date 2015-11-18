import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';
import CompanyApi from '../apis/company-api';

/**
 * Actions here perform two purposes: to send the appropriate action on to the
 * dispatcher (which routes in on to the store), and to interface with the Api.
 */
const AppActions = {

  addCompany: function(company) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_COMPANY,
      company: company
    });

    CompanyApi.create(company, (company) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_COMPANY_SUCCESS,
        company: company
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_COMPANY_FAIL,
        error: error
      });
    });
  },

  // getCompany: function(company) {
  //   AppDispatcher.handleViewAction({
  //     actionType: AppConstants.GET_COMPANY,
  //     company: company
  //   });
  //
  //   CompanyApi.get(id, (company) => {
  //     AppDispatcher.handleServerAction({
  //       actionType: AppConstants.GET_COMPANY_SUCESS,
  //       company: company
  //     });
  //   }, (error) => {
  //     AppDispatcher.handleServerAction({
  //       actionType: AppConstants.GET_COMPANY_FAIL,
  //       error: error
  //     });
  //   });
  // },

  getCompanies: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_COMPANIES
    });

    CompanyApi.getAll( (companies) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_COMPANIES_SUCCESS,
        companies: companies
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_COMPANIES_FAIL,
        error: error
      });
    });
  },

  getRoles: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_ROLES
    });

    RoleApi.getAll( (companies) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_ROLES_SUCCESS,
        roles: roles
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_ROLES_FAIL,
        error: error
      });
    });
  },

  // Search, sort, filter

  setSearch: function(search) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_SEARCH,
      search: search
    });
  },

  setSorts: function(sorts) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_SORTS,
      sorts: sorts
    });
  },

  setFilters: function(filters) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_FILTERS,
      filters: filters
    });
  },

  // Modal

  showModal: function(name) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_MODAL,
      name: name
    });
  },

  hideModal: function(name) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.HIDE_MODAL,
      name: name
    });
  },

  // AddCompany

  loadCompanyNames: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOAD_COMPANY_NAMES
    });

    CompanyApi.getAllNames( (companyNames) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.LOAD_COMPANY_NAMES_SUCCESS,
        companyNames: companyNames
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.LOAD_COMPANY_NAMES_FAIL,
        error: error
      });
    });
  },

  searchCompanyNames: function(search) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SEARCH_COMPANY_NAMES,
      search: search
    });
  }
};

export default AppActions;

import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';
import CompanyApi from '../apis/company-api';

/**
 * Actions here perform two purposes: to send the appropriate action on to the
 * dispatcher (which routes in on to the store), and to interface with the Api.
 */
const AppActions = {

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
  }
};

export default AppActions;

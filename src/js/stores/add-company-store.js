import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _companyNames = [];
let _roleNames = [];
let _searchedCompanyNames = [];
let _searchedRoleNames = [];

function loadCompanyNames(companyNames) {
  _companyNames = _.pluck(companyNames, 'name');
}

function loadRoleNames(roleNames) {
  _roleNames = _.pluck(roleNames, 'name');
}

function searchCompanyNames(search) {
  _searchedCompanyNames = _.filter(_companyNames, name => {
    return search.length !== 0 && _.startsWith(name, search);
  });
}

function searchRoleNames(search) {
  _searchedRoleNames = _.filter(_roleNames, name => {
    return search.length !== 0 && _.startsWith(name, search);
  });
}

/**
 * The store only needs to allow components to register/unregister listeners,
 * and emit change events. Since we have just one top-level component managing
 * state for all components interested in Companies, the only other method necessary
 * is one for getting all the Companies.
 */
const AddCompanyStore = assign({}, EventEmitter.prototype, {

  // Emit change whenever the dispatcher has dispatched an event.
  emitChange: function () {
    console.log('AddCompanyStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCompanyNames: function() {
    return _searchedCompanyNames;
  },

  getRoleNames: function() {
    return _searchedRoleNames;
  }
});

/**
 * Register with the App Dispatcher, and declare how the store handles various
 * actions. This should be the sole way in which a client side model gets updated.
 * Store listens to actions dispatched from the dispatcher, updates state, and then emits changes.
 */
AddCompanyStore.dispatchToken = AppDispatcher.register( payload => {

  let action = payload.action;

  switch (action.actionType) {
    case AppConstants.LOAD_COMPANY_NAMES_SUCCESS:
      loadCompanyNames(action.companyNames);
      AddCompanyStore.emitChange();
      break;

    case AppConstants.SEARCH_COMPANY_NAMES:
      searchCompanyNames(action.search);
      AddCompanyStore.emitChange();
      break;

    case AppConstants.LOAD_ROLE_NAMES_SUCCESS:
      loadRoleNames(action.roleNames);
      AddCompanyStore.emitChange();
      break;

    case AppConstants.SEARCH_ROLE_NAMES:
      searchRoleNames(action.search);
      AddCompanyStore.emitChange();
      break;

    default:
      // no op
  }
});

export default AddCompanyStore;

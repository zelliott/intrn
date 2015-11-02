import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
// polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _companies = {};

function createAll (companies) {
  _companies = {};
  companies.forEach( (company) => {
    company.synced = true;
    _companies[company.id] = company;
  });
}

/* The store only needs to allow components to register/unregister listeners,
and emit change events. Since we have just one top-level component managing
state for all components interested in Companies, the only other method necessary
is one for getting all the Companies */
const CompanyStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    console.log('CompanyStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _companies;
  },
});

/* Register with the App Dispatcher, and declare how the store handles various
actions. This should be the sole way in which a client side model gets updated */
AppDispatcher.register( (payload) => {
  let action = payload.action;

  switch(action.actionType) {

    case AppConstants.GET_COMPANIES_SUCCESS:
      createAll(action.companies)
      CompanyStore.emitChange();
      break;

    default:
      // no op
  }
});

export default CompanyStore;

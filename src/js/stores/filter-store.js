import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';
const RANGE_FILTER = 'RANGE_FILTER';
const VALUE_FILTER = 'VALUE_FILTER';

let _filters = {
  salary: {
    id: '1',
    name: 'salary',
    displayName: 'Salary',
    type: RANGE_FILTER,
    range: [0, 10000],
    values: [0, 10000],
    step: 500,
    description: 'An average of all intern salaries at this company.'
  },
  perks: {
    id: '2',
    name: 'perks',
    displayName: 'Perks',
    type: RANGE_FILTER,
    range: [0, 100],
    values: [0, 100],
    step: 5,
    description: 'A rating of an internship\'s perks, on a scale from 0 to 100.'
  },
};

function createFilters(filters) {
  _filters = filters;
}

function setFilters(filters) {
  _filters = filters;
}

/**
 * The store only needs to allow components to register/unregister listeners,
 * and emit change events. Since we have just one top-level component managing
 * state for all components interested in Companies, the only other method necessary
 * is one for getting all the Companies.
 */
const FilterStore = assign({}, EventEmitter.prototype, {

  // Emit change whenever the dispatcher has dispatched an event.
  emitChange: function () {
    console.log('FilterStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFilters: function() {
    return _filters;
  }
});

/**
 * Register with the App Dispatcher, and declare how the store handles various
 * actions. This should be the sole way in which a client side model gets updated.
 * Store listens to actions dispatched from the dispatcher, updates state, and then emits changes.
 */
FilterStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch(action.actionType) {

    case AppConstants.GET_FILTERS_SUCCESS:
      createFilters(action.filters);
      FilterStore.emitChange();
      break;

    case AppConstants.SET_FILTERS:
      setFilters(action.filters);
      FilterStore.emitChange();
      break;

    default:
      // no op
  }
});

export default FilterStore;

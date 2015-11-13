import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _search = '';

function setSearch(search) {
  _search = search;
}

/**
 * The store only needs to allow components to register/unregister listeners,
 * and emit change events. Since we have just one top-level component managing
 * state for all components interested in Companies, the only other method necessary
 * is one for getting all the Companies.
 */
const SearchStore = assign({}, EventEmitter.prototype, {

  // Emit change whenever the dispatcher has dispatched an event.
  emitChange: function () {
    console.log('SearchStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSearch: function() {
    return _search;
  }
});

/**
 * Register with the App Dispatcher, and declare how the store handles various
 * actions. This should be the sole way in which a client side model gets updated.
 * Store listens to actions dispatched from the dispatcher, updates state, and then emits changes.
 */
SearchStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch(action.actionType) {

    case AppConstants.SET_SEARCH:
      setSearch(action.search);
      SearchStore.emitChange();
      break;

    default:
      // no op
  }
});

export default SearchStore;

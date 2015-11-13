import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _sorts = {
  rating: {
    id: '1',
    name: 'rating',
    displayName: 'Rating',
    active: true,
    direction: true
  },
  name: {
    id: '2',
    name: 'name',
    displayName: 'Name',
    active: false,
    direction: true
  }
};

function setSort(sorts) {
  _sorts = sorts;
}

/**
 * The store only needs to allow components to register/unregister listeners,
 * and emit change events. Since we have just one top-level component managing
 * state for all components interested in Companies, the only other method necessary
 * is one for getting all the Companies.
 */
const SortStore = assign({}, EventEmitter.prototype, {

  // Emit change whenever the dispatcher has dispatched an event.
  emitChange: function () {
    console.log('SortStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSorts: function() {
    return _sorts;
  }
});

/**
 * Register with the App Dispatcher, and declare how the store handles various
 * actions. This should be the sole way in which a client side model gets updated.
 * Store listens to actions dis patched from the dispatcher, updates state, and then emits changes.
 */
SortStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch(action.actionType) {

    case AppConstants.SET_SORTS:
      setSort(action.sorts);
      SortStore.emitChange();
      break;

    default:
      // no op
  }
});

export default SortStore;

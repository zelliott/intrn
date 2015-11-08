import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _companies = [];
let _rolesOfCompanies = [];

let _defaultProperty = 'rating';
let _defaultComparator = true;
let _comparableProps = {
  rating: 'Rating',
  name: 'Name',
  salary: 'Salary',
  funness: 'Funness',
  perks: 'Perks',
  difficulty: 'Difficulty'
};
let _filterableProps = {
  name: 'Name',
  salary: 'Salary',
  funness: 'Funness',
  perks: 'Perks',
  difficulty: 'Difficulty'
};

const RANGE_FILTER = 'RangeFilter';
const VALUE_FILTER = 'ValueFilter';
let DEFAULT_RANGE_FILTER = {
  type: RANGE_FILTER,
  range: [0, 100],
  values: [0, 100],
  step: 1
};
let SALARY_RANGE_FILTER = {
  type: RANGE_FILTER,
  range: [0, 10000],
  values: [0, 10000],
  step: 100
};

// FIXME: God this fucking `_.clone` BS is such an anti-pattern...
let _filters = {
  salary: SALARY_RANGE_FILTER,
  funness: _.clone(DEFAULT_RANGE_FILTER),
  perks: _.clone(DEFAULT_RANGE_FILTER),
  difficulty: _.clone(DEFAULT_RANGE_FILTER),
  // roles: {
  //   type: VALUE_FILTER,
  //   values: [{
  //     'Software Engineering Intern': 0
  //   }]
  // }
};

function createCompanies(companies) {
  _companies = companies;

  _.each(_companies, (company) => {
    company.synced = true;
  });

  sortCompanies(_defaultProperty, _defaultComparator);
}

function sortCompanies(property, comparator) {
  let order = comparator ? 'asc' : 'desc';

  _companies = _.sortByOrder(_companies, property, order);
}

function filterCompanies() {
  return _.filter(_companies, company => {
    let filtered = true;

    _.each(_.keys(company), prop => {
      let propFilter = _filters[prop];
      let propValue = company[prop];
      let filterExists = !_.isUndefined(propFilter);

      if (filterExists && propFilter.type === RANGE_FILTER) {
        if (propValue > propFilter.values[1] || propValue < propFilter.values[0]) {
          filtered = false;
          return;
        }
      } else if (filterExists && propFilter.type === VALUE_FILTER) {
        let value_filtered = false;

        if (_.isArray(propValue)) {
          _.each(propValue, value => {
            if (propFilter.values[value] == 1) {
              value_filtered = true;
            }
          });
        }

        if (!value_filtered) {
          filtered = false;
          return;
        }
      }
    });

    return filtered;
  });
}

function updateFilters(filters) {
  _filters = filters;
}

/**
 * The store only needs to allow components to register/unregister listeners,
 * and emit change events. Since we have just one top-level component managing
 * state for all components interested in Companies, the only other method necessary
 * is one for getting all the Companies.
 */
const CompanyStore = assign({}, EventEmitter.prototype, {

  // Emit change whenever the dispatcher has dispatched an event.
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

  getCompanies: function() {
    let filteredCompanies = filterCompanies();

    return filteredCompanies;
  },

  getDefaultListProps: function() {
    return {
      defaultProperty: _defaultProperty,
      defaultComparator: _defaultComparator,
      comparableProps: _comparableProps,
      filterableProps: _filterableProps
    };
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
AppDispatcher.register( payload => {
  let action = payload.action;

  switch(action.actionType) {

    case AppConstants.GET_COMPANIES_SUCCESS:
      createCompanies(action.companies)
      CompanyStore.emitChange();
      break;

    case AppConstants.SORT_COMPANIES:
      sortCompanies(action.property, action.comparator)
      CompanyStore.emitChange();
      break;

    case AppConstants.UPDATE_FILTERS:
      updateFilters(action.filters);
      CompanyStore.emitChange();
      break;

    default:
      // no op
  }
});

export default CompanyStore;

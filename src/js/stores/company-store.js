import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import FilterStore from './filter-store';
import SortStore from './sort-store';
import SearchStore from './search-store';
import {EventEmitter} from 'events';
import 'lodash';

// Polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _companies = [];
let _fields = ['salary', 'funness', 'perks', 'difficulty'];

function createCompanies(companies) {
  _companies = companies;

  _.each(_companies, company => {
    _.each(_fields, field => {
      company[field] = Math.round(company[field].statistics[0].mean);
    });

    company.roles = _.map(company.roles, 'name');
  });
}

function getCompanies(filters, sorts, search) {

  let companies;

  if (!filters) {

    companies = _companies;

  } else {

    companies = _.filter(_companies, company => {
      let filtered = true;

      if (search.length > 0 && !_.startsWith(company.name, search)) {
        return false;
      }

      _.each(_.keys(company), name => {
        let filter = filters[name];
        let companyValue = company[name];
        let filterExists = !_.isUndefined(filter);

        if (filterExists) {
          if (filter.type === 'RANGE_FILTER') {
            if (companyValue > filter.values[1] || companyValue < filter.values[0]) {
              filtered = false;
              return false;
            }
          } else if (filter.type === 'VALUE_FILTER') {
            filtered = false;

            if (_.isArray(companyValue)) {
              let validOptions = {};

              _.each(filter.values, value => {
                if (value.selected) {
                  validOptions[value.value] = true;
                }
              });

              if (_.keys(validOptions).length === 0) {
                filtered = true;
                return false;
              }

              _.each(companyValue, value => {
                if (validOptions[value]) {
                  filtered = true;
                  return false;
                }
              });
            }
          }
        }
      });

      return filtered;
    });
  }

  let sortName;
  let sortDirection;

  _.each(sorts, (sort, key) => {
    if (sort.active) {
      sortName = sort.name;
      sortDirection = sort.direction;
    }
  });

  let direction = sortDirection ? 'asc' : 'desc';

  companies = _.sortByOrder(companies, sortName, direction);

  return companies;
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
    let filters = FilterStore.getFilters();
    let sorts = SortStore.getSorts();
    let search = SearchStore.getSearch();

    return getCompanies(filters, sorts, search);
  },
});

/**
 * Register with the App Dispatcher, and declare how the store handles various
 * actions. This should be the sole way in which a client side model gets updated.
 * Store listens to actions dispatched from the dispatcher, updates state, and then emits changes.
 */
CompanyStore.dispatchToken = AppDispatcher.register( payload => {

  AppDispatcher.waitFor([
    FilterStore.dispatchToken,
    SortStore.dispatchToken,
    SearchStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.actionType) {

    case AppConstants.GET_COMPANIES_SUCCESS:
      createCompanies(action.companies)
      CompanyStore.emitChange();
      break;

    case AppConstants.ADD_COMPANIES_SUCCESS:
      CompanyStore.emitChange();
      break;

    default:
      // no op
  }
});

export default CompanyStore;

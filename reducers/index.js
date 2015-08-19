import { combineReducers } from 'redux';
import { searchTerms, packagesBySearch } from './search';
import { packagesById, selectedPackages } from './packages';

const rootReducer = combineReducers({
  searchResults: packagesBySearch,
  search: searchTerms,
  packages: packagesById,
  selectedPackages: selectedPackages,
});

export default rootReducer;
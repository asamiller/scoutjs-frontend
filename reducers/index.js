import { combineReducers } from 'redux';
import {
  REQUEST_SEARCH, 
  RECEIVE_SEARCH,
  CLEAR_SEARCH,
} from '../actions';

function searchTerms(state = { term: null }, action) {
  switch (action.type) {
  case CLEAR_SEARCH:
    return Object.assign({}, state, {
      term: null,
    });
  case REQUEST_SEARCH:
    return Object.assign({}, state, action.search);
  case RECEIVE_SEARCH:
    return Object.assign({}, state, action.search);
  default:
    return state;
  }
}


function searchResults(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  search: null,
}, action) {

  switch (action.type) {
  case CLEAR_SEARCH:
    return Object.assign({}, state, {
      didInvalidate: true,
      items: [],
      search: null,
    });
  case REQUEST_SEARCH:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      search: action.search,
    });
  case RECEIVE_SEARCH:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.items,
      lastUpdated: action.receivedAt,
      search: action.search,
    });
  default:
    return state;
  }
}




function packagesBySearch(state = { }, action) {
  switch (action.type) {
  case CLEAR_SEARCH:
  case RECEIVE_SEARCH:
  case REQUEST_SEARCH:
    return Object.assign({}, state, {
      [action.search.term]: searchResults(state[action.search], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  searchResults: packagesBySearch,
  search: searchTerms,
});

export default rootReducer;
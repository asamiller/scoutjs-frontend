import { REQUEST_SEARCH, RECEIVE_SEARCH, CLEAR_SEARCH } from '../actions/search';

export function searchTerms(state = { term: null }, action) {
  switch (action.type) {
  case CLEAR_SEARCH:
    return {};

  case REQUEST_SEARCH:
    return Object.assign({}, state, action.search);

  case RECEIVE_SEARCH:
    return Object.assign({}, state, action.search);

  default:
    return state;
  }
}

export function packagesBySearch(state = { }, action) {
  switch (action.type) {
  case CLEAR_SEARCH:
  case RECEIVE_SEARCH:
  case REQUEST_SEARCH:
    return Object.assign({}, state, {
      [action.search.term]: searchResults(state[action.search.term], action)
    });
  default:
    return state;
  }
}


function searchResults(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  search: {},
}, action) {

  switch (action.type) {
  case CLEAR_SEARCH:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true,
      items: [],
      search: {},
    });

  case REQUEST_SEARCH:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      search: action.search,
    });

  case RECEIVE_SEARCH:
    let items = action.items;
    if (action.search.start) {
      items = state.items.concat(action.items);
    };

    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items,
      lastUpdated: action.receivedAt,
      search: action.search,
    });

  default:
    return state;
  }
}
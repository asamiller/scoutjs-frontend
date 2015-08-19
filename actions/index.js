import fetch from 'isomorphic-fetch';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const VIEW_PACKAGE = 'VIEW_PACKAGE';
export const CLOSE_PACKAGE = 'CLOSE_PACKAGE';

export const REQUEST_PACKAGE = 'REQUEST_PACKAGE';
export const RECEIVE_PACKAGE = 'RECEIVE_PACKAGE';


export function requestSearch(search) {
  return {
    type: REQUEST_SEARCH,
    search,
  };
}

function receiveSearch(search, json) {
  return {
    type: RECEIVE_SEARCH,
    items: json.packages,
    results: json.results,
    next: json.next,
    receivedAt: Date.now(),
    search,
  };
}

export function clearSearch(search) {
  return {
    type: CLEAR_SEARCH,
    items: [],
    receivedAt: null,
    search,
  };
}




export function fetchSearch(search) {
  return dispatch => {
    dispatch(requestSearch(search));
    return fetch(`http://0.0.0.0:5000/search/${search.term}`)
      .then(req => req.json())
      .then(json => dispatch(receiveSearch(search, json)));
  }
}

function shouldFetchSearch(state, search) {
  if (!search || !search.term) return false;

  const results = state.searchResults[search.term];
  if (!results) {
    return true;
  } else if (results.isFetching) {
    return false;
  } else {
    return results.didInvalidate;
  }
}

export function fetchSearchIfNeeded(search) {
  return (dispatch, getState) => {
    if (shouldFetchSearch(getState(), search)) {
      return dispatch(fetchSearch(search));
    }
  };
}

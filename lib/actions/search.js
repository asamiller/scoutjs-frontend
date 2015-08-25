import 'whatwg-fetch';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

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
    receivedAt: Date.now(),
    search: Object.assign({}, search, { next: json.next, start: search.next }),
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



function fetchSearchFromServer(search) {
  return dispatch => {
    dispatch(requestSearch(search));
    return fetch(`/api/search/${search.term}/${search.next || 0}`)
      .then(req => req.json())
      .then(json => dispatch(receiveSearch(search, json)));
  }
}

function shouldFetchSearch(state, search) {
  if (!search || !search.term) return false;

  const results = state.searchResults[search.term];

  if (results && results.isFetching) {
    return false;
  } else {
    return true;
  }

  // if (!results) {
  //   return true;
  // } else if (results.isFetching) {
  //   return false;
  // } else {
  //   return results.didInvalidate;
  // }
}

export function fetchSearch(search) {
  return (dispatch, getState) => {
    if (shouldFetchSearch(getState(), search)) {
      return dispatch(fetchSearchFromServer(search));
    }
  };
}

import 'whatwg-fetch';

export const VIEW_PACKAGE = 'VIEW_PACKAGE';
export const CLOSE_PACKAGE = 'CLOSE_PACKAGE';

export const REQUEST_PACKAGE = 'REQUEST_PACKAGE';
export const RECEIVE_PACKAGE = 'RECEIVE_PACKAGE';

const server = (__DEVTOOLS__) ? 'http://0.0.0.0:5000' : '';

function viewPackageAction(id) {
  return {
    type: VIEW_PACKAGE,
    id,
  };
}

export function closePackage(id) {
  return {
    type: CLOSE_PACKAGE,
    id,
  };
}

function requestPackage(id) {
  return {
    type: REQUEST_PACKAGE,
    id,
  };
}

function receivePackage(id, json) {
  return {
    type: RECEIVE_PACKAGE,
    data: json,
    receivedAt: Date.now(),
    id,
  };
}

function fetchPackageFromServer(id) {
  return dispatch => {
    dispatch(requestPackage(id));

    return fetch(`${server}/api/packages/${id}`)
    .then(req => req.json())
    .then(json => dispatch(receivePackage(id, json)));
  }
}




function shouldFetchPackage(state, id) {
  if (!id) return false;

  const results = state.packages[id];
  if (!results) {
    return true;
  } else if (results.isFetching) {
    return false;
  } else {
    return results.didInvalidate;
  }
}

export function viewPackage(id) {
  return (dispatch, getState) => {
    dispatch(viewPackageAction(id));

    if (shouldFetchPackage(getState(), id)) {
      return dispatch(fetchPackageFromServer(id));
    }
  };
}

// export function closePackage(id) {
//   return (dispatch) => dispatch(closePackageAction(id));
// }

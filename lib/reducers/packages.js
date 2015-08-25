import { VIEW_PACKAGE, CLOSE_PACKAGE, REQUEST_PACKAGE, RECEIVE_PACKAGE } from '../actions/packages';

export function selectedPackages(state = [], action) {
  switch (action.type) {

  case VIEW_PACKAGE:
    return [action.id];

  case CLOSE_PACKAGE:
    return [];

  default:
    return state;
  }
}


export function packagesById(state = { }, action) {
  switch (action.type) {
  case RECEIVE_PACKAGE:
  case REQUEST_PACKAGE:
    return Object.assign({}, state, {
      [action.id]: packageResults(state[action.id], action)
    });
  default:
    return state;
  }
}


function packageResults(state = {
  isFetching: false,
  didInvalidate: false,
  data: {},
  id: null,
}, action) {

  switch (action.type) {
  // case CLEAR_PACKAGE:
  //   return Object.assign({}, state, {
  //     didInvalidate: true,
  //     items: [],
  //     search: null,
  //   });
  case REQUEST_PACKAGE:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      id: action.id,
      data: {},
    });
  case RECEIVE_PACKAGE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      data: action.data,
      lastUpdated: action.receivedAt,
      id: action.id,
    });
  default:
    return state;
  }
}
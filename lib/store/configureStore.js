import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { devTools, persistState } from 'redux-devtools';

import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';



const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  ),
  // devTools(),
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}

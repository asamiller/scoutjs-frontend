import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

let combinedCreateStore;
if (__DEVTOOLS__) {
  import { devToolsm persistState } from 'redux-devtools';
  import loggerMiddleware from 'redux-logger';

  combinedCreateStore = compose(
    thunkMiddleware(), 
    devTools(), 
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)), 
    createStore
  );
}
else {
  combinedCreateStore = compose(thunkMiddleware(), createStore);
}

export default function configureStore(initialState) {
  return combinedCreateStore(rootReducer, initialState);
}

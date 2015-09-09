import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index.js';

let middleware = [thunk];
let finalCreateStore;

// In production, we want to use just the middleware.
// In development, we want to use some store enhancers from redux-devtools.
// UglifyJS will eliminate the dead code depending on the build environment.

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    )
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
}

// let store = finalCreateStore(reducer);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}



// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

// import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../reducers';

// let combinedCreateStore;
// if (__DEVTOOLS__) {
//   let { devTools, persistState } = require('redux-devtools');

//   combinedCreateStore = compose(
//     thunkMiddleware(), 
//     devTools(), 
//     persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)), 
//     createStore
//   );
// }
// else {
//   combinedCreateStore = compose(thunkMiddleware(), createStore);
// }

// export default function configureStore(initialState) {
//   return combinedCreateStore(rootReducer, initialState);
// }

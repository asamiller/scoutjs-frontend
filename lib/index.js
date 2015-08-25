import 'babel-core/polyfill';

import React from 'react';
import Root from './containers/Root';

React.render(
  <Root />,
  document.getElementById('app')
);

// import configureStore from './store/configureStore';
// const store = configureStore();

// import { requestSearch, clearSearch, fetchSearch, fetchSearchIfNeeded } from './actions';

// store.dispatch(fetchSearchIfNeeded('react'))
// .then(() =>
//   console.log(store.getState())
// );

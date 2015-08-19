import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import configureStore from '../store/configureStore';
import NPFApp from './NPFApp';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <NPFApp />}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools
            store={store}
            monitor={LogMonitor}
          />
        </DebugPanel>
      </div>
    );
  }
}

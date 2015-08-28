import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import ScoutApp from './ScoutApp';

const store = configureStore();

function getRootChildren () {
  const rootChildren = [
    <Provider key='provider' store={store}>
      {() => <ScoutApp />}
    </Provider>
  ]

  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

    rootChildren.push(
      <DebugPanel key='debug-panel' top left bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
  return rootChildren;
}

export default class Root extends Component {
  render() {
    return (
      <div>
        {getRootChildren(history)}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
// Store
import store from './src/publics/redux/store';
// Router Navigations
import Router from './Router';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Router />
        </Root>
      </Provider>
    );
  }
}

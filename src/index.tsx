import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/features/array/flat-map';
import '~/style/main.scss';
import App from '~/App';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import reducer from '~/reducer';
import theme from '~/theme';
import { MuiThemeProvider } from '@material-ui/core';

const store = createStore(reducer);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#app')
);

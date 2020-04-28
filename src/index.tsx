import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/features/array/flat-map';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import '~/style/main.scss';
import App from '~/App';
import reducer from '~/reducer';
import theme from '~/theme';
import { MuiThemeProvider } from '@material-ui/core';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const store = createStore(
  reducer,
  (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#app')
);

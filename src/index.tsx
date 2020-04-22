import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/features/array/flat-map';
import '~/style/main.scss';
import App from '~/App';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import reducer from '~/reducer';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app-sample/App';
import * as serviceWorker from './app/shared/utils/serviceWorker';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.less';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import DebtsList from './app/debts-list/debts-list';
import * as serviceWorker from './app/shared/utils/service-worker';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.less';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Route exact={true} path="/" component={DebtsList} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

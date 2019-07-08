import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import configureStore from '../../store';
import App from './App';

it('it renders', () => {
  const component = create(
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );

  expect(component).toBeTruthy();
  expect(component.toJSON()).toMatchSnapshot();
});

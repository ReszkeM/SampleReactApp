import { combineReducers } from 'redux';

import appReducer from './app/app-sample/reducer';
import { debtsListReducer } from './app/debts-list/reducer';

const rootReducer = combineReducers({
  appReducer,
  debtsListReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

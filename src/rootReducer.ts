import { combineReducers } from 'redux';

import { debtsListReducer } from './app/debts-list/reducer';

const rootReducer = combineReducers({
  debtsListReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

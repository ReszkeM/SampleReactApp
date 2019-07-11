import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import DebtListItem from './models/debtListItem';
import { testTopDebts } from './test-data';
import { DebtsListState } from './reducer';

export enum DebtsListActionTypes {
  loadTopDebts = '[DEBTS_LIST] LOAD_TOP_DEBTS',
  loadTopDebtsStart = '[DEBTS_LIST] LOAD_TOP_DEBTS_START',
  loadTopDebtsSuccess = '[DEBTS_LIST] LOAD_TOP_DEBTS_SUCCESS',
  loadTopDebtsFailed = '[DEBTS_LIST] LOAD_TOP_DEBTS_FAILED'
}

export interface LoadTopDebtsStart extends Action {}

export interface LoadTopDebtsSuccess extends Action {
  payload: {
    debts: DebtListItem[];
  };
}

export interface LoadTopDebtsFailed extends Action {}

export const loadTopDebtsStart = (): LoadTopDebtsStart => ({
  type: DebtsListActionTypes.loadTopDebtsStart
});

export const loadTopDebtsSuccess = (debts: DebtListItem[]): LoadTopDebtsSuccess => ({
  type: DebtsListActionTypes.loadTopDebtsSuccess,
  payload: { debts }
});

export const loadTopDebtsError = (): LoadTopDebtsFailed => ({
  type: DebtsListActionTypes.loadTopDebtsFailed
});

export const loadDebts = (): ThunkAction<void, DebtsListState, null, LoadTopDebtsStart> => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loadTopDebtsStart());

  try {
    await Promise.resolve('');
    dispatch(loadTopDebtsSuccess(testTopDebts));
  } catch(error) {
    dispatch(loadTopDebtsError());
  }
};

export type DebtsListActions = LoadTopDebtsStart | LoadTopDebtsSuccess | LoadTopDebtsFailed;

import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import DebtListItem from '../models/debtListItem';
import { DebtsListState } from '../reducer';
import { GET_TOP_DEBTS_URL, GET_DEBTS_COUNT_URL } from '../../shared/utils/constants';

export enum DebtsListActionTypes {
  loadTopDebts = '[DEBTS_LIST] LOAD_DEBTS_LIST',
  loadTopDebtsStart = '[DEBTS_LIST] LOAD_DEBTS_LIST_START',
  loadTopDebtsSuccess = '[DEBTS_LIST] LOAD_DEBTS_LIST_SUCCESS',
  loadTopDebtsFailed = '[DEBTS_LIST] LOAD_DEBTS_LIST_FAILED'
}

export interface LoadDebtsListStart extends Action {}

export interface LoadDebtsListSuccess extends Action {
  payload: {
    debts: DebtListItem[];
    totalDebtsCount: number;
  };
}

export interface LoadDebtsListFailed extends Action {}

export const loadTopDebtsStart = (): LoadDebtsListStart => ({
  type: DebtsListActionTypes.loadTopDebtsStart
});

export const loadTopDebtsSuccess = (debts: DebtListItem[], totalDebtsCount: number): LoadDebtsListSuccess => ({
  type: DebtsListActionTypes.loadTopDebtsSuccess,
  payload: { debts, totalDebtsCount }
});

export const loadTopDebtsError = (): LoadDebtsListFailed => ({
  type: DebtsListActionTypes.loadTopDebtsFailed
});

export const loadDebtsList = (): ThunkAction<void, DebtsListState, null, LoadDebtsListStart> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loadTopDebtsStart());

  try {
    const topDebtsResult = await axios.get<DebtListItem[]>(GET_TOP_DEBTS_URL);
    const totalCountResult = await axios.get<number>(GET_DEBTS_COUNT_URL);

    dispatch(loadTopDebtsSuccess(topDebtsResult.data, totalCountResult.data));
  } catch (error) {
    dispatch(loadTopDebtsError());
  }
};

export type TopDebtsListActions = LoadDebtsListStart | LoadDebtsListSuccess | LoadDebtsListFailed;

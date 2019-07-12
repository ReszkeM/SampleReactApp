import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { DebtsListState } from '../reducer';
import DebtListItem from '../models/debtListItem';
import { GET_FILTERED_DEBTS_URL } from '../../shared/utils/constants';

export enum DebtsFilterActionTypes {
  loadFilteredDebts = '[DEBTS_FILTER] LOAD_FILTERED_DEBTS',
  loadFilteredDebtsStart = '[DEBTS_FILTER] LOAD_FILTERED_DEBTS_START',
  loadFilteredDebtsSuccess = '[DEBTS_FILTER] LOAD_FILTERED_DEBTS_SUCCESS',
  loadFilteredDebtsFailed = '[DEBTS_FILTER] LOAD_FILTERED_DEBTS_FAILED'
}

export interface LoadFilteredDebtsStart extends Action {}

export interface LoadFilteredDebtsSuccess extends Action {
  payload: {
    debts: DebtListItem[];
  };
}

export interface LoadFilteredDebtsFailed extends Action {
  payload: {
    errorMessage?: string;
  };
}

export const loadFilteredDebtsStart = (): LoadFilteredDebtsStart => ({
  type: DebtsFilterActionTypes.loadFilteredDebtsStart
});

export const loadFilteredDebtsSuccess = (debts: DebtListItem[]): LoadFilteredDebtsSuccess => ({
  type: DebtsFilterActionTypes.loadFilteredDebtsSuccess,
  payload: { debts }
});

export const loadFilteredDebtsError = (errorMessage?: string): LoadFilteredDebtsFailed => ({
  type: DebtsFilterActionTypes.loadFilteredDebtsFailed,
  payload: { errorMessage }
});

export const loadFilteredDebts = (filter: string): ThunkAction<void, DebtsListState, null, LoadFilteredDebtsStart> => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loadFilteredDebtsStart());

  try {
    const result = await axios.post<DebtListItem[]>(GET_FILTERED_DEBTS_URL, { filter });
    dispatch(loadFilteredDebtsSuccess(result.data));
  } catch(error) {
    dispatch(loadFilteredDebtsError(error.response && error.response.status === 405 ? "Filter Value is to short" : undefined));
  }
};

export type TopDebtsListActions = LoadFilteredDebtsStart | LoadFilteredDebtsSuccess | LoadFilteredDebtsFailed;

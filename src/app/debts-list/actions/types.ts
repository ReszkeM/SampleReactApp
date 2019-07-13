import { Action } from 'redux';

import DebtListItem from '../models/debtListItem';
import { ActionWithPayload } from '../../shared/interfaces/actions';

export enum DebtsListActionTypes {
  loadfilteredDebts = '[DEBTS_LIST] LOAD_FILTERED_DEBTS',
  loadDebtsStart = '[DEBTS_LIST] LOAD_DEBTS_LIST_START',
  loadDebtsSuccess = '[DEBTS_LIST] LOAD_DEBTS_LIST_SUCCESS',
  loadDebtsFailed = '[DEBTS_LIST] LOAD_DEBTS_LIST_FAILED'
}

export interface LoadDebtsSuccessData {
  debts: DebtListItem[];
  totalDebtsCount?: number;
}
export interface LoadDebtsFailedData {
  errorMessage?: string;
}

export interface LoadDebtsStart extends Action<DebtsListActionTypes.loadDebtsStart> {}
export interface LoadfilteredDebts extends Action<DebtsListActionTypes.loadfilteredDebts> {}
export interface LoadDebtsSuccess
  extends ActionWithPayload<DebtsListActionTypes.loadDebtsSuccess, LoadDebtsSuccessData> {}
export interface LoadDebtsFailed extends ActionWithPayload<DebtsListActionTypes.loadDebtsFailed, LoadDebtsFailedData> {}

export type DebtsListActions = LoadDebtsStart | LoadDebtsSuccess | LoadDebtsFailed;

import { DebtsListActionTypes, LoadDebtsStart, LoadDebtsFailed, LoadDebtsSuccess, LoadDebtsSuccessData } from './types';

export const loadDebtsStart = (): LoadDebtsStart => ({
  type: DebtsListActionTypes.loadDebtsStart
});

export const loadDebtsSuccess = (payload: LoadDebtsSuccessData): LoadDebtsSuccess => ({
  type: DebtsListActionTypes.loadDebtsSuccess,
  payload
});

export const loadDebtsError = (errorMessage?: string): LoadDebtsFailed => ({
  type: DebtsListActionTypes.loadDebtsFailed,
  payload: { errorMessage }
});

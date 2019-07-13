import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import axios from 'axios';

import DebtListItem from '../models/debtListItem';
import { DebtsListState } from '../reducer';
import { LoadDebtsStart, LoadfilteredDebts } from './types';
import { loadDebtsStart, loadDebtsSuccess, loadDebtsError } from './actions';

export const API_URL = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment';
export const GET_DEBTS_COUNT_URL = `${API_URL}/GetDebtsCount`;
export const GET_TOP_DEBTS_URL = `${API_URL}/GetTopDebts`;
export const GET_FILTERED_DEBTS_URL = `${API_URL}/GetFilteredDebts`;

export const loadDebtsList = (): ThunkAction<void, DebtsListState, null, LoadDebtsStart> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loadDebtsStart());

  try {
    const topDebtsResult = await axios.get<DebtListItem[]>(GET_TOP_DEBTS_URL);
    const totalCountResult = await axios.get<number>(GET_DEBTS_COUNT_URL);

    dispatch(loadDebtsSuccess({ debts: topDebtsResult.data, totalDebtsCount: totalCountResult.data }));
  } catch (error) {
    dispatch(loadDebtsError());
  }
};

export const filterDebts = (filter: string): ThunkAction<void, DebtsListState, null, LoadfilteredDebts> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loadDebtsStart());

  try {
    const result = await axios.post<DebtListItem[]>(GET_FILTERED_DEBTS_URL, { filter });
    dispatch(loadDebtsSuccess({ debts: result.data }));
  } catch (error) {
    dispatch(loadDebtsError(error.response && error.response.status === 405 ? 'Filter Value is to short' : undefined));
  }
};

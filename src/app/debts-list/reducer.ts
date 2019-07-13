import DebtListItem from './models/debtListItem';
import { DebtsListActionTypes, DebtsListActions } from './actions/types';

export interface DebtsListState {
  debts: DebtListItem[];
  totalDebtsCount: number;
  isLoading: boolean;
  isLoadingError: boolean;
  errorMessage?: string;
}

export const initialState: DebtsListState = {
  debts: [],
  totalDebtsCount: 0,
  isLoading: false,
  isLoadingError: false,
  errorMessage: undefined
};

export function debtsListReducer(state: DebtsListState = initialState, action: DebtsListActions): DebtsListState {
  switch (action.type) {
    case DebtsListActionTypes.loadDebtsStart:
      return {
        ...state,
        debts: [],
        isLoading: true,
        isLoadingError: false
      };

    case DebtsListActionTypes.loadDebtsSuccess:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        ...action.payload
      };

    case DebtsListActionTypes.loadDebtsFailed:
      return {
        ...state,
        isLoading: false,
        isLoadingError: true,
        ...action.payload
      };

    default:
      return state;
  }
}

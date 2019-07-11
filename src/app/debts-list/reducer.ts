import { DebtsListActionTypes, DebtsListActions, LoadTopDebtsSuccess } from './actions';
import DebtListItem from './models/debtListItem';

export interface DebtsListState {
  debts: DebtListItem[];
  debtsTotalCount: number;
  isLoading: boolean;
  isLoadingError: boolean;
}

export const initialState: DebtsListState = {
  debts: [],
  debtsTotalCount: 0,
  isLoading: false,
  isLoadingError: false
};

export function debtsListReducer(state: DebtsListState = initialState, action: DebtsListActions): DebtsListState {
  switch (action.type) {
    case DebtsListActionTypes.loadTopDebtsStart:
      return {
        ...state,
        isLoading: true,
        isLoadingError: false
      };

    case DebtsListActionTypes.loadTopDebtsSuccess:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        debts: (action as LoadTopDebtsSuccess).payload.debts
      };

    case DebtsListActionTypes.loadTopDebtsFailed:
      return {
        ...state,
        isLoading: false,
        isLoadingError: true
      };

    default:
      return state;
  }
}

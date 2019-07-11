import { DebtsListActionTypes, TopDebtsListActions, LoadDebtsListSuccess } from './actions/debts-list';
import DebtListItem from './models/debtListItem';
import { DebtsFilterActionTypes, LoadFilteredDebtsSuccess } from './actions/debts-filter';

export interface DebtsListState {
  debts: DebtListItem[];
  totalDebtsCount: number;
  isLoading: boolean;
  isLoadingError: boolean;
}

export const initialState: DebtsListState = {
  debts: [],
  totalDebtsCount: 0,
  isLoading: false,
  isLoadingError: false
};

export function debtsListReducer(state: DebtsListState = initialState, action: TopDebtsListActions): DebtsListState {
  switch (action.type) {
    case DebtsListActionTypes.loadTopDebtsStart:
    case DebtsFilterActionTypes.loadFilteredDebtsStart:
      return {
        ...state,
        debts: [],
        isLoading: true,
        isLoadingError: false
      };

    case DebtsListActionTypes.loadTopDebtsSuccess:
    case DebtsFilterActionTypes.loadFilteredDebtsSuccess:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        ...(action as LoadDebtsListSuccess | LoadFilteredDebtsSuccess).payload
      };

    case DebtsListActionTypes.loadTopDebtsFailed:
      return {
        ...state,
        totalDebtsCount: 0,
        isLoading: false,
        isLoadingError: true
      };
  
    case DebtsFilterActionTypes.loadFilteredDebtsFailed:
      return {
        ...state,
        isLoading: false,
        isLoadingError: true
      };

    default:
      return state;
  }
}

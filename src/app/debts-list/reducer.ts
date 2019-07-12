import DebtListItem from './models/debtListItem';
import { DebtsListActionTypes, TopDebtsListActions, LoadDebtsListSuccess } from './actions/debts-list';
import { DebtsFilterActionTypes, LoadFilteredDebtsSuccess, LoadFilteredDebtsFailed } from './actions/debts-filter';

export interface DebtsListState {
  debts: DebtListItem[];
  totalDebtsCount: number;
  isLoading: boolean;
  isLoadingError: boolean;
  errorMessage?: string
}

export const initialState: DebtsListState = {
  debts: [],
  totalDebtsCount: 0,
  isLoading: false,
  isLoadingError: false,
  errorMessage: undefined
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
        isLoadingError: true,
        ...(action as LoadFilteredDebtsFailed).payload
      };

    default:
      return state;
  }
}

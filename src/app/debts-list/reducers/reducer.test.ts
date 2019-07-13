import { debtsListReducer, initialState, DebtsListState } from './reducer';
import { loadDebtsStart, loadDebtsSuccess, loadDebtsError } from '../actions/actions';
import { testTopDebts } from '../test-data';

describe('Action Items Projects Reducer', () => {
  describe('loadDebtsStart', () => {
    it('should handle loadDebtsStart action', () => {
      const result = debtsListReducer(initialState, loadDebtsStart());

      expect(result).toEqual({
        ...initialState,
        debts: [],
        isLoading: true,
        isLoadingError: false
      });
    });
  });

  describe('loadDebtsStart', () => {
    it('should handle loadDebtsStart without `totalDebtsCount`', () => {
      const state: DebtsListState = {
        ...initialState,
        totalDebtsCount: 99,
        isLoading: true,
        isLoadingError: true
      };
      const result = debtsListReducer(state, loadDebtsSuccess({ debts: testTopDebts }));

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        isLoadingError: false,
        totalDebtsCount: 99,
        debts: testTopDebts
      });
    });

    it('should handle loadDebtsStart with `totalDebtsCount`', () => {
      const state: DebtsListState = {
        ...initialState,
        isLoading: true,
        isLoadingError: true
      };
      const result = debtsListReducer(state, loadDebtsSuccess({ totalDebtsCount: 99, debts: testTopDebts }));

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        isLoadingError: false,
        debts: testTopDebts,
        totalDebtsCount: 99
      });
    });
  });

  describe('loadDebtsError', () => {
    it('should handle loadDebtsError without `errorMessage`', () => {
      const state: DebtsListState = {
        ...initialState,
        isLoading: true
      };
      const result = debtsListReducer(state, loadDebtsError());

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        isLoadingError: true
      });
    });

    it('should handle loadDebtsError with `errorMessage`', () => {
      const state: DebtsListState = {
        ...initialState,
        isLoading: true
      };
      const result = debtsListReducer(state, loadDebtsError('some error'));

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        isLoadingError: true,
        errorMessage: 'some error'
      });
    });
  });
});

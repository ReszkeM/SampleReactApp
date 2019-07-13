import { ActionsTestData } from '../../shared/interfaces/actionTestData';
import { testTopDebts } from '../test-data';
import { DebtsListActionTypes, DebtsListActions } from './types';
import { loadDebtsStart, loadDebtsSuccess, loadDebtsError } from './actions';

describe('Debts Filter Actions', () => {
  const testData: ActionsTestData<DebtsListActions, DebtsListActionTypes> = [
    {
      action: loadDebtsStart(),
      expectedType: DebtsListActionTypes.loadDebtsStart
    },
    {
      action: loadDebtsSuccess({ debts: testTopDebts }),
      expectedType: DebtsListActionTypes.loadDebtsSuccess,
      expectedPayload: { debts: testTopDebts }
    },
    {
      action: loadDebtsSuccess({ debts: testTopDebts, totalDebtsCount: 99 }),
      expectedType: DebtsListActionTypes.loadDebtsSuccess,
      expectedPayload: { debts: testTopDebts, totalDebtsCount: 99 }
    },
    {
      action: loadDebtsError(),
      expectedType: DebtsListActionTypes.loadDebtsFailed,
      expectedPayload: { errorMessage: undefined }
    },
    {
      action: loadDebtsError('Sample error'),
      expectedType: DebtsListActionTypes.loadDebtsFailed,
      expectedPayload: { errorMessage: 'Sample error' }
    }
  ];

  testData.forEach(({ action, expectedType, expectedPayload }) => {
    it(`should create an action of type ${expectedType}`, () => {
      expect(action.type).toEqual(expectedType);
      expect((action as any).payload).toEqual(expectedPayload);
    });
  });
});

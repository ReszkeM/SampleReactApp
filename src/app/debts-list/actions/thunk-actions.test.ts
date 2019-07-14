import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';

import { loadDebtsList, filterDebts } from './thunk-actions';
import { DebtsListActionTypes } from './types';
import { testTopDebts } from '../test-data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Thunk Actions', () => {
  let sandbox: sinon.SinonSandbox;
  let server: sinon.SinonFakeServer;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    server = sandbox.useFakeServer();
  });

  afterEach(() => {
    server.restore();
    sandbox.restore();
  });

  describe('loadDebtsList', () => {
    it('dispatch proper actions on success', () => {
      sandbox.stub(axios, 'get').returns(Promise.resolve({ data: testTopDebts }));

      const store = mockStore({});
      const expectedActions = [DebtsListActionTypes.loadDebtsStart, DebtsListActionTypes.loadDebtsSuccess];

      return store.dispatch<any>(loadDebtsList()).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });

    it('dispatch proper actions when failed', () => {
      sandbox.stub(axios, 'get').throws(new Error());

      const store = mockStore({});
      const expectedActions = [DebtsListActionTypes.loadDebtsStart, DebtsListActionTypes.loadDebtsFailed];

      return store.dispatch<any>(loadDebtsList()).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });
  });

  describe('filterDebts', () => {
    it('dispatch proper actions on success', () => {
      sandbox.stub(axios, 'post').returns(Promise.resolve({ data: testTopDebts }));

      const store = mockStore({});
      const expectedActions = [DebtsListActionTypes.loadDebtsStart, DebtsListActionTypes.loadDebtsSuccess];

      return store.dispatch<any>(filterDebts('filter value')).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });

    it('dispatch proper actions when failed', () => {
      sandbox.stub(axios, 'post').throws(new Error());

      const store = mockStore({});
      const expectedActions = [DebtsListActionTypes.loadDebtsStart, DebtsListActionTypes.loadDebtsFailed];

      return store.dispatch<any>(filterDebts('aa')).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });

    it('dispatch error wthout error message', () => {
      sandbox.stub(axios, 'post').throws(new Error());

      const store = mockStore({});

      return store.dispatch<any>(filterDebts('aa')).then(() => {
        const actualActions = store.getActions();
        expect(actualActions[1].type).toEqual(DebtsListActionTypes.loadDebtsFailed);
        expect(actualActions[1].payload).toEqual({});
      });
    });

    it('dispatch error with error message', () => {
      sandbox.stub(axios, 'post').throws({
        response: {
          status: 405
        }
      });

      const store = mockStore({});

      return store.dispatch<any>(filterDebts('aa')).then(() => {
        const actualActions = store.getActions();
        expect(actualActions[1].type).toEqual(DebtsListActionTypes.loadDebtsFailed);
        expect(actualActions[1].payload).toEqual({ errorMessage: 'TO_SHORT_FILTER' });
      });
    });
  });
});

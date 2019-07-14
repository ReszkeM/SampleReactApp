import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import { DebtsList } from './debts-list';
import { testTopDebts } from '../test-data';
import { DebtsListState } from '../reducers/reducer';
import { i18nMockedProps, shouldThrow } from '../../shared/utils/test-helpers';

describe('DebtsList', () => {
  const fakeLoadDebts = sinon.spy();
  const fakeFilterDebts = sinon.spy();
  const mockedStateDebtsListState: DebtsListState = {
    debts: [],
    totalDebtsCount: 0,
    isLoading: false,
    isLoadingError: false,
    errorMessage: undefined
  };

  beforeEach(() => {
    fakeLoadDebts.resetHistory();
    fakeFilterDebts.resetHistory();
  });

  it('it renders', () => {
    const component = create(
      <DebtsList
        loadDebtsList={fakeLoadDebts}
        loadFilteredDebts={fakeFilterDebts}
        {...i18nMockedProps}
        {...mockedStateDebtsListState}
      />
    );
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('functions tests', () => {
    describe('componentWillMount', () => {
      it('calls loadDebtsList', () => {
        create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        expect(fakeLoadDebts.calledOnceWith()).toBeTruthy();
      });
    });

    describe('handleDebtsFilter', () => {
      it('calls loadDebtsList', () => {
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        const instance = (component.getInstance() as any) as DebtsList;

        instance.handleDebtsFilter();
        expect(fakeLoadDebts.calledTwice).toBeTruthy();
      });

      it('calls loadFilteredDebts', () => {
        const expectedValue = 'some value';
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        const instance = (component.getInstance() as any) as DebtsList;

        instance.handleDebtsFilter(expectedValue);
        // Forst time it's called on componentWillMount
        expect(fakeFilterDebts.calledOnceWith(expectedValue)).toBeTruthy();
      });
    });

    describe('handleItemToggle', () => {
      it('updates expandedRowId in component state to given id', () => {
        const expectedId = 1234;
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        const instance = (component.getInstance() as any) as DebtsList;

        expect(instance.state.expandedRowId).toBeNull();
        instance.handleItemToggle(expectedId);
        expect(instance.state.expandedRowId).toEqual(expectedId);
      });

      it('removes expandedRowId from component state', () => {
        const expectedId = 1234;
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        const instance = (component.getInstance() as any) as DebtsList;

        instance.setState({ expandedRowId: expectedId });
        expect(instance.state.expandedRowId).toEqual(expectedId);
        instance.handleItemToggle(expectedId);
        expect(instance.state.expandedRowId).toBeNull();
      });
    });
  });

  describe('UI tests', () => {
    describe('spinner', () => {
      it('show spinner', () => {
        const state = {
          ...mockedStateDebtsListState,
          isLoading: true
        };
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...state}
          />
        );
        expect(component.root.findByProps({ className: 'debts-loading' })).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-list' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-empty' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-error' }))).toBeTruthy();
      });

      it('hide spinner', () => {
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-loading' }))).toBeTruthy();
      });
    });

    describe('list', () => {
      it('show list', () => {
        const state = {
          ...mockedStateDebtsListState,
          debts: testTopDebts
        };
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...state}
          />
        );
        expect(component.root.findByProps({ className: 'debts-list' })).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-loading' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-empty' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-error' }))).toBeTruthy();
      });

      it('show empty state', () => {
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...mockedStateDebtsListState}
          />
        );
        expect(component.root.findByProps({ className: 'debts-empty' })).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-list' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-loading' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-error' }))).toBeTruthy();
      });

      it('show items', () => {
        const state = {
          ...mockedStateDebtsListState,
          debts: testTopDebts
        };
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...state}
          />
        );
        expect(component.root.findAllByType('tbody').length).toEqual(testTopDebts.length);
      });
    });

    describe('loading error', () => {
      it('show default error message', () => {
        const state = {
          ...mockedStateDebtsListState,
          isLoadingError: true
        };
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...state}
          />
        );
        const errorContainer = component.root.findByProps({ className: 'debts-error' });
        expect(errorContainer).toBeTruthy();
        expect(errorContainer.findByType('h1').props.children).toEqual('ERROR.TITLE');
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-list' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-loading' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-empty' }))).toBeTruthy();
      });

      it('show custom error message', () => {
        const state = {
          ...mockedStateDebtsListState,
          isLoadingError: true,
          errorMessage: 'CUSTOM_TRANSLATION'
        };
        const component = create(
          <DebtsList
            loadDebtsList={fakeLoadDebts}
            loadFilteredDebts={fakeFilterDebts}
            {...i18nMockedProps}
            {...state}
          />
        );
        const errorContainer = component.root.findByProps({ className: 'debts-error' });
        expect(errorContainer).toBeTruthy();
        expect(errorContainer.findByType('h1').props.children).toEqual('CUSTOM_TRANSLATION.TITLE');
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-list' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-loading' }))).toBeTruthy();
        expect(shouldThrow(() => component.root.findByProps({ className: 'debts-empty' }))).toBeTruthy();
      });
    });
  });
});

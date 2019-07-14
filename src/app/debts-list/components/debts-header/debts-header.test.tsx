import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import { DebtsHeader } from './debts-header';
import { i18nMockedProps } from '../../../shared/utils/test-helpers';

describe('DebtsHeader', () => {
  const fakeFunc = sinon.spy();
  const testNumber = 99;

  beforeEach(() => {
    fakeFunc.resetHistory();
  });

  it('it renders', () => {
    const component = create(
      <DebtsHeader onFilterChange={fakeFunc} debtsTotalCount={testNumber} {...i18nMockedProps} />
    );
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('debtsTotalCount', () => {
    it('Shows proper value', () => {
      const component = create(
        <DebtsHeader onFilterChange={fakeFunc} debtsTotalCount={testNumber} {...i18nMockedProps} />
      );
      const value = component.root.findByProps({ className: 'value' });
      expect(value.props.children).toEqual(testNumber);
    });
  });

  describe('functions tests', () => {
    it('handleSearchValueChange', () => {
      const expectedValue = 'some search value';
      const component = create(
        <DebtsHeader onFilterChange={fakeFunc} debtsTotalCount={testNumber} {...i18nMockedProps} />
      );
      const instance = (component.getInstance() as any) as DebtsHeader;

      instance.handleFilterChange(expectedValue);
      expect(fakeFunc.calledOnceWith(expectedValue)).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onSubmit', () => {
      it('calls function', () => {
        const component = create(
          <DebtsHeader onFilterChange={fakeFunc} debtsTotalCount={testNumber} {...i18nMockedProps} />
        );
        const button = component.root.findByType('button');
        button.props.onClick();
        expect(fakeFunc.calledOnce).toBeTruthy();
      });
    });
  });
});

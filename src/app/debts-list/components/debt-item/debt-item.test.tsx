import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import { DebtItem } from './debt-item';
import { testTopDebts } from '../../test-data';
import { i18nMockedProps, shouldThrow } from '../../../shared/utils/test-helpers';

describe('DebtItem', () => {
  const fakeFunc = sinon.spy();
  const testDebt = testTopDebts[0];

  beforeEach(() => {
    fakeFunc.resetHistory();
  });

  it('it renders', () => {
    const component = create(<DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={false} {...i18nMockedProps} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    const defaultClassName = 'debts-table-row';

    it('set `debts-table-row` class by default', () => {
      const component = create(
        <DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={false} {...i18nMockedProps} />
      );
      const button = component.root.findByType('tbody');
      expect(button.props.className).toEqual(defaultClassName);
    });

    it('add expanded class', () => {
      const expandedClass = 'row-expanded';
      const expectedClassName = `${defaultClassName} ${expandedClass}`;

      const component = create(<DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={true} {...i18nMockedProps} />);
      const button = component.root.findByType('tbody');
      expect(button.props.className).toEqual(expectedClassName);
    });
  });

  describe('functions tests', () => {
    it('handleToggle', () => {
      const component = create(
        <DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={false} {...i18nMockedProps} />
      );
      const instance = (component.getInstance() as any) as DebtItem;

      instance.handleToggle();
      expect(fakeFunc.calledOnceWith(testDebt.Id)).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onSubmit', () => {
      it('calls function', () => {
        const component = create(
          <DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={false} {...i18nMockedProps} />
        );
        const expander = component.root.findByType('a');
        expander.props.onClick();
        expect(fakeFunc.calledOnceWith(testDebt.Id)).toBeTruthy();
      });
    });

    describe('expand content', () => {
      it('content is hidden', () => {
        const expectedClassName = `expanded-row`;

        const component = create(
          <DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={false} {...i18nMockedProps} />
        );
        expect(shouldThrow(() => component.root.findByProps({ className: expectedClassName }))).toBeTruthy();
      });

      it('content is visible', () => {
        const expectedClassName = `expanded-row`;

        const component = create(
          <DebtItem onToggle={fakeFunc} debt={testDebt} isExpanded={true} {...i18nMockedProps} />
        );
        expect(component.root.findByProps({ className: expectedClassName })).toBeTruthy();
      });
    });
  });
});

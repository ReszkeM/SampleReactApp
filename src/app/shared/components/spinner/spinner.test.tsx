import React, { ReactInstance } from 'react';
import { create, ReactTestInstance } from 'react-test-renderer';

import { Spinner } from './spinner';
import { i18nMockedProps } from '../../utils/test-helpers';

describe('Spinner', () => {
  it('it renders', () => {
    const component = create(<Spinner {...i18nMockedProps} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    const defaultClassName = 'spinner-border spinner-xlg';

    describe('className', () => {
      it('set primary theme by default', () => {
        const component = create(<Spinner {...i18nMockedProps} />);
        const spinner = component.root.findByType('div').children[0] as ReactTestInstance;
        expect(spinner.props.className).toEqual(defaultClassName);
      });

      it('add custom class', () => {
        const customClassName = 'custom-class';
        const expectedClassName = `${defaultClassName} ${customClassName}`;
        const component = create(<Spinner className={customClassName} {...i18nMockedProps} />);
        const spinner = component.root.findByType('div').children[0] as ReactTestInstance;
        expect(spinner.props.className).toEqual(expectedClassName);
      });
    });

    describe('size', () => {
      it('set xlg size class by default', () => {
        const component = create(<Spinner {...i18nMockedProps} />);
        const spinner = component.root.findByType('div').children[0] as ReactTestInstance;
        expect(spinner.props.className).toEqual(defaultClassName);
      });

      it('set choosen size class', () => {
        const size = 'sm';
        const expectedClassName = `spinner-border spinner-${size}`;
        const component = create(<Spinner size={size} {...i18nMockedProps} />);
        const spinner = component.root.findByType('div').children[0] as ReactTestInstance;
        expect(spinner.props.className).toEqual(expectedClassName);
      });
    });
  });
});

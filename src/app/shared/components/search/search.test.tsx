import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import Search from './search';
import { expectFindToThrow } from '../../utils/testHelpers';

describe('Search', () => {
  const fakeFunc = sinon.spy();

  beforeEach(() => {
    fakeFunc.resetHistory();
  });

  it('it renders', () => {
    const component = create(<Search onSubmit={fakeFunc} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    const defaultClassName = 'search-form';

    it('set `search-form` class by default', () => {
      const component = create(<Search onSubmit={fakeFunc} />);
      const searchContainer = component.root.findByType('div');
      expect(searchContainer.props.className).toEqual(defaultClassName);
    });

    it('add custom class theme', () => {
      const customClassName = 'custom-class';
      const expectedClassName = `${defaultClassName} ${customClassName}`;
      const component = create(<Search onSubmit={fakeFunc} className={customClassName} />);
      const searchContainer = component.root.findByType('div');
      expect(searchContainer.props.className).toEqual(expectedClassName);
    });
  });

  describe('label', () => {
    it('hidde label by default', () => {
      const component = create(<Search onSubmit={fakeFunc} />);
      expectFindToThrow(() => component.root.findByType('label'));
    });

    it('show label passed in props', () => {
      const expectedText = 'some label';
      const component = create(<Search onSubmit={fakeFunc} label={expectedText} />);
      const label = component.root.findByType('label');
      expect(label.props.children).toEqual(expectedText);
    });
  });

  describe('functions tests', () => {
    it('handleSearchValueChange', () => {
      const expectedValue = 'some search value';
      const search = create(<Search onSubmit={fakeFunc} />);
      const instance = (search.getInstance() as any) as Search;

      expect(instance.state.value).toEqual('');
      instance.handleSearchValueChange(expectedValue);
      expect(instance.state.value).toEqual(expectedValue);
    });

    it('handleSubmit', () => {
      const expectedValue = 'some search value';
      const search = create(<Search onSubmit={fakeFunc} />);
      const instance = (search.getInstance() as any) as Search;

      instance.handleSubmit();
      expect(fakeFunc.calledOnceWith('')).toBeTruthy();

      instance.setState({ value: expectedValue });
      instance.handleSubmit();
      expect(fakeFunc.calledTwice).toBeTruthy();
      expect(fakeFunc.calledWith(expectedValue)).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onSubmit', () => {
      it('calls function', () => {
        const component = create(<Search onSubmit={fakeFunc} />);
        const button = component.root.findByType('button');
        button.props.onClick();
        expect(fakeFunc.calledOnce).toBeTruthy();
      });
    });
  });
});

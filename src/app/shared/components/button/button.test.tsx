import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import Button from './button';

describe('Button', () => {
  const fakeFunc = sinon.spy();
  const defaultClassName = 'btn btn-primary';

  it('it renders', () => {
    const component = create(<Button onClick={fakeFunc} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    describe('className', () => {
      it('set `btn btn-primary` class by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('add custom class', () => {
        const customClassName = 'custom-class';
        const expectedClassName = `${defaultClassName} ${customClassName}`;
        const component = create(<Button onClick={fakeFunc} className={customClassName} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });

    describe('theme', () => {
      it('set primary theme by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('set choosen theme', () => {
        const expectedClassName = 'btn btn-secondary';
        const component = create(<Button onClick={fakeFunc} theme="secondary" />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });

    describe('radius', () => {
      it('set no radius style by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('set style for choosen radius', () => {
        const expectedClassName = `${defaultClassName} btn-border-radius-none`;
        const component = create(<Button onClick={fakeFunc} borderRadius="none" />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });
  });

  describe('label', () => {
    it('hide label by default', () => {
      const component = create(<Button onClick={fakeFunc} />);
      const button = component.root.findByType('button');
      expect(button.props.children).toBeUndefined();
    });

    it('show label passed in props', () => {
      const expectedText = 'some label';
      const component = create(<Button onClick={fakeFunc} label={expectedText} />);
      const button = component.root.findByType('button');
      expect(button.props.children).toEqual(expectedText);
    });
  });

  describe('disabled', () => {
    it('its enabled', () => {
      const component = create(<Button onClick={fakeFunc} />);
      const button = component.root.findByType('button');
      expect(button.props.disabled).toBeFalsy();
    });

    it('its disabled', () => {
      const component = create(<Button onClick={fakeFunc} disabled={true} />);
      const button = component.root.findByType('button');
      expect(button.props.disabled).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onClick', () => {
      it('calls function', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        button.props.onClick();
        expect(fakeFunc.calledOnce).toBeTruthy();
      });
    });
  });
});

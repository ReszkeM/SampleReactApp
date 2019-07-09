import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { act, create } from 'react-test-renderer';

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
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
    });

    describe('theme', () => {
      it('sets primary theme by default', () => {
        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button).toBeTruthy();
      });

      it('sets choosen theme', () => {
        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} theme="secondary" />, container);
        });

        let button = container.getElementsByClassName(defaultClassName)[0];
        expect(button).toBeFalsy();

        button = container.getElementsByClassName('btn btn-secondary')[0];
        expect(button).toBeTruthy();
      });
    });

    describe('radius', () => {
      it('sets no radius style by default', () => {
        const expectedClassName = 'btn btn-primary';

        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.className).toEqual(expectedClassName);
      });

      it('sets style for choosen radius', () => {
        const expectedClassName = 'btn btn-primary btn-border-radius-none';

        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} borderRadius="none" />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.className).toEqual(expectedClassName);
      });
    });

    describe('label', () => {
      it('shows no label by default', () => {
        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.innerHTML).toEqual('');
      });

      it('sets style for choosen radius', () => {
        const expectedText = 'some label';

        act(() => {
          ReactDOM.render(<Button onClick={fakeFunc} label={expectedText} />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.innerHTML).toEqual(expectedText);
      });
    });

    describe('onClick', () => {
      it('calls function', () => {
        const component = create(<Button onClick={fakeFunc} />);
        component.root.findByType('button').props.onClick();

        expect(fakeFunc.calledOnce).toBeTruthy();
      });
    });
  });
});

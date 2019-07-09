import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { create, act } from 'react-test-renderer';

import TextField from './text-field';

describe('TextField', () => {
  const fakeFunc = sinon.spy();
  const testValue = 'some value';
  const containerClassName = 'form-group';
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('it renders', () => {
    const component = create(<TextField value={testValue} onChange={fakeFunc} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    describe('for container', () => {
      it('sets default className', () => {
        act(() => {
          ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} />, container);
        });

        const field = container.getElementsByClassName(containerClassName)[0];
        expect(field).toBeTruthy();
      });

      it('use class name from params', () => {
        const expectedClass = 'some-class';

        act(() => {
          ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} className={expectedClass} />, container);
        });

        const field = container.getElementsByClassName(`${containerClassName} ${expectedClass}`)[0];
        expect(field).toBeTruthy();
      });
    });

    describe('for form control', () => {
      const defaultClassName = 'form-control';

      it('sets no radius style by default', () => {
        const expectedClassName = defaultClassName;

        act(() => {
          ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.className).toEqual(expectedClassName);
      });

      it('sets style for choosen radius', () => {
        const expectedClassName = `${defaultClassName} form-control-border-radius-none`;

        act(() => {
          ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} borderRadius="none" />, container);
        });

        const button = container.getElementsByClassName(defaultClassName)[0];
        expect(button.className).toEqual(expectedClassName);
      });
    });
  });

  describe('label', () => {
    const labelClass = 'form-label';

    it('shows no label by default', () => {
      act(() => {
        ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} />, container);
      });

      const label = container.getElementsByClassName(labelClass)[0];
      expect(label).toBeFalsy();
    });

    it('sets style for choosen radius', () => {
      const expectedText = 'some label';

      act(() => {
        ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} label={expectedText} />, container);
      });

      const label = container.getElementsByClassName(labelClass)[0];
      expect(label).toBeTruthy();
      expect(label.innerHTML).toEqual(expectedText);
    });
  });

  describe('onChange', () => {
    it('calls function', () => {
      let valueToChange = '';
      const expectedValue = 'lorem ipsum';
      const changeValue = (value: string) => {
        valueToChange = value;
      };

      const component = create(<TextField value={valueToChange} onChange={changeValue} />);
      component.root.findByType('input').props.onChange({ target: { value: expectedValue } });

      expect(valueToChange).toEqual(expectedValue);
    });
  });

  describe('disabled', () => {
    const controlClassName = 'form-control';

    it('its enabled', () => {
      act(() => {
        ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} />, container);
      });

      const button = container.getElementsByClassName(controlClassName)[0];

      expect(button.getAttribute('disabled')).toEqual(null);
    });

    it('its disabled', () => {
      act(() => {
        ReactDOM.render(<TextField value={testValue} onChange={fakeFunc} disabled={true} />, container);
      });

      const button = container.getElementsByClassName(controlClassName)[0];

      expect(button.getAttribute('disabled')).toEqual('');
    });
  });
});

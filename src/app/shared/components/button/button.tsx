import React, { Component } from 'react';

import './button.less';

interface IButtonProps {
  onClick: () => void;
  theme: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  borderRadius?: 'none' | 'left' | 'right' | 'top' | 'bottom';
  label?: string;
  disabled: boolean;
}

export default class Button extends Component<IButtonProps, any> {
  static defaultProps = {
    theme: 'primary',
    disabled: false
  };

  get className(): string {
    const themeClass = `btn-${this.props.theme}`;
    const radiusClass = this.props.borderRadius && `btn-border-radius-${this.props.borderRadius}`;

    return ['btn', themeClass, radiusClass].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    const { onClick, label, disabled } = this.props;

    return (
      <button onClick={onClick} className={this.className} disabled={disabled}>
        {label}
      </button>
    );
  }
}

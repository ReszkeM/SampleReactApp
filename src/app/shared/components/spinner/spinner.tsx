import React, { Component } from 'react';

import './spinner.less';

export interface ISpinnerProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
  className?: string;
}

export default class Spinner extends Component<ISpinnerProps, {}> {
  static defaultProps = {
    size: 'xlg'
  };

  get className(): string {
    return ['spinner-border', `spinner-${this.props.size}`, this.props.className].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    return (
      <div className={this.className} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './spinner.less';

export interface ISpinnerProps extends WithTranslation {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
  className?: string;
}

class Spinner extends Component<ISpinnerProps, {}> {
  static defaultProps = {
    size: 'xlg'
  };

  get className(): string {
    return ['spinner-border', `spinner-${this.props.size}`, this.props.className].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    return (
      <div className="spinner-container">
        <div className={this.className} role="status" />
        <div className="spinner-message">{this.props.t('COMPONENTS.SPINNER.TEXT')}</div>
      </div>
    );
  }
}

// <any> is a workaround for type issue with default props
export default withTranslation()<any>(Spinner);

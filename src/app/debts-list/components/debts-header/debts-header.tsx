import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import Search from '../../../shared/components/search/search';

import './debts-header.less';

interface IDebtsHeaderProps extends WithTranslation {
  onFilterChange: (value: string) => void;
  debtsTotalCount: number;
}

class DebtsHeader extends Component<IDebtsHeaderProps, any> {
  constructor(props: IDebtsHeaderProps) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(value: string): void {
    this.props.onFilterChange(value);
  }

  render(): JSX.Element {
    const { debtsTotalCount } = this.props;

    return (
      <div className="debts-header">
        <div className="debts-filter col-12 col-md-5 offset-md-1">
          <Search onSubmit={this.handleFilterChange} label="Podaj numer sprawy, nazwę lub nip dłużnika" />
        </div>

        <div className="debts-total-count col-12 col-md-5">
          <div className="label">{this.props.t('DEBTS_HEADER.TOTAL_DEBTS_COUNT')}</div>
          <div className="value">{debtsTotalCount}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation('DEBTS_LIST')(DebtsHeader);

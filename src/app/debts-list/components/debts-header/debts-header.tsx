import React, { Component } from 'react';

import Search from '../../../shared/components/search/search';

import './debts-header.less';

interface IDebtsHeaderProps {
  onFilterChange: (value: string) => void;
  debtsTotalCount: number;
}

export default class DebtsHeader extends Component<IDebtsHeaderProps, any> {
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
          <div className="label">Całkowita ilośc spraw</div>
          <div className="value">{debtsTotalCount}</div>
        </div>
      </div>
    );
  }
}

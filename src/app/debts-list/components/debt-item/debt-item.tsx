import React, { Component } from 'react';

import DebtListItem from '../../models/debtListItem';

import './debt-item.less';

interface IDebtsItemProps {
  debt: DebtListItem;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

export default class DebtItem extends Component<IDebtsItemProps, {}> {
  constructor(props: IDebtsItemProps) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  get className(): string {
    const selectedClas = this.props.isExpanded && 'row-selected';
    return ['debts-table-row', selectedClas].filter(Boolean).join(' ');
  }

  handleToggle(): void {
    this.props.onToggle(this.props.debt.id);
  }

  render(): JSX.Element {
    return (
      <tbody className={this.className}>
        <tr className="main-row">
          <td>
            {this.props.isExpanded && <div className="label">Dłużnik</div>}
            {this.props.debt.name}
          </td>
          <td>
            {this.props.isExpanded && <div className="label">Nip</div>}
            {this.props.debt.nip}
          </td>
          <td>
            {this.props.isExpanded && <div className="label">Kwota zadłużenia</div>}
            {this.props.debt.value}
          </td>
          <td className="expander">
            <a onClick={this.handleToggle}>{this.props.isExpanded ? 'Mniej' : 'Więcej'}</a>
          </td>
        </tr>
        {this.props.isExpanded && (
          <tr className="expanded-row">
            <td>
              {this.props.isExpanded && <div className="label">Adres</div>}
              {this.props.debt.address}
            </td>
            <td>
              {this.props.isExpanded && (
                <div className="label">Rodzaj/typ dokumentu stanowiący podstawę dla wierzytelności</div>
              )}
              {this.props.debt.documentType}
            </td>
            <td className="price-number-cell">
              <div className="price">
                {this.props.isExpanded && <div className="label">Cena zadłużenia</div>}
                {this.props.debt.price}
              </div>
              <div>
                {this.props.isExpanded && <div className="label">Numer</div>}
                {this.props.debt.number}
              </div>
            </td>
            <td />
          </tr>
        )}
      </tbody>
    );
  }
}

import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import DebtListItem from '../../models/debtListItem';

import './debt-item.less';

interface IDebtsItemProps extends WithTranslation {
  debt: DebtListItem;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

export class DebtItem extends Component<IDebtsItemProps, {}> {
  constructor(props: IDebtsItemProps) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  get className(): string {
    const selectedClas = this.props.isExpanded && 'row-expanded';
    return ['debts-table-row', selectedClas].filter(Boolean).join(' ');
  }

  handleToggle(): void {
    this.props.onToggle(this.props.debt.Id);
  }

  render(): JSX.Element {
    return (
      <tbody className={this.className}>
        <tr className="main-row">
          <td>
            {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.DEBTOR')}</div>}
            {this.props.debt.Name}
          </td>
          <td>
            {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.NIP')}</div>}
            {this.props.debt.NIP}
          </td>
          <td>
            {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.DEBT')}</div>}
            {this.props.debt.Value}
          </td>
          <td className="expander">
            <a onClick={this.handleToggle}>
              {this.props.isExpanded
                ? this.props.t('DEBTS_TABLE.ITEM.COLLAPSE')
                : this.props.t('DEBTS_TABLE.ITEM.EXPAND')}
            </a>
          </td>
        </tr>
        {this.props.isExpanded && (
          <tr className="expanded-row">
            <td>
              {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.ADDRESS')}</div>}
              {this.props.debt.Address}
            </td>
            <td>
              {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.DOCUMENT_TYPE')}</div>}
              {this.props.debt.DocumentType}
            </td>
            <td className="price-number-cell">
              <div className="price">
                {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.DEBT_PRICE')}</div>}
                {this.props.debt.Price}
              </div>
              <div>
                {this.props.isExpanded && <div className="label">{this.props.t('DEBTS_TABLE.ITEM.NUMBER')}</div>}
                {this.props.debt.Number}
              </div>
            </td>
            <td />
          </tr>
        )}
      </tbody>
    );
  }
}

export default withTranslation('DEBTS_LIST')(DebtItem);

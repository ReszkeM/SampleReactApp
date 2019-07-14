import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';

import { DebtsListState } from '../reducers/reducer';
import { loadDebtsList, filterDebts } from '../actions/thunk-actions';
import DebtsHeader from '../components/debts-header/debts-header';
import DebtItem from '../components/debt-item/debt-item';
import DebtListItem from '../models/debtListItem';
import Spinner from '../../shared/components/spinner/spinner';
import { AppState } from '../../../rootReducer';

import './debts-list.less';

interface IDebtsListProps extends DebtsListState, WithTranslation {
  loadFilteredDebts: (value: string) => void;
  loadDebtsList: () => void;
}

interface IDebtsListState {
  expandedRowId: number | null;
}

export class DebtsList extends Component<IDebtsListProps, IDebtsListState> {
  constructor(props: IDebtsListProps) {
    super(props);

    this.state = {
      expandedRowId: null
    };

    this.handleItemToggle = this.handleItemToggle.bind(this);
    this.handleDebtsFilter = this.handleDebtsFilter.bind(this);
  }

  componentWillMount(): void {
    this.props.loadDebtsList();
  }

  handleItemToggle(id: number): void {
    this.setState({ expandedRowId: id === this.state.expandedRowId ? null : id });
  }

  handleDebtsFilter(value?: string): void {
    if (!!value) {
      this.props.loadFilteredDebts(value);
    } else {
      this.props.loadDebtsList();
    }
  }

  render(): JSX.Element {
    const { debts, totalDebtsCount, isLoading, isLoadingError } = this.props;
    return (
      <div className="debts-container">
        <DebtsHeader onFilterChange={this.handleDebtsFilter} debtsTotalCount={totalDebtsCount} />
        {isLoading && (
          <div className="debts-loading">
            <Spinner />
          </div>
        )}
        {!!debts.length && this.renderDebtsTable()}
        {!debts.length && !isLoadingError && !isLoading && this.renderEmptyState()}
        {isLoadingError && this.renderLoadingError()}
      </div>
    );
  }

  private renderDebtsTable(): JSX.Element {
    return (
      <div className="debts-list">
        <table className="debts-table col-12 col-md-10 offset-md-1">
          <thead className="debts-table-header">
            <tr>
              <th className="debtor">{this.props.t('DEBTS_TABLE.HEADER.DEBTOR')}</th>
              <th className="nip">{this.props.t('DEBTS_TABLE.HEADER.NIP')}</th>
              <th className="debt">{this.props.t('DEBTS_TABLE.HEADER.DEBT')}</th>
              <th className="actions" />
            </tr>
          </thead>
          {this.props.debts.map((debt: DebtListItem) => (
            <DebtItem
              debt={debt}
              key={debt.Id}
              onToggle={this.handleItemToggle}
              isExpanded={debt.Id === this.state.expandedRowId}
            />
          ))}
        </table>
      </div>
    );
  }

  private renderEmptyState(): JSX.Element {
    return this.renderMessage('debts-empty', this.props.t('NOT_FOUND.TITLE'), this.props.t('NOT_FOUND.MESSAGE'));
  }

  private renderLoadingError(): JSX.Element {
    const title = this.props.errorMessage ? `${this.props.errorMessage}.TITLE` : 'ERROR.TITLE';
    const message = this.props.errorMessage ? `${this.props.errorMessage}.MESSAGE` : 'ERROR.MESSAGE';
    return this.renderMessage('debts-error', title, message);
  }

  // TODO: This could be a shared component
  private renderMessage(className: string, title: string, message: string): JSX.Element {
    return (
      <div className={className}>
        <h1>{this.props.t(title)}</h1>
        <h3>{this.props.t(message)}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ ...state.debtsListReducer });

const mapDispatchToProps = (dispatch: any) => ({
  loadFilteredDebts: (value: string) => dispatch(filterDebts(value)),
  loadDebtsList: () => dispatch(loadDebtsList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('DEBTS_LIST')(DebtsList));

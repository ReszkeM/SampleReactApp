import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../shared/components/spinner/spinner';
import DebtsHeader from './components/debts-header/debts-header';
import DebtItem from './components/debt-item/debt-item';
import DebtListItem from './models/debtListItem';
import { DebtsListState } from './reducer';
import { loadDebts } from './actions';
import { AppState } from '../../rootReducer';

import './debts-list.less';

interface IDebtsListProps extends DebtsListState {
  loadFilteredDebts: (value: string) => void;
  loadTotalDebtsCount: () => void;
  loadDebts: () => void;
}

interface IDebtsListState {
  expandedRowId: number | null;
}

class DebtsList extends Component<IDebtsListProps, IDebtsListState> {
  constructor(props: IDebtsListProps) {
    super(props);

    this.state = {
      expandedRowId: null
    };

    this.handleItemToggle = this.handleItemToggle.bind(this);
  }

  componentDidMount(): void {
    this.props.loadDebts();
  }

  handleItemToggle(id: number): void {
    this.setState({ expandedRowId: id === this.state.expandedRowId ? null : id });
  }

  render(): JSX.Element {
    const { loadFilteredDebts, debts, isLoading, isLoadingError } = this.props;
    return (
      <div className="debts-container">
        <DebtsHeader onFilterChange={loadFilteredDebts} debtsTotalCount={88} />
        {isLoading && <div className="debts-loading"><Spinner /></div>}
        {!!debts.length && this.renderDebtsTable()}
        {!debts.length && !isLoadingError && this.renderEmptyState()}
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
              <th className="debtor">DŁUŻNIK</th>
              <th className="nip">NIP</th>
              <th className="debt">KWOTA ZADŁUŻENIA</th>
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
    )
  }

  private renderEmptyState(): JSX.Element {
    return (
      <div className="debts-empty">
        <h1>No Debts found.</h1>
      </div>
    )
  }

  private renderLoadingError(): JSX.Element {
    return (
      <div className="debts-error">
        <h1>Loading Debts failed. Please try again</h1>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({ ...state.debtsListReducer });

const mapDispatchToProps = (dispatch: any) => ({
  loadFilteredDebts: (value: string) => dispatch(),
  loadTotalDebtsCount: () => dispatch(),
  loadDebts: () => dispatch(loadDebts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtsList);

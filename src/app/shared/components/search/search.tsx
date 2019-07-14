import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import Button from '../button/button';
import TextField from '../text-field/text-field';

import './search.less';

interface ISearchProps extends WithTranslation {
  onSubmit: (value: string) => void;
  label?: string;
  className?: string;
}

interface ISearchState {
  value: string;
}

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get className(): string {
    return ['search-form', this.props.className].filter(Boolean).join(' ');
  }

  handleSearchValueChange(value: string): void {
    this.setState({ value });
  }

  handleSubmit(): void {
    this.props.onSubmit(this.state.value);
  }

  render(): JSX.Element {
    return (
      <div className={this.className}>
        <TextField
          onChange={this.handleSearchValueChange}
          value={this.state.value}
          label={this.props.label}
          borderRadius="left"
        />
        <Button
          onClick={this.handleSubmit}
          label={this.props.t('COMPONENTS.SEARCH.SUBMIT_BUTTON_LABEL')}
          borderRadius="right"
          theme="danger"
        />
      </div>
    );
  }
}

export default withTranslation()(Search);

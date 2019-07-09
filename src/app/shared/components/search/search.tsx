import React, { Component } from 'react';

import Button from '../button/button';
import TextField from '../text-field/text-field';

import './search.less';

interface ISearchProps {
  onSubmit: () => void;
  label?: string;
  className?: string;
}

interface ISearchState {
  value: string;
}

export default class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  }

  get className(): string {
    return ['search-form', this.props.className].filter(Boolean).join(' ');
  }

  handleSearchValueChange(value: string): void {
    this.setState({ value });
  }

  render(): JSX.Element {
    const { label, onSubmit } = this.props;
    return (
      <div className={this.className}>
        <TextField onChange={this.handleSearchValueChange} value={this.state.value} label={label} borderRadius="left" />
        <Button onClick={onSubmit} label="Szukaj" borderRadius="right" theme="danger" />
      </div>
    );
  }
}

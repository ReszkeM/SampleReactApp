import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../shared/components/button/button';
import Search from '../shared/components/search/search';
import { simpleAction } from './actions';
import logo from '../../assets/images/logo.svg';

import './App.less';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      test: ''
    };

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(): void {
    this.setState({ test: 'search form submited' });
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>

          <div className="sandbox-1">
            <Button onClick={this.props.simpleAction} theme="warning" label="Test redux action" />
            <p>{this.props.message}</p>
          </div>
          <div className="sandbox-2">
            <Search onSubmit={this.handleStateChange} label="some label" />
            <p>{this.state.test}</p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ ...state.appReducer });

const mapDispatchToProps = (dispatch: any) => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

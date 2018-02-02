import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';

import ListBooks from './components/ListBooks';

import './App.css';

class App extends Component {
  componentDidMount() {
    // fetch book data here
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks />} />
      </div>
    );
  }
}

export default App;

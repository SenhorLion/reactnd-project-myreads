import React, { Component } from 'react';
import * as BooksAPI from './api/BooksAPI';

import ListBooks from './components/ListBooks';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ListBooks />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';
// import { BOOK_SHELF_CATEGORIES } from './constants/constants';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookshelves: {
        currentlyReading: {
          name: 'Currently Reading',
          id: 'currentlyReading',
          books: [],
        },
        wantToRead: { name: 'Want To Read', id: 'wantToRead', books: [] },
        read: { name: 'Read', id: 'read', books: [] },
      },
      books: [],
      isLoading: true,
    };

    this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false }, this.updateBookShelves);
    });
  }

  /* 
    Map books into their respective shelf 
    @method updateBookShelves
  */
  updateBookShelves = () => {
    const { books, bookshelves } = this.state;

    books.map(book => {
      return bookshelves[book.shelf].books.push(book);
    });

    this.setState({ bookshelves });
  };

  /* 
    Add book to a shelf
    @method onChangeBookShelf
    @param {object} book
    @param {object} shelf
  */
  onChangeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books =>
        this.setState({ books }, this.updateBookShelves)
      );
    });
  };

  render() {
    const { bookshelves, isLoading } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks isLoading={isLoading} bookshelves={bookshelves} />
          )}
        />
        <Route path="/search" render={() => <SearchBooks />} />
      </div>
    );
  }
}

export default App;

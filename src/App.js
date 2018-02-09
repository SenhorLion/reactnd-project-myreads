import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';
// import { BOOK_SHELF_CATEGORIES } from './constants/constants';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import BookDetail from './components/BookDetail';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookshelves: {
        currentlyReading: {
          name: 'Currently Reading',
          id: 'currentlyReading',
        },
        wantToRead: { name: 'Want To Read', id: 'wantToRead' },
        read: { name: 'Read', id: 'read' },
      },
      books: [],
      isLoading: true,
    };

    this.fetchAllBooks = this.fetchAllBooks.bind(this);
    this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false });
    });
  }

  /* 
    Add book to a shelf
    @method onChangeBookShelf
    @param {object} book
    @param {object} shelf
  */
  onChangeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(result => {
      // TODO: Use `result` to update bookshelf with associative bookId's
      // as result contains an object map with array of bookId's
      // e.g:
      // {
      //    currentlyReading: ["evuwdDLfAyYC", "luD1Bpc1fmsC"],
      //    wantToRead: Array(12),
      //    read: Array(5)
      //  }

      BooksAPI.getAll().then(books => {
        this.setState(prevState => ({
          books: [...books],
          isLoading: false,
        }));
      });
    });
  };

  render() {
    const { books, bookshelves, isLoading } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              isLoading={isLoading}
              onChangeBookShelf={this.onChangeBookShelf}
              bookshelves={bookshelves}
              books={books}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              myBooks={books}
              onChangeBookShelf={this.onChangeBookShelf}
            />
          )}
        />
        <Route
          path="/book/:id"
          render={props => <BookDetail myBooks={books} {...props} />}
        />
      </div>
    );
  }
}

export default App;

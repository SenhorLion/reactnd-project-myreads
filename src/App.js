import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';
import { ERROR_MESSAGES, LOADING_MESSAGE } from './constants/constants';
import BookShelves from './components/BookShelves';
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
      updatingBookId: null,
      error: null,
    };

    this.fetchAllBooks = this.fetchAllBooks.bind(this);
    this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books, isLoading: false });
      })
      .catch(error => {
        const errorMessage = `${ERROR_MESSAGES.SOMETHING_WRONG} Error: ${
          error.message
        }`;
        this.setState({ error: errorMessage, isLoading: false });
      });
  }

  /* 
    Add book to a shelf
    @method onChangeBookShelf
    @param {object} book
    @param {object} shelf
  */
  onChangeBookShelf = (book, shelf) => {
    this.setState({ updatingBookId: book.id });

    BooksAPI.update(book, shelf).then(result => {
      // TODO: Use `result` to update bookshelf with bookId's
      // as `result` contains an object map with an array of bookId's
      // e.g:
      // {
      //    currentlyReading: ["evuwdDLfAyYC", "luD1Bpc1fmsC"],
      //    wantToRead: Array(12),
      //    read: Array(5)
      //  }
      BooksAPI.getAll().then(books => {
        this.setState({
          books: [...books],
          updatingBookId: null,
        });
      });
    });
  };

  render() {
    const { books, bookshelves, isLoading, error, updatingBookId } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookShelves
              error={error}
              updatingBookId={updatingBookId}
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
              updatingBookId={updatingBookId}
              isLoading={isLoading}
              myBooks={books}
              onChangeBookShelf={this.onChangeBookShelf}
            />
          )}
        />
        <Route path="/book/:id" render={props => <BookDetail {...props} />} />
      </div>
    );
  }
}

export default App;

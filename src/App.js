import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI';
import { ERROR_MESSAGES } from './constants/constants';
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

  /* 
    Fetch all books
    - Makes a call to BooksAPI and stores returned books in state
    - Catches any error and stores error message in state
    @method fetchAllBooks
  */
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
    if (book.shelf !== shelf) {
      // show updating loader
      this.setState({ updatingBookId: book.id });

      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book]),
          updatingBookId: null,
        }));
      });
    }
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

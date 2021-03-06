import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import BookShelf from './BookShelf';

class BookShelves extends Component {
  render() {
    const {
      onChangeBookShelf,
      books,
      bookshelves,
      isLoading,
      error,
      updatingBookId,
    } = this.props;

    const shelfKeys = Object.keys(bookshelves);
    const booksForShelf = shelfId => books.filter(b => b.shelf === shelfId);

    return (
      <div className="list-books">
        <Header title="My Reads Project" />

        <div className="list-books-content">
          <div>
            {error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : isLoading ? (
              <Loader />
            ) : (
              shelfKeys &&
              shelfKeys.map(key => (
                <BookShelf
                  onChangeBookShelf={onChangeBookShelf}
                  key={key}
                  shelf={bookshelves[key]}
                  books={booksForShelf(key)}
                  updatingBookId={updatingBookId}
                />
              ))
            )}
          </div>
        </div>
        <div className="open-search">
          <Link className="" to="/search">
            Search Books
          </Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  render() {
    const { bookshelves, isLoading } = this.props;
    const shelfKeys = Object.keys(bookshelves);

    return (
      <div className="list-books">
        <Header title="My Reads Project" />

        <div className="list-books-content">
          <div>
            {isLoading ? (
              <Loader />
            ) : (
              shelfKeys &&
              shelfKeys.map(key => (
                <BookShelf key={key} shelf={bookshelves[key]} />
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

export default ListBooks;

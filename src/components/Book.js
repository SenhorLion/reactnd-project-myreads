import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UPDATING_MESSAGE } from '../constants/constants';
import SelectShelf from './SelectShelf';

class Book extends Component {
  render() {
    const { book, shelf, updatingBookId, onChangeBookShelf } = this.props;

    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

    return (
      <div className="book">
        {updatingBookId === book.id && (
          <div className="book-loader-bg">
            <div className="book-loader">
              <i className="fas fa-spinner fa-2x" />
              <p className="book-loader__message">{UPDATING_MESSAGE}</p>
            </div>
          </div>
        )}
        <div className="book-top">
          <Link to={`/book/${book.id}`}>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: 'url(' + thumbnail + ')',
              }}
            />
          </Link>
          <div className="book-shelf-changer">
            <SelectShelf
              shelf={shelf}
              book={book}
              onChange={onChangeBookShelf}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(', ')}
        </div>
      </div>
    );
  }
}

export default Book;

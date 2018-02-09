import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SelectShelf from './SelectShelf';

class Book extends Component {
  render() {
    const { book, shelf, onChangeBookShelf } = this.props;
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

    return (
      <div className="book">
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
        <div className="book-shelf">{shelf}</div>
      </div>
    );
  }
}

export default Book;

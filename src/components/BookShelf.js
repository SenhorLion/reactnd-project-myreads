import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { shelf, books, onChangeBookShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          {books.length === 0 && <p>No books on this shelf</p>}

          <ol className="books-grid">
            {books &&
              books.map(book => (
                <li key={book.id}>
                  <Book
                    onChangeBookShelf={onChangeBookShelf}
                    shelf={shelf.id}
                    book={book}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;

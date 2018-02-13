import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import { BOOK_SHELF_CATEGORIES } from '../constants/constants';
import Header from './Header';
import Loader from './Loader';

class BookDetail extends Component {
  state = {
    book: null,
    isLoading: true,
  };

  componentDidMount(props) {
    const bookId = this.props.match.params.id;

    this.fetchBook(bookId);
  }

  fetchBook(bookId) {
    BooksAPI.get(bookId).then(book => {
      this.setState({ book, isLoading: false });
    });
  }

  render() {
    const { book, isLoading } = this.state;
    const image = book && book.imageLinks ? book.imageLinks.thumbnail : '';

    return (
      <div className="book-details">
        <Header showLink={true} title="Book detail" />

        {isLoading && <Loader />}

        {book && (
          <div className="book-detail">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 256,
                  height: 386,
                  backgroundImage: 'url(' + image + ')',
                }}
              />

              <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                {book.authors && (
                  <p>
                    <strong>Author:</strong> {book.authors.join(', ')}
                  </p>
                )}
                <p className="book-rating">
                  <strong>Rating:</strong> {book.averageRating || '---'}
                </p>
                {book.shelf && (
                  <p className="book-shelf">
                    <strong>Shelf:</strong> {BOOK_SHELF_CATEGORIES[book.shelf]}
                  </p>
                )}
              </div>
            </div>

            <div className="book-description">
              <p>{book.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default BookDetail;

import React, { Component } from 'react';
import * as BooksAPI from '../api/BooksAPI';
import { BOOK_SHELF_CATEGORIES, ERROR_MESSAGES } from '../constants/constants';
import Header from './Header';
import Loader from './Loader';

class BookDetail extends Component {
  state = {
    book: null,
    error: null,
    isLoading: true,
  };

  componentDidMount(props) {
    const bookId = this.props.match.params.id;

    this.fetchBook(bookId);
  }

  /* 
    Fetch a book by id
    - Makes a call to BooksAPI and stores returned book in state
    - Catch any errors
    @method fetchBook
    @param {String} bookId
  */
  fetchBook(bookId) {
    BooksAPI.get(bookId)
      .then(book => {
        this.setState({ book, isLoading: false });
      })
      .catch(error => {
        const errorMessage = `${ERROR_MESSAGES.SOMETHING_WRONG} - [Error: ${
          error.message
        }]`;
        this.setState({ error: errorMessage, isLoading: false });
      });
  }

  render() {
    const { book, isLoading, error } = this.state;
    const image = book && book.imageLinks ? book.imageLinks.thumbnail : '';
    return (
      <div className="book-details">
        <Header showLink={true} title="Book detail" />

        {isLoading && <Loader />}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

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
                <p className="book-publisher">
                  <strong>Publisher:</strong> {book.publisher}
                </p>
                <p className="book-rating">
                  <strong>Rating:</strong> {book.averageRating || '---'}
                </p>
                {book.shelf && (
                  <p className="book-shelf">
                    <strong>Shelf:</strong> {BOOK_SHELF_CATEGORIES[book.shelf]}
                  </p>
                )}
                {book.previewLink && (
                  <p className="book-link">
                    <a href={book.previewLink} target="blank">
                      <button className="button button--primary">
                        Preview
                      </button>
                    </a>
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

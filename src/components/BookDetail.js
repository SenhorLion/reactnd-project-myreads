import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
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

  fetchBook(id) {
    console.log('fetchBook', id);

    BooksAPI.get(id).then(book => {
      console.log('BooksAPI', book);

      this.setState({ book, isLoading: false });
    });
  }

  render() {
    const { book, isLoading } = this.state;
    const { myBooks } = this.props;
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
                  width: 128,
                  height: 193,
                  backgroundImage: 'url(' + image + ')',
                }}
              />

              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors && book.authors.join(', ')}
              </div>
              <div className="book-shelf">
                {book.shelf && (
                  <p>
                    Belongs to <strong>{book.shelf}</strong>
                  </p>
                )}
              </div>
              <div className="book-rating">{book.averageRating}</div>
            </div>

            <div className="book-description">{book.description}</div>
          </div>
        )}
      </div>
    );
  }
}
export default BookDetail;

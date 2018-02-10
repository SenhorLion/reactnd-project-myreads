import React, { Component } from 'react';
import sortBy from 'sort-by';
import { ERROR_MESSAGES, SEARCH_TERM_TITLE } from '../constants/constants';

import * as BooksAPI from '../api/BooksAPI';

import Loader from './Loader';
import Header from './Header';
import Book from './Book';
import SearchInput from './SearchInput';

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchKey: '',
      books: null,
      cache: [],
      isLoading: false,
      error: null,
    };

    // Bind prop methods to 'this'
    this.onSearchReset = this.onSearchReset.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  /*
    Fetch the searchTerm from the BooksAPI
    @method fetchBookSearch
    @param {String} searchTerm
    @return {Promise}
  */
  fetchBookSearch = searchTerm => {
    this.setState({
      isLoading: true,
    });

    return BooksAPI.search(searchTerm)
      .then(result => {
        // If the result is not a 'catchable' error,
        // yet is undefined or contains the 'error' object
        // return it as an error here
        if (!result || result.error) {
          return this.handleError(result);
        }
        // Otherwise store the search results
        this.setSearchResults(result);
      })
      .catch(error => this.handleError(error));
  };

  /*
    Handle error and set error in state
    @method handleError
    @param {Object} error
  */
  handleError = error => {
    let errorMessage = '';

    if (error === undefined || error.error) {
      errorMessage = ERROR_MESSAGES.QUERY_NOT_FOUND;
    } else {
      errorMessage = error;
    }
    this.setState({ error: errorMessage, isLoading: false });
  };

  /*
    Store and cache search results in state
    @method setSearchResults
    @param {Array} books
  */
  setSearchResults = books => {
    const { cache, searchKey } = this.state;
    const oldCache = cache && cache[searchKey] ? cache[searchKey] : [];
    const updatedCache = [...oldCache, ...books];

    this.setState({
      cache: { ...cache, [searchKey]: { books: updatedCache } },
      books,
      error: null,
      isLoading: false,
    });
  };

  /*
    Check for cached data already stored in state 
    for the passed in searchTerm
    @method searchTermNotCached
    @param {String} searchTerm
    @return Boolean
  */
  searchTermNotCached = searchTerm => {
    return !this.state.cache[searchTerm];
  };

  /*
    Handle the submitted search
    Only make a call to the API if the search term is not already cached
    @method onSearchSubmit
    @param {Event} event
  */
  onSearchSubmit = event => {
    event.preventDefault();

    const { searchTerm } = this.state;

    // Set the searchKey to the searchTerm
    // and clear out any error
    this.setState(state => ({
      searchKey: searchTerm,
      error: null,
    }));

    // Only hit the API if searchTerm is not already cached
    if (this.searchTermNotCached(searchTerm)) {
      this.fetchBookSearch(searchTerm);
    }
  };

  /*
    Update the search term
    @method onSearchChange
    @param {String} searchTerm
  */
  onSearchChange = searchTerm => {
    this.setState({ searchTerm: searchTerm.trim() });
  };

  /*
    Reset the search term
    @method onSearchReset
  */
  onSearchReset = () => {
    this.setState({ searchTerm: '', error: null });
  };

  render() {
    const { searchTerm, searchKey, cache, error, isLoading } = this.state;
    const { onChangeBookShelf, myBooks } = this.props;
    const booksList =
      (cache && cache[searchKey] && cache[searchKey].books) || [];

    const bookShelf = book => {
      const foundBook = myBooks.find(b => b.id === book.id);

      return foundBook ? foundBook.shelf : 'none';
    };

    booksList.sort(sortBy('title'));

    return (
      <div className="search-books">
        <Header showLink={true} title="Search Books" />

        <SearchInput
          searchTerm={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          onReset={this.onSearchReset}
        />

        {searchTerm && (
          <div className="search-term">
            {SEARCH_TERM_TITLE} <span>{searchTerm}</span>
          </div>
        )}

        {isLoading && <Loader />}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="search-books-results">
          <ol className="books-grid">
            {/* TODO: Put into a Books grid component */}
            {booksList &&
              booksList.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelf={bookShelf(book)}
                    onChangeBookShelf={onChangeBookShelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

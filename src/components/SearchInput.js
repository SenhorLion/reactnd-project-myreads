import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
  };

  render() {
    const { onChange, onSubmit, onReset, searchTerm } = this.props;
    const formPlaceholder = 'Search by title or author';

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-icon">
            <i className="fas fa-search" />
          </div>
          <div className="search-books-input-wrapper">
            <form className="search-books-form" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder={formPlaceholder}
                value={searchTerm}
                onChange={event => onChange(event.target.value)}
              />
              <button className="search-button" type="submit">
                Search
              </button>
              <button
                className="reset-button reset-query"
                type="reset"
                onClick={onReset}
              >
                Reset <i className="far fa-times-circle fa-2x" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchInput;

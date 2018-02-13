import React, { Component } from 'react';

class SelectShelf extends Component {
  render() {
    const { shelf, book, onChange } = this.props;

    return (
      <select
        value={shelf}
        onChange={event => onChange(book, event.target.value)}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default SelectShelf;

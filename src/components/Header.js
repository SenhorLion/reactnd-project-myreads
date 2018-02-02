import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  static defaultProps = {
    title: 'My Reads',
  };

  render() {
    const { title } = this.props;

    return (
      <div className="list-books-title">
        <header>
          <h1>{title}</h1>
        </header>
      </div>
    );
  }
}

export default Header;

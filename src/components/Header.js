import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: 'My Reads',
    showLink: false,
  };

  render() {
    const { title, showLink } = this.props;

    return (
      <header className="app-header">
        {showLink && (
          <Link className="link-back" to="/">
            <i className="fas fa-arrow-left fa-2x" />
          </Link>
        )}
        <h1>{title}</h1>
      </header>
    );
  }
}

export default Header;

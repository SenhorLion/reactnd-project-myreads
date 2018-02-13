import React, { Component } from 'react';

import { LOADING_MESSAGE } from '../constants/constants';

class Loader extends Component {
  render() {
    return (
      <div className="loader-overlay">
        <div className="loader">
          <i className="fas fa-spinner fa-4x" />
          <p>{LOADING_MESSAGE}</p>
        </div>
      </div>
    );
  }
}

export default Loader;

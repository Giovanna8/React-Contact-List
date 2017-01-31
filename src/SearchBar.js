/* eslint max-len: ["error", 1000]*/

import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.state.value}
        onChange={(event) => this.hangleChange(event)}
      />
    );
  }
}

/* Fin! */

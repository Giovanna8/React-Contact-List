/* eslint max-len: ["error", 1000]*/

import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.props.value}
        onChange={(event) => this.props.onChange(event)}
      />
    );
  }
}

/* Fin! */

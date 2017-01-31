/* eslint max-len: ["error", 1000]*/

import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <ContactList />
      </div>
    );
  }
}

/* Fin! */

/* eslint max-len: ["error", 1000]*/

import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
// import ContactForm from './ContactForm';
import ActionHistory from './ActionHistory';
import ResetButton from './ResetButton';
import SelectedContactList from './SelectedContactList';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: [],
      currentActionId: 2000,
      actionHistory: [],
      originalState: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data,
          originalState: {
            searchText: '',
            contacts: resp.data,
            selectedContacts: []
          }
        });
      });
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelect(id) {
    this.addContact(id, this.state.selectedContacts);
    this.removeContact(id, this.state.contacts);
    this.addAction('select', id);
  }

  handleUnselect(id) {
    this.addContact(id, this.state.contacts);
    this.removeContact(id, this.state.selectedContacts);
    this.addAction('unselect', id);
  }

  handleReset() {
    this.setState(this.state.originalState);
    this.addAction('reset');
  }

  handleRemoveContact(e, id) {
    e.stopPropagation();
    this.removeContact(id, this.state.contacts);
    this.addAction('remove', id);
  }

  handleClear() {
    this.setState({
      actionHistory: []
    });
  }

  handleRemoveAction(id) {
    const oldHist = this.state.actionHistory;
    const newHistory = oldHist.filter(action => action._id !== id);
    const newState = {
      actionHistory: newHistory
    };
    this.setState(newState);
  }

  addAction(actionType, id) {
    const contacts = this.state.originalState.contacts;
    const target = contacts.filter(contact => contact._id === id);
    const name = id ? target[0].name : null;
    const newId = this.state.currentActionIs + 1;
    const time = Math.floor(Date.now() / 1000);

    let actionMessage;
    switch (actionType) {
      case 'select':
        actionMessage = 'Selected ${name}';
        break;
      case 'unselect':
        actionMessage = 'Unselected ${name}';
        break;
      case 'remove':
        actionMessage = 'Removed ${name}';
        break;
      case 'reset':
        actionMessage = 'Reset application';
        break;
      default:
        actionMessage = 'Insert clever default message here...';
        break;
    }

    const newHistory = [{
      _id: newId,
      time,
      actionMessage
    }].concat(this.state.ActionHistory);

    this.setState((prevState) => {
      return {
        currentActionId: prevState.currentActionId + 1,
        actionHistory: newHistory
      };
    });
  }

  addContact(id, list = this.state.contacts) {
    let fromList = [];
    let key = '';
    if (list === this.state.contacts) {
      fromList = this.state.selectedContacts;
      key = 'contacts';
    } else {
      fromList = this.state.contacts;
      key = 'selectedContacts';
    }

    const selectedContact = fromList.filter( contact => contact._id === id);
    const newState = {};
    newState[key] = list.concat(selectedContact);
    this.setState(newState);
  }

  removeContact(id, list = this.state.contacts) {
    const key = list === this.state.contacts ? 'contacts' : 'selectedContacts';
    const newState = {};
    newState[key] = list.filter( contact => contact._id !== id);
    this.setState(newState);
  }


  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;

    if (!term) {
      return contacts;
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }


  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [
            this.state.contacts,
            resp.data
          ]
        });
      });
  }

  handleDeleteContact(_id) {
    axios.delete('http://localhost:4000/contacts/${_id}')
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

        this.setState({
          contacts: newContacts
        });
      });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          searchValue={this.state.searchText}
          onRemove={this.handleRemoveContact.bind(this)}
          onSelect={this.handleSelect.bind(this)}
        />
        <SelectedContactList
          contacts={this.state.selectedContacts}
          onUnselect={this.handleUnselect.bind(this)}
        />
        <ActionHistory
          actions={this.state.actionHistory}
          onClear={this.handleClear.bind(this)}
          onRemove={this.handleRemoveContact.bind(this)}
        />
        <ResetButton
          onReset={this.handleReset.bind(this)}
        />
      </div>
    );
  }
}

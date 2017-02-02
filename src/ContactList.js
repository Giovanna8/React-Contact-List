/* eslint max-len: ["error", 1000]*/
import React, {Component} from 'react';
import Contact from './Contact';

export default class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
            />
          );
        })}
      </ul>
    );
  }
}

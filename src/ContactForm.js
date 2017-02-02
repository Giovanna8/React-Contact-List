/* eslint max-len: ["error", 1000] */

import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: '',
    };
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleOccupationChange(event) {
    this.setState({
      occupation: event.target.value
    });
  }

  handleAvatarChange(event) {
    this.setState({
      avatar: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, avatar, occupation } = this.state;
    this.props.onSubmit({ name, avatar, occupation });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange.bind(this)}
        />

        <label htmlFor="occupation">Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleOccupationChange.bind(this)}
        />

        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          name="avatar"
          value={this.state.avatar}
          onChange={this.handleAvatarChange.bind(this)}
        />

        <input
          type="submit"
          value="+ Add New"
          disabled={!this.state.name.trim() || !this.state.occupation.trim() || !this.state.avatar.trim()}
        />
      </form>
    );
  }
}

/* The following 3 lines are required for PropTypes to work. */
ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

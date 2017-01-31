/* eslint max-len: ["error", 1000]*/

import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>{this.props.name}</h2>
          {this.props.occupation}
        </div>
      </li>
    );
  }
}

/* Fin! */

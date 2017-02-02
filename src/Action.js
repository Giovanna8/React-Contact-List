import React, { Component, PropTypes } from 'react';

export default class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Math.floor(Date.now() / 1000)
    };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.checkTime(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  checkTime() {
    const newTime = Math.floor(Date.now() / 1000);
    const timeElapsed = newTime - this.state.time;

    if (timeElapsed >= 60) {
      this.props.onRemove(this.props.action._id);
    }
  }

  render() {
    return (
      <li className="action">
        <p className="action-message">{this.props.action.actionMessage}</p>
        <div className="ex-button"
          title="Remove action"
          onClick={() => {
            this.props.onRemove(this.props.action._id);
          }}>
          x
        </div>
        <div className="action-slider" />
      </li>
    );
  }
}

/* The following 3 lines are required for PropTypes to work. */
Action.propTypes = {
  action: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

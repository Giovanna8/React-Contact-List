import React, { PropTypes } from 'react';
import Action from './Action';

const ActionHistory = (props) => {
  return (
    <div className="side-bar action-history">
      <h3>Action History</h3>
      {props.actions.length > 0 ? null : 'Perform an action, jagweed.'}
      <div className="side-bar-scroll">
        <ul className="action-list">
          {props.actions.slice(0, 10).map(action => {
            return (
              <Action
                key={action._id}
                action={action}
                onRemove={props.onRemove}
              />
            );
          })}
        </ul>
      </div>
      <div className="opaque-container">
        <div className="button clear-actions"
          title="Clear action history"
          onClick={() => props.onClear()}>
          Clear Actions
        </div>
      </div>
    </div>
  );
};

export default ActionHistory;

/* The following 3 lines are required for PropTypes to work. */
ActionHistory.propTypes = {
  actions: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired
};

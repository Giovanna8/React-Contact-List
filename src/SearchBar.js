/* eslint max-len: ["error", 1000]*/

import React from 'react';

const SearchBar = (props) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={event => props.onChange(event)}
    />
  );
};

/* The following 4 lines need to be added to ensure the handler is triggered. */
SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};


export default SearchBar;

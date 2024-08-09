import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Perform search logic here
  };

  return (
    <div className="input-group ">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn btn-outline-secondary" type="button" id="button-addon2">
        Search
      </button>
    </div>
  );
}

export default Search;

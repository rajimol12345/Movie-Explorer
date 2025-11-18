import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send query to parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}

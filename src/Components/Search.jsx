import React, { useState, useEffect } from "react";

export default function Search({ query, setQuery, delay = 600 }) {
  const [inputValue, setInputValue] = useState(query);

  // Debounce input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue);
    }, delay);

    // Cleanup timeout on every keystroke
    return () => clearTimeout(handler);
  }, [inputValue, delay, setQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder=" Search for movies..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

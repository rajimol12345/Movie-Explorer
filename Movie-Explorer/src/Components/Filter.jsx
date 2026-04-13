import React, { useEffect, useState } from "react";
import "../App.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Filter({ selectedYear, setSelectedYear, selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);

  // Fetch Genres from TMDb
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        const filteredGenres = (data.genres || []).filter(g => g.name !== "Romance");
        setGenres(filteredGenres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    }

    fetchGenres();
  }, []);

  // Generate year options (from 2025 back to 1950)
  const years = Array.from({ length: 76 }, (_, i) => 2025 - i);

  return (
    <div className="filter-container filter-inline">
      {/* Year Filter */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

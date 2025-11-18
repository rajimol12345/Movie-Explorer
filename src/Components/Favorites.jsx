// src/Components/Favorites.jsx
import React, { useState } from "react";
import { useFavorites, useFavoritesDispatch } from "../context/FavoritesContext";
import MovieCard from "./MovieCard";
import "./Favorites.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Favorites() {
  const { favorites } = useFavorites();
  const dispatch = useFavoritesDispatch();

  // Trailer Popup State
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const handleRemove = (movie) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: movie });
  };

  // Fetch Trailer Function
  const fetchTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="favorites-page">
      <h1 className="page-title">Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">You haven’t added any favorites yet.</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
              <MovieCard movie={movie} onClick={() => fetchTrailer(movie.id)} />
              <button className="remove-btn" onClick={() => handleRemove(movie)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Trailer Popup */}
      {showTrailer && (
        <div className="trailer-overlay" onClick={() => setShowTrailer(false)}>
          <div className="trailer-popup" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="400"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button className="close-btn" onClick={() => setShowTrailer(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

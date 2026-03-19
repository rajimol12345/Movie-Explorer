import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites, useFavoritesDispatch } from "../context/FavoritesContext";
import "./MovieCard.css";

export default function MovieCard({ movie, onClick }) {
  const { favorites } = useFavorites();
  const dispatch = useFavoritesDispatch();

  const isFavorite = favorites.some((m) => m.id === movie.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <motion.div
      className="movie-card"
      onClick={() => onClick(movie)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* Poster */}
      <div className="poster-container">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />

        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <span className="rating-badge">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        )}

        {/* Play overlay */}
        <div className="card-hover-overlay">
          <div className="play-icon">▶</div>
          <span className="hover-label">Watch Trailer</span>
        </div>
      </div>

      {/* Info */}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-meta">
          <span className="movie-date">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </span>
        </div>

        <motion.button
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
          whileTap={{ scale: 0.88 }}
        >
          <AnimatePresence mode="wait">
            {isFavorite ? (
              <motion.span
                key="remove"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                ♥ Remove Favorite
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                ♡ Add to Favorites
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

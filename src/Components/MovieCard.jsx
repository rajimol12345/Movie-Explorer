import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites, useFavoritesDispatch } from "../context/FavoritesContext";
import "./MovieCard.css"; // make sure you have this file

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
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <div className="poster-container">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-meta">
          <p className="movie-date">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </p>
          <p className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
        </div>

        <motion.button
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
          whileTap={{ scale: 0.8 }}
          animate={isFavorite ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isFavorite ? (
              <motion.span
                key="remove"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                ★ Remove Favorite
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                ☆ Add Favorite
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

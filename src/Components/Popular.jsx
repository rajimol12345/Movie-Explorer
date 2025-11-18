import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import "./Pagination.css";

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Trailer Popup State
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  //  Fetch Popular Movies
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
      );
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  //  Fetch Trailer
  const fetchTrailer = async (movieId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const trailer = res.data.results.find(
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

  // Pagination controls
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="popular-page">
      <h2>Popular Movies</h2>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => fetchTrailer(movie.id)} //  Open trailer on click
              />
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn" onClick={handlePrev} disabled={page === 1}>
              ◀ Prev
            </button>

            <span className="page-info">
              Page {page} of {totalPages}
            </span>

            <button
              className="page-btn"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/*  Trailer Popup */}
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

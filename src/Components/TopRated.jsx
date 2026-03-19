import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import "../App.css";
import "./Popular.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchTopRated = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

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
    <div className="popular-page">
      <h2 className="page-title" style={{ borderLeft: "4px solid var(--clr-gold)", paddingLeft: "16px" }}>
        Top Rated Movies
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="movie-grid">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => fetchTrailer(movie.id)}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--clr-text-muted)" }}>
              No top-rated movies found.
            </p>
          )}
        </div>
      )}

      {/* Trailer Popup */}
      {showTrailer && (
        <div className="trailer-overlay" onClick={() => setShowTrailer(false)}>
          <div className="trailer-popup" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="450"
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

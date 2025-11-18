import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import "../App.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Trailer popup state
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch Top Rated Movies
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

  //  Fetch Trailer function
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
    <div className="home-page top-rated-page">
      <h1 className="page-title">Top Rated Movies</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="movie-grid">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => fetchTrailer(movie.id)} //  Open trailer on click
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No top-rated movies found.</p>
          )}
        </div>
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

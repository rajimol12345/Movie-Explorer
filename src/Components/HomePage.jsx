import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import Search from "./Search";
import Spinner from "./Spinner";
import Filter from "./Filter";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./HomePage.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const debouncedQuery = useDebounce(query, 600);

  // Fetch banner movies (Top Rated)
  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setBannerMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching banner movies:", error);
      }
    }
    fetchBanner();
  }, []);

  // Fetch movies (with pagination)
  const fetchMovies = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      let url = "";

      if (debouncedQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
        if (year) url += `&primary_release_year=${year}`;
        if (genre) url += `&with_genres=${genre}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();

      setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
      if (data.page >= data.total_pages) setHasMore(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, year, genre, page]);

  // Reset movies when filters/search change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQuery, year, genre]);

  // Fetch on mount or when query/filter/page changes
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Infinite Scroll Hook
  useInfiniteScroll(
    () => {
      if (!loading && hasMore) setPage((prev) => prev + 1);
    },
    hasMore,
    loading
  );

  // Fetch trailer for popup
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
    <div className="home-page">
      {/* Hero Banner Carousel */}
      <div className="banner-section">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          className="banner-swiper"
        >
          {bannerMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="banner-slide"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="banner-overlay">
                  <span className="banner-badge">🏆 Top Rated</span>
                  <h2 className="banner-title">{movie.title}</h2>
                  <p className="banner-overview">
                    {movie.overview?.slice(0, 160)}...
                  </p>
                  <div className="banner-actions">
                    <button
                      className="banner-btn"
                      onClick={() => fetchTrailer(movie.id)}
                    >
                      ▶ Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Search + Filter */}
        <div className="search-filter-container">
          <Search query={query} setQuery={setQuery} />
          <Filter
            selectedYear={year}
            setSelectedYear={setYear}
            selectedGenre={genre}
            setSelectedGenre={setGenre}
          />
        </div>

        {/* Section heading */}
        <h2 className="section-heading">All Movies</h2>

        {error && <p className="error-text">{error}</p>}

        {/* Movie Grid */}
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
            !loading && <p className="no-movies">No movies found.</p>
          )}
        </div>

        {loading && <Spinner />}
        {!hasMore && <p className="end-text">🎬 You've reached the end!</p>}
      </div>

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
            <button
              className="close-btn"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

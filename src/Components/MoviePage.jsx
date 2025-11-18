import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Spinner />;

  if (!movie) return <p style={{ textAlign: "center" }}>Movie not found.</p>;

  // Optional: find trailer video
  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer");

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>

        {trailer && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

console.log("TMDB API Key:", API_KEY);

// Fetch Movies (with optional search, filter, pagination)
export async function fetchMovies(page = 1, query = "", year = "", genre = "") {
  let url = "";

  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
    if (year) url += `&primary_release_year=${year}`;
    if (genre) url += `&with_genres=${genre}`;
  }

  console.log("📡 Fetching movies from:", url); //  Add this too

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

//  Fetch Movie Details
export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

// Fetch Genres
export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}

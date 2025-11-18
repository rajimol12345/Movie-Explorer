import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./Components/Header";
import Spinner from "./Components/Spinner";
import Footer from "./Components/Footer";
//  Lazy-loaded components for performance
const HomePage = lazy(() => import("./Components/HomePage"));
const Popular = lazy(() => import("./Components/Popular"));
const Favorites = lazy(() => import("./Components/Favorites"));
const TopRated = lazy(() => import("./Components/TopRated"));
const MoviePage = lazy(() => import("./Components/MoviePage")); 

function App() {
  return (
    <FavoritesProvider>
      {/* Header visible on all pages */}
      <Header />

      {/* Suspense wrapper for lazy-loaded components */}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/top-rated" element={<TopRated />} />
          {/*  Movie details page (lazy loaded) */}
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </Suspense>
      <Footer /> 
    </FavoritesProvider>
  );
}

export default App;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; //  Custom hook
import "../App.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Get favorites from context (correct key name)
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          🎬 MovieExplorer
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/popular" onClick={() => setOpen(false)}>
            Popular
          </NavLink>

          <NavLink to="/top-rated" onClick={() => setOpen(false)}>
            Top Rated
          </NavLink>

          {/*  Favorites link with count */}
          <NavLink to="/favorites" onClick={() => setOpen(false)}>
            Favorites ({favorites.length})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

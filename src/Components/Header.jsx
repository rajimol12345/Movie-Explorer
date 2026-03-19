import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "../App.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MOVIEXPLORER</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Nav */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/popular" onClick={() => setOpen(false)}>
            Popular
          </NavLink>
          <NavLink to="/top-rated" onClick={() => setOpen(false)}>
            Top Rated
          </NavLink>
          <NavLink to="/favorites" onClick={() => setOpen(false)}>
            ♥ Favorites{favorites.length > 0 && ` (${favorites.length})`}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

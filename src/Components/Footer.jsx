import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Title */}
        <div className="footer-logo">
          🎬 <span>Movie Explorer</span>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        {/* Social / Info */}
        <div className="footer-social">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </p>
    </footer>
  );
}

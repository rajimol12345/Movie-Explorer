import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Brand & Social */}
        <div className="footer-column brand-column">
          <div className="footer-logo">
            <span className="logo-icon">🎬</span> MOVIEXPLORER
          </div>
          <p className="footer-tagline">
            Your ultimate destination for discovering top-rated, popular, and trending blockbusters. Build your watchlist and experience cinema like never before.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://instagram.com" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://twitter.com" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://youtube.com" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="footer-column">
          <h4 className="footer-heading">Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/popular">Popular Movies</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/">Upcoming</Link>
        </div>

        {/* Column 3: Features */}
        <div className="footer-column">
          <h4 className="footer-heading">Features</h4>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/">Watchlist</Link>
          <Link to="/">Trailers & Teasers</Link>
          <Link to="/">Curated Collections</Link>
        </div>

        {/* Column 4: Support & Legal */}
        <div className="footer-column">
          <h4 className="footer-heading">Support</h4>
          <Link to="/">Help Center</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Contact Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MovieXplorer. All rights reserved. 
        </p>
        <p className="footer-attribution">
          Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDb</a>
        </p>
      </div>
    </footer>
  );
}

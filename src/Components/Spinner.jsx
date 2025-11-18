import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Spinner.css";

export default function Spinner() {
  const navigate = useNavigate();

  // Navigate after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Change this to your desired page route
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="spinner-container">
      <div className="loader"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
}

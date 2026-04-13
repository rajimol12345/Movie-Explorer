import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner-ring"></div>
      <span className="spinner-text">Loading...</span>
    </div>
  );
}

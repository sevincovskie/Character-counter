import React from "react";

export default function Counter({ title, value }) {
  return (
    <div className="counter-container">
      <p className="counter-value">{value}</p>
      <p className="counter-title">{title}</p>
    </div>
  );
}
import React from "react";


export default function LetterDensity({ letterDensity, displayLetters, showLetters, setShowLetters }) {
  return (
    <div className="letter-density-container">
      <p className="letter-density-header">Letter Density</p>
      {letterDensity().length > 0 ? (
        <div className="letter-density-list">
          {displayLetters().map(({ letter, count, percentage }) => (
            <div className="letter-density-item" key={letter}>
              <span className="letter-density-letter">{letter}</span>
              <div className="letter-density-bar-container">
                <div
                  className="letter-density-bar"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="letter-density-count">
                <div>{count}</div>
                <div>({percentage}%)</div>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-characters-found">No characters found. Start typing to see letter density.</p>
      )}
      {letterDensity().length > 5 && (
        <button className="see-more-button" onClick={() => setShowLetters(!showLetters)}>
          {showLetters ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
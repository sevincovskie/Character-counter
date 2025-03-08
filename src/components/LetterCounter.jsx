import React, { useState } from "react";

import purple from "../assets/purple.png";
import yellow from "../assets/yellow.png";
import orange from "../assets/orange.png";
import LetterDensity from "./LetterDensity";
import Counter from "./Counter";

export default function LetterCounter({ isDarkMode }) {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [limit, setLimit] = useState(null);
  const [showLetters, setShowLetters] = useState(false);

  // Exclude space and limit processing
  const processedText = () => {
    let currentText = text;
    if (excludeSpaces) currentText = currentText.replace(/\s/g, "");
    if (limit) currentText = currentText.slice(0, limit);
    return currentText;
  };

  // Calculate character count
  const charCount = () => processedText().length;

  // Calculate word count
  const wordCount = () => {
    const words = processedText()
      .split(/\s+/)
      .filter((word) => word !== "");
    return words.length;
  };

  // Calculate sentence count
  const sentencesCount = () => {
    const sentences = processedText()
      .split(/[.?!]/)
      .filter((s) => s !== "");
    return sentences.length;
  };

  // Calculate letter density
  const letterDensity = () => {
    const counts = {};
    const processed = processedText().toUpperCase();

    for (const char of processed) {
      if (/[A-Z]/.test(char)) counts[char] = (counts[char] || 0) + 1;
    }

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    return Object.entries(counts).map(([letter, count]) => ({
      letter,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(2) : 0,
    }));
  };

  const displayLetters = () => {
    const density = letterDensity();
    if (density.length > 5 && !showLetters) {
      return density.slice(0, 5);
    }
    return density;
  };

  return (
    <div className="letter-counter-container">
      <h1 className="letter-counter-title">
        Analyze your text in real-time.
      </h1>
      <textarea
        className={`letter-counter-textarea ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
        placeholder="Start typing here… (or paste your text)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Options and Read Time */}
      <div className="letter-counter-options">
        <label className="letter-counter-checkbox">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setExcludeSpaces(e.target.checked)}
          />
          <span>Exclude Spaces</span>
        </label>
        <label htmlFor="limit" className="letter-counter-limit">
          <input
            type="number"
            className={`letter-counter-input ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
            onChange={(e) => {
              const num = parseInt(e.target.value, 10);
              setLimit(isNaN(num) ? null : num);
            }}
            value={limit === null ? "" : limit}
            placeholder="Limit"
          />
          <span>Set Character</span>
        </label>
        <div className="letter-counter-reading-time">
          Approx. reading time: 0 minute
        </div>
      </div>

      {/* Counters */}
      <div className="letter-counter-counters">
        <div className="letter-counter-card bg-purple">
          <Counter title="Total Character" value={charCount()} />
          <img src={purple} alt="total character" className="letter-counter-icon" />
        </div>
        <div className="letter-counter-card bg-yellow">
          <Counter title="Word Count" value={wordCount()} />
          <img src={yellow} alt="word count" className="letter-counter-icon" />
        </div>
        <div className="letter-counter-card bg-orange">
          <Counter title="Sentences Count" value={sentencesCount()} />
          <img src={orange} alt="sentences count" className="letter-counter-icon" />
        </div>
      </div>

      {/* Letter Density */}
      <LetterDensity
        letterDensity={letterDensity}
        displayLetters={displayLetters}
        showLetters={showLetters}
        setShowLetters={setShowLetters}
      />
    </div>
  );
}
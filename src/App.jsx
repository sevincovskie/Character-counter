import React, { useState } from "react";
import DarkLogo from "./assets/LogoDark.png";
import LightLogo from "./assets/LogoLight.png";
import Sun from "./assets/sun.png";
import Moon from "./assets/moon.png";
import "./index.css";
import LetterCounter from "./components/LetterCounter";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container mx-auto px-4">
        <div className="header">
          <img
            src={isDarkMode ? DarkLogo : LightLogo}
            alt="Logo"
            className="logo"
          />
          <img
            src={isDarkMode ? Sun : Moon}
            alt="Sun or Moon"
            onClick={toggleDarkMode}
            className={`theme-toggle ${isDarkMode ? "dark-mode" : ""}`}
          />
        </div>

        <LetterCounter />
      </div>
    </div>
  );
}

export default App;
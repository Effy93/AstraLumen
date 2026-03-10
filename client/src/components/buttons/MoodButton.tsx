// ThemeToggle.jsx
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Utilisation des icônes react-icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Valeur initiale depuis localStorage
    return localStorage.getItem("theme") || "light";
  });

  // Synchronisation du thème sur le document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fonction pour switcher le thème
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "var(--text-color)",
      }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
import { useEffect, useState } from "react";
import "./palettes.css";
import { FaSun, FaMoon, FaPalette, FaCloud, FaSmile, FaRobot } from "react-icons/fa";

// Liste de tous les thèmes avec icône
const themes = [
  { name: "neon", icon: <FaSun /> },
  { name: "vintage", icon: <FaPalette /> },
  { name: "nuage", icon: <FaCloud /> },
  { name: "triste", icon: <FaMoon /> },
  { name: "joie", icon: <FaSmile /> },
  { name: "cyber", icon: <FaRobot /> },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "neon";
  });

  // Applique le thème sur le document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Change vers le thème suivant
  const toggleTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  // Récupère l’icône correspondante
  const renderIcon = () => {
    const current = themes.find(t => t.name === theme);
    return current?.icon || <FaPalette />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="mood-button"
      aria-label="Toggle theme"
    >
      {renderIcon()}
      <span style={{ fontSize: "0.85rem", textTransform: "capitalize" }}>{theme}</span>
    </button>
  );
}
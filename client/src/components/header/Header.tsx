import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const logoText = "AstraLumen";

  const [logoChars] = useState(() =>
    logoText.split("").map((char, index) => ({
      char,
      key: `${char}-${Math.random().toString(36).slice(2, 5)}`,
      isGradient: index >= logoText.length - 5,
    }))
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--small" : ""}`}>
      <h1 className="logo">
        <Link to="/" className="logo-link">
          {logoChars.map(({ char, key, isGradient }, index) => (
            <span
              key={key}
              className={isGradient ? "gradient" : ""}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              {char}
            </span>
          ))}
        </Link>
      </h1>

      <nav>
        <ul>
          <li><Link to="/" className="nav-link">Chronos</Link></li>
          <li><Link to="/login" className="nav-link">Connexion</Link></li>
        </ul>
      </nav>
    </header>
  );
}
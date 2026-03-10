import { useEffect, useState } from "react";
import '../header/header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--small" : ""}`}>
      
      <h1 className="logo">Astra Lumen</h1>

      <nav>
        <ul>
          <li>Chronos</li>
          <li>Connexion</li>
        </ul>
      </nav>
    </header>
  );
}

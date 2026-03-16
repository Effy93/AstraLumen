import { Link } from "react-router-dom";
import MoodButton from "../buttons/MoodButton";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <p>© {year} AstraLumen</p>
        </div>

        <div className="footer-center">
          <MoodButton />
        </div>

        <nav className="footer-right">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/about">À propos</Link>
        </nav>

      </div>
    </footer>
  );
}
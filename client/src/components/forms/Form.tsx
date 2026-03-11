import { useState } from "react";
import './form.css';

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4001/api/login", { // attention au /api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // pour que le cookie JWT soit stocké
        body: JSON.stringify({ email, password }),
      });

      // On lit la réponse même si ce n'est pas ok
      const data = await res.json();

      console.log("Response status:", res.status);
      console.log("Response body:", data);

      if (!res.ok) {
        // Affiche le message exact renvoyé par le back
        setMessage(data.message || "Erreur de connexion");
      } else {
        setMessage("Connexion réussie !");
       //fonction pour récupérer /me ou rediriger
        // fetch("http://localhost:4001/api/me", { credentials: "include" })...
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="email"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
        </div>

        <button type="submit">Se connecter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
// ArticleViewer.tsx
import { useState, useEffect } from "react";
import useFetchArticle from "../hooks/useFetchArticle";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export default function ArticleViewer() {
  const [user, setUser] = useState<IUser | null>(null);
  const [page, setPage] = useState(1);

  // Récupération de l'utilisateur connecté
  useEffect(() => {
    fetch("http://localhost:4001/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Utilisation du hook pour récupérer l'article
  const { article, message, loading, totalPages } = useFetchArticle(user?.id ?? null, page);

  const nextPage = () => setPage(prev => (prev < (totalPages ?? 1) ? prev + 1 : prev));
  const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  if (!user) return <p>{message || "Chargement de l'utilisateur..."}</p>;

  return (
    <div>
      <h2>Bonjour, {user.name}</h2>

      {loading && <p>Chargement de l'article...</p>}
      {message && <p>{message}</p>}
      {article && (
        <div>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p><small>Publié le : {new Date(article.createdAt).toLocaleDateString()}</small></p>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={prevPage} disabled={page === 1}>Précédent</button>
        <span style={{ margin: "0 1rem" }}>{page} / {totalPages ?? 1}</span>
        <button onClick={nextPage} disabled={page === (totalPages ?? 1)}>Suivant</button>
      </div>
    </div>
  );
}
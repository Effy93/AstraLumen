import { useState} from "react";
import useFetchArticle from "../hooks/useFetchArticle";
import './article.css';

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ArticleViewerProps {
  user: IUser | null;
}

export default function ArticleViewer({ user }: ArticleViewerProps) {
  const [page, setPage] = useState(1);

  // Hook pour récupérer l'article
  const { article, message, loading, totalPages } = useFetchArticle(user?.id ?? null, page);

  const nextPage = () => setPage(prev => (prev < (totalPages ?? 1) ? prev + 1 : prev));
  const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  if (!user) return <p>Chargement de l'utilisateur...</p>;

  // Formatage sécurisé de la date
  const formatDate = (dateStr: string) => {
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? "Date invalide" : new Date(parsed).toLocaleDateString();
  };

  return (
    <div className="article-viewer-container">
      <h2>Bonjour, {user.name}</h2>

      {loading && <p>Chargement de l'article...</p>}
      {message && <p>{message}</p>}

      {article && (
        <div className="article-card">
          <div className="article-card-front">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
          <div className="article-card-back">
            <p><small>Publié le : {formatDate(article.createdAt)}</small></p>
          </div>
        </div>
      )}

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Précédent</button>
        <span>{page} / {totalPages ?? 1}</span>
        <button onClick={nextPage} disabled={page === (totalPages ?? 1)}>Suivant</button>
      </div>
    </div>
  );
}
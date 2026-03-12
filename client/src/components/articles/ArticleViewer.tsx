import { useState } from "react";
import useFetchArticle from "../hooks/useFetchArticle";
import ArticleCard from "./ArticleCard";
import type IUser from "../../types/IUser";
import './article.css';

interface ArticleViewerProps {
  user: IUser | null;
}

export default function ArticleViewer({ user }: ArticleViewerProps) {
  const [page, setPage] = useState(1);

  const { article, message, loading, totalPages } = useFetchArticle(user?.id ?? null, page);

  const nextPage = () => setPage(prev => (prev < (totalPages ?? 1) ? prev + 1 : prev));
  const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  if (!user) return <p>Chargement de l'utilisateur...</p>;

  return (
    <div className="article-viewer-container">
      <h2>Bonjour, {user.name}</h2>

      {loading && <p>Chargement de l'article...</p>}
      {message && <p>{message}</p>}

      {article && (
        <ArticleCard
          title={article.title}
          content={article.content}
          createdAt={article.createdAt}
        />
      )}

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Précédent</button>
        <span>{page} / {totalPages ?? 1}</span>
        <button onClick={nextPage} disabled={page === (totalPages ?? 1)}>Suivant</button>
      </div>
    </div>
  );
}
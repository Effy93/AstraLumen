// useFetchArticle.ts
import { useState, useEffect } from "react";

interface IArticle {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface FetchArticleResult {
  article: IArticle | null;
  loading: boolean;
  message: string;
  totalPages: number;
}

export default function useFetchArticle(userId: number | null, page: number): FetchArticleResult {
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (userId === null) return; // n'exécute pas si pas d'utilisateur

    const fetchArticle = async () => {
      setLoading(true);
      setMessage("");
      try {
        const res = await fetch(`http://localhost:4001/api/articles/me?page=${page}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json();
          setMessage(data.message || "Impossible de récupérer l'article");
          setArticle(null);
        } else {
          const data = await res.json();
          setArticle(data);
          // le back pourrait renvoyer un champ totalPages si tu veux
          setTotalPages(1); // pour l'instant, fixe à 1
        }
      } catch (err) {
        console.error(err);
        setMessage("Erreur réseau");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [userId, page]);

  return { article, loading, message, totalPages };
}
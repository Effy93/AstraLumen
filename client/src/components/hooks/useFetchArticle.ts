// useFetchArticle.ts
import { useEffect, useState } from "react";

interface IArticle {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface FetchArticleResult {
  article: IArticle | null;
  message: string;
  loading: boolean;
  totalPages: number; // ajouté ici
}

export default function useFetchArticle(userId: number | null, page: number): FetchArticleResult {
  const [state, setState] = useState<FetchArticleResult>({
    article: null,
    message: "",
    loading: false,
    totalPages: 1, // valeur par défaut
  });

  useEffect(() => {
    if (!userId) return;

    const fetchArticle = async () => {
      setState({ article: null, message: "", loading: true, totalPages: 1 });

      try {
        const res = await fetch(`http://localhost:4001/articles/me?page=${page}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erreur récupération article");

        const data: IArticle = await res.json();

        // Ici totalPages = 1 par défaut (à modifier si backend renvoie le vrai total)
        setState({ article: data, message: "", loading: false, totalPages: 1 });
      } catch {
        setState({ article: null, message: "Impossible de récupérer l'article", loading: false, totalPages: 1 });
      }
    };

    fetchArticle();
  }, [userId, page]);

  return state;
}
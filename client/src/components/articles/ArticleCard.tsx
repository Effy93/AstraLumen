import AnimatedText from "./AnimatedText";

interface ArticleCardProps {
  title: string;
  content: string;
  createdAt: string;
}

export default function ArticleCard({ title, content, createdAt }: ArticleCardProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return "Date invalide";
      }
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Date invalide";
    }
  };

  return (
    <div className="article-card themed">
      <h3>{title}</h3>
      <AnimatedText text={content}/>
      <p>
        <small>Publié le : {formatDate(createdAt)}</small>
      </p>
    </div>
  );
}
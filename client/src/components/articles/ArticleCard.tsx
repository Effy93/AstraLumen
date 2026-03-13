import AnimatedText from "./AnimatedText";

interface ArticleCardProps {
  title: string;
  content: string;
  createdAt: string;
}

export default function ArticleCard({ title, content, createdAt }: ArticleCardProps) {
  const formatDate = (dateStr: string) => {
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? "Date invalide" : new Date(parsed).toLocaleDateString();
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
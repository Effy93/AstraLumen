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

      <AnimatedText
        text={content}
        speed={40}
        pause={2000}
        style={{
          fontSize: '1.5rem',
          lineHeight: 2,
          minHeight: '4rem',
          color: 'var(--theme-text)',
        }}
      />

      <p><small>Publié le : {formatDate(createdAt)}</small></p>
    </div>
  );
}
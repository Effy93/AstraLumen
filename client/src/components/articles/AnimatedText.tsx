import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  speed?: number;      // ms par lettre
  pause?: number;      // ms après chaque ligne
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  speed = 50,
  pause = 1500,
  style,
}: AnimatedTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    const interval = setInterval(() => {
      setDisplayed(prev => {
        const nextChar = text[currentIndex];
        if (nextChar === undefined) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayed("");      // efface le texte après pause
            setCurrentIndex(0);    // reset pour boucle
          }, pause);
          return prev;
        }
        setCurrentIndex(currentIndex + 1);
        return prev + nextChar;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex, text, speed, pause]);

  return <div style={style}>{displayed}</div>;
}
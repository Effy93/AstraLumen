import { useState, useMemo, useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  style?: React.CSSProperties;
  speed?: number; // ms par mot
}

export default function AnimatedText({ text, style, speed = 150 }: AnimatedTextProps) {
  const words = useMemo(() => text.split(/\s+/), [text]);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = window.setInterval(() => {
      setDisplayedCount(prev => {
        if (prev >= words.length) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, words, speed]);

  const handlePlay = () => {
    if (displayedCount >= words.length) setDisplayedCount(0);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedCount(0);
    setIsPlaying(false);
  };

  return (
    <div
      className="animated-text-container"
      style={{
        ...style,
        minHeight: "6em",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.3rem" }}>
        {words.slice(0, displayedCount).map((word, idx) => (
          <span
            key={idx}
            className="animated-word"
            style={{
              transition: "opacity 0.4s ease, transform 0.4s ease",
              transitionDelay: `${idx * 0.05}s`,
              opacity: 1,
              transform: "translateY(0)",
            }}
          >
            {word}{" "}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button className="animated-text-button" onClick={handlePlay}>Play</button>
        <button className="animated-text-button" onClick={handlePause}>Pause</button>
        <button className="animated-text-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
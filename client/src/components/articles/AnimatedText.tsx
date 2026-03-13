import { useState, useMemo, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa"; // FontAwesome

interface AnimatedTextProps {
  text: string;
  style?: React.CSSProperties;
  speed?: number; // ms par mot
}

export default function AnimatedText({ text, style, speed = 150 }: AnimatedTextProps) {
  const words = useMemo(() => text.split(/\s+/), [text]);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const animate = (time: number) => {
    if (!isPlaying) return;

    if (time - lastTimeRef.current > speed) {
      setDisplayedCount(prev => {
        if (prev >= words.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
      lastTimeRef.current = time;
    }

    frameRef.current = requestAnimationFrame(animate);
  };

  const handlePlay = () => {
    if (displayedCount >= words.length) setDisplayedCount(0);
    setIsPlaying(true);
    frameRef.current = requestAnimationFrame(animate);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplayedCount(0);
  };

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      className="animated-text-container"
      style={{
        ...style,
        minHeight: "6em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "0.8rem",
        textAlign: "center",
      }}
    >


      {/* Texte animé */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25rem" }}>
        {words.slice(0, displayedCount).map((word, idx) => (
          <span key={idx} className="animated-word">{word}</span>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button className="animated-text-button" onClick={handlePlay}><FaPlay/></button>
        <button className="animated-text-button" onClick={handlePause}><FaPause/></button>
        <button className="animated-text-button" onClick={handleReset}><FaRedo/></button>
      </div>
    </div>
  );
}
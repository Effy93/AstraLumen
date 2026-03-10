// Chronos.jsx
import { useEffect, useState } from "react";
import "./Chronos.css";

export default function Chronos() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds((prev) => prev + 100); // incrémente tous les 100ms
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setMilliseconds(0);
  };

  const minutes = String(Math.floor(milliseconds / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, "0");
  const tenth = Math.floor((milliseconds % 1000) / 100);

  return (
    <div className="container">
      <div className="container-min">
        <span>{minutes}</span>
        <small>min</small>
      </div>
      <div className="container-sec">
        <span>{seconds}</span>
        <small>sec</small>
      </div>
      <div className="container-tenth">
        <span>{tenth}</span>
        <small>tenth</small>
      </div>

      <div className="container-btn">
        <button onClick={start}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={stop}>Stop</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
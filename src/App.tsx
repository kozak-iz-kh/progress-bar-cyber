import { useState } from "react";
import "./App.css";

function App() {
  const [goalHours, setGoalHours] = useState<number>(0);
  const [goalMinutes, setGoalMinutes] = useState<number>(0);
  const [currentMinutes, setCurrentMinutes] = useState<number>(0);
  const [manualInput, setManualInput] = useState<string>("");
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  const goalTotalMinutes = goalHours * 60 + goalMinutes;
  const progress =
    goalTotalMinutes > 0
      ? Math.min((currentMinutes / goalTotalMinutes) * 100, 100)
      : 0;

  const addTime = (minutes: number) => {
    const newTotal = currentMinutes + minutes;
    setCurrentMinutes(newTotal);
    if (goalTotalMinutes > 0 && newTotal >= goalTotalMinutes && !showCongrats) {
      setShowCongrats(true);
    }
  };

  const handleManualAdd = () => {
    const minutes = parseInt(manualInput, 10);
    if (!isNaN(minutes) && minutes > 0) {
      addTime(minutes);
      setManualInput("");
    }
  };

  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const resetProgress = () => {
    setCurrentMinutes(0);
    setShowCongrats(false);
  };

  return (
    <div className="app">
      <h1 className="title">good job</h1>

      <div className="section">
        <label className="label">SET TODAY'S GOAL</label>
        <div className="goal-inputs">
          <div className="input-group">
            <input
              type="number"
              min="0"
              value={goalHours || ""}
              onChange={(e) =>
                setGoalHours(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="input"
              placeholder="0"
            />
            <span className="input-label">HOURS</span>
          </div>
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="59"
              value={goalMinutes || ""}
              onChange={(e) =>
                setGoalMinutes(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                )
              }
              className="input"
              placeholder="0"
            />
            <span className="input-label">MINUTES</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">PROGRESS</span>
          <span className="progress-stats">
            {formatTime(currentMinutes)} / {formatTime(goalTotalMinutes)} (
            {progress.toFixed(1)}%)
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-glow" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-markers">
          {[0, 25, 50, 75, 100].map((mark) => (
            <span key={mark} className="marker">
              {mark}%
            </span>
          ))}
        </div>
      </div>

      <div className="section">
        <label className="label">ADD TIME MANUALLY</label>
        <div className="manual-input">
          <input
            type="number"
            min="0"
            placeholder="Minutes"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
            className="input input-wide"
          />
          <button onClick={handleManualAdd} className="btn btn-add">
            ADD
          </button>
        </div>
      </div>

      <div className="section">
        <label className="label">QUICK ADD</label>
        <div className="quick-buttons">
          {[5, 10, 15, 20, 30].map((min) => (
            <button
              key={min}
              onClick={() => addTime(min)}
              className="btn btn-quick"
            >
              +{min}m
            </button>
          ))}
        </div>
      </div>

      <button onClick={resetProgress} className="btn btn-reset">
        RESET PROGRESS
      </button>

      {showCongrats && (
        <div className="modal-overlay" onClick={() => setShowCongrats(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">🎉 GOAL ACHIEVED! 🎉</h2>
            <p className="modal-subtitle">You absolute legend!</p>
            <div className="meme-grid">
              <div className="meme-sticker">
                <span className="meme-emoji">😎</span>
                <span className="meme-text">HACKERMAN</span>
              </div>
              <div className="meme-sticker">
                <span className="meme-emoji">🚀</span>
                <span className="meme-text">TO THE MOON</span>
              </div>
              <div className="meme-sticker">
                <span className="meme-emoji">💪</span>
                <span className="meme-text">GIGACHAD</span>
              </div>
              <div className="meme-sticker">
                <span className="meme-emoji">🔥</span>
                <span className="meme-text">ON FIRE</span>
              </div>
              <div className="meme-sticker">
                <span className="meme-emoji">👑</span>
                <span className="meme-text">KING/QUEEN</span>
              </div>
              <div className="meme-sticker">
                <span className="meme-emoji">⚡</span>
                <span className="meme-text">SPEED DEMON</span>
              </div>
            </div>
            <button
              className="btn btn-close"
              onClick={() => setShowCongrats(false)}
            >
              THANKS, I KNOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

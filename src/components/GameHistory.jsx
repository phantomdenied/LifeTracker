import { useState } from 'react'
import { loadHistory, clearHistory } from '../utils/history'
import './GameHistory.css'

function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function GameHistory() {
  const [history, setHistory] = useState(() => loadHistory())
  const [showClear, setShowClear] = useState(false)

  function handleClear() {
    clearHistory()
    setHistory([])
    setShowClear(false)
  }

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <p>No games recorded yet.</p>
        <p className="history-hint">Finish a game to see it here.</p>
      </div>
    )
  }

  return (
    <div className="history">
      <div className="history-toolbar">
        <h2>Game History</h2>
        <button className="btn-danger-sm" onClick={() => setShowClear(true)}>Clear All</button>
      </div>

      <div className="history-list">
        {history.map(game => (
          <div key={game.id} className="history-entry">
            <div className="history-meta">
              <span className="history-format">{game.config?.format?.label ?? 'Unknown'}</span>
              <span className="history-date">{formatDate(game.endedAt)}</span>
            </div>
            <div className="history-players">
              {game.players.map(p => (
                <div key={p.id} className={`history-player ${p.eliminated ? 'elim' : ''}`}>
                  <span className="hp-dot" style={{ background: p.color }} />
                  <span className="hp-name">{p.name}</span>
                  <span className="hp-life">{p.life} life</span>
                  {p.eliminated && <span className="hp-badge elim-badge">Out</span>}
                  {!p.eliminated && game.players.filter(x => !x.eliminated).length === 1 && (
                    <span className="hp-badge win-badge">Winner</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showClear && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Clear History?</h3>
            <p>This will permanently delete all {history.length} recorded games.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowClear(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleClear}>Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

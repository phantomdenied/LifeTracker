import { useState } from 'react'
import { loadHistory, clearHistory, updateGameNotes } from '../utils/history'
import './GameHistory.css'

function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatDuration(startTs, endTs) {
  if (!startTs) return null
  const mins = Math.round((endTs - startTs) / 60000)
  if (mins < 1) return '< 1 min'
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}m`
}

function computeStats(history) {
  if (history.length === 0) return null

  const wins = {}
  const appearances = {}
  const formats = {}

  for (const game of history) {
    const format = game.config?.format?.label ?? 'Unknown'
    formats[format] = (formats[format] ?? 0) + 1

    for (const p of game.players ?? []) {
      appearances[p.name] = (appearances[p.name] ?? 0) + 1
      if (game.winnerId != null && game.players.find(x => x.id === game.winnerId)?.name === p.name) {
        wins[p.name] = (wins[p.name] ?? 0) + 1
      }
    }
  }

  const topPlayers = Object.entries(appearances)
    .map(([name, games]) => ({ name, games, wins: wins[name] ?? 0 }))
    .sort((a, b) => b.wins - a.wins || b.games - a.games)
    .slice(0, 5)

  const topFormat = Object.entries(formats).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  return { topPlayers, topFormat, total: history.length }
}

export default function GameHistory() {
  const [history, setHistory] = useState(() => loadHistory())
  const [showClear, setShowClear] = useState(false)
  const [editingNotes, setEditingNotes] = useState(null)
  const [notesDraft, setNotesDraft] = useState('')
  const [tab, setTab] = useState('history') // 'history' | 'stats'

  const stats = computeStats(history)

  function handleClear() {
    clearHistory()
    setHistory([])
    setShowClear(false)
  }

  function startEditNotes(game) {
    setEditingNotes(game.id)
    setNotesDraft(game.notes ?? '')
  }

  function saveNotes(id) {
    const updated = updateGameNotes(id, notesDraft)
    setHistory(updated)
    setEditingNotes(null)
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
        <div className="history-tabs">
          <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>History</button>
          <button className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>Stats</button>
        </div>
        <button className="btn-danger-sm" onClick={() => setShowClear(true)}>Clear All</button>
      </div>

      {/* Stats tab */}
      {tab === 'stats' && stats && (
        <div className="stats-panel">
          <div className="stat-cards">
            <div className="stat-card">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Games Played</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.topFormat}</span>
              <span className="stat-label">Fav Format</span>
            </div>
          </div>

          <div className="stats-section">
            <h3>Leaderboard</h3>
            <div className="leaderboard">
              {stats.topPlayers.map((p, i) => (
                <div key={p.name} className="lb-row">
                  <span className="lb-rank">#{i + 1}</span>
                  <span className="lb-name">{p.name}</span>
                  <span className="lb-wins">{p.wins}W</span>
                  <span className="lb-games">{p.games}G</span>
                  <div className="lb-bar-wrap">
                    <div
                      className="lb-bar"
                      style={{ width: `${p.games > 0 ? (p.wins / p.games) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="lb-pct">
                    {p.games > 0 ? Math.round((p.wins / p.games) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History tab */}
      {tab === 'history' && (
        <div className="history-list">
          {history.map(game => {
            const winner = game.winnerId != null
              ? game.players?.find(p => p.id === game.winnerId)
              : null

            return (
              <div key={game.id} className="history-entry">
                <div className="history-meta">
                  <span className="history-format">{game.config?.format?.label ?? 'Unknown'}</span>
                  {winner && (
                    <span className="history-winner" style={{ color: winner.color }}>
                      ♛ {winner.name}
                    </span>
                  )}
                  <span className="history-date">{formatDate(game.endedAt)}</span>
                </div>

                <div className="history-players">
                  {game.players?.map(p => (
                    <div key={p.id} className={`history-player ${p.eliminated ? 'elim' : ''}`}>
                      <span className="hp-dot" style={{ background: p.color }} />
                      <span className="hp-name">{p.name}</span>
                      <span className="hp-life">{p.life} life</span>
                      {game.winnerId === p.id && <span className="hp-badge win-badge">Win</span>}
                      {p.eliminated && <span className="hp-badge elim-badge">Out</span>}
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {editingNotes === game.id ? (
                  <div className="notes-edit">
                    <textarea
                      className="notes-textarea"
                      value={notesDraft}
                      onChange={e => setNotesDraft(e.target.value)}
                      rows={3}
                      placeholder="Add notes..."
                      autoFocus
                    />
                    <div className="notes-actions">
                      <button className="btn-sm" onClick={() => setEditingNotes(null)}>Cancel</button>
                      <button className="btn-sm primary" onClick={() => saveNotes(game.id)}>Save</button>
                    </div>
                  </div>
                ) : (
                  <div className="notes-row">
                    {game.notes ? (
                      <p className="notes-text">{game.notes}</p>
                    ) : null}
                    <button className="btn-notes" onClick={() => startEditNotes(game)}>
                      {game.notes ? '✎ Edit notes' : '+ Add notes'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

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

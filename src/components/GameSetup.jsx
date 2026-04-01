import { useState } from 'react'
import './GameSetup.css'

const FORMATS = [
  { id: 'commander', label: 'Commander', startingLife: 40, minPlayers: 2, maxPlayers: 6 },
  { id: 'standard', label: 'Standard / Regular', startingLife: 20, minPlayers: 2, maxPlayers: 4 },
]

const PRESET_COLORS = [
  '#7c6af7', '#e05252', '#4caf82', '#e09a3a', '#4a9fd4', '#c45fc4',
  '#f06292', '#ff8a65', '#80cbc4', '#aed581',
]

function defaultPlayers(count, startingLife) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Player ${i + 1}`,
    color: PRESET_COLORS[i % PRESET_COLORS.length],
    startingLife,
  }))
}

export default function GameSetup({ onStart }) {
  const [formatId, setFormatId] = useState('commander')
  const [playerCount, setPlayerCount] = useState(4)
  const [players, setPlayers] = useState(() => defaultPlayers(4, 40))

  const format = FORMATS.find(f => f.id === formatId)

  function handleFormatChange(id) {
    const f = FORMATS.find(f => f.id === id)
    setFormatId(id)
    const count = Math.min(Math.max(playerCount, f.minPlayers), f.maxPlayers)
    setPlayerCount(count)
    setPlayers(defaultPlayers(count, f.startingLife))
  }

  function handleCountChange(count) {
    setPlayerCount(count)
    setPlayers(prev => {
      if (count > prev.length) {
        return [
          ...prev,
          ...Array.from({ length: count - prev.length }, (_, i) => ({
            id: prev.length + i,
            name: `Player ${prev.length + i + 1}`,
            color: PRESET_COLORS[(prev.length + i) % PRESET_COLORS.length],
            startingLife: format.startingLife,
          })),
        ]
      }
      return prev.slice(0, count)
    })
  }

  function handleNameChange(id, name) {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p))
  }

  function handleColorChange(id, color) {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, color } : p))
  }

  return (
    <div className="setup">
      <div className="setup-card">
        <h2>New Game</h2>

        <div className="setup-section">
          <label>Format</label>
          <div className="format-buttons">
            {FORMATS.map(f => (
              <button
                key={f.id}
                className={formatId === f.id ? 'active' : ''}
                onClick={() => handleFormatChange(f.id)}
              >
                <span>{f.label}</span>
                <small>{f.startingLife} life</small>
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <label>Players ({format.minPlayers}–{format.maxPlayers})</label>
          <div className="count-buttons">
            {Array.from(
              { length: format.maxPlayers - format.minPlayers + 1 },
              (_, i) => i + format.minPlayers
            ).map(n => (
              <button
                key={n}
                className={playerCount === n ? 'active' : ''}
                onClick={() => handleCountChange(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <label>Players</label>
          <div className="player-inputs">
            {players.map(p => (
              <div key={p.id} className="player-input-row">
                <div className="color-picker-wrap">
                  <div
                    className="color-swatch"
                    style={{ background: p.color }}
                  />
                  <input
                    type="color"
                    className="color-input"
                    value={p.color}
                    onChange={e => handleColorChange(p.id, e.target.value)}
                    title="Pick color"
                  />
                </div>
                <input
                  type="text"
                  className="name-input"
                  value={p.name}
                  maxLength={20}
                  onChange={e => handleNameChange(p.id, e.target.value)}
                  placeholder={`Player ${p.id + 1}`}
                />
                <div className="preset-colors">
                  {PRESET_COLORS.slice(0, 6).map(c => (
                    <button
                      key={c}
                      className={`preset-dot ${p.color === c ? 'selected' : ''}`}
                      style={{ background: c }}
                      onClick={() => handleColorChange(p.id, c)}
                      aria-label={`Set color ${c}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="start-btn" onClick={() => onStart({ format, players })}>
          Start Game
        </button>
      </div>
    </div>
  )
}

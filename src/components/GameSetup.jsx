import { useState } from 'react'
import CommanderSearch from './CommanderSearch'
import './GameSetup.css'

const FORMATS = [
  { id: 'commander', label: 'Commander', startingLife: 40, minPlayers: 1, maxPlayers: 6 },
  { id: 'standard', label: 'Standard / Regular', startingLife: 20, minPlayers: 1, maxPlayers: 4 },
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
    commanderName: null,
    commanderArt: null,
    commanderName2: null,
    commanderArt2: null,
    hasPartner: false,
    startingLife,
  }))
}

export default function GameSetup({ onStart, lastConfig }) {
  const [formatId, setFormatId] = useState('commander')
  const [playerCount, setPlayerCount] = useState(1)
  const [players, setPlayers] = useState(() => defaultPlayers(1, 40))

  const format = FORMATS.find(f => f.id === formatId)
  const isCommander = format.id === 'commander'

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
            commanderName: null,
            commanderArt: null,
            startingLife: format.startingLife,
          })),
        ]
      }
      return prev.slice(0, count)
    })
  }

  function updatePlayer(id, fields) {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p))
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
              <div key={p.id} className="player-block">
                <div className="player-input-row">
                  <div className="color-picker-wrap">
                    <div className="color-swatch" style={{ background: p.color }} />
                    <input
                      type="color"
                      className="color-input"
                      value={p.color}
                      onChange={e => updatePlayer(p.id, { color: e.target.value })}
                      title="Pick color"
                    />
                  </div>
                  <input
                    type="text"
                    className="name-input"
                    value={p.name}
                    maxLength={20}
                    onChange={e => updatePlayer(p.id, { name: e.target.value })}
                    placeholder={`Player ${p.id + 1}`}
                  />
                  <div className="preset-colors">
                    {PRESET_COLORS.slice(0, 6).map(c => (
                      <button
                        key={c}
                        className={`preset-dot ${p.color === c ? 'selected' : ''}`}
                        style={{ background: c }}
                        onClick={() => updatePlayer(p.id, { color: c })}
                        aria-label={`Set color ${c}`}
                      />
                    ))}
                  </div>
                </div>

                {isCommander && (
                  <div className="commander-row">
                    <div className="commander-row-header">
                      <span className="commander-label">Commander</span>
                      <button
                        className={`partner-toggle ${p.hasPartner ? 'active' : ''}`}
                        onClick={() => updatePlayer(p.id, {
                          hasPartner: !p.hasPartner,
                          commanderName2: null,
                          commanderArt2: null,
                        })}
                      >
                        {p.hasPartner ? '✕ Partner' : '+ Partner'}
                      </button>
                    </div>
                    <CommanderSearch
                      value={p.commanderName}
                      artUrl={p.commanderArt}
                      onSelect={(name, art) => updatePlayer(p.id, { commanderName: name, commanderArt: art })}
                      onClear={() => updatePlayer(p.id, { commanderName: null, commanderArt: null })}
                    />
                    {p.hasPartner && (
                      <>
                        <span className="commander-label" style={{ marginTop: 4 }}>Partner</span>
                        <CommanderSearch
                          value={p.commanderName2}
                          artUrl={p.commanderArt2}
                          onSelect={(name, art) => updatePlayer(p.id, { commanderName2: name, commanderArt2: art })}
                          onClear={() => updatePlayer(p.id, { commanderName2: null, commanderArt2: null })}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="start-row">
          <button className="start-btn" onClick={() => onStart({ format, players })}>
            Start Game
          </button>
          {lastConfig && (
            <button
              className="rematch-btn"
              onClick={() => onStart(lastConfig)}
              title="Same players, same commanders"
            >
              ↺ Rematch
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

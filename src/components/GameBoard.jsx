import { useState, useCallback } from 'react'
import PlayerCard from './PlayerCard'
import DiceRoller from './DiceRoller'
import './GameBoard.css'

function initPlayers(config) {
  return config.players.map(p => ({
    ...p,
    life: config.format.startingLife,
    commanderDamage: config.format.id === 'commander'
      ? Object.fromEntries(config.players.filter(op => op.id !== p.id).map(op => [op.id, 0]))
      : null,
    poison: 0,
    counters: { experience: 0, energy: 0, plusone: 0 },
    eliminated: false,
  }))
}

export default function GameBoard({ config, onEndGame }) {
  const [players, setPlayers] = useState(() => initPlayers(config))
  const [turnIndex, setTurnIndex] = useState(0)
  const [turnNumber, setTurnNumber] = useState(1)
  const [storm, setStorm] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const isCommander = config.format.id === 'commander'

  const activePlayers = players.filter(p => !p.eliminated)
  const activePlayer = players[turnIndex] ?? activePlayers[0]

  function nextTurn() {
    // Find next non-eliminated player
    let next = (turnIndex + 1) % players.length
    let loops = 0
    while (players[next]?.eliminated && loops < players.length) {
      next = (next + 1) % players.length
      loops++
    }
    if (next <= turnIndex && next !== 0) setTurnNumber(n => n + 1)
    if (next === 0 || next < turnIndex) setTurnNumber(n => n + 1)
    setTurnIndex(next)
    setStorm(0)
  }

  function prevTurn() {
    let prev = (turnIndex - 1 + players.length) % players.length
    let loops = 0
    while (players[prev]?.eliminated && loops < players.length) {
      prev = (prev - 1 + players.length) % players.length
      loops++
    }
    setTurnIndex(prev)
    setStorm(0)
  }

  const adjustLife = useCallback((playerId, delta) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId ? { ...p, life: p.life + delta } : p
    ))
  }, [])

  const adjustPoison = useCallback((playerId, delta) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, poison: Math.max(0, Math.min(10, (p.poison ?? 0) + delta)) }
        : p
    ))
  }, [])

  const adjustCounter = useCallback((playerId, key, delta) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, counters: { ...p.counters, [key]: Math.max(0, (p.counters?.[key] ?? 0) + delta) } }
        : p
    ))
  }, [])

  const adjustCommanderDamage = useCallback((playerId, fromId, delta) => {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const newDmg = Math.max(0, (p.commanderDamage[fromId] ?? 0) + delta)
      return {
        ...p,
        life: p.life - delta,
        commanderDamage: { ...p.commanderDamage, [fromId]: newDmg },
      }
    }))
  }, [])

  const toggleEliminated = useCallback((playerId) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId ? { ...p, eliminated: !p.eliminated } : p
    ))
  }, [])

  return (
    <div className="board">
      {/* Turn tracker bar */}
      <div className="turn-bar">
        <button className="turn-nav" onClick={prevTurn} title="Previous turn">◀</button>
        <div className="turn-info">
          <span className="turn-label">Turn {turnNumber}</span>
          <span className="turn-player" style={{ color: activePlayer?.color }}>
            {activePlayer?.name}
          </span>
        </div>
        <button className="turn-nav next-turn" onClick={nextTurn} title="Next turn">
          Next Turn ▶
        </button>
      </div>

      {/* Toolbar */}
      <div className="board-toolbar">
        <div className="board-info">
          <span className="format-badge">{config.format.label}</span>
          <span className="life-badge">{config.format.startingLife} life</span>
        </div>
        <div className="storm-wrap">
          <span className="storm-label">Storm</span>
          <button className="storm-adj" onClick={() => setStorm(s => Math.max(0, s - 1))} disabled={storm === 0}>-</button>
          <span className="storm-count">{storm}</span>
          <button className="storm-adj" onClick={() => setStorm(s => s + 1)}>+</button>
        </div>
        <div className="board-actions">
          <button className="btn-secondary" onClick={() => setShowTools(v => !v)}>
            Tools {showTools ? '▲' : '▼'}
          </button>
          <button className="btn-secondary" onClick={() => { setPlayers(initPlayers(config)); setTurnIndex(0); setTurnNumber(1); setStorm(0) }}>
            Reset
          </button>
          <button className="btn-danger" onClick={() => setShowEndConfirm(true)}>End Game</button>
        </div>
      </div>

      {/* Dice roller */}
      {showTools && (
        <div className="tools-panel">
          <div className="tools-section">
            <span className="tools-label">Dice Roller</span>
            <DiceRoller />
          </div>
        </div>
      )}

      {/* Player grid */}
      <div className={`player-grid players-${players.length}`}>
        {players.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            allPlayers={players}
            isCommander={isCommander}
            isActiveTurn={player.id === activePlayer?.id && !player.eliminated}
            onAdjustLife={adjustLife}
            onAdjustPoison={adjustPoison}
            onAdjustCounter={adjustCounter}
            onAdjustCommanderDamage={adjustCommanderDamage}
            onToggleEliminated={toggleEliminated}
          />
        ))}
      </div>

      {activePlayers.length === 1 && (
        <div className="winner-banner">
          {activePlayers[0].name} wins!
        </div>
      )}

      {showEndConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>End Game?</h3>
            <p>This will save the game to history and return to setup.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowEndConfirm(false)}>Cancel</button>
              <button className="btn-danger" onClick={() => onEndGame(players)}>End Game</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

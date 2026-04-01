import { useState, useCallback } from 'react'
import PlayerCard from './PlayerCard'
import './GameBoard.css'

function initPlayers(config) {
  return config.players.map(p => ({
    ...p,
    life: config.format.startingLife,
    commanderDamage: config.format.id === 'commander'
      ? Object.fromEntries(config.players.filter(op => op.id !== p.id).map(op => [op.id, 0]))
      : null,
    eliminated: false,
  }))
}

export default function GameBoard({ config, onEndGame }) {
  const [players, setPlayers] = useState(() => initPlayers(config))
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const isCommander = config.format.id === 'commander'

  const adjustLife = useCallback((playerId, delta) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId ? { ...p, life: p.life + delta } : p
    ))
  }, [])

  const adjustCommanderDamage = useCallback((playerId, fromId, delta) => {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const newDmg = (p.commanderDamage[fromId] ?? 0) + delta
      const clamped = Math.max(0, newDmg)
      // Also reduce life by delta (commander damage deals real damage)
      return {
        ...p,
        life: p.life - delta,
        commanderDamage: { ...p.commanderDamage, [fromId]: clamped },
      }
    }))
  }, [])

  const toggleEliminated = useCallback((playerId) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId ? { ...p, eliminated: !p.eliminated } : p
    ))
  }, [])

  const resetGame = () => {
    setPlayers(initPlayers(config))
  }

  const activePlayers = players.filter(p => !p.eliminated)
  const eliminated = players.filter(p => p.eliminated)

  return (
    <div className="board">
      <div className="board-toolbar">
        <div className="board-info">
          <span className="format-badge">{config.format.label}</span>
          <span className="life-badge">{config.format.startingLife} life</span>
        </div>
        <div className="board-actions">
          <button className="btn-secondary" onClick={resetGame}>Reset</button>
          <button className="btn-danger" onClick={() => setShowEndConfirm(true)}>End Game</button>
        </div>
      </div>

      <div className={`player-grid players-${players.length}`}>
        {players.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            allPlayers={players}
            isCommander={isCommander}
            onAdjustLife={adjustLife}
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

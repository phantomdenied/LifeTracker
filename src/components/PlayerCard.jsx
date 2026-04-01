import { useState } from 'react'
import './PlayerCard.css'

const QUICK_AMOUNTS = [1, 5, 10]

export default function PlayerCard({
  player,
  allPlayers,
  isCommander,
  onAdjustLife,
  onAdjustCommanderDamage,
  onToggleEliminated,
}) {
  const [showCmdDmg, setShowCmdDmg] = useState(false)

  const opponents = allPlayers.filter(p => p.id !== player.id)
  const isEliminated = player.eliminated

  // Commander loss: 0 life OR 21+ commander damage from any single opponent
  const cmdDmgLoss = isCommander
    ? opponents.find(op => (player.commanderDamage?.[op.id] ?? 0) >= 21)
    : null
  const isDead = player.life <= 0 || !!cmdDmgLoss

  return (
    <div
      className={`player-card ${isEliminated ? 'eliminated' : ''} ${isDead && !isEliminated ? 'dead' : ''}`}
      style={{ '--player-color': player.color }}
    >
      <div className="player-header">
        <span className="player-name">{player.name}</span>
        <button
          className={`elim-btn ${isEliminated ? 'elim-active' : ''}`}
          onClick={() => onToggleEliminated(player.id)}
          title={isEliminated ? 'Restore player' : 'Eliminate player'}
        >
          {isEliminated ? '↩' : '✕'}
        </button>
      </div>

      {cmdDmgLoss && !isEliminated && (
        <div className="cmd-loss-notice">
          21 cmd dmg from {cmdDmgLoss.name}
        </div>
      )}

      <div className="life-display">
        <span className="life-number">{player.life}</span>
      </div>

      <div className="life-controls">
        <div className="control-row">
          {QUICK_AMOUNTS.map(amt => (
            <button
              key={amt}
              className="ctrl-btn minus"
              onClick={() => onAdjustLife(player.id, -amt)}
              disabled={isEliminated}
            >
              -{amt}
            </button>
          ))}
        </div>
        <div className="control-row">
          {QUICK_AMOUNTS.map(amt => (
            <button
              key={amt}
              className="ctrl-btn plus"
              onClick={() => onAdjustLife(player.id, amt)}
              disabled={isEliminated}
            >
              +{amt}
            </button>
          ))}
        </div>
      </div>

      {isCommander && opponents.length > 0 && (
        <div className="cmd-dmg-section">
          <button
            className="cmd-dmg-toggle"
            onClick={() => setShowCmdDmg(v => !v)}
          >
            Commander Damage {showCmdDmg ? '▲' : '▼'}
          </button>
          {showCmdDmg && (
            <div className="cmd-dmg-list">
              {opponents.map(op => {
                const dmg = player.commanderDamage?.[op.id] ?? 0
                return (
                  <div key={op.id} className="cmd-dmg-row">
                    <span
                      className="cmd-dot"
                      style={{ background: op.color }}
                    />
                    <span className="cmd-name">{op.name}</span>
                    <button
                      className="cmd-adj"
                      onClick={() => onAdjustCommanderDamage(player.id, op.id, -1)}
                      disabled={isEliminated || dmg <= 0}
                    >
                      -
                    </button>
                    <span className={`cmd-val ${dmg >= 21 ? 'lethal' : ''}`}>{dmg}</span>
                    <button
                      className="cmd-adj"
                      onClick={() => onAdjustCommanderDamage(player.id, op.id, 1)}
                      disabled={isEliminated}
                    >
                      +
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

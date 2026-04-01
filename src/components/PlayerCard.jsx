import { useState, useRef } from 'react'
import './PlayerCard.css'

const QUICK_AMOUNTS = [1, 5, 10]

const EXTRA_COUNTERS = [
  { key: 'experience', label: 'Exp', color: '#e09a3a' },
  { key: 'energy', label: 'Nrg', color: '#4a9fd4' },
  { key: 'plusone', label: '+1/+1', color: '#4caf82' },
]

export default function PlayerCard({
  player,
  allPlayers,
  isCommander,
  isActiveTurn,
  onAdjustLife,
  onAdjustPoison,
  onAdjustCounter,
  onAdjustCommanderDamage,
  onToggleEliminated,
}) {
  const [showCmdDmg, setShowCmdDmg] = useState(false)
  const [showExtras, setShowExtras] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const inputRef = useRef(null)

  const opponents = allPlayers.filter(p => p.id !== player.id)
  const isEliminated = player.eliminated

  const cmdDmgLoss = isCommander
    ? opponents.find(op => (player.commanderDamage?.[op.id] ?? 0) >= 21)
    : null
  const poisonDead = (player.poison ?? 0) >= 10
  const isDead = player.life <= 0 || !!cmdDmgLoss || poisonDead

  function applyCustom(sign) {
    const val = parseInt(customInput, 10)
    if (!isNaN(val) && val > 0) {
      onAdjustLife(player.id, sign * val)
      setCustomInput('')
      inputRef.current?.blur()
    }
  }

  function handleCustomKey(e) {
    if (e.key === 'Enter') applyCustom(1)
    if (e.key === '-') { e.preventDefault(); applyCustom(-1) }
  }

  return (
    <div
      className={[
        'player-card',
        isEliminated ? 'eliminated' : '',
        isDead && !isEliminated ? 'dead' : '',
        isActiveTurn ? 'active-turn' : '',
      ].filter(Boolean).join(' ')}
      style={{ '--player-color': player.color }}
    >
      <div className="player-header">
        {isActiveTurn && <span className="turn-pip" title="Active turn" />}
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
        <div className="notice danger">21 cmd dmg from {cmdDmgLoss.name}</div>
      )}
      {poisonDead && !isEliminated && (
        <div className="notice danger">10 poison counters</div>
      )}

      {/* Life total */}
      <div className="life-display">
        <span className="life-number">{player.life}</span>
      </div>

      {/* Quick adjust */}
      <div className="life-controls">
        <div className="control-row">
          {QUICK_AMOUNTS.map(amt => (
            <button key={amt} className="ctrl-btn minus"
              onClick={() => onAdjustLife(player.id, -amt)}
              disabled={isEliminated}>
              -{amt}
            </button>
          ))}
        </div>
        <div className="control-row">
          {QUICK_AMOUNTS.map(amt => (
            <button key={amt} className="ctrl-btn plus"
              onClick={() => onAdjustLife(player.id, amt)}
              disabled={isEliminated}>
              +{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount */}
      <div className="custom-row">
        <button className="ctrl-btn minus custom-apply"
          onClick={() => applyCustom(-1)}
          disabled={isEliminated || !customInput}>
          -
        </button>
        <input
          ref={inputRef}
          className="custom-input"
          type="number"
          min="1"
          placeholder="custom"
          value={customInput}
          onChange={e => setCustomInput(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyDown={handleCustomKey}
          disabled={isEliminated}
        />
        <button className="ctrl-btn plus custom-apply"
          onClick={() => applyCustom(1)}
          disabled={isEliminated || !customInput}>
          +
        </button>
      </div>

      {/* Poison counters */}
      <div className="counter-row poison-row">
        <span className="counter-label poison-label">
          Poison {(player.poison ?? 0)}/10
        </span>
        <button className="counter-adj"
          onClick={() => onAdjustPoison(player.id, -1)}
          disabled={isEliminated || (player.poison ?? 0) <= 0}>
          -
        </button>
        <div className="poison-pips">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`pip ${i < (player.poison ?? 0) ? 'filled' : ''} ${i >= 9 ? 'lethal-pip' : ''}`}
              onClick={() => !isEliminated && onAdjustPoison(player.id, i < (player.poison ?? 0) ? -((player.poison ?? 0) - i) : (i + 1 - (player.poison ?? 0)))}
            />
          ))}
        </div>
        <button className="counter-adj"
          onClick={() => onAdjustPoison(player.id, 1)}
          disabled={isEliminated || (player.poison ?? 0) >= 10}>
          +
        </button>
      </div>

      {/* Extra counters toggle */}
      <button className="section-toggle" onClick={() => setShowExtras(v => !v)}>
        Counters {showExtras ? '▲' : '▼'}
      </button>
      {showExtras && (
        <div className="extras-list">
          {EXTRA_COUNTERS.map(({ key, label, color }) => (
            <div key={key} className="extra-row">
              <span className="extra-label" style={{ color }}>{label}</span>
              <button className="counter-adj"
                onClick={() => onAdjustCounter(player.id, key, -1)}
                disabled={isEliminated || (player.counters?.[key] ?? 0) <= 0}>
                -
              </button>
              <span className="extra-val">{player.counters?.[key] ?? 0}</span>
              <button className="counter-adj"
                onClick={() => onAdjustCounter(player.id, key, 1)}
                disabled={isEliminated}>
                +
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Commander damage */}
      {isCommander && opponents.length > 0 && (
        <>
          <button className="section-toggle" onClick={() => setShowCmdDmg(v => !v)}>
            Commander Damage {showCmdDmg ? '▲' : '▼'}
          </button>
          {showCmdDmg && (
            <div className="cmd-dmg-list">
              {opponents.map(op => {
                const dmg = player.commanderDamage?.[op.id] ?? 0
                return (
                  <div key={op.id} className="cmd-dmg-row">
                    <span className="cmd-dot" style={{ background: op.color }} />
                    <span className="cmd-name">{op.name}</span>
                    <button className="cmd-adj"
                      onClick={() => onAdjustCommanderDamage(player.id, op.id, -1)}
                      disabled={isEliminated || dmg <= 0}>
                      -
                    </button>
                    <span className={`cmd-val ${dmg >= 21 ? 'lethal' : ''}`}>{dmg}</span>
                    <button className="cmd-adj"
                      onClick={() => onAdjustCommanderDamage(player.id, op.id, 1)}
                      disabled={isEliminated}>
                      +
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

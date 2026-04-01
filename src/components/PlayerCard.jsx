import { useState, useRef } from 'react'
import './PlayerCard.css'

const QUICK_AMOUNTS = [1, 5, 10]

const EXTRA_COUNTERS = [
  { key: 'experience', label: 'Exp', color: '#e09a3a' },
  { key: 'energy', label: 'Nrg', color: '#4a9fd4' },
  { key: 'plusone', label: '+1/+1', color: '#4caf82' },
]

const TOKENS = [
  { key: 'treasure', label: '💰 Treasure' },
  { key: 'clue',     label: '🔍 Clue' },
  { key: 'food',     label: '🍎 Food' },
  { key: 'blood',    label: '🩸 Blood' },
  { key: 'map',      label: '🗺 Map' },
  { key: 'soldier',  label: '⚔ Soldier' },
  { key: 'zombie',   label: '💀 Zombie' },
  { key: 'goblin',   label: '👺 Goblin' },
  { key: 'saproling',label: '🍄 Saproling' },
  { key: 'wolf',     label: '🐺 Wolf' },
  { key: 'thopter',  label: '✈ Thopter' },
  { key: 'spirit',   label: '👻 Spirit' },
]

export default function PlayerCard({
  player,
  allPlayers,
  isCommander,
  isActiveTurn,
  isMonarch,
  hasInitiative,
  onAdjustLife,
  onAdjustPoison,
  onAdjustCounter,
  onAdjustCommanderDamage,
  onToggleEliminated,
  onGiveMonarch,
  onGiveInitiative,
}) {
  const [showCmdDmg, setShowCmdDmg] = useState(false)
  const [showExtras, setShowExtras] = useState(false)
  const [showTokens, setShowTokens] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const inputRef = useRef(null)

  const opponents = allPlayers.filter(p => p.id !== player.id)
  const isEliminated = player.eliminated

  const cmdDmgLoss = isCommander
    ? opponents.find(op => (player.commanderDamage?.[op.id] ?? 0) >= 21)
    : null
  const poisonDead = (player.poison ?? 0) >= 10
  const isDead = player.life <= 0 || !!cmdDmgLoss || poisonDead

  const commanderTax = Math.max(0, ((player.commanderCasts ?? 0) - 1) * 2)

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

  const recentLog = (player.lifeLog ?? []).slice(0, 5)

  const hasArt = !!(player.commanderArt || player.commanderArt2)
  const artStyle = {
    '--player-color': player.color,
    ...(player.commanderArt  ? { '--art-url':  `url(${player.commanderArt})`  } : {}),
    ...(player.commanderArt2 ? { '--art-url2': `url(${player.commanderArt2})` } : {}),
  }

  return (
    <div
      className={[
        'player-card',
        isEliminated ? 'eliminated' : '',
        isDead && !isEliminated ? 'dead' : '',
        isActiveTurn ? 'active-turn' : '',
        hasArt ? 'has-art' : '',
        player.commanderArt2 ? 'has-art2' : '',
      ].filter(Boolean).join(' ')}
      style={artStyle}
    >
      {/* Partner art second layer */}
      {player.commanderArt2 && <div className="partner-art-bg" />}

      {/* Header */}
      <div className="player-header">
        {isActiveTurn && <span className="turn-pip" title="Active turn" />}
        <span className="player-name">{player.name}</span>
        <div className="header-badges">
          {isMonarch && <span className="badge monarch-badge" title="Monarch">♛</span>}
          {hasInitiative && <span className="badge init-badge" title="Initiative">⚔</span>}
        </div>
        <button
          className={`elim-btn ${isEliminated ? 'elim-active' : ''}`}
          onClick={() => onToggleEliminated(player.id)}
          title={isEliminated ? 'Restore player' : 'Eliminate player'}
        >
          {isEliminated ? '↩' : '✕'}
        </button>
      </div>

      {/* Token buttons */}
      <div className="token-row">
        <button
          className={`token-btn ${isMonarch ? 'token-active' : ''}`}
          onClick={() => onGiveMonarch(player.id)}
          disabled={isEliminated}
        >
          ♛ {isMonarch ? 'Monarch' : 'Give Monarch'}
        </button>
        <button
          className={`token-btn ${hasInitiative ? 'token-active init' : ''}`}
          onClick={() => onGiveInitiative(player.id)}
          disabled={isEliminated}
        >
          ⚔ {hasInitiative ? 'Initiative' : 'Give Initiative'}
        </button>
      </div>

      {/* Death notices */}
      {cmdDmgLoss && !isEliminated && (
        <div className="notice danger">21 cmd dmg from {cmdDmgLoss.name}</div>
      )}
      {poisonDead && !isEliminated && (
        <div className="notice danger">10 poison counters</div>
      )}

      {/* Life total with tap zones */}
      <div className="life-display">
        <button
          className="tap-zone tap-plus"
          onClick={() => !isEliminated && onAdjustLife(player.id, 1)}
          disabled={isEliminated}
          aria-label="+1 life"
        />
        <button
          className="tap-zone tap-minus"
          onClick={() => !isEliminated && onAdjustLife(player.id, -1)}
          disabled={isEliminated}
          aria-label="-1 life"
        />
        <div className="tap-zone-hint">
          <span className="tap-hint-plus">+1</span>
          <span className="tap-hint-divider" />
          <span className="tap-hint-minus">−1</span>
        </div>
        <span className="life-number">{player.life}</span>
        {recentLog.length > 0 && (
          <div className="life-log">
            {recentLog.map((entry, i) => (
              <span key={i} className={`log-entry ${entry.delta > 0 ? 'pos' : 'neg'}`}>
                {entry.delta > 0 ? '+' : ''}{entry.delta}
              </span>
            ))}
          </div>
        )}
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
          −
        </button>
        <input
          ref={inputRef}
          className="custom-input"
          type="number"
          inputMode="numeric"
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
        <span className="counter-label poison-label">Poison {player.poison ?? 0}/10</span>
        <button className="counter-adj"
          onClick={() => onAdjustPoison(player.id, -1)}
          disabled={isEliminated || (player.poison ?? 0) <= 0}>−</button>
        <div className="poison-pips">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`pip ${i < (player.poison ?? 0) ? 'filled' : ''} ${i >= 9 ? 'lethal-pip' : ''}`}
              onClick={() => {
                if (isEliminated) return
                const current = player.poison ?? 0
                onAdjustPoison(player.id, i < current ? -(current - i) : (i + 1 - current))
              }}
            />
          ))}
        </div>
        <button className="counter-adj"
          onClick={() => onAdjustPoison(player.id, 1)}
          disabled={isEliminated || (player.poison ?? 0) >= 10}>+</button>
      </div>

      {/* Commander tax */}
      {isCommander && (
        <div className="counter-row">
          <span className="counter-label" style={{ color: '#9585f9' }}>
            Cmd Tax {commanderTax > 0 ? `+${commanderTax}` : '—'}
          </span>
          <button className="counter-adj"
            onClick={() => onAdjustCounter(player.id, 'commanderCasts', -1)}
            disabled={isEliminated || (player.commanderCasts ?? 0) <= 0}>−</button>
          <span className="extra-val">{player.commanderCasts ?? 0} cast{(player.commanderCasts ?? 0) !== 1 ? 's' : ''}</span>
          <button className="counter-adj"
            onClick={() => onAdjustCounter(player.id, 'commanderCasts', 1)}
            disabled={isEliminated}>+</button>
        </div>
      )}

      {/* Extra counters */}
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
                disabled={isEliminated || (player.counters?.[key] ?? 0) <= 0}>−</button>
              <span className="extra-val">{player.counters?.[key] ?? 0}</span>
              <button className="counter-adj"
                onClick={() => onAdjustCounter(player.id, key, 1)}
                disabled={isEliminated}>+</button>
            </div>
          ))}
        </div>
      )}

      {/* Token tray */}
      <button className="section-toggle" onClick={() => setShowTokens(v => !v)}>
        Tokens {showTokens ? '▲' : '▼'}
      </button>
      {showTokens && (
        <div className="tokens-grid">
          {TOKENS.map(({ key, label }) => {
            const count = player.tokens?.[key] ?? 0
            return (
              <div key={key} className="token-item">
                <span className="token-label">{label}</span>
                <div className="token-controls">
                  <button className="counter-adj"
                    onClick={() => onAdjustCounter(player.id, `token_${key}`, -1)}
                    disabled={isEliminated || count <= 0}>−</button>
                  <span className="extra-val">{count}</span>
                  <button className="counter-adj"
                    onClick={() => onAdjustCounter(player.id, `token_${key}`, 1)}
                    disabled={isEliminated}>+</button>
                </div>
              </div>
            )
          })}
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
                      disabled={isEliminated || dmg <= 0}>−</button>
                    <span className={`cmd-val ${dmg >= 21 ? 'lethal' : ''}`}>{dmg}</span>
                    <button className="cmd-adj"
                      onClick={() => onAdjustCommanderDamage(player.id, op.id, 1)}
                      disabled={isEliminated}>+</button>
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

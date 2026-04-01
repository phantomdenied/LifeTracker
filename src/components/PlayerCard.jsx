import { useState, useRef } from 'react'
import { EMBLEMS, STATUS_EMBLEMS, PW_EMBLEMS } from '../data/emblems'
import './PlayerCard.css'

const QUICK_AMOUNTS = [1, 5, 10]

const EXTRA_COUNTERS = [
  { key: 'experience', label: 'Exp',   color: '#e09a3a' },
  { key: 'energy',     label: 'Nrg',   color: '#4a9fd4' },
  { key: 'plusone',    label: '+1/+1', color: '#4caf82' },
]

const ALL_TOKENS = [
  { key: 'treasure',    label: '💰 Treasure' },
  { key: 'clue',        label: '🔍 Clue' },
  { key: 'food',        label: '🍎 Food' },
  { key: 'blood',       label: '🩸 Blood' },
  { key: 'gold',        label: '🪙 Gold' },
  { key: 'shard',       label: '🔷 Shard' },
  { key: 'map',         label: '🗺 Map' },
  { key: 'gnome',       label: '🧙 Gnome' },
  { key: 'servo',       label: '⚙ Servo' },
  { key: 'thopter',     label: '✈ Thopter' },
  { key: 'soldier',     label: '⚔ Soldier' },
  { key: 'zombie',      label: '💀 Zombie' },
  { key: 'goblin',      label: '👺 Goblin' },
  { key: 'wolf',        label: '🐺 Wolf' },
  { key: 'saproling',   label: '🍄 Saproling' },
  { key: 'spirit',      label: '👻 Spirit' },
  { key: 'human',       label: '🧑 Human' },
  { key: 'knight',      label: '🏇 Knight' },
  { key: 'rat',         label: '🐀 Rat' },
  { key: 'snake',       label: '🐍 Snake' },
  { key: 'spider',      label: '🕷 Spider' },
  { key: 'insect',      label: '🦗 Insect' },
  { key: 'angel',       label: '😇 Angel' },
  { key: 'dragon',      label: '🐉 Dragon' },
  { key: 'bird',        label: '🐦 Bird' },
  { key: 'cat',         label: '🐱 Cat' },
  { key: 'elemental',   label: '🔥 Elemental' },
  { key: 'spawn',       label: '👾 Eldrazi Spawn' },
  { key: 'scion',       label: '🌀 Eldrazi Scion' },
  { key: 'copy',        label: '©️ Copy' },
  { key: 'worm',        label: '🐛 Worm' },
  { key: 'wurm',        label: '🐍 Wurm' },
]

// Widgets that persist on the card once added
const PERSISTENT_WIDGETS = [
  { key: 'poison',   label: '☠ Poison' },
  { key: 'counters', label: '◈ Counters' },
  { key: 'tokens',   label: '🎭 Tokens' },
  { key: 'emblems',  label: '★ Emblems & Status' },
  { key: 'cmddmg',   label: '⚔ Cmd Damage', commanderOnly: true },
  { key: 'cmdtax',   label: '📜 Cmd Tax',    commanderOnly: true },
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
  onToggleWidget,
  onToggleSelectedToken,
  onToggleEmblem,
  onAdjustRingStage,
  onToggleDayNight,
  focusMode,
}) {
  const [fabOpen, setFabOpen]             = useState(false)
  const [tokenPickerOpen, setTokenPickerOpen] = useState(false)
  const [emblemPickerOpen, setEmblemPickerOpen] = useState(false)
  const [customOpen, setCustomOpen]       = useState(false)
  const [customInput, setCustomInput]     = useState('')
  const inputRef = useRef(null)

  const opponents    = allPlayers.filter(p => p.id !== player.id)
  const isEliminated = player.eliminated
  const cmdDmgLoss   = isCommander
    ? opponents.find(op => (player.commanderDamage?.[op.id] ?? 0) >= 21)
    : null
  const poisonDead   = (player.poison ?? 0) >= 10
  const isDead       = player.life <= 0 || !!cmdDmgLoss || poisonDead
  const commanderTax = Math.max(0, ((player.commanderCasts ?? 0) - 1) * 2)
  const recentLog    = (player.lifeLog ?? []).slice(0, 3)
  const activeWidgets  = player.activeWidgets ?? []
  const selectedTokens = player.selectedTokens ?? []
  const activeEmblems  = player.activeEmblems ?? []
  const ringStage      = player.ringStage ?? 1
  const dayNight       = player.dayNightState ?? 'day'

  const hasArt  = !!(player.commanderArt || player.commanderArt2)
  const artStyle = {
    '--player-color': player.color,
    ...(player.commanderArt  ? { '--art-url':  `url(${player.commanderArt})`  } : {}),
    ...(player.commanderArt2 ? { '--art-url2': `url(${player.commanderArt2})` } : {}),
  }

  // Tokens currently shown on the card (intersection of selected + defined)
  const visibleTokens = ALL_TOKENS.filter(t => selectedTokens.includes(t.key))

  function applyCustom(sign) {
    const val = parseInt(customInput, 10)
    if (!isNaN(val) && val > 0) {
      onAdjustLife(player.id, sign * val)
      setCustomInput('')
      setCustomOpen(false)
      inputRef.current?.blur()
    }
  }

  function handleCustomKey(e) {
    if (e.key === 'Enter') applyCustom(1)
    if (e.key === '-') { e.preventDefault(); applyCustom(-1) }
  }

  function openTokenPicker() {
    // Add widget if not there yet, then open picker
    if (!activeWidgets.includes('tokens')) {
      onToggleWidget(player.id, 'tokens')
    }
    setTokenPickerOpen(true)
    setFabOpen(false)
  }

  function openEmblemPicker() {
    if (!activeWidgets.includes('emblems')) {
      onToggleWidget(player.id, 'emblems')
    }
    setEmblemPickerOpen(true)
    setFabOpen(false)
  }

  // Get emblem data by key
  function getEmblem(key) {
    return EMBLEMS.find(e => e.key === key)
  }

  return (
    <>
      <div
        className={[
          'player-card',
          isEliminated ? 'eliminated' : '',
          isDead && !isEliminated ? 'dead' : '',
          isActiveTurn ? 'active-turn' : '',
          hasArt ? 'has-art' : '',
          player.commanderArt2 ? 'has-art2' : '',
          focusMode ? 'focus' : '',
        ].filter(Boolean).join(' ')}
        style={artStyle}
      >
        {player.commanderArt2 && <div className="partner-art-bg" />}

        {/* Header */}
        <div className="player-header">
          {isActiveTurn && <span className="turn-pip" />}
          <span className="player-name">{player.name}</span>
          <div className="header-badges">
            {isMonarch     && <span className="badge monarch-badge" title="Monarch">♛</span>}
            {hasInitiative && <span className="badge init-badge"    title="Initiative">⚔</span>}
            {(player.poison ?? 0) > 0 && (
              <span className="badge poison-badge">☠{player.poison}</span>
            )}
          </div>
          <button
            className={`elim-btn ${isEliminated ? 'elim-active' : ''}`}
            onClick={() => onToggleEliminated(player.id)}
            title={isEliminated ? 'Restore' : 'Eliminate'}
          >
            {isEliminated ? '↩' : '✕'}
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
          <button className="tap-zone tap-plus" onClick={() => !isEliminated && onAdjustLife(player.id, 1)} disabled={isEliminated} aria-label="+1 life" />
          <button className="tap-zone tap-minus" onClick={() => !isEliminated && onAdjustLife(player.id, -1)} disabled={isEliminated} aria-label="-1 life" />
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
                disabled={isEliminated}>−{amt}</button>
            ))}
          </div>
          <div className="control-row">
            {QUICK_AMOUNTS.map(amt => (
              <button key={amt} className="ctrl-btn plus"
                onClick={() => onAdjustLife(player.id, amt)}
                disabled={isEliminated}>+{amt}</button>
            ))}
          </div>
        </div>

        {/* Custom adjust inline */}
        {customOpen && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Custom Adjust</span>
              <button className="widget-remove" onClick={() => { setCustomOpen(false); setCustomInput('') }}>✕</button>
            </div>
            <div className="custom-row">
              <button className="ctrl-btn minus custom-apply" onClick={() => applyCustom(-1)} disabled={!customInput}>−</button>
              <input
                ref={inputRef}
                className="custom-input"
                type="number"
                inputMode="numeric"
                placeholder="amount"
                value={customInput}
                onChange={e => setCustomInput(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={handleCustomKey}
                autoFocus
              />
              <button className="ctrl-btn plus custom-apply" onClick={() => applyCustom(1)} disabled={!customInput}>+</button>
            </div>
          </div>
        )}

        {/* ── Inline widgets ── */}

        {/* Poison */}
        {activeWidgets.includes('poison') && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Poison / Infect — {player.poison ?? 0}/10</span>
              <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'poison')}>✕</button>
            </div>
            <div className="counter-row">
              <button className="counter-adj" onClick={() => onAdjustPoison(player.id, -1)} disabled={(player.poison ?? 0) <= 0}>−</button>
              <div className="poison-pips">
                {Array.from({ length: 10 }, (_, i) => (
                  <span
                    key={i}
                    className={`pip ${i < (player.poison ?? 0) ? 'filled' : ''} ${i >= 9 ? 'lethal-pip' : ''}`}
                    onClick={() => {
                      const cur = player.poison ?? 0
                      onAdjustPoison(player.id, i < cur ? -(cur - i) : (i + 1 - cur))
                    }}
                  />
                ))}
              </div>
              <button className="counter-adj" onClick={() => onAdjustPoison(player.id, 1)} disabled={(player.poison ?? 0) >= 10}>+</button>
            </div>
          </div>
        )}

        {/* Counters */}
        {activeWidgets.includes('counters') && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Counters</span>
              <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'counters')}>✕</button>
            </div>
            <div className="extras-list">
              {EXTRA_COUNTERS.map(({ key, label, color }) => (
                <div key={key} className="extra-row">
                  <span className="extra-label" style={{ color }}>{label}</span>
                  <button className="counter-adj" onClick={() => onAdjustCounter(player.id, key, -1)} disabled={(player.counters?.[key] ?? 0) <= 0}>−</button>
                  <span className="extra-val">{player.counters?.[key] ?? 0}</span>
                  <button className="counter-adj" onClick={() => onAdjustCounter(player.id, key, 1)}>+</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Token Tray */}
        {activeWidgets.includes('tokens') && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Token Tray</span>
              <div className="widget-header-actions">
                <button className="widget-action-btn" onClick={() => setTokenPickerOpen(true)}>+ Add</button>
                <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'tokens')}>✕</button>
              </div>
            </div>
            {visibleTokens.length === 0 && (
              <p className="widget-empty">Tap "+ Add" to choose token types.</p>
            )}
            {visibleTokens.length > 0 && (
              <div className="tokens-grid">
                {visibleTokens.map(({ key, label }) => {
                  const count = player.tokens?.[key] ?? 0
                  return (
                    <div key={key} className="token-item">
                      <span className="token-label">{label}</span>
                      <div className="token-controls">
                        <button className="counter-adj" onClick={() => onAdjustCounter(player.id, `token_${key}`, -1)} disabled={count <= 0}>−</button>
                        <span className="extra-val">{count}</span>
                        <button className="counter-adj" onClick={() => onAdjustCounter(player.id, `token_${key}`, 1)}>+</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Commander Tax */}
        {activeWidgets.includes('cmdtax') && isCommander && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Commander Tax — {commanderTax > 0 ? `+${commanderTax}` : 'None'}</span>
              <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'cmdtax')}>✕</button>
            </div>
            <div className="counter-row">
              <button className="counter-adj" onClick={() => onAdjustCounter(player.id, 'commanderCasts', -1)} disabled={(player.commanderCasts ?? 0) <= 0}>−</button>
              <span className="extra-val">{player.commanderCasts ?? 0} cast{(player.commanderCasts ?? 0) !== 1 ? 's' : ''}</span>
              <button className="counter-adj" onClick={() => onAdjustCounter(player.id, 'commanderCasts', 1)}>+</button>
            </div>
          </div>
        )}

        {/* Commander Damage */}
        {activeWidgets.includes('cmddmg') && isCommander && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Commander Damage</span>
              <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'cmddmg')}>✕</button>
            </div>
            <div className="cmd-dmg-list">
              {opponents.map(op => {
                const dmg = player.commanderDamage?.[op.id] ?? 0
                return (
                  <div key={op.id} className="cmd-dmg-row">
                    <span className="cmd-dot" style={{ background: op.color }} />
                    <span className="cmd-name">{op.name}</span>
                    <button className="cmd-adj" onClick={() => onAdjustCommanderDamage(player.id, op.id, -1)} disabled={dmg <= 0}>−</button>
                    <span className={`cmd-val ${dmg >= 21 ? 'lethal' : ''}`}>{dmg}</span>
                    <button className="cmd-adj" onClick={() => onAdjustCommanderDamage(player.id, op.id, 1)}>+</button>
                  </div>
                )
              })}
              {opponents.length === 0 && <p className="widget-empty">No opponents to track.</p>}
            </div>
          </div>
        )}

        {/* Emblems & Status */}
        {activeWidgets.includes('emblems') && (
          <div className="widget-block">
            <div className="widget-header">
              <span className="widget-label">Emblems & Status</span>
              <div className="widget-header-actions">
                <button className="widget-action-btn" onClick={() => setEmblemPickerOpen(true)}>+ Add</button>
                <button className="widget-remove" onClick={() => onToggleWidget(player.id, 'emblems')}>✕</button>
              </div>
            </div>
            {activeEmblems.length === 0 && (
              <p className="widget-empty">Tap "+ Add" to track emblems and statuses.</p>
            )}
            {activeEmblems.map(key => {
              const e = getEmblem(key)
              if (!e) return null
              return (
                <div key={key} className="emblem-card">
                  <div className="emblem-card-header">
                    <span className="emblem-icon">{e.icon ?? '★'}</span>
                    <span className="emblem-name">{e.label}</span>
                    <button className="widget-remove" onClick={() => onToggleEmblem(player.id, key)}>✕</button>
                  </div>
                  {/* Ring stage controls */}
                  {e.hasStage && (
                    <div className="emblem-stage-row">
                      <button className="counter-adj" onClick={() => onAdjustRingStage(player.id, -1)} disabled={ringStage <= 1}>−</button>
                      <span className="emblem-stage-label">Stage {ringStage}</span>
                      <button className="counter-adj" onClick={() => onAdjustRingStage(player.id, 1)} disabled={ringStage >= 4}>+</button>
                    </div>
                  )}
                  {/* Day/Night toggle */}
                  {e.hasToggle && (
                    <button className="emblem-toggle-btn" onClick={() => onToggleDayNight(player.id)}>
                      {dayNight === 'day' ? '☀ Day' : '🌙 Night'} — tap to toggle
                    </button>
                  )}
                  <p className="emblem-text">
                    {e.hasStage
                      ? e.stages[ringStage - 1]
                      : e.hasToggle
                        ? (dayNight === 'day' ? e.textA : e.textB)
                        : e.text
                    }
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* FAB */}
        <button
          className="fab"
          onClick={() => !isEliminated && setFabOpen(true)}
          disabled={isEliminated}
          aria-label="Add features"
        >
          +
        </button>
      </div>

      {/* FAB widget picker */}
      {fabOpen && (
        <div className="sheet-overlay" onClick={e => e.target === e.currentTarget && setFabOpen(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title" style={{ color: player.color }}>{player.name}</span>
              <button className="sheet-close" onClick={() => setFabOpen(false)}>✕</button>
            </div>
            <div className="widget-picker">
              {/* Custom adjust action */}
              <button
                className="widget-pick-btn action"
                onClick={() => { setCustomOpen(v => !v); setFabOpen(false) }}
              >
                <span>✏ Custom Adjust</span>
                <span className="wpick-badge">{customOpen ? 'Hide' : 'Open'}</span>
              </button>

              {/* Tokens — special: opens picker */}
              <button
                className={`widget-pick-btn ${activeWidgets.includes('tokens') ? 'active' : ''}`}
                onClick={openTokenPicker}
              >
                <span>🎭 Tokens</span>
                <span className="wpick-badge">
                  {activeWidgets.includes('tokens') ? `${selectedTokens.length} types ✓` : 'Add to card'}
                </span>
              </button>

              {/* Emblems — special: opens picker */}
              <button
                className={`widget-pick-btn ${activeWidgets.includes('emblems') ? 'active' : ''}`}
                onClick={openEmblemPicker}
              >
                <span>★ Emblems & Status</span>
                <span className="wpick-badge">
                  {activeWidgets.includes('emblems') ? `${activeEmblems.length} active ✓` : 'Add to card'}
                </span>
              </button>

              {/* Simple toggle widgets */}
              {PERSISTENT_WIDGETS
                .filter(w => w.key !== 'tokens' && w.key !== 'emblems')
                .filter(w => !w.commanderOnly || isCommander)
                .map(w => {
                  const active = activeWidgets.includes(w.key)
                  return (
                    <button
                      key={w.key}
                      className={`widget-pick-btn ${active ? 'active' : ''}`}
                      onClick={() => { onToggleWidget(player.id, w.key); setFabOpen(false) }}
                    >
                      <span>{w.label}</span>
                      <span className="wpick-badge">{active ? 'On card ✓' : 'Add to card'}</span>
                    </button>
                  )
                })}
            </div>
          </div>
        </div>
      )}

      {/* Token type picker */}
      {tokenPickerOpen && (
        <div className="sheet-overlay" onClick={e => e.target === e.currentTarget && setTokenPickerOpen(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title">Choose Token Types</span>
              <button className="sheet-close" onClick={() => setTokenPickerOpen(false)}>✕</button>
            </div>
            <div className="token-picker-grid">
              {ALL_TOKENS.map(({ key, label }) => {
                const selected = selectedTokens.includes(key)
                return (
                  <button
                    key={key}
                    className={`token-pick-btn ${selected ? 'active' : ''}`}
                    onClick={() => onToggleSelectedToken(player.id, key)}
                  >
                    {label}
                    {selected && <span className="token-check">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Emblem / Status picker */}
      {emblemPickerOpen && (
        <div className="sheet-overlay" onClick={e => e.target === e.currentTarget && setEmblemPickerOpen(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title">Emblems & Status</span>
              <button className="sheet-close" onClick={() => setEmblemPickerOpen(false)}>✕</button>
            </div>
            <div className="widget-picker">
              <div className="picker-section-label">Game Statuses</div>
              {STATUS_EMBLEMS.map(e => {
                const active = activeEmblems.includes(e.key)
                return (
                  <button
                    key={e.key}
                    className={`widget-pick-btn ${active ? 'active' : ''}`}
                    onClick={() => onToggleEmblem(player.id, e.key)}
                  >
                    <span>{e.icon} {e.label}</span>
                    <span className="wpick-badge">{active ? 'Active ✓' : 'Add'}</span>
                  </button>
                )
              })}
              <div className="picker-section-label">Planeswalker Emblems</div>
              {PW_EMBLEMS.map(e => {
                const active = activeEmblems.includes(e.key)
                return (
                  <button
                    key={e.key}
                    className={`widget-pick-btn ${active ? 'active' : ''}`}
                    onClick={() => onToggleEmblem(player.id, e.key)}
                  >
                    <span>{e.label}</span>
                    <span className="wpick-badge">{active ? 'Active ✓' : 'Add'}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

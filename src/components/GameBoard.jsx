import { useState, useCallback, useEffect } from 'react'
import PlayerCard from './PlayerCard'
import DiceRoller from './DiceRoller'
import DungeonTracker from './DungeonTracker'
import CardLookup from './CardLookup'
import Planechase from './Planechase'
import { useWakeLock } from '../hooks/useWakeLock'
import './GameBoard.css'

function initPlayers(config) {
  return config.players.map(p => ({
    ...p,
    life: config.format.startingLife,
    commanderDamage: config.format.id === 'commander'
      ? Object.fromEntries(config.players.filter(op => op.id !== p.id).map(op => [op.id, 0]))
      : null,
    poison: 0,
    commanderCasts: 0,
    counters: { experience: 0, energy: 0, plusone: 0 },
    tokens: {},
    lifeLog: [],
    eliminated: false,
    activeWidgets: [],
    selectedTokens: [],
    activeEmblems: [],
    ringStage: 1,
    dayNightState: 'day',
  }))
}

const TOOLS = ['dice', 'cards', 'dungeons', 'planechase']
const TOOL_LABELS = { dice: 'Dice & Coins', cards: 'Card Lookup', dungeons: 'Dungeons', planechase: 'Planechase' }

export default function GameBoard({ config, onEndGame }) {
  const [players, setPlayers] = useState(() => initPlayers(config))
  const [undoStack, setUndoStack] = useState([])
  const [turnIndex, setTurnIndex] = useState(0)
  const [turnNumber, setTurnNumber] = useState(1)
  const [storm, setStorm] = useState(0)
  const [monarchId, setMonarchId] = useState(null)
  const [initiativeId, setInitiativeId] = useState(null)
  const [showEndModal, setShowEndModal] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [notes, setNotes] = useState('')
  const [activeTool, setActiveTool] = useState(null)
  const [focusMode, setFocusMode] = useState(false)
  const { active: wakeLockActive, toggle: toggleWakeLock, supported: wakeLockSupported } = useWakeLock()

  const isCommander = config.format.id === 'commander'
  const activePlayers = players.filter(p => !p.eliminated)
  const activePlayer = players[turnIndex] ?? activePlayers[0]

  // Auto-detect winner
  useEffect(() => {
    if (activePlayers.length === 1 && !selectedWinner) {
      setSelectedWinner(activePlayers[0].id)
    }
  }, [activePlayers.length])

  function snapshot() {
    return JSON.parse(JSON.stringify(players))
  }

  function pushUndo() {
    setUndoStack(prev => [snapshot(), ...prev.slice(0, 9)])
  }

  function undo() {
    if (undoStack.length === 0) return
    setPlayers(undoStack[0])
    setUndoStack(prev => prev.slice(1))
  }

  function nextTurn() {
    let next = (turnIndex + 1) % players.length
    let loops = 0
    while (players[next]?.eliminated && loops < players.length) {
      next = (next + 1) % players.length
      loops++
    }
    if (next <= turnIndex) setTurnNumber(n => n + 1)
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
    pushUndo()
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, life: p.life + delta, lifeLog: [{ delta, ts: Date.now() }, ...(p.lifeLog ?? []).slice(0, 9)] }
        : p
    ))
  }, [undoStack])

  const adjustPoison = useCallback((playerId, delta) => {
    pushUndo()
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, poison: Math.max(0, Math.min(10, (p.poison ?? 0) + delta)) }
        : p
    ))
  }, [undoStack])

  const adjustCounter = useCallback((playerId, key, delta) => {
    pushUndo()
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      if (key === 'commanderCasts') {
        return { ...p, commanderCasts: Math.max(0, (p.commanderCasts ?? 0) + delta) }
      }
      if (key.startsWith('token_')) {
        const tkey = key.slice(6)
        return { ...p, tokens: { ...p.tokens, [tkey]: Math.max(0, (p.tokens?.[tkey] ?? 0) + delta) } }
      }
      return { ...p, counters: { ...p.counters, [key]: Math.max(0, (p.counters?.[key] ?? 0) + delta) } }
    }))
  }, [undoStack])

  const adjustCommanderDamage = useCallback((playerId, fromId, delta) => {
    pushUndo()
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const newDmg = Math.max(0, (p.commanderDamage[fromId] ?? 0) + delta)
      return {
        ...p,
        life: p.life - delta,
        lifeLog: [{ delta: -delta, ts: Date.now() }, ...(p.lifeLog ?? []).slice(0, 9)],
        commanderDamage: { ...p.commanderDamage, [fromId]: newDmg },
      }
    }))
  }, [undoStack])

  const toggleEliminated = useCallback((playerId) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId ? { ...p, eliminated: !p.eliminated } : p
    ))
  }, [])

  function toggleWidget(playerId, widgetKey) {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const current = p.activeWidgets ?? []
      const next = current.includes(widgetKey)
        ? current.filter(k => k !== widgetKey)
        : [...current, widgetKey]
      return { ...p, activeWidgets: next }
    }))
  }

  function toggleSelectedToken(playerId, tokenKey) {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const current = p.selectedTokens ?? []
      const next = current.includes(tokenKey)
        ? current.filter(k => k !== tokenKey)
        : [...current, tokenKey]
      return { ...p, selectedTokens: next }
    }))
  }

  function toggleEmblem(playerId, emblemKey) {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p
      const current = p.activeEmblems ?? []
      const next = current.includes(emblemKey)
        ? current.filter(k => k !== emblemKey)
        : [...current, emblemKey]
      return { ...p, activeEmblems: next }
    }))
  }

  function adjustRingStage(playerId, delta) {
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, ringStage: Math.min(4, Math.max(1, (p.ringStage ?? 1) + delta)) }
        : p
    ))
  }

  function toggleDayNight(playerId) {
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, dayNightState: p.dayNightState === 'day' ? 'night' : 'day' }
        : p
    ))
  }

  function giveMonarch(playerId) {
    setMonarchId(prev => prev === playerId ? null : playerId)
  }

  function giveInitiative(playerId) {
    setInitiativeId(prev => prev === playerId ? null : playerId)
  }

  function resetGame() {
    setPlayers(initPlayers(config))
    setUndoStack([])
    setTurnIndex(0)
    setTurnNumber(1)
    setStorm(0)
    setMonarchId(null)
    setInitiativeId(null)
    setSelectedWinner(null)
  }

  function handleEndGame() {
    onEndGame(players, selectedWinner, notes)
  }

  const playerCardProps = (player) => ({
    player,
    allPlayers: players,
    isCommander,
    isActiveTurn: player.id === activePlayer?.id && !player.eliminated,
    isMonarch: monarchId === player.id,
    hasInitiative: initiativeId === player.id,
    onAdjustLife: adjustLife,
    onAdjustPoison: adjustPoison,
    onAdjustCounter: adjustCounter,
    onAdjustCommanderDamage: adjustCommanderDamage,
    onToggleEliminated: toggleEliminated,
    onGiveMonarch: giveMonarch,
    onGiveInitiative: giveInitiative,
    onToggleWidget: toggleWidget,
    onToggleSelectedToken: toggleSelectedToken,
    onToggleEmblem: toggleEmblem,
    onAdjustRingStage: adjustRingStage,
    onToggleDayNight: toggleDayNight,
  })

  // ── Focus mode ─────────────────────────────────────────────────────────────
  if (focusMode) {
    return (
      <div className="focus-mode">
        {/* Slim top bar */}
        <div className="focus-topbar">
          <button className="focus-exit" onClick={() => setFocusMode(false)}>← All Players</button>
          <div className="focus-turn-info">
            <span className="turn-label">Turn {turnNumber}</span>
            <span className="turn-player" style={{ color: activePlayer?.color }}>{activePlayer?.name}</span>
          </div>
          <div className="focus-storm">
            <span className="storm-label">Storm</span>
            <button className="storm-adj" onClick={() => setStorm(s => Math.max(0, s - 1))} disabled={storm === 0}>−</button>
            <span className="storm-count">{storm}</span>
            <button className="storm-adj" onClick={() => setStorm(s => s + 1)}>+</button>
          </div>
        </div>

        {/* Focused player card */}
        <div className="focus-card-wrap">
          {activePlayer && <PlayerCard {...playerCardProps(activePlayer)} focusMode />}
        </div>

        {/* Thumbnail strip of other players */}
        <div className="focus-strip">
          {players.filter(p => p.id !== activePlayer?.id).map(p => (
            <div
              key={p.id}
              className={`focus-thumb ${p.eliminated ? 'elim' : ''}`}
              style={{ '--player-color': p.color, '--art-url': p.commanderArt ? `url(${p.commanderArt})` : 'none' }}
            >
              {p.commanderArt && <div className="thumb-art" />}
              <span className="thumb-name" style={{ color: p.color }}>{p.name}</span>
              <span className={`thumb-life ${p.life <= 0 ? 'dead' : ''}`}>{p.life}</span>
              {p.poison > 0 && <span className="thumb-poison">☠ {p.poison}</span>}
            </div>
          ))}
        </div>

        {/* Next turn button */}
        <button className="focus-next-turn" onClick={nextTurn}>
          End {activePlayer?.name}'s Turn ▶
        </button>

        {activePlayers.length === 1 && (
          <div className="winner-banner">{activePlayers[0].name} wins!</div>
        )}
      </div>
    )
  }

  // ── Normal mode ────────────────────────────────────────────────────────────
  return (
    <div className="board">
      {/* Turn bar */}
      <div className="turn-bar">
        <button className="turn-nav" onClick={prevTurn} aria-label="Previous turn">◀</button>
        <div className="turn-info">
          <span className="turn-label">Turn {turnNumber}</span>
          <span className="turn-player" style={{ color: activePlayer?.color }}>
            {activePlayer?.name ?? '—'}
          </span>
        </div>
        <button className="turn-nav next-turn" onClick={nextTurn}>
          Next Turn ▶
        </button>
      </div>

      {/* Toolbar */}
      <div className="board-toolbar">
        <div className="storm-wrap">
          <span className="storm-label">Storm</span>
          <button className="storm-adj" onClick={() => setStorm(s => Math.max(0, s - 1))} disabled={storm === 0}>−</button>
          <span className="storm-count">{storm}</span>
          <button className="storm-adj" onClick={() => setStorm(s => s + 1)}>+</button>
        </div>

        <div className="board-actions">
          <button
            className={`btn-secondary ${focusMode ? 'active' : ''}`}
            onClick={() => setFocusMode(true)}
            title="Focus mode"
          >
            Focus
          </button>
          {wakeLockSupported && (
            <button
              className={`btn-icon ${wakeLockActive ? 'active' : ''}`}
              onClick={toggleWakeLock}
              title={wakeLockActive ? 'Screen lock: OFF' : 'Screen lock: ON'}
            >
              {wakeLockActive ? '🔆' : '🔅'}
            </button>
          )}
          <button className="btn-secondary" onClick={undo} disabled={undoStack.length === 0} title="Undo">
            ↩ Undo
          </button>
          <button className="btn-secondary" onClick={resetGame}>Reset</button>
          <button className="btn-danger" onClick={() => setShowEndModal(true)}>End Game</button>
        </div>
      </div>

      {/* Tools tabs */}
      <div className="tools-tabs">
        {TOOLS.map(tool => (
          <button
            key={tool}
            className={`tool-tab ${activeTool === tool ? 'active' : ''}`}
            onClick={() => setActiveTool(prev => prev === tool ? null : tool)}
          >
            {TOOL_LABELS[tool]}
          </button>
        ))}
      </div>

      {activeTool && (
        <div className="tools-panel">
          {activeTool === 'dice' && <DiceRoller />}
          {activeTool === 'cards' && <CardLookup />}
          {activeTool === 'dungeons' && <DungeonTracker players={players} />}
          {activeTool === 'planechase' && <Planechase />}
        </div>
      )}

      {/* Player grid */}
      <div className={`player-grid players-${players.length}`}>
        {players.map(player => (
          <PlayerCard key={player.id} {...playerCardProps(player)} />
        ))}
      </div>

      {activePlayers.length === 1 && (
        <div className="winner-banner">
          {activePlayers[0].name} wins!
        </div>
      )}

      {/* End game modal */}
      {showEndModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowEndModal(false)}>
          <div className="modal end-modal">
            <h3>End Game</h3>

            <div className="modal-section">
              <label className="modal-label">Who won? <span>(optional)</span></label>
              <div className="winner-picker">
                <button
                  className={`winner-btn ${selectedWinner === null ? 'selected' : ''}`}
                  onClick={() => setSelectedWinner(null)}
                >
                  No winner / Draw
                </button>
                {players.map(p => (
                  <button
                    key={p.id}
                    className={`winner-btn ${selectedWinner === p.id ? 'selected' : ''}`}
                    style={selectedWinner === p.id ? { borderColor: p.color, background: `${p.color}22` } : {}}
                    onClick={() => setSelectedWinner(p.id)}
                  >
                    <span className="winner-dot" style={{ background: p.color }} />
                    {p.name}
                    {p.eliminated ? ' (out)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <label className="modal-label">Notes <span>(optional)</span></label>
              <textarea
                className="notes-input"
                placeholder="Add notes about this game..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowEndModal(false)}>Cancel</button>
              <button className="btn-accent" onClick={handleEndGame}>Save & End</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

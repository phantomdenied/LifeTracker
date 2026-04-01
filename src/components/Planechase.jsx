import { useState, useCallback } from 'react'
import { PLANES, PLANES_ONLY, PHENOMENA, SET_LABELS } from '../data/planes.js'
import './Planechase.css'

// Planar die faces: blank(×3), chaos(×1), planeswalk(×1), blank(×1)
const DIE_FACES = ['blank', 'blank', 'blank', 'planeswalk', 'chaos', 'blank']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Planechase() {
  const [deck, setDeck] = useState(() => shuffle(PLANES))
  const [deckIndex, setDeckIndex] = useState(0)
  const [history, setHistory] = useState([])
  const [dieResult, setDieResult] = useState(null)
  const [rolling, setRolling] = useState(false)
  const [chaosTriggers, setChaosTriggers] = useState(0)
  const [counters, setCounters] = useState({}) // planeId → count
  const [filterSet, setFilterSet] = useState('all')
  const [showDeckConfig, setShowDeckConfig] = useState(false)
  const [customPool, setCustomPool] = useState(null) // null = use all
  const [includePhenomena, setIncludePhenomena] = useState(true)

  const currentPlane = deck[deckIndex] ?? null
  const isCurrentPhenomenon = currentPlane?.type === 'phenomenon'
  const currentCounters = counters[currentPlane?.id] ?? 0

  function buildDeck(pool) {
    const d = shuffle(pool ?? PLANES)
    setDeck(d)
    setDeckIndex(0)
    setHistory([])
    setCounters({})
    setDieResult(null)
    setChaosTriggers(0)
  }

  function rollDie() {
    setRolling(true)
    setDieResult(null)
    setTimeout(() => {
      const face = DIE_FACES[Math.floor(Math.random() * DIE_FACES.length)]
      setDieResult(face)
      if (face === 'planeswalk') {
        planeswalk()
      } else if (face === 'chaos') {
        setChaosTriggers(n => n + 1)
      }
      setRolling(false)
    }, 350)
  }

  function planeswalk(targetIndex = null) {
    const next = targetIndex ?? (deckIndex + 1) % deck.length
    setHistory(h => [currentPlane, ...h].slice(0, 20))
    setDeckIndex(next)
    setChaosTriggers(0)
    setDieResult(null)
  }

  function planewalkBack() {
    if (history.length === 0) return
    const prev = history[0]
    const idx = deck.findIndex(p => p.id === prev.id)
    if (idx !== -1) setDeckIndex(idx)
    setHistory(h => h.slice(1))
    setChaosTriggers(0)
  }

  function adjustCounter(delta) {
    if (!currentPlane) return
    setCounters(c => ({
      ...c,
      [currentPlane.id]: Math.max(0, (c[currentPlane.id] ?? 0) + delta),
    }))
  }

  function applyConfig() {
    let pool = PLANES_ONLY
    if (filterSet !== 'all') pool = pool.filter(p => p.set === filterSet)
    if (includePhenomena) pool = [...pool, ...PHENOMENA.filter(p => filterSet === 'all' || p.set === filterSet)]
    buildDeck(pool.length > 0 ? pool : PLANES)
    setShowDeckConfig(false)
  }

  const SET_KEYS = ['all', 'PC1', 'PC2', 'CLB']

  return (
    <div className="planechase">
      {/* Current plane */}
      {currentPlane ? (
        <div className={`plane-card ${isCurrentPhenomenon ? 'phenomenon' : ''}`}>
          <div className="plane-header">
            <div className="plane-title-block">
              <span className={`plane-type-badge ${isCurrentPhenomenon ? 'phen' : ''}`}>
                {isCurrentPhenomenon ? 'Phenomenon' : 'Plane'}
              </span>
              {currentPlane.world && (
                <span className="plane-world">{currentPlane.world}</span>
              )}
            </div>
            <span className="plane-set">{SET_LABELS[currentPlane.set] ?? currentPlane.set}</span>
          </div>

          <h2 className="plane-name">{currentPlane.name}</h2>

          <div className="plane-text static-text">
            {currentPlane.static}
          </div>

          {currentPlane.chaos && (
            <div className="plane-text chaos-text">
              <span className="chaos-icon">✦ Chaos:</span> {currentPlane.chaos}
            </div>
          )}

          {isCurrentPhenomenon && (
            <div className="phen-note">Encounter effect applied — planeswalk immediately.</div>
          )}

          {/* Plane counters (for planes that use them like Aretopolis, Kilnspire, Naar Isle, Mechanus) */}
          {['aretopolis', 'kilnspire', 'naar-isle', 'mechanus'].includes(currentPlane.id) && (
            <div className="plane-counters">
              <span className="counter-label" style={{ color: 'var(--accent-hover)' }}>Counters</span>
              <button className="counter-adj" onClick={() => adjustCounter(-1)} disabled={currentCounters <= 0}>−</button>
              <span className="extra-val">{currentCounters}</span>
              <button className="counter-adj" onClick={() => adjustCounter(1)}>+</button>
            </div>
          )}

          {chaosTriggers > 0 && (
            <div className="chaos-triggered">
              ✦ Chaos triggered {chaosTriggers > 1 ? `×${chaosTriggers}` : ''}!
            </div>
          )}
        </div>
      ) : (
        <div className="plane-card empty">No planes in deck.</div>
      )}

      {/* Die result */}
      {dieResult && (
        <div className={`die-result die-${dieResult}`}>
          {dieResult === 'planeswalk' && '🌀 Planeswalk!'}
          {dieResult === 'chaos'      && '✦ Chaos!'}
          {dieResult === 'blank'      && 'No effect'}
        </div>
      )}

      {/* Controls */}
      <div className="plane-controls">
        <button className="plane-btn secondary" onClick={planewalkBack} disabled={history.length === 0}>
          ← Back
        </button>
        <button
          className={`plane-btn die-btn-big ${rolling ? 'rolling' : ''}`}
          onClick={rollDie}
          disabled={rolling}
        >
          {rolling ? '…' : 'Roll Planar Die'}
        </button>
        <button className="plane-btn primary" onClick={() => planeswalk()}>
          Planeswalk →
        </button>
      </div>

      <div className="plane-controls secondary-row">
        <button className="plane-btn small" onClick={() => setShowDeckConfig(v => !v)}>
          ⚙ Deck ({deck.length})
        </button>
        <span className="plane-progress">
          Plane {deckIndex + 1} / {deck.length}
        </span>
        <button className="plane-btn small danger" onClick={() => buildDeck()}>
          Reshuffle
        </button>
      </div>

      {/* Deck config */}
      {showDeckConfig && (
        <div className="deck-config">
          <div className="deck-config-section">
            <span className="config-label">Set Filter</span>
            <div className="filter-buttons">
              {SET_KEYS.map(k => (
                <button
                  key={k}
                  className={`filter-btn ${filterSet === k ? 'active' : ''}`}
                  onClick={() => setFilterSet(k)}
                >
                  {k === 'all' ? 'All Sets' : SET_LABELS[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="deck-config-section">
            <label className="config-toggle">
              <input
                type="checkbox"
                checked={includePhenomena}
                onChange={e => setIncludePhenomena(e.target.checked)}
              />
              Include Phenomena
            </label>
          </div>
          <button className="plane-btn primary" onClick={applyConfig}>
            Apply & Reshuffle
          </button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="plane-history">
          <span className="history-label">Previously visited</span>
          <div className="history-chips">
            {history.slice(0, 6).map((p, i) => (
              <span key={i} className={`history-chip ${p.type === 'phenomenon' ? 'phen' : ''}`}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

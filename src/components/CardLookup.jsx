import { useState, useEffect, useRef, useCallback } from 'react'
import './CardLookup.css'

function debounce(fn, ms) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

export default function CardLookup() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCard, setShowCard] = useState(false)

  const fetchSuggestions = useCallback(
    debounce(async (q) => {
      if (q.length < 2) { setSuggestions([]); return }
      try {
        const res = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setSuggestions(data.data?.slice(0, 8) ?? [])
      } catch {
        setSuggestions([])
      }
    }, 280),
    []
  )

  useEffect(() => {
    fetchSuggestions(query)
  }, [query, fetchSuggestions])

  async function fetchCard(name) {
    setLoading(true)
    setError(null)
    setSuggestions([])
    setQuery(name)
    try {
      const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`)
      if (!res.ok) throw new Error('Card not found')
      const data = await res.json()
      setCard(data)
      setShowCard(true)
    } catch (e) {
      setError(e.message)
      setCard(null)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) fetchCard(query.trim())
    if (e.key === 'Escape') { setSuggestions([]); setShowCard(false) }
  }

  const imageUrl = card
    ? (card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal)
    : null

  const backUrl = card?.card_faces?.[1]?.image_uris?.normal ?? null

  return (
    <div className="card-lookup">
      <div className="lookup-search">
        <input
          type="text"
          className="lookup-input"
          placeholder="Search cards..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          className="lookup-btn"
          onClick={() => query.trim() && fetchCard(query.trim())}
          disabled={loading || !query.trim()}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(s => (
            <button key={s} className="suggestion" onClick={() => fetchCard(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {error && <p className="lookup-error">{error}</p>}

      {showCard && card && (
        <div className="card-result">
          <div className="card-images">
            {imageUrl && (
              <img
                className="card-img"
                src={imageUrl}
                alt={card.name}
                loading="lazy"
              />
            )}
            {backUrl && (
              <img
                className="card-img"
                src={backUrl}
                alt={`${card.name} (back)`}
                loading="lazy"
              />
            )}
          </div>
          <div className="card-meta">
            <div className="card-meta-row">
              <span className="card-name">{card.name}</span>
              {card.mana_cost && <span className="card-mana">{card.mana_cost}</span>}
            </div>
            {card.type_line && <div className="card-type">{card.type_line}</div>}
            {card.oracle_text && <div className="card-text">{card.oracle_text}</div>}
            {card.power && <div className="card-pt">{card.power}/{card.toughness}</div>}
            {card.prices?.usd && (
              <div className="card-price">${card.prices.usd} <span>({card.prices.usd_foil ? `$${card.prices.usd_foil} foil` : 'no foil data'})</span></div>
            )}
          </div>
          <button className="card-close" onClick={() => setShowCard(false)}>✕ Close</button>
        </div>
      )}
    </div>
  )
}

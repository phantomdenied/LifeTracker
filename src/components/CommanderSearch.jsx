import { useState, useEffect, useCallback, useRef } from ‘react’
import ‘./CommanderSearch.css’

function debounce(fn, ms) {
let t
return (…args) => { clearTimeout(t); t = setTimeout(() => fn(…args), ms) }
}

export default function CommanderSearch({ value, artUrl, onSelect, onClear }) {
const [query, setQuery] = useState(value ?? ‘’)
const [suggestions, setSuggestions] = useState([])
const [loading, setLoading] = useState(false)
const [open, setOpen] = useState(false)
const wrapRef = useRef(null)

const fetchSuggestions = useCallback(
debounce(async (q) => {
if (q.length < 2) { setSuggestions([]); return }
try {
const res = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(q)}`)
const data = await res.json()
setSuggestions(data.data?.slice(0, 6) ?? [])
setOpen(true)
} catch {
setSuggestions([])
}
}, 300),
[]
)

useEffect(() => {
if (query !== value) fetchSuggestions(query)
}, [query])

// Close on outside click
useEffect(() => {
function handler(e) {
if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
}
document.addEventListener(‘mousedown’, handler)
document.addEventListener(‘touchstart’, handler)
return () => {
document.removeEventListener(‘mousedown’, handler)
document.removeEventListener(‘touchstart’, handler)
}
}, [])

async function selectCard(name) {
setQuery(name)
setSuggestions([])
setOpen(false)
setLoading(true)
try {
const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`)
if (!res.ok) throw new Error()
const card = await res.json()
const art =
card.image_uris?.art_crop ??
card.card_faces?.[0]?.image_uris?.art_crop ??
card.image_uris?.normal ??
card.card_faces?.[0]?.image_uris?.normal ??
null
onSelect(name, art)
} catch {
onSelect(name, null)
} finally {
setLoading(false)
}
}

function handleClear() {
setQuery(’’)
setSuggestions([])
onClear()
}

function handleSuggestionTouch(e, name) {
// Prevent the touch from propagating to anything underneath (e.g. Start Game)
e.preventDefault()
e.stopPropagation()
selectCard(name)
}

return (
<div className="cmd-search" ref={wrapRef}>
<div className="cmd-search-row">
{artUrl && (
<div className=“cmd-art-thumb” style={{ backgroundImage: `url(${artUrl})` }} />
)}
<input
className=“cmd-input”
type=“text”
placeholder=“Commander name…”
value={query}
onChange={e => setQuery(e.target.value)}
onFocus={() => suggestions.length > 0 && setOpen(true)}
autoComplete=“off”
autoCorrect=“off”
spellCheck={false}
/>
{loading && <span className="cmd-loading">…</span>}
{(value || artUrl) && !loading && (
<button className="cmd-clear" onClick={handleClear} title="Clear commander">✕</button>
)}
</div>

```
  {open && suggestions.length > 0 && (
    <div className="cmd-suggestions">
      {suggestions.map(s => (
        <button
          key={s}
          className="cmd-suggestion"
          onMouseDown={e => { e.preventDefault(); selectCard(s) }}
          onTouchEnd={e => handleSuggestionTouch(e, s)}
        >
          {s}
        </button>
      ))}
    </div>
  )}

  {artUrl && (
    <div className="cmd-art-preview" style={{ backgroundImage: `url(${artUrl})` }}>
      <span className="cmd-art-name">{value}</span>
    </div>
  )}
</div>
```

)
}

const KEY = 'mtg-life-tracker-history'

export function saveGame(game) {
  const history = loadHistory()
  history.unshift({ ...game, id: Date.now() })
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 50)))
}

export function updateGameNotes(id, notes) {
  const history = loadHistory()
  const updated = history.map(g => g.id === id ? { ...g, notes } : g)
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}

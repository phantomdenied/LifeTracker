const KEY = 'mtg-life-tracker-history'

export function saveGame(game) {
  const history = loadHistory()
  history.unshift({ ...game, id: Date.now() })
  // Keep last 50 games
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 50)))
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

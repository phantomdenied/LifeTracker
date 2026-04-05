// Example: keep one copy of each plane/phenomenon across selected sets
export function dedupeByCanonId(cards) {
  return Array.from(
    new Map(cards.map(card => [card.canonId ?? card.id, card])).values()
  )
}

// Example usage:
// const selectedCards = PLANES.filter(card => selectedSets.includes(card.set))
// const deck = dedupeByCanonId(selectedCards)

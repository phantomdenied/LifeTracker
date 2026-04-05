import { useState, useEffect } from 'react'
import './DungeonTracker.css'

const DUNGEONS = [
  {
    id: 'mad-mage',
    name: 'Dungeon of the Mad Mage',
    scryfallUrl: 'https://api.scryfall.com/cards/tafr/20', scryfallSet: 'tafr',
    startRoom: 'yawning-portal',
    rooms: {
      'yawning-portal':    { name: 'Yawning Portal',     effect: 'You gain 1 life',                                                              next: ['dungeon-level'] },
      'dungeon-level':     { name: 'Dungeon Level',      effect: 'Scry 1',                                                                       next: ['goblin-bazaar', 'twisted-caverns'] },
      'goblin-bazaar':     { name: 'Goblin Bazaar',      effect: 'Create a Treasure token',                                                      next: ['lost-level'] },
      'twisted-caverns':   { name: 'Twisted Caverns',    effect: 'Target creature cannot attack until your next turn',                           next: ['lost-level'] },
      'lost-level':        { name: 'Lost Level',         effect: 'Scry 2',                                                                       next: ['runestone-caverns', 'muirals-graveyard'] },
      'runestone-caverns': { name: 'Runestone Caverns',  effect: 'Exile the top two cards of your library. You may play them',                   next: ['deep-mines'] },
      'muirals-graveyard': { name: "Muiral's Graveyard", effect: 'Create two 1/1 black Skeleton creature tokens',                               next: ['deep-mines'] },
      'deep-mines':        { name: 'Deep Mines',         effect: 'Scry 3',                                                                       next: ['mad-wizards-lair'] },
      'mad-wizards-lair':  { name: "Mad Wizard's Lair",  effect: 'Draw three cards and reveal them. You may cast one without paying its mana cost', next: [] },
    },
  },
  {
    id: 'phandelver',
    name: 'Lost Mine of Phandelver',
    scryfallUrl: 'https://api.scryfall.com/cards/tafr/21', scryfallSet: 'tafr',
    startRoom: 'cave-entrance',
    rooms: {
      'cave-entrance':       { name: 'Cave Entrance',       effect: 'Scry 1',                                             next: ['goblin-lair', 'mine-tunnels'] },
      'goblin-lair':         { name: 'Goblin Lair',         effect: 'Create a 1/1 red Goblin creature token',             next: ['storeroom', 'dark-pool'] },
      'mine-tunnels':        { name: 'Mine Tunnels',        effect: 'Create a Treasure token',                            next: ['dark-pool', 'fungi-cavern'] },
      'storeroom':           { name: 'Storeroom',           effect: 'Put a +1/+1 counter on target creature',             next: ['temple-of-dumathoin'] },
      'dark-pool':           { name: 'Dark Pool',           effect: 'Each opponent loses 1 life and you gain 1 life',     next: ['temple-of-dumathoin'] },
      'fungi-cavern':        { name: 'Fungi Cavern',        effect: 'Target creature gets -4/-0 until your next turn',    next: ['temple-of-dumathoin'] },
      'temple-of-dumathoin': { name: 'Temple of Dumathoin', effect: 'Draw a card',                                        next: [] },
    },
  },
  {
    id: 'undercity',
    name: 'The Undercity',
    scryfallUrl: 'https://api.scryfall.com/cards/tclb/20', scryfallSet: 'tclb',
    startRoom: 'secret-entrance',
    rooms: {
      'secret-entrance': { name: 'Secret Entrance',          effect: 'Search your library for a basic land card, reveal it, put it into your hand, then shuffle', next: ['forge', 'lost-well'] },
      'forge':           { name: 'Forge',                    effect: 'Put two +1/+1 counters on target creature',                                                 next: ['trap', 'arena'] },
      'lost-well':       { name: 'Lost Well',                effect: 'Scry 2',                                                                                    next: ['arena', 'stash'] },
      'trap':            { name: 'Trap!',                    effect: 'Target player loses 5 life',                                                                 next: ['archives'] },
      'arena':           { name: 'Arena',                    effect: 'Goad target creature',                                                                       next: ['archives', 'catacombs'] },
      'stash':           { name: 'Stash',                    effect: 'Create a Treasure token',                                                                    next: ['catacombs'] },
      'archives':        { name: 'Archives',                 effect: 'Draw a card',                                                                                next: ['throne'] },
      'catacombs':       { name: 'Catacombs',                effect: 'Create a 4/1 black Skeleton creature token with menace',                                    next: ['throne'] },
      'throne':          { name: 'Throne of the Dead Three', effect: 'Reveal top 10 cards. Put a creature card onto the battlefield with three +1/+1 counters. It gains hexproof until your next turn. Then shuffle.', next: [] },
    },
  },
]

const imgCache = {}

function useDungeonImage(apiUrl) {
  const [url, setUrl]         = useState(imgCache[apiUrl] ?? null)
  const [loading, setLoading] = useState(!imgCache[apiUrl])

  useEffect(() => {
    if (!apiUrl) return
    if (imgCache[apiUrl]) { setUrl(imgCache[apiUrl]); setLoading(false); return }
    setLoading(true)
    let cancelled = false
    fetch(apiUrl)
      .then(r => { if (r.ok) return r.json(); throw new Error() })
      .then(card => {
        const img =
          card.image_uris?.large ??
          card.image_uris?.normal ??
          card.card_faces?.[0]?.image_uris?.large ??
          card.card_faces?.[0]?.image_uris?.normal ??
          null
        if (!cancelled) { if (img) imgCache[apiUrl] = img; setUrl(img) }
      })
      .catch(() => { if (!cancelled) setUrl(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [apiUrl])

  return { url, loading }
}

function PlayerDungeon({ player }) {
  const [dungeonId, setDungeonId] = useState(DUNGEONS[0].id)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [visited, setVisited] = useState([])

  const dungeon = DUNGEONS.find(d => d.id === dungeonId)
  const room = currentRoom ? dungeon.rooms[currentRoom] : null
  const nextRooms = room ? room.next : []
  const completed = currentRoom && nextRooms.length === 0
  const { url: cardImg, loading: imgLoading } = useDungeonImage(dungeon.scryfallUrl)

  function changeDungeon(id) {
    setDungeonId(id)
    setCurrentRoom(null)
    setVisited([])
  }

  function venture(roomId) {
    setCurrentRoom(roomId)
    setVisited(v => [...v, roomId])
  }

  function reset() {
    setCurrentRoom(null)
    setVisited([])
  }

  return (
    <div className="player-dungeon" style={{ '--player-color': player.color }}>
      <div className="pd-header">
        <span className="pd-name" style={{ color: player.color }}>{player.name}</span>
        <select className="dungeon-select" value={dungeonId} onChange={e => changeDungeon(e.target.value)}>
          {DUNGEONS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      <div className="pd-body">
        <div className="dungeon-rooms">
          {!currentRoom && (
            <div className="dungeon-not-started">
              Not yet ventured -- tap Venture to begin
            </div>
          )}

          {visited.map((rid, i) => {
            const r = dungeon.rooms[rid]
            const isCurrent = rid === currentRoom
            return (
              <div
                key={rid + i}
                className={['room-btn', isCurrent ? 'current' : 'done'].filter(Boolean).join(' ')}
              >
                <div className="room-top">
                  <span className="room-marker">{isCurrent ? '>' : 'v'}</span>
                  <span className="room-name">{r.name}</span>
                </div>
                <div className="room-effect">{r.effect}</div>
              </div>
            )
          })}

          {!completed && nextRooms.length > 1 && (
            <div className="branch-prompt">
              <span className="branch-label">Choose your path:</span>
              <div className="branch-choices">
                {nextRooms.map(rid => {
                  const r = dungeon.rooms[rid]
                  return (
                    <button key={rid} className="branch-btn" onClick={() => venture(rid)}>
                      <span className="room-name">{r.name}</span>
                      <span className="room-effect">{r.effect}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="dungeon-card-col">
          <div className="dungeon-card-wrap">
            {imgLoading && <div className="dungeon-img-skeleton" />}
            {cardImg && !imgLoading && (
              <img className="dungeon-card-img" src={cardImg} alt={dungeon.name} loading="lazy" />
            )}
            {!imgLoading && !cardImg && (
              <div className="dungeon-img-fallback">{dungeon.name}</div>
            )}
          </div>
        </div>
      </div>

      {completed && <div className="dungeon-complete">Dungeon Complete!</div>}

      <div className="dungeon-actions">
        {!currentRoom && (
          <button className="dungeon-advance" onClick={() => venture(dungeon.startRoom)}>
            Venture
          </button>
        )}
        {!completed && currentRoom && nextRooms.length === 1 && (
          <button className="dungeon-advance" onClick={() => venture(nextRooms[0])}>
            Venture
          </button>
        )}
        {completed && (
          <button className="dungeon-advance" onClick={reset}>
            Venture Again
          </button>
        )}
        <button className="dungeon-reset" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default function DungeonTracker({ players }) {
  return (
    <div className="dungeon-tracker">
      {players.filter(p => !p.eliminated).map(p => (
        <PlayerDungeon key={p.id} player={p} />
      ))}
    </div>
  )
}

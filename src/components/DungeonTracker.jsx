import { useState, useEffect } from 'react'
import './DungeonTracker.css'

const DUNGEONS = [
  {
    id: 'mad-mage',
    name: 'Dungeon of the Mad Mage',
    scryfallUrl: 'https://api.scryfall.com/cards/tafr/20',
    startRoom: 'yawning-portal',
    rooms: {
      'yawning-portal':    { name: 'Yawning Portal', effect: 'You gain 1 life', next: ['dungeon-level'] },
      'dungeon-level':     { name: 'Dungeon Level', effect: 'Scry 1', next: ['goblin-bazaar', 'twisted-caverns'] },
      'goblin-bazaar':     { name: 'Goblin Bazaar', effect: 'Create a Treasure token', next: ['lost-level'] },
      'twisted-caverns':   { name: 'Twisted Caverns', effect: "Target creature can't attack until your next turn", next: ['lost-level'] },
      'lost-level':        { name: 'Lost Level', effect: 'Scry 2', next: ['runestone-caverns', 'muirals-graveyard'] },
      'runestone-caverns': { name: 'Runestone Caverns', effect: 'Exile the top two cards of your library. You may play them', next: ['deep-mines'] },
      'muirals-graveyard': { name: "Muiral's Graveyard", effect: 'Create two 1/1 black Skeleton creature tokens', next: ['deep-mines'] },
      'deep-mines':        { name: 'Deep Mines', effect: 'Scry 3', next: ['mad-wizards-lair'] },
      'mad-wizards-lair':  { name: "Mad Wizard's Lair", effect: 'Draw three cards and reveal them. You may cast one of them without paying its mana cost', next: [] },
    },
    areas: {

      'yawning-portal': { x: 8.0, y: 14.4, w: 83.5, h: 6.3 },
      'dungeon-level': { x: 8.0, y: 22.1, w: 83.5, h: 6.7 },
      'goblin-bazaar': { x: 8.8, y: 30.9, w: 39.7, h: 13.6 },
      'twisted-caverns': { x: 51.2, y: 30.8, w: 39.6, h: 13.5 },
      'lost-level': { x: 9.1, y: 46.2, w: 83.0, h: 5.8 },
      'runestone-caverns': { x: 9.5, y: 53.8, w: 39.7, h: 13.5 },
      'muirals-graveyard': { x: 51.8, y: 54.1, w: 39.4, h: 13.4 },
      'deep-mines': { x: 10.0, y: 68.6, w: 83.4, h: 6.7 },
      'mad-wizards-lair': { x: 9.7, y: 76.8, w: 83.0, h: 9.9 },

    },
  },
  {
    id: 'phandelver',
    name: 'Lost Mine of Phandelver',
    scryfallUrl: 'https://api.scryfall.com/cards/tafr/21',
    startRoom: 'cave-entrance',
    rooms: {
      'cave-entrance':       { name: 'Cave Entrance', effect: 'Scry 1', next: ['goblin-lair', 'mine-tunnels'] },
      'goblin-lair':         { name: 'Goblin Lair', effect: 'Create a 1/1 red Goblin creature token', next: ['storeroom', 'dark-pool'] },
      'mine-tunnels':        { name: 'Mine Tunnels', effect: 'Create a Treasure token', next: ['dark-pool', 'fungi-cavern'] },
      'storeroom':           { name: 'Storeroom', effect: 'Put a +1/+1 counter on target creature', next: ['temple-of-dumathoin'] },
      'dark-pool':           { name: 'Dark Pool', effect: 'Each opponent loses 1 life and you gain 1 life', next: ['temple-of-dumathoin'] },
      'fungi-cavern':        { name: 'Fungi Cavern', effect: 'Target creature gets -4/-0 until your next turn', next: ['temple-of-dumathoin'] },
      'temple-of-dumathoin': { name: 'Temple of Dumathoin', effect: 'Draw a card', next: [] },
    },
    areas: {

      'cave-entrance': { x: 8.8, y: 15.8, w: 79.9, h: 12.8 },
      'goblin-lair': { x: 9.4, y: 30.4, w: 38.5, h: 17.7 },
      'mine-tunnels': { x: 51.8, y: 30.1, w: 38.8, h: 17.8 },
      'storeroom': { x: 9.8, y: 50.4, w: 22.5, h: 20.6 },
      'dark-pool': { x: 35.9, y: 50.2, w: 28.4, h: 20.5 },
      'fungi-cavern': { x: 68.5, y: 50.6, w: 22.2, h: 20.4 },
      'temple-of-dumathoin': { x: 8.8, y: 73.5, w: 79.9, h: 12.8 },

    },
  },
  {
    id: 'undercity',
    name: 'The Undercity',
    scryfallUrl: 'https://api.scryfall.com/cards/tclb/20',
    startRoom: 'secret-entrance',
    rooms: {
      'secret-entrance': { name: 'Secret Entrance', effect: 'Search your library for a basic land card, reveal it, put it into your hand, then shuffle', next: ['forge', 'lost-well'] },
      'forge':           { name: 'Forge', effect: 'Put two +1/+1 counters on target creature', next: ['trap', 'arena'] },
      'lost-well':       { name: 'Lost Well', effect: 'Scry 2', next: ['arena', 'stash'] },
      'trap':            { name: 'Trap!', effect: 'Target player loses 5 life', next: ['archives'] },
      'arena':           { name: 'Arena', effect: 'Goad target creature', next: ['archives', 'catacombs'] },
      'stash':           { name: 'Stash', effect: 'Create a Treasure token', next: ['catacombs'] },
      'archives':        { name: 'Archives', effect: 'Draw a card', next: ['throne'] },
      'catacombs':       { name: 'Catacombs', effect: 'Create a 4/1 black Skeleton creature token with menace', next: ['throne'] },
      'throne':          { name: 'Throne of the Dead Three', effect: 'Reveal the top ten cards of your library. Put a creature card from among them onto the battlefield with three +1/+1 counters on it. It gains hexproof until your next turn. Then shuffle.', next: [] },
    },
    areas: {

      'secret-entrance': { x: 8.3, y: 19.3, w: 84.7, h: 11.4 },
      'forge': { x: 8.3, y: 31.2, w: 33.8, h: 9.8 },
      'lost-well': { x: 52.8, y: 31.6, w: 39.0, h: 9.8 },
      'trap': { x: 8.9, y: 43.2, w: 39.0, h: 13.2 },
      'arena': { x: 42.6, y: 44.0, w: 16.4, h: 9.1 },
      'stash': { x: 60.7, y: 43.2, w: 29.8, h: 13.2 },
      'archives': { x: 8.5, y: 58.1, w: 41.4, h: 13.9 },
      'catacombs': { x: 51.2, y: 58.7, w: 41.4, h: 13.9 },
      'throne': { x: 8.6, y: 73.5, w: 83.5, h: 17.2 },

    },
  },
  {
    id: 'tomb-of-annihilation',
    name: 'Tomb of Annihilation',
    scryfallUrl: 'https://api.scryfall.com/cards/tafr/22',
    startRoom: 'trapped-entry',
    rooms: {
      'trapped-entry': { name: 'Trapped Entry', effect: 'Each player loses 1 life', next: ['veils-of-fear', 'oubliette'] },
      'veils-of-fear': { name: 'Veils of Fear', effect: 'Each player loses 2 life unless they discard a card', next: ['sandfall-cell'] },
      'oubliette': { name: 'Oubliette', effect: 'Discard a card and sacrifice an artifact, a creature, and a land', next: ['cradle-of-the-death-god'] },
      'sandfall-cell': { name: 'Sandfall Cell', effect: 'Each player loses 2 life unless they sacrifice an artifact, a creature, or a land', next: ['cradle-of-the-death-god'] },
      'cradle-of-the-death-god': { name: 'Cradle of the Death God', effect: 'Create The Atropal, a legendary 4/4 black God Horror creature token with deathtouch', next: [] },
    },
    areas: {

      'trapped-entry': { x: 9.8, y: 15.8, w: 80.4, h: 14.6 },
      'veils-of-fear': { x: 9.7, y: 30.6, w: 39.1, h: 17.9 },
      'oubliette': { x: 51.5, y: 30.3, w: 39.3, h: 37.4 },
      'sandfall-cell': { x: 9.8, y: 50.0, w: 39.1, h: 18.1 },
      'cradle-of-the-death-god': { x: 9.8, y: 69.7, w: 80.4, h: 13.8 },

    },
  },
  {
    id: 'baldurs-gate-wilderness',
    name: "Baldur's Gate Wilderness",
    scryfallUrl: 'https://api.scryfall.com/cards/tclb/0',
    startRoom: 'crash-landing',
    rooms: {
      'crash-landing': { name: 'Crash Landing', effect: 'Search your library for a basic land card, reveal it, put it into your hand, then shuffle', next: ['goblin-camp', 'emerald-grove', 'aunties-teahouse'] },
      'goblin-camp': { name: 'Goblin Camp', effect: 'Create a Treasure token', next: ['defiled-temple'] },
      'emerald-grove': { name: 'Emerald Grove', effect: 'Create a 2/2 white Knight creature token', next: ['defiled-temple', 'grymforge', 'mountain-pass'] },
      'aunties-teahouse': { name: "Auntie's Teahouse", effect: 'Scry 3', next: ['mountain-pass'] },
      'defiled-temple': { name: 'Defiled Temple', effect: 'You may sacrifice a permanent. If you do, draw a card', next: ['ebonlake-grotto', 'grymforge'] },
      'mountain-pass': { name: 'Mountain Pass', effect: 'You may put a land card from your hand onto the battlefield', next: ['grymforge', 'githyanki-creche'] },
      'ebonlake-grotto': { name: 'Ebonlake Grotto', effect: 'Create two 1/1 blue Faerie Dragon creature tokens with flying', next: ['last-light-inn'] },
      'grymforge': { name: 'Grymforge', effect: 'For each opponent, goad up to one target creature that player controls', next: ['last-light-inn', 'gauntlet-of-shar', 'reithwin-tollhouse'] },
      'githyanki-creche': { name: 'Githyanki Crèche', effect: 'Distribute three +1/+1 counters among up to three target creatures you control', next: ['reithwin-tollhouse'] },
      'last-light-inn': { name: 'Last Light Inn', effect: 'Draw two cards', next: ['moonrise-towers', 'gauntlet-of-shar'] },
      'reithwin-tollhouse': { name: 'Reithwin Tollhouse', effect: 'Roll 2d4 and create that many Treasure tokens', next: ['gauntlet-of-shar', 'balthazars-lab'] },
      'moonrise-towers': { name: 'Moonrise Towers', effect: 'Instant and sorcery spells you cast this turn cost {3} less to cast', next: ['circus-of-the-last-days'] },
      'gauntlet-of-shar': { name: 'Gauntlet of Shar', effect: 'Each opponent loses 5 life', next: ['circus-of-the-last-days', 'undercity-ruins'] },
      'balthazars-lab': { name: "Balthazar's Lab", effect: 'Return up to two target creature cards from your graveyard to your hand', next: ['undercity-ruins'] },
      'circus-of-the-last-days': { name: 'Circus of the Last Days', effect: "Create a token that's a copy of one of your commanders, except it's not legendary", next: ['steel-watch-foundry', 'ansurs-sanctum'] },
      'undercity-ruins': { name: 'Undercity Ruins', effect: 'Create three 4/1 black Skeleton creature tokens with menace', next: ['ansurs-sanctum', 'temple-of-bhaal'] },
      'steel-watch-foundry': { name: 'Steel Watch Foundry', effect: 'You get an emblem with "Creatures you control get +2/+2 and have trample."', next: [] },
      'ansurs-sanctum': { name: "Ansur's Sanctum", effect: "Reveal the top four cards of your library and put them into your hand. Each opponent loses life equal to those cards' total mana value.", next: [] },
      'temple-of-bhaal': { name: 'Temple of Bhaal', effect: 'Creatures your opponents control get -5/-5 until end of turn', next: [] },
    },
    areas: {

      'crash-landing': { x: 8.9, y: 14.9, w: 82.0, h: 6.4 },
      'goblin-camp': { x: 8.3, y: 22.4, w: 23.8, h: 6.6 },
      'emerald-grove': { x: 35.0, y: 23.1, w: 28.9, h: 5.7 },
      'aunties-teahouse': { x: 67.0, y: 22.9, w: 22.5, h: 5.6 },
      'defiled-temple': { x: 9.1, y: 30.8, w: 39.7, h: 6.4 },
      'mountain-pass': { x: 51.3, y: 30.3, w: 40.6, h: 6.8 },
      'ebonlake-grotto': { x: 8.3, y: 38.4, w: 24.0, h: 12.0 },
      'grymforge': { x: 36.0, y: 39.3, w: 28.4, h: 9.8 },
      'githyanki-creche': { x: 67.6, y: 38.7, w: 23.1, h: 10.3 },
      'last-light-inn': { x: 8.6, y: 50.4, w: 40.5, h: 6.8 },
      'reithwin-tollhouse': { x: 51.8, y: 50.7, w: 40.6, h: 6.9 },
      'moonrise-towers': { x: 8.5, y: 58.9, w: 24.6, h: 6.6 },
      'gauntlet-of-shar': { x: 35.1, y: 58.9, w: 30.5, h: 6.6 },
      'balthazars-lab': { x: 61.6, y: 59.2, w: 28.2, h: 6.6 },
      'circus-of-the-last-days': { x: 8.5, y: 67.2, w: 39.5, h: 6.6 },
      'undercity-ruins': { x: 50.6, y: 67.3, w: 40.6, h: 6.8 },
      'steel-watch-foundry': { x: 7.4, y: 74.8, w: 25.6, h: 15.3 },
      'ansurs-sanctum': { x: 34.7, y: 75.1, w: 30.8, h: 15.1 },
      'temple-of-bhaal': { x: 66.0, y: 75.2, w: 25.7, h: 15.1 },

    },
  },
]

const imgCache = {}

function useDungeonImage(apiUrl) {
  const [url, setUrl] = useState(imgCache[apiUrl] ?? null)
  const [loading, setLoading] = useState(!imgCache[apiUrl])

  useEffect(() => {
    if (!apiUrl) return
    if (imgCache[apiUrl]) {
      setUrl(imgCache[apiUrl])
      setLoading(false)
      return
    }
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
        if (!cancelled) {
          if (img) imgCache[apiUrl] = img
          setUrl(img)
        }
      })
      .catch(() => { if (!cancelled) setUrl(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [apiUrl])

  return { url, loading }
}

function Summary({ dungeon, currentRoom, selectableNames, completed }) {
  if (!currentRoom) {
    return <div className="dungeon-summary">Tap the highlighted starting room on the dungeon card.</div>
  }

  const room = dungeon.rooms[currentRoom]
  return (
    <div className="dungeon-summary">
      <div className="dungeon-summary-title">{room.name}</div>
      <div className="dungeon-summary-effect">{room.effect}</div>
      <div className={'dungeon-summary-next' + (completed ? ' complete' : '')}>
        {completed ? 'Dungeon complete.' : `Next: ${selectableNames.join(' or ')}`}
      </div>
    </div>
  )
}

function PlayerDungeon({ player }) {
  const [dungeonId, setDungeonId] = useState(DUNGEONS[0].id)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [visited, setVisited] = useState([])

  const dungeon = DUNGEONS.find(d => d.id === dungeonId)
  const room = currentRoom ? dungeon.rooms[currentRoom] : null
  const nextRooms = room ? room.next : []
  const completed = !!currentRoom && nextRooms.length === 0
  const selectableRooms = currentRoom ? (completed ? [] : nextRooms) : [dungeon.startRoom]
  const selectableSet = new Set(selectableRooms)
  const visitedSet = new Set(visited)
  const { url: cardImg, loading: imgLoading } = useDungeonImage(dungeon.scryfallUrl)

  function changeDungeon(id) {
    setDungeonId(id)
    setCurrentRoom(null)
    setVisited([])
  }

  function venture(roomId) {
    if (!selectableSet.has(roomId)) return
    setCurrentRoom(roomId)
    setVisited(v => (v.includes(roomId) ? v : [...v, roomId]))
  }

  function reset() {
    setCurrentRoom(null)
    setVisited([])
  }

  const selectableNames = selectableRooms.map(rid => dungeon.rooms[rid].name)

  return (
    <div className="player-dungeon" style={{ '--player-color': player.color }}>
      <div className="pd-header">
        <span className="pd-name" style={{ color: player.color }}>{player.name}</span>
        <select className="dungeon-select" value={dungeonId} onChange={e => changeDungeon(e.target.value)}>
          {DUNGEONS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      <div className="pd-body">
        <div className="dungeon-card-col">
          <div className="dungeon-card-wrap">
            {imgLoading && <div className="dungeon-img-skeleton" />}
            {cardImg && !imgLoading && (
              <>
                <img className="dungeon-card-img" src={cardImg} alt={dungeon.name} loading="lazy" />
                <div className="dungeon-overlay">
                  {Object.entries(dungeon.areas).map(([roomId, area]) => {
                    const current = currentRoom === roomId
                    const visitedRoom = visitedSet.has(roomId)
                    const selectable = selectableSet.has(roomId)
                    const cls = [
                      'room-hitbox',
                      current ? 'current' : '',
                      !current && visitedRoom ? 'visited' : '',
                      selectable ? 'selectable' : '',
                    ].filter(Boolean).join(' ')
                    return (
                      <button
                        key={roomId}
                        type="button"
                        aria-label={dungeon.rooms[roomId].name}
                        title={dungeon.rooms[roomId].name}
                        className={cls}
                        style={{
                          left: `${area.x}%`,
                          top: `${area.y}%`,
                          width: `${area.w}%`,
                          height: `${area.h}%`,
                        }}
                        onClick={() => venture(roomId)}
                      />
                    )
                  })}
                </div>
              </>
            )}
            {!imgLoading && !cardImg && (
              <div className="dungeon-img-fallback">{dungeon.name}</div>
            )}
          </div>

          <Summary
            dungeon={dungeon}
            currentRoom={currentRoom}
            selectableNames={selectableNames}
            completed={completed}
          />
        </div>
      </div>

      <div className="dungeon-actions">
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

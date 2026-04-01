import { useState } from 'react'
import './DungeonTracker.css'

const DUNGEONS = [
  {
    id: 'mad-mage',
    name: 'Dungeon of the Mad Mage',
    rooms: [
      { name: 'Yawning Portal', effect: 'Scry 1' },
      { name: 'Dungeon Level', effect: 'Draw a card, lose 1 life' },
      { name: 'Goblin Bazaar', effect: 'Create a Treasure token' },
      { name: 'Twisted Caverns', effect: 'Creatures get −1/−0 until your next turn' },
      { name: 'Arcane Chambers', effect: 'Target creature gets +2/+0 until your next turn' },
      { name: 'Lost Level', effect: 'Put a +1/+1 counter on up to two creatures' },
      { name: 'Runestone Caverns', effect: 'Exile top 2 cards, may play until end of next turn' },
      { name: "Muiral's Gauntlet", effect: 'Create two 1/1 Spider tokens with reach' },
      { name: 'Deep Mines', effect: 'Draw two cards' },
      { name: "Mad Wizard's Lair", effect: 'Each opponent loses 2 life, you gain 2 life' },
    ],
  },
  {
    id: 'phandelver',
    name: 'Lost Mine of Phandelver',
    rooms: [
      { name: 'Cave Entrance', effect: 'Scry 1, then draw a card' },
      { name: 'Goblin Gate', effect: 'Create two 1/1 Goblin tokens' },
      { name: 'Mine Entrance', effect: 'Tap up to two target creatures' },
      { name: 'Trickster Idol', effect: 'Create a Treasure token' },
      { name: 'Fungi Cavern', effect: 'Target creature gets −2/−2 until your next turn' },
      { name: 'Dark Pool', effect: 'Each opponent mills 3 cards' },
      { name: 'Dwarven Forge', effect: 'Create a 0/4 Golem artifact creature token' },
      { name: 'Temple of Dumathoin', effect: 'Draw 3 cards, lose 3 life' },
    ],
  },
  {
    id: 'undercity',
    name: 'Undercity',
    rooms: [
      { name: 'Dungeon Entrance', effect: 'You gain 1 life' },
      { name: 'Forge', effect: 'Create a Treasure token' },
      { name: 'Lost Well', effect: 'Scry 2' },
      { name: 'Trap!', effect: 'Each opponent loses 2 life' },
      { name: 'Arena', effect: 'Target creature fights another target creature' },
      { name: 'Sewer', effect: 'Surveil 2' },
      { name: 'Throne of the Dead Three', effect: 'Each opponent sacrifices a creature. Create Skeleton tokens equal to sacrificed creatures' },
    ],
  },
]

function PlayerDungeon({ player }) {
  const [dungeonId, setDungeonId] = useState(DUNGEONS[0].id)
  const [room, setRoom] = useState(-1) // -1 = not started

  const dungeon = DUNGEONS.find(d => d.id === dungeonId)
  const completed = room >= dungeon.rooms.length - 1

  function changeDungeon(id) {
    setDungeonId(id)
    setRoom(-1)
  }

  return (
    <div className="player-dungeon" style={{ '--player-color': player.color }}>
      <div className="pd-header">
        <span className="pd-name" style={{ color: player.color }}>{player.name}</span>
        <select
          className="dungeon-select"
          value={dungeonId}
          onChange={e => changeDungeon(e.target.value)}
        >
          {DUNGEONS.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="dungeon-rooms">
        {dungeon.rooms.map((r, i) => (
          <button
            key={i}
            className={`room-btn ${i === room ? 'current' : ''} ${i < room ? 'done' : ''} ${i > room + 1 ? 'locked' : ''}`}
            onClick={() => setRoom(i === room ? i - 1 : i)}
            disabled={i > room + 1 && room !== -1 || (i > 0 && room === -1)}
            title={r.effect}
          >
            <span className="room-num">{i + 1}</span>
            <span className="room-name">{r.name}</span>
            {i === room && <span className="room-effect">{r.effect}</span>}
          </button>
        ))}
      </div>

      {completed && (
        <div className="dungeon-complete">Dungeon Complete!</div>
      )}

      <div className="dungeon-actions">
        <button
          className="dungeon-advance"
          onClick={() => setRoom(r => Math.min(dungeon.rooms.length - 1, r + 1))}
          disabled={completed}
        >
          Venture ▶
        </button>
        <button className="dungeon-reset" onClick={() => setRoom(-1)}>Reset</button>
      </div>
    </div>
  )
}

export default function DungeonTracker({ players }) {
  const activePlayers = players.filter(p => !p.eliminated)

  return (
    <div className="dungeon-tracker">
      {activePlayers.map(p => (
        <PlayerDungeon key={p.id} player={p} />
      ))}
    </div>
  )
}

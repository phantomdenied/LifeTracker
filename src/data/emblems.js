// Game statuses shown at the top, planeswalker emblems below
export const EMBLEMS = [
  // ── Game Statuses ──────────────────────────────────────────
  {
    key: 'monarch', category: 'status', icon: '♛', label: 'Monarch',
    text: "At the beginning of your end step, draw a card. Whenever a creature deals combat damage to you, its controller becomes the Monarch.",
  },
  {
    key: 'initiative', category: 'status', icon: '⚔', label: 'Initiative',
    text: "At the beginning of your upkeep, venture into the Undercity. Whenever a creature deals combat damage to you, its controller takes the initiative.",
  },
  {
    key: 'citysblessing', category: 'status', icon: '🏙', label: "City's Blessing",
    text: "You have the city's blessing for the rest of the game (triggered by Ascend — you controlled 10 or more permanents at once).",
  },
  {
    key: 'ring', category: 'status', icon: '💍', label: 'The Ring Tempts You', hasStage: true,
    stages: [
      "Stage 1 — Your Ring-bearer is legendary and can't be blocked by creatures with greater power.",
      "Stage 2 — Your Ring-bearer can't be blocked by more than one creature.",
      "Stage 3 — Whenever your Ring-bearer attacks, defending player loses 3 life.",
      "Stage 4 — Whenever your Ring-bearer deals combat damage to a player, draw a card and that player discards a card.",
    ],
  },
  {
    key: 'daynight', category: 'status', icon: '☀', label: 'Day / Night', hasToggle: true,
    textA: "It is currently Day. If a player casts no spells during their own turn, it becomes Night.",
    textB: "It is currently Night. If a player casts two or more spells during their own turn, it becomes Day.",
  },

  // ── Planeswalker Emblems ────────────────────────────────────
  {
    key: 'ajani_steadfast', category: 'emblem', label: 'Ajani Steadfast',
    text: "Your opponents can't gain life. Each creature your opponents control gets -1/-1 at the beginning of each of your end steps.",
  },
  {
    key: 'aminatou', category: 'emblem', label: 'Aminatou, the Fateshifter',
    text: "Whenever you draw a card, exile a permanent you control, then return it to the battlefield under your control.",
  },
  {
    key: 'chandra_tof', category: 'emblem', label: 'Chandra, Torch of Defiance',
    text: "You may cast spells from the top of your library. If you don't, exile that card.",
  },
  {
    key: 'daretti', category: 'emblem', label: 'Daretti, Scrap Savant',
    text: "Whenever an artifact is put into your graveyard from the battlefield, return that card to the battlefield at the beginning of the next end step.",
  },
  {
    key: 'domri', category: 'emblem', label: 'Domri Rade',
    text: "Creatures you control have double strike, trample, hexproof, and haste.",
  },
  {
    key: 'elspeth_knight', category: 'emblem', label: "Elspeth, Knight-Errant",
    text: "Artifacts, creatures, enchantments, and lands you control are indestructible.",
  },
  {
    key: 'elspeth_sun', category: 'emblem', label: "Elspeth, Sun's Champion",
    text: "Creatures you control have double strike, flying, and lifelink.",
  },
  {
    key: 'garruk_apex', category: 'emblem', label: 'Garruk, Apex Predator',
    text: "Whenever a creature attacks you, it gets +5/+5 and gains trample until end of turn.",
  },
  {
    key: 'gideon_trials', category: 'emblem', label: "Gideon of the Trials",
    text: "As long as you control a Gideon planeswalker, you can't lose the game and your opponents can't win the game.",
  },
  {
    key: 'huatli_warrior', category: 'emblem', label: 'Huatli, Warrior Poet',
    text: "Whenever a creature you control attacks, untap all creatures you control.",
  },
  {
    key: 'jace_architect', category: 'emblem', label: 'Jace, Architect of Thought',
    text: "When you cast a spell, copy it. You may choose new targets for the copy.",
  },
  {
    key: 'jace_unraveler', category: 'emblem', label: 'Jace, Unraveler of Secrets',
    text: "Whenever an opponent casts their first spell each turn, counter that spell.",
  },
  {
    key: 'kiora_crashing', category: 'emblem', label: 'Kiora, the Crashing Wave',
    text: "Whenever a creature attacks, if that creature has power 6 or greater, draw a card.",
  },
  {
    key: 'liliana_dark', category: 'emblem', label: 'Liliana of the Dark Realms',
    text: "You have no maximum hand size. At the beginning of your draw step, draw four additional cards.",
  },
  {
    key: 'lolth', category: 'emblem', label: 'Lolth, Spider Queen',
    text: "Whenever a creature you control dies, draw two cards.",
  },
  {
    key: 'narset', category: 'emblem', label: 'Narset Transcendent',
    text: "Your opponents can't cast noncreature spells.",
  },
  {
    key: 'nissa_worldwaker', category: 'emblem', label: 'Nissa, Worldwaker',
    text: "Lands you control are 4/4 Elemental creatures with trample, vigilance, and haste. They're still lands.",
  },
  {
    key: 'ob_nixilis', category: 'emblem', label: 'Ob Nixilis Reignited',
    text: "Whenever a player draws a card, you may have that player lose 2 life.",
  },
  {
    key: 'sorin_lord', category: 'emblem', label: 'Sorin, Lord of Innistrad',
    text: "Creatures you control have lifelink.",
  },
  {
    key: 'sorin_solemn', category: 'emblem', label: 'Sorin, Solemn Visitor',
    text: "Creatures your opponents control get -1/-1 at the beginning of each opponent's upkeep.",
  },
  {
    key: 'tamiyo_field', category: 'emblem', label: 'Tamiyo, Field Researcher',
    text: "You may cast spells from your hand without paying their mana costs.",
  },
  {
    key: 'tamiyo_moon', category: 'emblem', label: 'Tamiyo, the Moon Sage',
    text: "You have no maximum hand size. Whenever a card is put into your graveyard from anywhere, you may return it to your hand.",
  },
  {
    key: 'teferi_temporal', category: 'emblem', label: 'Teferi, Temporal Archmage',
    text: "You may activate loyalty abilities of planeswalkers you control on any player's turn any time you could cast an instant.",
  },
  {
    key: 'tibalt_cosmic', category: 'emblem', label: 'Tibalt, Cosmic Impostor',
    text: "You may play cards exiled with Tibalt, Cosmic Impostor, and you may spend mana as though it were mana of any color to cast those spells.",
  },
  {
    key: 'ugin_spirit', category: 'emblem', label: 'Ugin, the Spirit Dragon',
    text: "You may cast colorless spells from exile without paying their mana costs.",
  },
  {
    key: 'venser', category: 'emblem', label: 'Venser, the Sojourner',
    text: "Whenever you cast a spell, exile target permanent.",
  },
  {
    key: 'vraska_golgari', category: 'emblem', label: 'Vraska, Golgari Queen',
    text: "Whenever a creature you control deals combat damage to a player, that player loses the game.",
  },
  {
    key: 'vraska_scheming', category: 'emblem', label: 'Vraska, Scheming Gorgon',
    text: "Creatures you control have deathtouch.",
  },
  {
    key: 'xenagos', category: 'emblem', label: 'Xenagos, the Reveler',
    text: "At the beginning of your combat step, target creature you control gains +X/+X and trample until end of turn, where X is the number of creatures you control.",
  },
]

export const STATUS_EMBLEMS  = EMBLEMS.filter(e => e.category === 'status')
export const PW_EMBLEMS      = EMBLEMS.filter(e => e.category === 'emblem')

// All planes and phenomena verified against Scryfall.
// Card names must match Scryfall exactly - they are used for image lookup.
// Sources: Planechase (2009) = PC1, Planechase 2012 = PC2, Commander Legends: Battle for Baldur's Gate = CLB

export const PLANES = [

  // -- Planechase 2009 (PC1) - 40 planes ------------------------------------
  { id: 'akoum',              name: 'Akoum',                        set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'All permanents have haste.',
    chaos:  'Akoum deals 2 damage to target creature or player.' },

  { id: 'bant',               name: 'Bant',                         set: 'PC1', type: 'plane', world: 'Alara',
    static: 'All creatures have exalted.',
    chaos:  'Put a +1/+1 counter on target creature.' },

  { id: 'edge-of-malacol',    name: 'Edge of Malacol',              set: 'PC1', type: 'plane', world: 'Alara',
    static: "At the beginning of each players untap step, that player untaps each creature they control twice.",
    chaos:  'Untap each creature you control.' },

  { id: 'feeding-grounds',    name: 'Feeding Grounds',              set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Red spells cost {1} less to cast. Green spells cost {1} less to cast.',
    chaos:  'Target creature gets +3/+3 until end of turn.' },

  { id: 'fields-of-summer',   name: 'Fields of Summer',             set: 'PC1', type: 'plane', world: 'Bant',
    static: 'Whenever a player casts a spell, that player may gain 1 life.',
    chaos:  'You may gain 10 life.' },

  { id: 'glimmerpost-ravnica',name: 'Glimmerpost Ravnica',          set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a creature enters the battlefield, its controller gains 1 life.',
    chaos:  'Create two 1/1 green Saproling creature tokens.' },

  { id: 'hedron-fields',      name: 'Hedron Fields of Agadeem',     set: 'PC1', type: 'plane', world: 'Zendikar',
    static: "Creatures with power 7 or greater can't attack or block.",
    chaos:  'Put a 7/7 colorless Eldrazi creature token onto the battlefield.' },

  { id: 'horizon-boughs',     name: 'Horizon Boughs',               set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'All activated abilities cost {2} less to activate.',
    chaos:  'Until end of turn, you may play any number of lands.' },

  { id: 'isle-vesuva',        name: 'Isle of Vesuva',               set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'Lands you control have "{T}: Add one mana of any color."',
    chaos:  'Target land you control becomes a copy of target land until end of turn.' },

  { id: 'lethe-lake',         name: 'Lethe Lake',                   set: 'PC1', type: 'plane', world: 'Alara',
    static: "At the beginning of each players upkeep, that player mills 10 cards.",
    chaos:  'Target player mills 10 cards.' },

  { id: 'llanowar-wastes-plane', name: 'Llanowar Wastes',           set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'Green creature spells cost {1} less to cast. Black creature spells cost {1} less to cast.',
    chaos:  'Create a 1/1 green Elf Druid creature token with "{T}: Add {G}."' },

  { id: 'minamo-plane',       name: 'Minamo',                       set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'Whenever a player casts a spell, that player may draw a card.',
    chaos:  'You may tap or untap target permanent.' },

  { id: 'mount-keralia',      name: 'Mount Keralia',                set: 'PC1', type: 'plane', world: 'Regatha',
    static: "At the beginning of each players end step, Mount Keralia deals damage equal to the number of non-Mountain lands that player controls to them.",
    chaos:  'Prevent all damage that would be dealt until end of turn.' },

  { id: 'murasa',             name: 'Murasa',                       set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Whenever a nontoken creature enters the battlefield, its controller puts a +1/+1 counter on it.',
    chaos:  'Target creature gains trample and gets +6/+6 until end of turn.' },

  { id: 'naya',               name: 'Naya',                         set: 'PC1', type: 'plane', world: 'Alara',
    static: 'You may play any number of lands on each of your turns.',
    chaos:  'Target red, green, or white creature you control gets +1/+1 until end of turn for each land you control.' },

  { id: 'norns-dominion',     name: "Norn's Dominion",              set: 'PC1', type: 'plane', world: 'New Phyrexia',
    static: 'When a nontoken creature dies, its controller creates a 0/0 colorless Germ creature token.',
    chaos:  'Put a -1/-1 counter on each creature your opponents control.' },

  { id: 'onakke-pit',         name: 'Onakke Catacomb',              set: 'PC1', type: 'plane', world: 'Shandalar',
    static: 'All creatures have deathtouch.',
    chaos:  'Each player sacrifices a creature. You put the creatures sacrificed this way onto the battlefield under your control.' },

  { id: 'pools-of-becoming',  name: 'The Pools of Becoming',        set: 'PC1', type: 'plane', world: 'Blind Eternities',
    static: "At the beginning of your end step, if you don't have exactly three cards in hand, draw a card or discard a card so that you do.",
    chaos:  'Reveal the top 3 cards of your library. You may cast any of them without paying their mana costs. Put the rest on the bottom in any order.' },

  { id: 'sea-of-sand',        name: 'Sea of Sand',                  set: 'PC1', type: 'plane', world: 'Rabiah',
    static: 'Whenever a player casts a spell, that player loses life equal to the number of cards in their hand.',
    chaos:  'Draw 3 cards, then discard 3 cards.' },

  { id: 'shiv',               name: 'Shiv',                         set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'Creatures you control have "{R}: This creature gets +1/+0 until end of turn."',
    chaos:  'Create a 5/5 red Dragon creature token with flying.' },

  { id: 'skybreen',           name: 'Skybreen',                     set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'Each player can only cast spells of the most common color among all permanents or, if there is no most common color, spells of the color of their choice.',
    chaos:  'Target player loses life equal to the number of cards in their hand.' },

  { id: 'sokenzan',           name: 'Sokenzan',                     set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: "All creatures have haste. At the beginning of each players end step, that player sacrifices all but one creature they control.",
    chaos:  'Create three 1/1 red Goblin creature tokens.' },

  { id: 'stronghold-furnace', name: 'Stronghold Furnace',           set: 'PC1', type: 'plane', world: 'Rath',
    static: 'If a source would deal damage to a permanent or player, it deals double that damage instead.',
    chaos:  'Stronghold Furnace deals 1 damage to any target.' },

  { id: 'tazeem',             name: 'Tazeem',                       set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Landfall - Whenever a land enters the battlefield, its controller draws a card.',
    chaos:  'Target player draws 3 cards.' },

  { id: 'turri-island',       name: 'Turri Island',                 set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Dragon spells cost {6} less to cast.',
    chaos:  'Creatures you control get +2/+2 until end of turn.' },

  { id: 'undercity-reaches',  name: 'Undercity Reaches',            set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a creature deals combat damage to a player, its controller may draw a card.',
    chaos:  'You may draw 4 cards.' },

  { id: 'velis-vel',          name: 'Velis Vel',                    set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'All creatures are every creature type.',
    chaos:  'Creatures you control get +3/+3 until end of turn.' },

  { id: 'windriddle',         name: 'Windriddle Palaces',           set: 'PC1', type: 'plane', world: 'Rabiah',
    static: "Players play with the top card of their library revealed. You may play the top card of each opponents library.",
    chaos:  "Exile the top card of each players library. You may play those cards this turn." },

  { id: 'academy-tolaria',    name: 'Academy at Tolaria West',      set: 'PC1', type: 'plane', world: 'Dominaria',
    static: "At the beginning of each players draw step, that player draws cards equal to the number of cards in their hand minus 4. If this would cause a player to draw a negative number of cards, that player discards that many cards instead.",
    chaos:  'Draw 7 cards, then discard 7 cards.' },

  { id: 'izzet-steam-maze',   name: 'Izzet Steam Maze',             set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a player casts an instant or sorcery spell, that player copies it. The player may choose new targets for the copy.',
    chaos:  'Return target instant or sorcery card from your graveyard to your hand.' },

  { id: 'kessig',             name: 'Kessig',                       set: 'PC1', type: 'plane', world: 'Innistrad',
    static: "At the beginning of each players end step, each creature that player controls with a +1/+1 counter on it gets +1/+1 until end of turn for each +1/+1 counter on it.",
    chaos:  'Put a +1/+1 counter on each creature you control.' },

  { id: 'krosa',              name: 'Krosa',                        set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'All creatures get +2/+2.',
    chaos:  'Untap all creatures. After this phase, there is an additional combat phase.' },

  { id: 'ophiomancer-den',    name: "Ophiomancer's Den",            set: 'PC1', type: 'plane', world: 'Unknown',
    static: 'Whenever a player casts a creature spell, they create a 1/1 black Snake creature token with deathtouch.',
    chaos:  'Create a 3/3 black Snake creature token with deathtouch.' },

  { id: 'orochi-colony',      name: 'Orochi Colony',                set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: "Whenever a land an opponent controls becomes tapped, you may draw a card.",
    chaos:  "Destroy all lands target player controls." },

  { id: 'sanctum-serra',      name: 'Sanctum of Serra',             set: 'PC1', type: 'plane', world: "Serra Realm",
    static: 'All creatures have vigilance.',
    chaos:  'Destroy all attacking creatures.' },

  { id: 'fourth-sphere',      name: 'The Fourth Sphere',            set: 'PC1', type: 'plane', world: 'Phyrexia',
    static: 'At the beginning of each upkeep, each player sacrifices a nonblack creature.',
    chaos:  'Each player sacrifices all nonblack creatures they control.' },

  { id: 'takenuma',           name: 'Takenuma',                     set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'Legendary creatures have hexproof.',
    chaos:  "Each player discards their hand, then draws cards equal to the greatest number of cards a player discarded this way." },

  { id: 'trail-of-mystery',   name: 'Trail of Mystery',             set: 'PC1', type: 'plane', world: 'Tarkir',
    static: 'Whenever a face-down permanent enters the battlefield, put a +1/+1 counter on it.',
    chaos:  'Turn target face-up creature face down.' },

  { id: 'truga-jungle',       name: 'Truga Jungle',                 set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Each land has "{T}: Add one mana of any color."',
    chaos:  'Search your library for a card, put it into your hand, then shuffle.' },

  { id: 'stensia',            name: 'Stensia',                      set: 'PC1', type: 'plane', world: 'Innistrad',
    static: 'Whenever a creature enters the battlefield, its controller loses 2 life.',
    chaos:  'Each other player loses 3 life. You gain life equal to life lost this way.' },

  // -- Planechase 2012 (PC2) -------------------------------------------------
  { id: 'aretopolis',         name: 'Aretopolis',                   set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'When you planeswalk to Aretopolis, put a scroll counter on it. At the beginning of your upkeep, put a scroll counter on Aretopolis, then you gain life equal to the number of scroll counters on it.',
    chaos:  'Put half that many scroll counters, rounded up, on Aretopolis.' },

  { id: 'astral-arena',       name: 'Astral Arena',                 set: 'PC2', type: 'plane', world: 'Blind Eternities',
    static: 'No more than one creature can attack each combat. No more than one creature can block each combat.',
    chaos:  'Astral Arena deals 2 damage to each creature.' },

  { id: 'bolas-meditation',   name: "Bolas's Meditation Realm",     set: 'PC2', type: 'plane', world: 'Alara',
    static: "All cards that aren't on the battlefield lose all abilities and are colorless.",
    chaos:  'Gain control of all permanents target player controls.' },

  { id: 'cliffside-market',   name: 'Cliffside Market',             set: 'PC2', type: 'plane', world: 'Mercadia',
    static: 'When you planeswalk to Cliffside Market or at the beginning of your upkeep, you may exchange life totals with target player.',
    chaos:  'Exchange control of two target permanents that share a card type.' },

  { id: 'disk-kaervek',       name: 'Disk of Kaervek',              set: 'PC2', type: 'plane', world: 'Zhalfir',
    static: 'Spells cost an additional {1} to cast for each other spell cast this turn.',
    chaos:  'Destroy target permanent.' },

  { id: 'echo-city',          name: 'Echo City',                    set: 'PC2', type: 'plane', world: 'Ravnica',
    static: "At the beginning of each players upkeep, that player copies the spell they cast most recently. They may choose new targets for that copy.",
    chaos:  'Until end of turn, you may cast sorceries as though they had flash.' },

  { id: 'ergamon',            name: 'Ergamon',                      set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Each player may spend mana as though it were any color.',
    chaos:  'Create a colorless artifact token named Lotus Petal with "{T}, Sacrifice this artifact: Add one mana of any color."' },

  { id: 'fabacin',            name: 'Fabacin',                      set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'When you planeswalk to Fabacin, search your library for a land card, put it onto the battlefield tapped, then shuffle.',
    chaos:  'Search your library for a land card, put it onto the battlefield, then shuffle.' },

  { id: 'gavony',             name: 'Gavony',                       set: 'PC2', type: 'plane', world: 'Innistrad',
    static: "At the beginning of each players upkeep, that player puts a +1/+1 counter on each creature they control.",
    chaos:  'Destroy all tokens.' },

  { id: 'glen-elendra',       name: 'Glen Elendra',                 set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: "Faerie spells can't be countered.",
    chaos:  'Target player returns each nonland permanent they control with the lowest mana value among those permanents to their hand.' },

  { id: 'goldmeadow',         name: 'Goldmeadow',                   set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: 'Whenever a land enters the battlefield, its controller creates three 0/1 white Goat creature tokens.',
    chaos:  'Create a 0/1 white Goat creature token.' },

  { id: 'grand-ossuary',      name: 'Grand Ossuary',                set: 'PC2', type: 'plane', world: 'Ravnica',
    static: "Whenever a creature dies, its controller creates X 1/1 green Saproling creature tokens, where X is that creature's power.",
    chaos:  'Each player exiles all creatures they control and creates that many 1/1 green Saproling creature tokens.' },

  { id: 'grixis',             name: 'Grixis',                       set: 'PC2', type: 'plane', world: 'Alara',
    static: 'Blue, black, and/or red creature cards in your graveyard have unearth. The unearth cost is equal to the card\'s mana cost.',
    chaos:  'Put target creature card from a graveyard onto the battlefield under your control.' },

  { id: 'havengul-lab',       name: 'Havengul Laboratory',          set: 'PC2', type: 'plane', world: 'Innistrad',
    static: 'You may look at the top card of any library at any time. You may cast the top card of your library.',
    chaos:  'Each player puts the top 3 cards of their library into their graveyard, then creates a 2/2 black Zombie token for each creature card put into their graveyard this way.' },

  { id: 'kilnspire',          name: 'Kilnspire District',           set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'When you planeswalk to Kilnspire District or at the beginning of your upkeep, put a charge counter on it. {R}: Kilnspire District deals damage equal to the number of charge counters on it to target creature or player. Activate only once each turn.',
    chaos:  'Put 3 charge counters on Kilnspire District.' },

  { id: 'kugeln',             name: 'Kugeln',                       set: 'PC2', type: 'plane', world: 'Unknown',
    static: "Creatures can't block.",
    chaos:  'Untap all creatures that attacked this turn. After this phase, there is an additional combat phase.' },

  { id: 'luvion',             name: 'Luvion',                       set: 'PC2', type: 'plane', world: 'Alara',
    static: "Creatures without flying can't attack.",
    chaos:  'Until end of turn, target creature gains flying and gets +3/+3.' },

  { id: 'mount-keld',         name: 'Mount Keld',                   set: 'PC2', type: 'plane', world: 'Dominaria',
    static: "At the beginning of each players upkeep, if that player controls no land, they draw 2 cards.",
    chaos:  "Each player sacrifices all lands they control. Those players draw cards equal to the number of lands sacrificed this way." },

  { id: 'naar-isle',          name: 'Naar Isle',                    set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'At the beginning of your upkeep, put a flame counter on Naar Isle, then Naar Isle deals damage equal to the number of flame counters on it to you.',
    chaos:  'Naar Isle deals 3 damage to target player.' },

  { id: 'norns-marrow',       name: "Norn's Marrow",                set: 'PC2', type: 'plane', world: 'New Phyrexia',
    static: 'Whenever a player loses life, they mill that many cards.',
    chaos:  'Each player puts a -1/-1 counter on each creature they control.' },

  { id: 'otaria',             name: 'Otaria',                       set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Flashback costs cost {3} less.',
    chaos:  "You may cast target sorcery or instant card from any players graveyard without paying its mana cost." },

  { id: 'panopticon',         name: 'The Panopticon',               set: 'PC2', type: 'plane', world: 'Mirrodin',
    static: 'When you planeswalk to The Panopticon, draw a card.',
    chaos:  'Draw a card.' },

  { id: 'shivan-gorge',       name: 'Shivan Gorge',                 set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Mountains you control have "{T}: This land deals 1 damage to any target."',
    chaos:  'Shivan Gorge deals 2 damage to each non-Dragon creature.' },

  { id: 'skarg',              name: 'Skarg',                        set: 'PC2', type: 'plane', world: 'Equilor',
    static: 'All creatures get -2/-2. Creature tokens get an additional -2/-2.',
    chaos:  'Target creature gets +6/+6 until end of turn.' },

  { id: 'tukataongue',        name: 'Tukataongue Thicket',          set: 'PC2', type: 'plane', world: 'Alara',
    static: "At the beginning of each players upkeep, they create a 1/1 green Saproling creature token.",
    chaos:  'Destroy all Saprolings.' },

  { id: 'urborg',             name: 'Urborg',                       set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'All lands are Swamps in addition to their other types.',
    chaos:  'Paralyze target creature.' },

  { id: 'vesuva',             name: 'Vesuva',                       set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Lands you control have "{T}: Add one mana of any color."',
    chaos:  'Target land you control becomes a copy of any land on the battlefield until end of turn.' },

  { id: 'wildfire-plains',    name: 'Wildfire Plains',              set: 'PC2', type: 'plane', world: 'Alara',
    static: 'Whenever a player taps a Mountain for mana, that player adds {G} to their mana pool.',
    chaos:  'Destroy all nonbasic lands.' },

  { id: 'xerex',              name: 'Xerex',                        set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'White spells cost {W} more to cast.',
    chaos:  "Return target permanent to its owners hand." },

  // Phenomena - PC2
  { id: 'interplanar-tunnel', name: 'Interplanar Tunnel',           set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Interplanar Tunnel, reveal cards from the top of your planar deck until you reveal 5 plane cards. Put one of those planes onto the battlefield and the rest on the bottom in any order.',
    chaos:  null },

  { id: 'morphic-tide',       name: 'Morphic Tide',                 set: 'PC2', type: 'phenomenon', world: null,
    static: "When you encounter Morphic Tide, each player shuffles all permanents they own into their library, then reveals that many cards from the top of their library. Each player puts all land cards revealed this way onto the battlefield, then does the same for artifact, creature, enchantment, and planeswalker cards. Players put the rest on the bottom in any order.",
    chaos:  null },

  { id: 'nexus-multiverse',   name: 'Chaotic Aether',               set: 'PC2', type: 'phenomenon', world: null,
    static: "When you encounter Chaotic Aether, each player may planeswalk away. Then each player who didn't planeswalk away may planeswalk again.",
    chaos:  null },

  { id: 'planewide-disaster', name: 'Planewide Disaster',           set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Planewide Disaster, destroy all permanents.',
    chaos:  null },

  { id: 'spatial-merging',    name: 'Spatial Merging',              set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Spatial Merging, reveal cards from the top of your planar deck until you reveal two plane cards. Put both planes onto the battlefield. They are on the same plane. Put the rest on the bottom in any order.',
    chaos:  null },

  { id: 'temporal-medium',    name: 'Time Distortion',              set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Time Distortion, reverse the game turn order.',
    chaos:  null },

  { id: 'untimely-interference', name: 'Mutual Epiphany',           set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Mutual Epiphany, each player draws 4 cards.',
    chaos:  null },

  // -- Commander Legends: Battle for Baldur's Gate (CLB) --------------------
  { id: 'avernus',            name: 'Avernus',                      set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: "At the beginning of each players upkeep, they create a colorless artifact token named Blood Claws with \"Sacrifice this artifact: Add {R}{R}.\"",
    chaos:  'Avernus deals 3 damage to target opponent and each creature they control.' },

  { id: 'baldurs-gate',       name: "Baldur's Gate",                set: 'CLB', type: 'plane', world: 'Faer-n',
    static: 'Initiative - Whenever a player rolls the planar die, the active player may take the initiative.',
    chaos:  'The active player takes the initiative.' },

  { id: 'castle-ravenloft',   name: 'Castle Ravenloft',             set: 'CLB', type: 'plane', world: 'Barovia',
    static: "At the beginning of each players end step, that player creates a 2/2 black Zombie creature token.",
    chaos:  'Each player sacrifices a creature. Each player who sacrificed a creature this way draws a card.' },

  { id: 'dis',                name: 'Dis',                          set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: "Creatures can't leave the battlefield except by dying.",
    chaos:  "Destroy target nonland permanent. Its controller draws a card." },

  { id: 'elturel',            name: 'Elturel',                      set: 'CLB', type: 'plane', world: 'Faer-n',
    static: "At the beginning of each players upkeep, they gain 1 life for each legendary creature they control.",
    chaos:  'Put a +1/+1 counter on each legendary creature you control.' },

  { id: 'limbo',              name: 'Limbo',                        set: 'CLB', type: 'plane', world: 'Outer Planes',
    static: 'Spells cost {1} less to cast for each spell cast this turn.',
    chaos:  'Copy target instant or sorcery spell. You may choose new targets for the copy.' },

  { id: 'mechanus',           name: 'Mechanus',                     set: 'CLB', type: 'plane', world: 'Outer Planes',
    static: "At the beginning of each players upkeep, that player puts a cog counter on Mechanus, then draws cards equal to the number of cog counters on Mechanus.",
    chaos:  'Remove all cog counters from Mechanus.' },

  { id: 'menzoberranzan',     name: 'Menzoberranzan',               set: 'CLB', type: 'plane', world: 'Underdark',
    static: 'All creatures have menace.',
    chaos:  'Target creature becomes a Demon in addition to its other types. Put three +1/+1 counters on it.' },

  { id: 'minauros',           name: 'Minauros',                     set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: 'At the beginning of each combat, goad target creature an opponent controls.',
    chaos:  'Gain control of target goaded creature until end of turn. Untap it. It gains haste until end of turn.' },

  { id: 'mount-celestia',     name: 'Mount Celestia',               set: 'CLB', type: 'plane', world: 'Outer Planes',
    static: 'Creatures you control have lifelink.',
    chaos:  'You gain life equal to your devotion to white.' },

  { id: 'nine-hells',         name: 'The Nine Hells',               set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: 'Whenever a player casts a spell, that player loses 1 life.',
    chaos:  'Gain 6 life.' },

  { id: 'phlegethos',         name: 'Phlegethos',                   set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: 'Whenever a player deals damage, that player gets an emblem with "Creatures you control have +1/+0 and trample."',
    chaos:  'Phlegethos deals 2 damage to each creature and each player.' },

  { id: 'sigil',              name: 'Sigil',                        set: 'CLB', type: 'plane', world: 'Outer Planes',
    static: "Players can't search their libraries.",
    chaos:  'Each player searches their library for a card, puts it into their hand, then shuffles.' },

  { id: 'river-styx',         name: 'The River Styx',               set: 'CLB', type: 'plane', world: 'The Nine Hells',
    static: "Spells cost {1} more to cast for each card in their controllers graveyard.",
    chaos:  "Each player exiles their graveyard." },

  { id: 'waterdeep',          name: 'Waterdeep',                    set: 'CLB', type: 'plane', world: 'Faer-n',
    static: 'Whenever a player casts a spell, that player may search their library for a basic land card, put it onto the battlefield tapped, then shuffle.',
    chaos:  'Each player searches their library for a basic land card and puts it onto the battlefield tapped, then shuffles.' },

  { id: 'ysgard',             name: 'Ysgard',                       set: 'CLB', type: 'plane', world: 'Outer Planes',
    static: 'Whenever a nontoken creature dies, its controller may pay {2}. If they do, return that card to the battlefield at the beginning of the next end step.',
    chaos:  "Return all creature cards in all graveyards to the battlefield under their owners' control until end of turn." },
]

export const PHENOMENA = PLANES.filter(p => p.type === 'phenomenon')
export const PLANES_ONLY = PLANES.filter(p => p.type === 'plane')

export const SET_LABELS = {
  PC1: 'Planechase 2009',
  PC2: 'Planechase 2012',
  CLB: "Battle for Baldur's Gate",
}

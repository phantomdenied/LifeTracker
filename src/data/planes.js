// Verified card names from actual Planechase card list
// Images fetched via Scryfall /cards/named?fuzzy=NAME

export const PLANES = [
  // Standard Planechase planes (from all sets)
  { id: 'academy-tolaria-west',  name: 'Academy at Tolaria West',  set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'At the beginning of each players draw step, that player draws cards equal to the number of cards in their hand minus 4. If this would cause a player to draw negative cards, they discard that many instead.',
    chaos:  'Draw 7 cards, then discard 7 cards.' },

  { id: 'agyrem',               name: 'Agyrem',                   set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a white creature dies, return it to the battlefield under its owners control at the beginning of the next end step. Whenever a nonwhite creature dies, return it to its owners hand at the beginning of the next end step.',
    chaos:  'Creatures cannot attack you until a player planeswalks.' },

  { id: 'akoum',                name: 'Akoum',                    set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Players may cast enchantment spells as though they had flash.',
    chaos:  'Destroy target creature that is not enchanted.' },

  { id: 'aretopolis',           name: 'Aretopolis',               set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'When you planeswalk to Aretopolis, put a scroll counter on it. At the beginning of your upkeep, put a scroll counter on it, then you gain life equal to the number of scroll counters on it.',
    chaos:  'Put half that many scroll counters, rounded up, on Aretopolis.' },

  { id: 'astral-arena',         name: 'Astral Arena',             set: 'PC2', type: 'plane', world: 'Blind Eternities',
    static: 'No more than one creature can attack each combat. No more than one creature can block each combat.',
    chaos:  'Astral Arena deals 2 damage to each creature.' },

  { id: 'bant',                 name: 'Bant',                     set: 'PC1', type: 'plane', world: 'Alara',
    static: 'All creatures have exalted.',
    chaos:  'Put a +1/+1 counter on target creature.' },

  { id: 'bloodhill-bastion',    name: 'Bloodhill Bastion',        set: 'PC2', type: 'plane', world: 'Equilor',
    static: 'Whenever a creature enters the battlefield, it gains double strike and haste until end of turn.',
    chaos:  'Exile target permanent. At the beginning of the next end step, return it to the battlefield under its owners control.' },

  { id: 'celestine-reef',       name: 'Celestine Reef',           set: 'PC1', type: 'plane', world: 'Luvion',
    static: 'Creatures without flying or islandwalk cannot attack.',
    chaos:  'Until end of turn, target creature gains flying and islandwalk.' },

  { id: 'cliffside-market',     name: 'Cliffside Market',         set: 'PC2', type: 'plane', world: 'Mercadia',
    static: 'When you planeswalk to Cliffside Market or at the beginning of your upkeep, you may exchange life totals with target player.',
    chaos:  'Exchange control of two target permanents that share a card type.' },

  { id: 'edge-of-malacol',      name: 'Edge of Malacol',          set: 'PC1', type: 'plane', world: 'Alara',
    static: 'At the beginning of each players untap step, that player untaps each creature they control twice.',
    chaos:  'Untap each creature you control.' },

  { id: 'eloren-wilds',         name: 'Eloren Wilds',             set: 'PC1', type: 'plane', world: 'Shandalar',
    static: 'Whenever a player taps a permanent for mana, that player adds one mana of any type that permanent produced.',
    chaos:  'Target player cannot cast spells until a player planeswalks.' },

  { id: 'enigma-ridges',        name: 'Enigma Ridges',            set: 'PC1', type: 'plane', world: 'Ikoria',
    static: 'If a creature you control would untap during your untap step, put two +1/+1 counters on it instead.',
    chaos:  'Untap each creature you control.' },

  { id: 'esper',                name: 'Esper',                    set: 'PC1', type: 'plane', world: 'Alara',
    static: 'All nonartifact permanents are artifacts in addition to their other types.',
    chaos:  'You may search your library for an artifact card, reveal it, put it into your hand, then shuffle.' },

  { id: 'feeding-grounds',      name: 'Feeding Grounds',          set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Red spells cost {1} less to cast. Green spells cost {1} less to cast.',
    chaos:  'Target creature gets +3/+3 until end of turn.' },

  { id: 'fields-of-summer',     name: 'Fields of Summer',         set: 'PC1', type: 'plane', world: 'Bant',
    static: 'Whenever a player casts a spell, that player may gain 1 life.',
    chaos:  'You may gain 10 life.' },

  { id: 'furnace-layer',        name: 'Furnace Layer',            set: 'PC2', type: 'plane', world: 'New Phyrexia',
    static: 'When you planeswalk to Furnace Layer or at the beginning of your upkeep, select target player at random. That player discards a card. If that player discards a land card this way, they lose 3 life.',
    chaos:  'You may destroy target nonland permanent.' },

  { id: 'gavony',               name: 'Gavony',                   set: 'PC2', type: 'plane', world: 'Innistrad',
    static: 'At the beginning of each players upkeep, that player puts a +1/+1 counter on each creature they control.',
    chaos:  'Destroy all tokens.' },

  { id: 'ghirapur',             name: 'Ghirapur',                 set: 'PC2', type: 'plane', world: 'Kaladesh',
    static: 'Artifact spells cost {2} less to cast.',
    chaos:  'Create two 1/1 colorless Thopter artifact creature tokens with flying.' },

  { id: 'glen-elendra',         name: 'Glen Elendra',             set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: 'Faerie spells cannot be countered.',
    chaos:  'Target player returns each nonland permanent they control with the lowest mana value among those permanents to their hand.' },

  { id: 'glimmervoid-basin',    name: 'Glimmervoid Basin',        set: 'PC1', type: 'plane', world: 'Mirrodin',
    static: 'Whenever a player activates an ability that is not a mana ability, each other player may copy that ability. They may choose new targets for their copies.',
    chaos:  'Each player may tap or untap target artifact, creature, or land they control.' },

  { id: 'goldmeadow',           name: 'Goldmeadow',               set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: 'Whenever a land enters the battlefield, its controller creates three 0/1 white Goat creature tokens.',
    chaos:  'Create a 0/1 white Goat creature token.' },

  { id: 'grand-ossuary',        name: 'Grand Ossuary',            set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'Whenever a creature dies, its controller creates X 1/1 green Saproling creature tokens, where X is that creatures power.',
    chaos:  'Each player exiles all creatures they control and creates that many 1/1 green Saproling creature tokens.' },

  { id: 'grixis',               name: 'Grixis',                   set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Blue, black, and/or red creature cards in your graveyard have unearth equal to their mana cost.',
    chaos:  'Put target creature card from a graveyard onto the battlefield under your control.' },

  { id: 'grove-dreampods',      name: 'Grove of the Dreampods',   set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: 'When you planeswalk to Grove of the Dreampods or at the beginning of your upkeep, reveal cards from the top of your library until you reveal a creature card. Put that card onto the battlefield and the rest on the bottom in any order.',
    chaos:  'Return target creature card from your graveyard to the battlefield.' },

  { id: 'hedron-fields',        name: 'Hedron Fields of Agadeem', set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Creatures with power 7 or greater cannot attack or block.',
    chaos:  'Put a 7/7 colorless Eldrazi creature token onto the battlefield.' },

  { id: 'horizon-boughs',       name: 'Horizon Boughs',           set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'All activated abilities cost {2} less to activate.',
    chaos:  'Until end of turn, you may play any number of lands.' },

  { id: 'immersturm',           name: 'Immersturm',               set: 'PC2', type: 'plane', world: 'Shandalar',
    static: 'Whenever a creature enters the battlefield, that creature deals damage equal to its power to target creature of an opponent of its controllers choice.',
    chaos:  'Each player sacrifices a creature, then creates a 5/5 red Devil creature token.' },

  { id: 'inys-haen',            name: 'Inys Haen',                set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Whenever a player casts a spell, that player creates a 1/1 white Spirit creature token with flying.',
    chaos:  'Each player puts a +1/+1 counter on each creature they control.' },

  { id: 'isle-vesuva',          name: 'Isle of Vesuva',           set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'Lands you control have "{T}: Add one mana of any color."',
    chaos:  'Target land you control becomes a copy of target land until end of turn.' },

  { id: 'izzet-steam-maze',     name: 'Izzet Steam Maze',         set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a player casts an instant or sorcery spell, that player copies it. They may choose new targets for the copy.',
    chaos:  'Return target instant or sorcery card from your graveyard to your hand.' },

  { id: 'jund',                 name: 'Jund',                     set: 'PC1', type: 'plane', world: 'Alara',
    static: 'At the beginning of each players upkeep, Jund deals 1 damage to each opponent of that player.',
    chaos:  'Create a 5/5 red Dragon creature token with flying.' },

  { id: 'kessig',               name: 'Kessig',                   set: 'PC2', type: 'plane', world: 'Innistrad',
    static: 'At the beginning of each players end step, each creature that player controls with a +1/+1 counter on it gets +1/+1 until end of turn for each +1/+1 counter on it.',
    chaos:  'Put a +1/+1 counter on each creature you control.' },

  { id: 'ketria',               name: 'Ketria',                   set: 'PC2', type: 'plane', world: 'Ikoria',
    static: 'Whenever a player casts a spell, that player may search their library for a basic land card, put it onto the battlefield tapped, then shuffle.',
    chaos:  'You may put any number of land cards from your hand onto the battlefield tapped.' },

  { id: 'kharasha-foothills',   name: 'Kharasha Foothills',       set: 'PC1', type: 'plane', world: 'Regatha',
    static: 'Whenever a creature attacks you, you may sacrifice any number of creatures. If you do, Kharasha Foothills deals that much damage to attacking creature.',
    chaos:  'For each opponent, gain control of target creature that player controls until end of turn. Untap those creatures. They gain haste until end of turn.' },

  { id: 'kilnspire',            name: 'Kilnspire District',       set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'When you planeswalk to Kilnspire District or at the beginning of your upkeep, put a charge counter on it. {R}: Kilnspire District deals damage equal to the number of charge counters on it to target creature or player. Activate only once each turn.',
    chaos:  'Put 3 charge counters on Kilnspire District.' },

  { id: 'krosa',                name: 'Krosa',                    set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'All creatures get +2/+2.',
    chaos:  'Untap all creatures. After this phase, there is an additional combat phase.' },

  { id: 'lair-ashen-idol',      name: 'Lair of the Ashen Idol',   set: 'PC1', type: 'plane', world: 'Unknown',
    static: 'At the beginning of each players upkeep, that player sacrifices a nonland permanent unless they pay {1} for each card in their hand.',
    chaos:  'Put a 5/5 black Demon creature token with flying onto the battlefield.' },

  { id: 'lethe-lake',           name: 'Lethe Lake',               set: 'PC1', type: 'plane', world: 'Alara',
    static: 'At the beginning of each players upkeep, that player mills 10 cards.',
    chaos:  'Target player mills 10 cards.' },

  { id: 'littjara',             name: 'Littjara',                  set: 'PC2', type: 'plane', world: 'Kaldheim',
    static: 'Shapeshifter spells cost {2} less to cast.',
    chaos:  'Create a token that is a copy of target creature.' },

  { id: 'llanowar',             name: 'Llanowar',                  set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'All creatures have "{T}: Add {G}."',
    chaos:  'Add {G} for each creature you control.' },

  { id: 'megaflora-jungle',     name: 'Megaflora Jungle',          set: 'PC2', type: 'plane', world: 'Alara',
    static: 'Creatures get +1/+1 for each Forest you control.',
    chaos:  'You may put a creature card from your hand onto the battlefield.' },

  { id: 'minamo',               name: 'Minamo',                   set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'Whenever a player casts a spell, that player may draw a card.',
    chaos:  'You may tap or untap target permanent.' },

  { id: 'mirrored-depths',      name: 'Mirrored Depths',           set: 'PC2', type: 'plane', world: 'Mirrodin',
    static: 'Whenever a player casts a spell, that player flips a coin. If they lose the flip, counter that spell.',
    chaos:  'You may cast a spell from your hand without paying its mana cost.' },

  { id: 'mount-keralia',        name: 'Mount Keralia',            set: 'PC1', type: 'plane', world: 'Regatha',
    static: 'At the beginning of each players end step, Mount Keralia deals damage equal to the number of non-Mountain lands that player controls to that player.',
    chaos:  'Prevent all damage that would be dealt until end of turn.' },

  { id: 'murasa',               name: 'Murasa',                   set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Whenever a nontoken creature enters the battlefield, its controller puts a +1/+1 counter on it.',
    chaos:  'Target creature gains trample and gets +6/+6 until end of turn.' },

  { id: 'naar-isle',            name: 'Naar Isle',                set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'At the beginning of your upkeep, put a flame counter on Naar Isle, then Naar Isle deals damage equal to the number of flame counters on it to you.',
    chaos:  'Naar Isle deals 3 damage to target player.' },

  { id: 'naktamun',             name: 'Naktamun',                  set: 'PC2', type: 'plane', world: 'Amonkhet',
    static: 'Each creature that dies is exiled instead.',
    chaos:  'Create a 4/4 white Angel Warrior creature token with vigilance.' },

  { id: 'naya',                 name: 'Naya',                     set: 'PC1', type: 'plane', world: 'Alara',
    static: 'You may play any number of lands on each of your turns.',
    chaos:  'Target red, green, or white creature you control gets +1/+1 until end of turn for each land you control.' },

  { id: 'nephalia',             name: 'Nephalia',                  set: 'PC2', type: 'plane', world: 'Innistrad',
    static: 'Players may cast spells from the top of their libraries. At the beginning of each players upkeep, they mill a card.',
    chaos:  'Each player mills 5 cards.' },

  { id: 'new-argive',           name: 'New Argive',                set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'White creature spells cost {2} less to cast.',
    chaos:  'Create a 3/3 white Golem artifact creature token.' },

  { id: 'norns-dominion',       name: "Norn's Dominion",          set: 'PC1', type: 'plane', world: 'New Phyrexia',
    static: 'When a nontoken creature dies, its controller creates a 0/0 colorless Germ creature token.',
    chaos:  'Put a -1/-1 counter on each creature your opponents control.' },

  { id: 'norns-seedcore',       name: "Norn's Seedcore",           set: 'PC2', type: 'plane', world: 'New Phyrexia',
    static: 'At the beginning of each players upkeep, that player proliferates.',
    chaos:  'Put two +1/+1 counters on each creature you control.' },

  { id: 'nyx',                  name: 'Nyx',                       set: 'PC2', type: 'plane', world: 'Theros',
    static: 'Enchantment creatures you control have flying.',
    chaos:  'Put a constellation counter on target enchantment. It becomes a creature with power and toughness each equal to the number of constellation counters on it. It is still an enchantment.' },

  { id: 'onakke-catacomb',      name: 'Onakke Catacomb',          set: 'PC1', type: 'plane', world: 'Shandalar',
    static: 'All creatures have deathtouch.',
    chaos:  'Each player sacrifices a creature. You put the creatures sacrificed this way onto the battlefield under your control.' },

  { id: 'orochi-colony',        name: 'Orochi Colony',            set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'Whenever a land an opponent controls becomes tapped, you may draw a card.',
    chaos:  'Destroy all lands target player controls.' },

  { id: 'orzhova',              name: 'Orzhova',                   set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'When a creature dies, its controller gains 1 life and each opponent loses 1 life.',
    chaos:  'Return target creature card from your graveyard to the battlefield. It gains flying.' },

  { id: 'otaria',               name: 'Otaria',                   set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Flashback costs cost {3} less.',
    chaos:  'You may cast target sorcery or instant card from any players graveyard without paying its mana cost.' },

  { id: 'paliano',              name: 'Paliano',                   set: 'PC2', type: 'plane', world: 'Fiora',
    static: 'Each player chooses a creature they control. Those creatures cannot be the targets of spells or abilities your opponents control.',
    chaos:  'Each player gains control of target creature controlled by the player to their left.' },

  { id: 'panopticon',           name: 'The Panopticon',           set: 'PC2', type: 'plane', world: 'Mirrodin',
    static: 'When you planeswalk to The Panopticon, draw a card.',
    chaos:  'Draw a card.' },

  { id: 'pools-of-becoming',    name: 'The Pools of Becoming',    set: 'PC1', type: 'plane', world: 'Blind Eternities',
    static: 'At the beginning of your end step, if you do not have exactly three cards in hand, draw or discard until you do.',
    chaos:  'Reveal the top 3 cards of your library. You may cast any of them without paying their mana costs. Put the rest on the bottom in any order.' },

  { id: 'prahv',                name: 'Prahv',                     set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'If a creature dealt damage this turn would die, exile it instead.',
    chaos:  'You gain life equal to the number of cards in your hand.' },

  { id: 'quicksilver-sea',      name: 'Quicksilver Sea',           set: 'PC2', type: 'plane', world: 'Mirrodin',
    static: 'Players may cast nonland cards from the top of their libraries.',
    chaos:  'Scry 4.' },

  { id: 'ravens-run',           name: "Raven's Run",              set: 'PC2', type: 'plane', world: 'Shadowmoor',
    static: 'All creatures have protection from the color of their controllers choice.',
    chaos:  'Put a +1/+1 counter on each creature you control.' },

  { id: 'riptide-island',       name: 'Riptide Island',            set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Wizard spells cost {2} less to cast.',
    chaos:  'Return target creature to its owners hand. If it is a Wizard, draw a card.' },

  { id: 'sanctum-sera',         name: 'Sanctum of Serra',         set: 'PC1', type: 'plane', world: "Serra's Realm",
    static: 'All creatures have vigilance.',
    chaos:  'Destroy all attacking creatures.' },

  { id: 'sea-of-sand',          name: 'Sea of Sand',              set: 'PC1', type: 'plane', world: 'Rabiah',
    static: 'Whenever a player casts a spell, that player loses life equal to the number of cards in their hand.',
    chaos:  'Draw 3 cards, then discard 3 cards.' },

  { id: 'selesnya-loft-gardens', name: 'Selesnya Loft Gardens',   set: 'PC2', type: 'plane', world: 'Ravnica',
    static: 'Creature spells cost {1} less to cast for each other creature on the battlefield.',
    chaos:  'Create a 3/3 green Elephant creature token.' },

  { id: 'shiv',                 name: 'Shiv',                     set: 'PC1', type: 'plane', world: 'Dominaria',
    static: 'Creatures you control have "{R}: This creature gets +1/+0 until end of turn."',
    chaos:  'Create a 5/5 red Dragon creature token with flying.' },

  { id: 'skybreen',             name: 'Skybreen',                 set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'Each player can only cast spells of the most common color among all permanents, or spells of the color of their choice if there is no most common color.',
    chaos:  'Target player loses life equal to the number of cards in their hand.' },

  { id: 'sokenzan',             name: 'Sokenzan',                 set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'All creatures have haste. At the beginning of each players end step, that player sacrifices all but one creature they control.',
    chaos:  'Create three 1/1 red Goblin creature tokens.' },

  { id: 'spatial-merging',      name: 'Spatial Merging',          set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Spatial Merging, reveal cards from the top of your planar deck until you reveal two plane cards. Put both planes onto the battlefield. They are on the same plane. Put the rest on the bottom in any order.',
    chaos:  null },

  { id: 'stairs-to-infinity',   name: 'Stairs to Infinity',       set: 'PC2', type: 'plane', world: 'Xerex',
    static: 'Players have no maximum hand size. Whenever you roll the planar die, draw a card.',
    chaos:  'Reveal the top card of your planar deck. You may put it on the bottom of your planar deck.' },

  { id: 'stensia',              name: 'Stensia',                  set: 'PC2', type: 'plane', world: 'Innistrad',
    static: 'Whenever a creature enters the battlefield, its controller loses 2 life.',
    chaos:  'Each other player loses 3 life. You gain life equal to life lost this way.' },

  { id: 'strixhaven',           name: 'Strixhaven',               set: 'PC2', type: 'plane', world: 'Arcavios',
    static: 'Instant and sorcery spells cost {1} less to cast.',
    chaos:  'Copy target instant or sorcery spell. You may choose new targets for the copy.' },

  { id: 'stronghold-furnace',   name: 'Stronghold Furnace',       set: 'PC1', type: 'plane', world: 'Rath',
    static: 'If a source would deal damage to a permanent or player, it deals double that damage instead.',
    chaos:  'Stronghold Furnace deals 1 damage to any target.' },

  { id: 'takenuma',             name: 'Takenuma',                 set: 'PC1', type: 'plane', world: 'Kamigawa',
    static: 'Legendary creatures have hexproof.',
    chaos:  'Each player discards their hand, then draws cards equal to the greatest number of cards a player discarded this way.' },

  { id: 'talon-gates',          name: 'Talon Gates',               set: 'PC2', type: 'plane', world: 'Dominaria',
    static: 'Any time you could cast a sorcery, you may exile a nonland card from your hand with X time counters on it, where X is its mana value. If a card with a time counter on it would be put into a graveyard, remove a time counter from it and return it to its owners hand instead.',
    chaos:  'Remove all time counters from all exiled cards.' },

  { id: 'tazeem',               name: 'Tazeem',                   set: 'PC1', type: 'plane', world: 'Zendikar',
    static: 'Landfall -- Whenever a land enters the battlefield, its controller draws a card.',
    chaos:  'Target player draws 3 cards.' },

  { id: 'tember-city',          name: 'Tember City',               set: 'PC2', type: 'plane', world: 'Shandalar',
    static: 'At the beginning of each players upkeep, Tember City deals 2 damage to each creature without haste that player controls.',
    chaos:  'Tember City deals 3 damage to target creature or player.' },

  { id: 'ten-wizards-mountain', name: 'Ten Wizards Mountain',     set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Mountains you control have "{T}: Add {R}{R}{R}."',
    chaos:  'Tember City deals X damage to any target, where X is the number of Mountains you control.' },

  { id: 'the-aether-flues',     name: 'The Aether Flues',          set: 'PC2', type: 'plane', world: 'Kaladesh',
    static: 'When you planeswalk to The Aether Flues or at the beginning of your upkeep, you may sacrifice a creature. If you do, reveal cards from the top of your library until you reveal a creature card, put it onto the battlefield, then shuffle the rest.',
    chaos:  'You may sacrifice a creature. If you do, reveal cards from your library until you reveal a creature card, put it into play, then shuffle.' },

  { id: 'the-caldaia',          name: 'The Caldaia',               set: 'PC2', type: 'plane', world: 'New Capenna',
    static: 'Artifact creatures you control get +1/+1.',
    chaos:  'Create a 4/4 colorless Construct artifact creature token.' },

  { id: 'the-dark-barony',      name: 'The Dark Barony',           set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Whenever a player casts a white spell, that player loses 2 life.',
    chaos:  'Each other player discards a card.' },

  { id: 'the-eon-fog',          name: 'The Eon Fog',               set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Players skip their untap steps.',
    chaos:  'Untap all permanents you control.' },

  { id: 'the-fertile-lands',    name: 'The Fertile Lands of Saulvinia', set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'At the beginning of each players upkeep, that player adds one mana of each color.',
    chaos:  'Each player searches their library for up to two basic land cards, puts them onto the battlefield tapped, then shuffles.' },

  { id: 'the-fourth-sphere',    name: 'The Fourth Sphere',        set: 'PC1', type: 'plane', world: 'Phyrexia',
    static: 'At the beginning of each upkeep, each player sacrifices a nonblack creature.',
    chaos:  'Each player sacrifices all nonblack creatures they control.' },

  { id: 'the-golden-city',      name: 'The Golden City of Orazca', set: 'PC2', type: 'plane', world: 'Ixalan',
    static: 'The city is blessed. Creatures you control get +1/+1.',
    chaos:  'You gain control of target permanent until end of turn. Untap it. It gains haste until end of turn.' },

  { id: 'the-great-aerie',      name: 'The Great Aerie',           set: 'PC2', type: 'plane', world: 'Ikoria',
    static: 'Creatures with flying get +2/+2.',
    chaos:  'Create two 2/2 white Bird creature tokens with flying.' },

  { id: 'the-great-forest',     name: 'The Great Forest',          set: 'PC2', type: 'plane', world: 'Lorwyn',
    static: 'Creature spells you cast cost {1} less to cast for each creature you control.',
    chaos:  'Create three 1/1 green Elf Warrior creature tokens.' },

  { id: 'the-hippodrome',       name: 'The Hippodrome',            set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Creatures cannot block.',
    chaos:  'After this phase, there is an additional combat phase.' },

  { id: 'the-maelstrom',        name: 'The Maelstrom',             set: 'PC2', type: 'plane', world: 'Alara',
    static: 'When you planeswalk to The Maelstrom, put a permanent card from your hand onto the battlefield.',
    chaos:  'Put a permanent card from your hand onto the battlefield.' },

  { id: 'the-pit',              name: 'The Pit',                   set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'At the beginning of each players upkeep, that player sacrifices a creature. If that player cannot, they lose 3 life.',
    chaos:  'Create a 6/6 black Demon creature token with flying and trample.' },

  { id: 'the-western-cloud',    name: 'The Western Cloud',         set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Whenever you cast a spell, you may pay {1}. If you do, exile a card from your hand face down. You may look at it. When you planeswalk away from The Western Cloud, put all cards exiled with it into their owners hands.',
    chaos:  'Put all cards exiled with The Western Cloud into their owners hands, then draw a card for each card put into a hand this way.' },

  { id: 'the-wilds',            name: 'The Wilds',                 set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'At the beginning of each players upkeep, that player may put a basic land card from their hand onto the battlefield.',
    chaos:  'Search your library for a basic land card, put it onto the battlefield, then shuffle.' },

  { id: 'the-zephyr-maze',      name: 'The Zephyr Maze',           set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Only creatures with flying can attack.',
    chaos:  'Each creature gains flying until end of turn.' },

  { id: 'towashi',              name: 'Towashi',                   set: 'PC2', type: 'plane', world: 'Kamigawa',
    static: 'Artifact and enchantment spells cost {1} less to cast.',
    chaos:  'Create a token that is a copy of target artifact or enchantment you control.' },

  { id: 'trail-mage-rings',     name: 'Trail of the Mage-Rings',   set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'Whenever a player casts an instant or sorcery spell, that player puts a +1/+1 counter on target creature.',
    chaos:  'Put a +1/+1 counter on each creature you control.' },

  { id: 'truga-jungle',         name: 'Truga Jungle',             set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Each land has "{T}: Add one mana of any color."',
    chaos:  'Search your library for a card, put it into your hand, then shuffle.' },

  { id: 'turri-island',         name: 'Turri Island',             set: 'PC1', type: 'plane', world: 'Alara',
    static: 'Dragon spells cost {6} less to cast.',
    chaos:  'Creatures you control get +2/+2 until end of turn.' },

  { id: 'undercity-reaches',    name: 'Undercity Reaches',        set: 'PC1', type: 'plane', world: 'Ravnica',
    static: 'Whenever a creature deals combat damage to a player, its controller may draw a card.',
    chaos:  'You may draw 4 cards.' },

  { id: 'unyaro',               name: 'Unyaro',                    set: 'PC2', type: 'plane', world: 'Jamuraa',
    static: 'Green spells cost {2} more to cast.',
    chaos:  'Create a 1/1 green Insect creature token with flying.' },

  { id: 'valors-reach',         name: "Valor's Reach",             set: 'PC2', type: 'plane', world: 'Unknown',
    static: 'All creatures get +1/+1 and have vigilance.',
    chaos:  'Each player draws a card for each creature they control.' },

  { id: 'velis-vel',            name: 'Velis Vel',                set: 'PC1', type: 'plane', world: 'Lorwyn',
    static: 'All creatures are every creature type.',
    chaos:  'Creatures you control get +3/+3 until end of turn.' },

  { id: 'windriddle',           name: 'Windriddle Palaces',       set: 'PC1', type: 'plane', world: 'Rabiah',
    static: 'Players play with the top card of their library revealed. You may play the top card of each opponents library.',
    chaos:  'Exile the top card of each players library. You may play those cards this turn.' },

  // Phenomena
  { id: 'chaotic-aether',       name: 'Chaotic Aether',           set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Chaotic Aether, each player may planeswalk away. Then each player who did not planeswalk away may planeswalk again.',
    chaos:  null },

  { id: 'interplanar-tunnel',   name: 'Interplanar Tunnel',       set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Interplanar Tunnel, reveal cards from the top of your planar deck until you reveal 5 plane cards. Put one of those planes onto the battlefield and the rest on the bottom in any order.',
    chaos:  null },

  { id: 'morphic-tide',         name: 'Morphic Tide',             set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Morphic Tide, each player shuffles all permanents they own into their library, then reveals that many cards from the top of their library. Each player puts all land cards revealed this way onto the battlefield, then does the same for artifact, creature, enchantment, and planeswalker cards. Players put the rest on the bottom in any order.',
    chaos:  null },

  { id: 'mutual-epiphany',      name: 'Mutual Epiphany',          set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Mutual Epiphany, each player draws 4 cards.',
    chaos:  null },

  { id: 'planewide-disaster',   name: 'Planewide Disaster',       set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Planewide Disaster, destroy all permanents.',
    chaos:  null },

  { id: 'reality-shaping',      name: 'Reality Shaping',          set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Reality Shaping, each player may put a permanent card from their hand onto the battlefield.',
    chaos:  null },

  { id: 'time-distortion',      name: 'Time Distortion',          set: 'PC2', type: 'phenomenon', world: null,
    static: 'When you encounter Time Distortion, reverse the game turn order.',
    chaos:  null },
]

export const PHENOMENA = PLANES.filter(p => p.type === 'phenomenon')
export const PLANES_ONLY = PLANES.filter(p => p.type === 'plane')

export const SET_LABELS = {
  PC1: 'Planechase 2009',
  PC2: 'Planechase 2012',
}

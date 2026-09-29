/* ══════════════════════════════════════════════════════════════
   GALLERY & PROJECT DATA FILE (gallery-data.js)
   
   HOW TO ADD / EDIT ITEMS:
   1. Drop your media into the appropriate folder:
      - /assets/games/cpp/
      - /assets/games/blueprints/
      - /assets/photography/
      - /assets/videos/
   2. Add or update an entry below.
   3. The Gallery, Project pages, and Photography page will
      automatically load your content without touching HTML layout!
   ══════════════════════════════════════════════════════════════ */

// ── 1. C++ GAMEPLAY SCREENSHOTS (6 Items, 16:9 Aspect Ratio) ────
const GALLERY_CPP_GAMES = [
  {
    id: 'cpp-shot-1',
    section: 'cpp',
    title: 'Forest Overview',
    caption: 'Forest Overview',
    src: 'assets/games/cpp/cpp-forest-overview.webp',
    fallback: 'assets/games/cpp/cpp-forest-overview.jpg',
    full: 'assets/games/cpp/cpp-forest-overview.png',
    alt: 'Forest overview in Unreal Engine 5 Action RPG'
  },
  {
    id: 'cpp-shot-2',
    section: 'cpp',
    title: 'Ground Level View',
    caption: 'Ground Level View',
    src: 'assets/games/cpp/cpp-forest-ground.webp',
    fallback: 'assets/games/cpp/cpp-forest-ground.jpg',
    full: 'assets/games/cpp/cpp-forest-ground.png',
    alt: 'Ground level forest view in Unreal Engine 5 Action RPG'
  },
  {
    id: 'cpp-shot-3',
    section: 'cpp',
    title: 'Raptor Encounter',
    caption: 'Raptor Encounter',
    src: 'assets/games/cpp/cpp-forest-raptor.webp',
    fallback: 'assets/games/cpp/cpp-forest-raptor.jpg',
    full: 'assets/games/cpp/cpp-forest-raptor.png',
    alt: 'Raptor encounter in forest environment'
  },
  {
    id: 'cpp-shot-4',
    section: 'cpp',
    title: 'Paladin Exploration',
    caption: 'Paladin Exploration',
    src: 'assets/games/cpp/cpp-paladin-view.webp',
    fallback: 'assets/games/cpp/cpp-paladin-view.jpg',
    full: 'assets/games/cpp/cpp-paladin-view.png',
    alt: 'Paladin character exploration view'
  },
  {
    id: 'cpp-shot-5',
    section: 'cpp',
    title: 'Combat & Soul Drops',
    caption: 'Combat & Soul Drops',
    src: 'assets/games/cpp/videos/combat-soul-drop.jpg',
    fallback: 'assets/games/cpp/videos/combat-soul-drop.jpg',
    full: 'assets/games/cpp/videos/combat-soul-drop.jpg',
    alt: 'Third-person combat engagement with soul drops'
  },
  {
    id: 'cpp-shot-6',
    section: 'cpp',
    title: 'Enemy Patrol',
    caption: 'Enemy Patrol',
    src: 'assets/games/cpp/videos/sword-equip-insect-patrol.jpg',
    fallback: 'assets/games/cpp/videos/sword-equip-insect-patrol.jpg',
    full: 'assets/games/cpp/videos/sword-equip-insect-patrol.jpg',
    alt: 'Enemy patrol routine in forest glade'
  }
];

// ── 2. BLUEPRINT GAMEPLAY SCREENSHOTS (6 Items, 16:9 Aspect Ratio) 
const GALLERY_BP_GAMES = [
  {
    id: 'bp-shot-1',
    section: 'blueprints',
    title: 'Village Aerial View',
    caption: 'Village Aerial View',
    src: 'assets/games/blueprints/Map-1600w.webp',
    fallback: 'assets/games/blueprints/Map-1600w.jpg',
    full: 'assets/games/blueprints/originals/Map.png',
    alt: 'Aerial overview of village level'
  },
  {
    id: 'bp-shot-2',
    section: 'blueprints',
    title: 'Village Ground View',
    caption: 'Village Ground View',
    src: 'assets/games/blueprints/Map2-1600w.webp',
    fallback: 'assets/games/blueprints/Map2-1600w.jpg',
    full: 'assets/games/blueprints/originals/Map2.png',
    alt: 'Ground level view of village paths'
  },
  {
    id: 'bp-shot-3',
    section: 'blueprints',
    title: 'Enemy Patrol & Chase',
    caption: 'Enemy Patrol & Chase',
    src: 'assets/games/blueprints/Enemy_chasing-1600w.webp',
    fallback: 'assets/games/blueprints/Enemy_chasing-1600w.jpg',
    full: 'assets/games/blueprints/originals/Enemy_chasing.png',
    alt: 'Enemy AI chasing player through village'
  },
  {
    id: 'bp-shot-4',
    section: 'blueprints',
    title: 'Enemy Axe Attack',
    caption: 'Enemy Axe Attack',
    src: 'assets/games/blueprints/Enemy_Attacking-1600w.webp',
    fallback: 'assets/games/blueprints/Enemy_Attacking-1600w.jpg',
    full: 'assets/games/blueprints/originals/Enemy_Attacking.png',
    alt: 'Enemy swinging axe at player'
  },
  {
    id: 'bp-shot-5',
    section: 'blueprints',
    title: 'Coin Collection & HUD',
    caption: 'Coin Collection & HUD',
    src: 'assets/games/blueprints/Jumping-1600w.webp',
    fallback: 'assets/games/blueprints/Jumping-1600w.jpg',
    full: 'assets/games/blueprints/originals/Jumping.png',
    alt: 'Coin collection gameplay and HUD counter'
  },
  {
    id: 'bp-shot-6',
    section: 'blueprints',
    title: 'Village Level Overview',
    caption: 'Village Level Overview',
    src: 'assets/games/blueprints/project-overview.png',
    fallback: 'assets/games/blueprints/project-overview.png',
    full: 'assets/games/blueprints/project-overview.png',
    alt: 'Village level gameplay perspective'
  }
];

// ── 3. PHOTOGRAPHY (10 Photos for Gallery Masonry Grid) ─────────
const GALLERY_PHOTOS = [
  {
    id: 'photo-1',
    section: 'photography',
    title: 'Two Silhouettes',
    tag: 'Street',
    src: 'assets/photography/bench-silhouettes.jpg',
    webp: 'assets/photography/bench-silhouettes.webp',
    thumb: 'assets/photography/bench-silhouettes-thumb.jpg',
    thumbWebp: 'assets/photography/bench-silhouettes-thumb.webp',
    full: 'assets/photography/bench-silhouettes.jpg',
    alt: 'Two silhouettes, one warm light'
  },
  {
    id: 'photo-2',
    section: 'photography',
    title: 'Courtyard Nap',
    tag: 'Street',
    src: 'assets/photography/courtyard-nap.jpg',
    webp: 'assets/photography/courtyard-nap.webp',
    thumb: 'assets/photography/courtyard-nap-thumb.jpg',
    thumbWebp: 'assets/photography/courtyard-nap-thumb.webp',
    full: 'assets/photography/courtyard-nap.jpg',
    alt: 'An afternoon nap, man and dog'
  },
  {
    id: 'photo-3',
    section: 'photography',
    title: 'Magenta Portrait',
    tag: 'Portrait',
    src: 'assets/photography/magenta-portrait.jpg',
    webp: 'assets/photography/magenta-portrait.webp',
    thumb: 'assets/photography/magenta-portrait-thumb.jpg',
    thumbWebp: 'assets/photography/magenta-portrait-thumb.webp',
    full: 'assets/photography/magenta-portrait.jpg',
    alt: 'Long-exposure portrait in magenta light'
  },
  {
    id: 'photo-4',
    section: 'photography',
    title: 'Dancer in Smoke',
    tag: 'Performance',
    src: 'assets/photography/dancer-smoke.jpg',
    webp: 'assets/photography/dancer-smoke.webp',
    thumb: 'assets/photography/dancer-smoke-thumb.jpg',
    thumbWebp: 'assets/photography/dancer-smoke-thumb.webp',
    full: 'assets/photography/dancer-smoke.jpg',
    alt: 'A dancer caught mid-spin'
  },
  {
    id: 'photo-5',
    section: 'photography',
    title: 'Bus Candid',
    tag: 'Street',
    src: 'assets/photography/bus-candid.jpg',
    webp: 'assets/photography/bus-candid.webp',
    thumb: 'assets/photography/bus-candid-thumb.jpg',
    thumbWebp: 'assets/photography/bus-candid-thumb.webp',
    full: 'assets/photography/bus-candid.jpg',
    alt: 'A quiet exchange on a crowded bus'
  },
  {
    id: 'photo-6',
    section: 'photography',
    title: 'Foggy Path',
    tag: 'Atmosphere',
    src: 'assets/photography/foggy-path.jpg',
    webp: 'assets/photography/foggy-path.webp',
    thumb: 'assets/photography/foggy-path-thumb.jpg',
    thumbWebp: 'assets/photography/foggy-path-thumb.webp',
    full: 'assets/photography/foggy-path.jpg',
    alt: 'Walking into the fog'
  },
  {
    id: 'photo-7',
    section: 'photography',
    title: 'Night Crossing',
    tag: 'Atmosphere',
    src: 'assets/photography/night-crossing.jpg',
    webp: 'assets/photography/night-crossing.webp',
    thumb: 'assets/photography/night-crossing-thumb.jpg',
    thumbWebp: 'assets/photography/night-crossing-thumb.webp',
    full: 'assets/photography/night-crossing.jpg',
    alt: 'Crossing under a single light'
  },
  {
    id: 'photo-8',
    section: 'photography',
    title: 'Kitten in Leaves',
    tag: 'Nature',
    src: 'assets/photography/kitten-leaves.jpg',
    webp: 'assets/photography/kitten-leaves.webp',
    thumb: 'assets/photography/kitten-leaves-thumb.jpg',
    thumbWebp: 'assets/photography/kitten-leaves-thumb.webp',
    full: 'assets/photography/kitten-leaves.jpg',
    alt: 'A kitten among the leaves'
  },
  {
    id: 'photo-9',
    section: 'photography',
    title: 'Market Nap',
    tag: 'Street',
    src: 'assets/photography/market-nap.jpg',
    webp: 'assets/photography/market-nap.webp',
    thumb: 'assets/photography/market-nap-thumb.jpg',
    thumbWebp: 'assets/photography/market-nap-thumb.webp',
    full: 'assets/photography/market-nap.jpg',
    alt: 'Asleep on a market afternoon'
  },
  {
    id: 'photo-10',
    section: 'photography',
    title: 'Neon Swing',
    tag: 'Landscape',
    src: 'assets/photography/neon-swing.jpg',
    webp: 'assets/photography/neon-swing.webp',
    thumb: 'assets/photography/neon-swing-thumb.jpg',
    thumbWebp: 'assets/photography/neon-swing-thumb.webp',
    full: 'assets/photography/neon-swing.jpg',
    alt: 'Foggy park swing, lit in neon'
  }
];

// ── 4. FULL ALBUM (10 Grid Photos + 3 Additional Photos) ────────
const FULL_ALBUM_PHOTOS = [
  ...GALLERY_PHOTOS,
  {
    id: 'photo-11',
    section: 'photography',
    title: 'Sky & Wires',
    tag: 'Atmosphere',
    src: 'assets/photography/sky-wires.jpg',
    webp: 'assets/photography/sky-wires.webp',
    thumb: 'assets/photography/sky-wires-thumb.jpg',
    thumbWebp: 'assets/photography/sky-wires-thumb.webp',
    full: 'assets/photography/sky-wires.jpg',
    alt: 'Sky and wires'
  },
  {
    id: 'photo-12',
    section: 'photography',
    title: 'Pink Portrait (Alt)',
    tag: 'Portrait',
    src: 'assets/photography/pink-portrait-alt.jpg',
    webp: 'assets/photography/pink-portrait-alt.webp',
    thumb: 'assets/photography/pink-portrait-alt-thumb.jpg',
    thumbWebp: 'assets/photography/pink-portrait-alt-thumb.webp',
    full: 'assets/photography/pink-portrait-alt.jpg',
    alt: 'Portrait in pink light'
  },
  {
    id: 'photo-13',
    section: 'photography',
    title: 'Mountain Road',
    tag: 'Landscape',
    src: 'assets/photography/mountain-road.jpg',
    webp: 'assets/photography/mountain-road.webp',
    thumb: 'assets/photography/mountain-road-thumb.jpg',
    thumbWebp: 'assets/photography/mountain-road-thumb.webp',
    full: 'assets/photography/mountain-road.jpg',
    alt: 'Mountain road'
  }
];

// Legacy compatibility exports
const GALLERY_GAMES = [
  ...GALLERY_CPP_GAMES,
  ...GALLERY_BP_GAMES
];

const GALLERY_DATA = [
  ...GALLERY_CPP_GAMES,
  ...GALLERY_BP_GAMES,
  ...GALLERY_PHOTOS
];

// ── 3. PROJECT VIDEOS DATA ───────────────────────────────────
// To add a video: Put .mp4 in assets/videos/ OR paste YouTube/Vimeo embed URL in 'src'
// If 'src' is left empty "", the video slot is cleanly hidden!
const PROJECT_VIDEOS = {
  cpp: [
    {
      id: 'cpp-vid-1',
      title: 'Melee Combat & Combo System Showcase',
      src: '', // Example: 'assets/videos/cpp-combat.mp4' or 'https://www.youtube.com/embed/...'
      caption: 'In-engine demonstration of collision trace hit detection, motion warping, and input buffering.'
    },
    {
      id: 'cpp-vid-2',
      title: 'Enemy AI Behavior Tree & Perception Test',
      src: '', // Example: 'assets/videos/cpp-ai.mp4'
      caption: 'Testing flanking routines, sight perception, and aggression threshold transitions.'
    }
  ],
  blueprints: [
    {
      id: 'bp-vid-1',
      title: 'Locomotion Physics & Double Jump Mechanics',
      src: '', // Example: 'assets/videos/bp-locomotion.mp4'
      caption: 'Character Movement Component calibration with custom air acceleration and coyote-time jump feel.'
    },
    {
      id: 'bp-vid-2',
      title: 'Collectible System & Level Progression',
      src: '', // Example: 'assets/videos/bp-pickups.mp4'
      caption: 'Dynamic collection delegates, audio pitch variation, and unlocked barrier animations.'
    }
  ]
};

// ── 4. PHOTOGRAPHY ALBUM DATA ────────────────────────────────
const PHOTO_ALBUM = {
  title: 'Photography & Visual Composition',
  subtitle: 'Studies in framing, lighting falloff, and texture that shape game environment design.',
  photos: typeof FULL_ALBUM_PHOTOS !== 'undefined' ? FULL_ALBUM_PHOTOS : [],
  videos: [
    {
      id: 'alb-vid-1',
      title: 'Society Event Cinematics & Highlights',
      src: '', // Example: 'assets/videos/event-highlights.mp4' or 'https://www.youtube.com/embed/...'
      caption: 'Highlights from the 6,000+ attendee fine arts festival filmed and edited by Sahil.'
    },
    {
      id: 'alb-vid-2',
      title: 'Visual Composition Showreel',
      src: '', // Example: 'assets/videos/showreel.mp4'
      caption: 'Short compilation of visual framing, motion tracking, and color grading studies.'
    }
  ]
};

// ── 5. C++ PROJECT OVERVIEW & TITLE DATA ──────────────────────
const CPP_PROJECT_OVERVIEW = {
  title: 'Unreal Engine 5 Action RPG game',
  tag: 'UNREAL ENGINE 5 • C++',
  description: 'A third-person combat game built in Unreal Engine 5 with C++. Equip a sword, dodge attacks, break crates and collect souls from defeated enemies.',
  heroImage: 'assets/games/cpp/cpp-forest-overview.webp',
  heroBgFallback: 'assets/games/cpp/cpp-forest-overview.png',
  chips: [
    'Unreal Engine 5',
    'C++',
    'Combat Actions',
    'Attack Montage',
    'Motion Warping',
    'Foot IK (Control Rig)'
  ],
  stripTitle: 'THE FOREST',
  forestStrip: [
    {
      title: 'The Forest Overview',
      caption: 'The Forest Overview',
      src: 'assets/games/cpp/cpp-forest-overview.webp',
      fallback: 'assets/games/cpp/cpp-forest-overview.jpg',
      full: 'assets/games/cpp/originals/Map3.png',
      alt: 'The Forest Overview in Unreal Engine 5 Action RPG game'
    },
    {
      title: 'The Forest Ground-Level View',
      caption: 'The Forest Ground-Level View',
      src: 'assets/games/cpp/cpp-forest-ground.webp',
      fallback: 'assets/games/cpp/cpp-forest-ground.jpg',
      full: 'assets/games/cpp/originals/Map1.png',
      alt: 'The Forest Ground-Level View in Unreal Engine 5 Action RPG game'
    },
    {
      title: 'Raptor in the Forest',
      caption: 'Raptor in the Forest',
      src: 'assets/games/cpp/cpp-forest-raptor.webp',
      fallback: 'assets/games/cpp/cpp-forest-raptor.jpg',
      full: 'assets/games/cpp/originals/Map_withRaptor.png',
      alt: 'Raptor in the Forest in Unreal Engine 5 Action RPG game'
    },
    {
      title: 'Paladin View',
      caption: 'Paladin View',
      src: 'assets/games/cpp/cpp-paladin-view.webp',
      fallback: 'assets/games/cpp/cpp-paladin-view.jpg',
      full: 'assets/games/cpp/originals/Paladin_view.png',
      alt: 'Paladin View in Unreal Engine 5 Action RPG game'
    }
  ],
  videosSectionId: 'gameplayClips',
  credit: "Built while following Stephen Ulibarri's Udemy course, Unreal Engine 5 C++: The Ultimate Game Developer Course, then extended with additional features.",
  githubUrl: '',
  videoUrl: ''
};

// ── 5B. C++ PROJECT MECHANICS DATA ────────────────────────────
// Stores all 5 mechanics breakdown sections for project-cpp.html
const CPP_PROJECT_MECHANICS = [
  {
    id: 'mech-1',
    badge: '01 / CORE MECHANIC',
    title: 'Combat Actions via Animation Notifies',
    desc: 'Animation notifies (arm, disarm, attack end, enable/disable weapon collision, hit react end, dodge end) call BlueprintCallable functions declared on the C++ character class, each guarded by an Is Valid check. This keeps combat timing driven by the animation itself rather than hardcoded timers.',
    image: {
      src: 'assets/games/cpp/notifies/combat-notifies-eventgraph.png',
      alt: 'Animation notifies calling BlueprintCallable functions with Is Valid checks',
      caption: 'Animation notifies (arm, disarm, attack end, weapon collision, hit react, dodge) calling C++ functions'
    }
  },
  {
    id: 'mech-2',
    badge: '02 / CORE MECHANIC',
    title: 'Player Attack Montage & Combat Tuning',
    desc: 'A two-section sword combo (Attack1, Attack2) uses notifies for weapon collision, attack end, and sound (whoosh, exertion), plus a weapon trail effect. Montage references, hit sound/particles, and warp target distance are all EditAnywhere properties on the C++ character class, so combat feel is tuned in the editor without touching code.',
    scroller: [
      {
        src: 'assets/games/cpp/attack-montage/player-attack-montage.png',
        alt: 'Two-section sword combo with collision, sound, and trail notifies',
        caption: 'Two-section sword combo with collision, sound, and trail notifies'
      },
      {
        src: 'assets/games/cpp/attack-montage/combat-properties-defaults.png',
        alt: 'Combat values exposed as EditAnywhere properties',
        caption: 'Combat values exposed as EditAnywhere properties'
      }
    ]
  },
  {
    id: 'mech-3',
    badge: '03 / CORE MECHANIC',
    title: 'Enemy AI Combat & Motion Warping',
    desc: 'The enemy\'s three-section attack montage follows the same notify pattern as the player, with Motion Warping notify states pulling the enemy toward its target mid-swing. Every tick, C++ warp-target functions feed the Motion Warping component so the montage knows where to align the attack. Combat radii, patrol/chase speed, and attack timing are all tunable per enemy type.',
    scroller: [
      {
        src: 'assets/games/cpp/enemy-ai/enemy-attack-montage.png',
        alt: 'Enemy\'s three-section attack montage',
        caption: 'Enemy\'s three-section attack montage'
      },
      {
        src: 'assets/games/cpp/enemy-ai/enemy-motion-warping.png',
        alt: 'Feeding C++ warp targets into Motion Warping',
        caption: 'Feeding C++ warp targets into Motion Warping'
      },
      {
        src: 'assets/games/cpp/enemy-ai/enemy-combat-properties.png',
        alt: 'Per-enemy combat tuning: radii, speed, timing',
        caption: 'Per-enemy combat tuning: radii, speed, timing'
      }
    ]
  },
  {
    id: 'mech-4',
    badge: '04 / CORE MECHANIC',
    title: 'Locomotion & Animation State',
    desc: 'The player\'s top-level state machine (OnGround, InAir, Land, Dead) transitions based on movement data read from C++ each frame, and a foot IK blend engages only while grounded, not falling, and not dead. The enemy\'s Anim Blueprint mirrors this: on initialize it caches the character movement component, then each frame computes ground speed and reads enemy state and death pose from C++.',
    scroller: [
      {
        src: 'assets/games/cpp/locomotion/player-locomotion-states.png',
        alt: 'Player locomotion state machine',
        caption: 'Player locomotion state machine'
      },
      {
        src: 'assets/games/cpp/locomotion/foot-ik-blend-logic.png',
        alt: 'Foot IK blends in only while grounded',
        caption: 'Foot IK blends in only while grounded'
      },
      {
        src: 'assets/games/cpp/locomotion/enemy-abp-init.png',
        alt: 'Enemy Anim Blueprint initialization',
        caption: 'Enemy Anim Blueprint initialization'
      },
      {
        src: 'assets/games/cpp/locomotion/enemy-thread-safe-update.png',
        alt: 'Enemy\'s thread-safe animation update',
        caption: 'Enemy\'s thread-safe animation update'
      }
    ]
  },
  {
    id: 'mech-5',
    badge: '05 / CORE MECHANIC',
    title: 'Procedural Foot IK (Control Rig)',
    desc: 'A Control Rig graph sphere-traces from each foot to the ground, smooths the offset over time, uses the lower of the two foot offsets to lift the pelvis and avoid leg overextension, applies the results to the IK foot bones, then runs a full-body IK solve so feet plant correctly on uneven terrain.',
    scroller: [
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-1-forwards-solve.png',
        alt: 'Initial setup: caching bone transforms and executing sequence',
        caption: '1. Initial setup: caching bone transforms and executing sequence'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-2-sphere-trace.png',
        alt: 'Step 1: sphere-trace from each foot to the ground',
        caption: '2. Step 1: sphere-trace from each foot to the ground'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-3-smooth-interpolate.png',
        alt: 'Step 2: interpolate smoothly toward offset targets',
        caption: '3. Step 2: interpolate smoothly toward offset targets'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-4-lowest-offset.png',
        alt: 'Step 3: use the lower foot offset to avoid overextension',
        caption: '4. Step 3: use the lower foot offset to avoid overextension'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-5-modify-transforms.png',
        alt: 'Step 4: add interpolated offsets to IK foot bones and pelvis',
        caption: '5. Step 4: add interpolated offsets to IK foot bones and pelvis'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-6-full-body-ik.png',
        alt: 'Step 5: full-body IK solve using the offsets as effector targets',
        caption: '6. Step 5: full-body IK solve using the offsets as effector targets'
      },
      {
        src: 'assets/games/cpp/foot-ik/foot-ik-7-overview.png',
        alt: 'Overview: complete Control Rig forwards solve graph',
        caption: '7. Overview: complete Control Rig forwards solve graph'
      }
    ]
  }
];

// ── 6. C++ PROJECT GAMEPLAY CLIPS DATA ────────────────────────
const CPP_PROJECT_VIDEOS = [
  {
    id: 'vid-1',
    src: 'assets/games/cpp/videos/sword-equip-insect-patrol.mp4',
    poster: 'assets/games/cpp/videos/sword-equip-insect-patrol.jpg',
    title: 'Sword Equip & Enemy Patrol',
    caption: 'Equipping the sword and Insect enemy patroling nearby'
  },
  {
    id: 'vid-2',
    src: 'assets/games/cpp/videos/breakable-items.mp4',
    poster: 'assets/games/cpp/videos/breakable-items.jpg',
    title: 'Breakable Actors & Item Spawning',
    caption: 'Breakable Actors shattering and dropping an item'
  },
  {
    id: 'vid-3',
    src: 'assets/games/cpp/videos/dodge-mechanic.mp4',
    poster: 'assets/games/cpp/videos/dodge-mechanic.jpg',
    title: 'Dodge Mechanic',
    caption: 'Dodge mechanic'
  },
  {
    id: 'vid-4',
    src: 'assets/games/cpp/videos/combat-soul-drop.mp4',
    poster: 'assets/games/cpp/videos/combat-soul-drop.jpg',
    title: 'Combat & Soul Absorption',
    caption: 'Combat with health bar and souls counter, souls collected from a defeated enemy'
  }
];

// ══════════════════════════════════════════════════════════════
// 7. BLUEPRINTS PROJECT OVERVIEW & TITLE DATA
// ══════════════════════════════════════════════════════════════
const BP_PROJECT_OVERVIEW = {
  title: 'UE 5 Blueprint - Coin Collector',
  tag: 'Unreal Engine 5 • Blueprints',
  description: 'A third-person village game built entirely in Blueprints. Collect coins, dash past chasing enemies, and avoid their axe attacks and knockback.',
  heroImage: 'assets/games/blueprints/Map-1600w.webp',
  heroBg: 'assets/games/blueprints/Map-1600w.webp',
  heroBgFallback: 'assets/games/blueprints/originals/Map.png',
  chips: [
    'Unreal Engine 5',
    'Blueprints',
    'Pawn Sensing AI',
    'Enhanced Input (Dash)',
    'Locomotion State Machine',
    'BPI Coin Collection'
  ],
  stripTitle: 'THE VILLAGE',
  villageStrip: [
    {
      title: 'The Village Aerial Overview',
      caption: 'Windmill, roofs, foliage, and complete path overview',
      src: 'assets/games/blueprints/Map-1600w.webp',
      fallback: 'assets/games/blueprints/Map-1600w.jpg',
      full: 'assets/games/blueprints/originals/Map.png',
      alt: 'Aerial overview of the village level in UE 5 Blueprint - Coin Collector'
    },
    {
      title: 'The Village Ground-Level View',
      caption: 'Village track, cobblestone path, and collectible coins',
      src: 'assets/games/blueprints/Map2-1600w.webp',
      fallback: 'assets/games/blueprints/Map2-1600w.jpg',
      full: 'assets/games/blueprints/originals/Map2.png',
      alt: 'Ground-level view of the village level in UE 5 Blueprint - Coin Collector'
    }
  ],
  videosSectionId: 'bpVideosSection',
  watchGameplayInTopActions: true,
  githubUrl: '',
  videoUrl: ''
};

// ══════════════════════════════════════════════════════════════
// 8. BLUEPRINTS PROJECT MECHANICS DATA
//
// Flat-row structure: each entry is one scroll row.
// badge       - orange label ("01 / CORE MECHANIC" or "01 · IN GAME" etc.)
// title       - row heading
// desc        - paragraph text (empty string if short info row)
// image       - the single image for this row
//   .src      - 1600w web-served file
//   .full     - full-res original for lightbox
//   .alt      - alt text
//   .caption  - caption shown in dark bar below image
// ══════════════════════════════════════════════════════════════
const BP_PROJECT_MECHANICS = [
  // ── 01 Enemy AI: Detect and Chase ──────────────────────────
  {
    id: 'bp-row-1a',
    badge: '01 / CORE MECHANIC',
    title: 'Enemy AI: Detect and Chase',
    desc: 'Enemies use Pawn Sensing. The On See Pawn event fires a custom chasing event that runs AI MoveTo toward the player character, stopping at an acceptance radius of 120. When the move succeeds, a Can Attack check decides whether the enemy starts its attack.',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_1-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_1.png',
      srcset: 'assets/games/blueprints/Enemy_AI_1-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_1.png 1917w',
      alt: 'BP_EnemyAI: On See Pawn event graph leading to AI MoveTo with acceptance radius 120',
      caption: 'BP_EnemyAI: On See Pawn \u2192 Chasing Character \u2192 AI MoveTo (acceptance radius 120)'
    }
  },
  {
    id: 'bp-row-1b',
    badge: '01 \u00b7 IN GAME',
    title: 'Enemy Chase',
    desc: 'Enemies follow the player through the village after spotting them.',
    image: {
      src: 'assets/games/blueprints/Enemy_chasing-1600w.webp',
      full: 'assets/games/blueprints/originals/Enemy_chasing.png',
      alt: 'Enemies chasing the player character through the village in UE 5 Blueprint - Coin Collector',
      caption: ''
    }
  },

  // ── 02 Enemy Attack and Hit Detection ─────────────────────
  {
    id: 'bp-row-2a',
    badge: '02 / CORE MECHANIC',
    title: 'Enemy Attack and Hit Detection',
    desc: 'The attack montage plays an axe swing with a whoosh sound. A Can Attack flag stops the enemy from swinging again until the montage completes or is interrupted. A montage notify triggers a Sphere Trace By Channel (radius 25) that starts at the enemy\'s location and extends 175 units along its forward vector on the Player channel.',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_2-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_2.png',
      srcset: 'assets/games/blueprints/Enemy_AI_2-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_2.png 1917w',
      alt: 'BP_EnemyAI: attack montage, Can Attack flag, whoosh sound and Sphere Trace By Channel (radius 25)',
      caption: 'BP_EnemyAI: attack montage, Can Attack flag, whoosh sound and Sphere Trace By Channel (radius 25)'
    }
  },
  {
    id: 'bp-row-2b',
    badge: '02 \u00b7 DETAIL',
    title: 'Trace Start and End',
    desc: 'The trace starts at the enemy\'s location. The end point adds the enemy\'s forward vector multiplied by 175 to that location.',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_3-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_3.png',
      srcset: 'assets/games/blueprints/Enemy_AI_3-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_3.png 1917w',
      alt: 'BP_EnemyAI: sphere trace 175-unit forward offset and Break Hit Result nodes',
      caption: 'BP_EnemyAI: Sphere trace 175-unit forward offset calculation and Break Hit Result'
    }
  },
  {
    id: 'bp-row-2c',
    badge: '02 \u00b7 IN GAME',
    title: 'Enemy Attack',
    desc: 'Enemies swing their axes at the player.',
    image: {
      src: 'assets/games/blueprints/Enemy_Attacking-1600w.webp',
      full: 'assets/games/blueprints/originals/Enemy_Attacking.png',
      alt: 'Enemy swinging axe at the player in UE 5 Blueprint - Coin Collector',
      caption: ''
    }
  },

  // ── 03 Knockback and Impact Feedback ──────────────────────
  {
    id: 'bp-row-3a',
    badge: '03 / CORE MECHANIC',
    title: 'Knockback and Impact Feedback',
    desc: 'On a hit, Break Hit Result gives the hit actor, which is cast to Character. Launch Character then pushes the player back using the enemy\'s forward vector multiplied by a Frontal Knockback value, plus an Upwards Knockback value on Z. Feedback comes from an axe hit sound, a wood particle emitter spawned at the impact point and rotated from the hit normal, and a camera shake.',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_4-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_4.png',
      srcset: 'assets/games/blueprints/Enemy_AI_4-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_4.png 1917w',
      alt: 'BP_EnemyAI: Break Hit Result, Cast to Character and knockback vector math',
      caption: 'BP_EnemyAI: Break Hit Result, Cast to Character and knockback vector math (Frontal Knockback, Upwards Knockback)'
    }
  },
  {
    id: 'bp-row-3b',
    badge: '03 \u00b7 DETAIL',
    title: 'Launch Character and Hit Sound',
    desc: 'The knockback vector goes into Launch Character on the cast player, and an axe hit sound plays at the enemy\'s location.',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_5-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_5.png',
      srcset: 'assets/games/blueprints/Enemy_AI_5-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_5.png 1917w',
      alt: 'BP_EnemyAI: Launch Character node and axe impact sound at location',
      caption: 'BP_EnemyAI: Launch Character impulse execution and impact sound at location'
    }
  },
  {
    id: 'bp-row-3c',
    badge: '03 \u00b7 DETAIL',
    title: 'Impact Particle and Camera Shake',
    desc: 'A wood particle emitter spawns at the impact point, and Play World Camera Shake adds screen feedback (outer radius 1000).',
    image: {
      src: 'assets/games/blueprints/Enemy_AI_6-1600w.png',
      full: 'assets/games/blueprints/originals/Enemy_AI_6.png',
      srcset: 'assets/games/blueprints/Enemy_AI_6-1600w.png 1600w, assets/games/blueprints/originals/Enemy_AI_6.png 1917w',
      alt: 'BP_EnemyAI: Spawn Emitter at Location and Play World Camera Shake nodes',
      caption: 'BP_EnemyAI: Spawn Emitter rotated from hit normal and Play World Camera Shake (outer radius 1000)'
    }
  },

  // ── 04 Player Dash ─────────────────────────────────────────
  {
    id: 'bp-row-4a',
    badge: '04 / CORE MECHANIC',
    title: 'Player Dash',
    desc: 'The IA_Dash Enhanced Input action passes through a Do Once gate, sets a Dodging flag and plays a dash montage. Launch Character then moves the player along their forward vector (multiplied by 850) with 500 added on Z. Dodging is set back to false and the Do Once gate is reset so the dash can be used again. The coin counter graph is in the lower half.',
    image: {
      src: 'assets/games/blueprints/Vilager_MainCharacter_Mechanic-1600w.png',
      full: 'assets/games/blueprints/originals/Vilager_MainCharacter_Mechanic.png',
      srcset: 'assets/games/blueprints/Vilager_MainCharacter_Mechanic-1600w.png 1600w, assets/games/blueprints/originals/Vilager_MainCharacter_Mechanic.png 1917w',
      alt: 'BP_ThirdPersonCharacter: IA_Dash, Do Once, dash montage, Launch Character forward x850 Z500 and coin counter graph',
      caption: 'BP_ThirdPersonCharacter: IA_Dash \u2192 Do Once \u2192 dash montage \u2192 Launch Character (forward \u00d7 850, Z 500). The coin counter graph is in the lower half.'
    }
  },

  // ── 05 Coin Collection and HUD ────────────────────────────
  {
    id: 'bp-row-5a',
    badge: '05 / CORE MECHANIC',
    title: 'Coin Collection and HUD',
    desc: 'Coins call an Add Coins event on the player through the BPI Coin Blueprint interface. The event increments a Coins variable, formats it as "{Amount} COINS" with Format Text and sets the text on the Coin Widget so the HUD updates.',
    image: {
      src: 'assets/games/blueprints/Coins_Blueprint.png',
      full: 'assets/games/blueprints/Coins_Blueprint.png',
      alt: 'BP_ThirdPersonCharacter: BPI Coin Add Coins event, Coins increment, Format Text and SetText nodes',
      caption: 'BP_ThirdPersonCharacter: BPI Coin Add Coins event, Coins increment, Format Text and SetText'
    }
  },
  {
    id: 'bp-row-5b',
    badge: '05 \u00b7 IN GAME',
    title: 'Coin HUD',
    desc: 'The HUD shows the running coin count (3 COINS here) while a coin glows nearby.',
    image: {
      src: 'assets/games/blueprints/Jumping-1600w.webp',
      full: 'assets/games/blueprints/originals/Jumping.png',
      alt: 'Player character near glowing coin with HUD showing 3 COINS in UE 5 Blueprint - Coin Collector',
      caption: ''
    }
  },

  // ── 06 Animation Blueprint: Locomotion ───────────────────
  {
    id: 'bp-row-6a',
    badge: '06 / CORE MECHANIC',
    title: 'Animation Blueprint: Locomotion',
    desc: 'Villager_ABP updates every frame. Speed is the vector length of the character\'s velocity, IsFalling comes from the movement component, and Dodging is read from the third-person character Blueprint. A locomotion state machine moves between Idle and Walking, Jump, a falling loop and Land.',
    image: {
      src: 'assets/games/blueprints/Locomotion-1600w.png',
      full: 'assets/games/blueprints/originals/Locomotion.png',
      srcset: 'assets/games/blueprints/Locomotion-1600w.png 1600w, assets/games/blueprints/originals/Locomotion.png 1917w',
      alt: 'Villager_ABP: locomotion state machine with Idle and Walking, Jump, falling loop, Land states',
      caption: 'Villager_ABP: locomotion state machine (Idle and Walking, Jump, falling loop, Land)'
    }
  },
  {
    id: 'bp-row-6b',
    badge: '06 \u00b7 DETAIL',
    title: 'Animation EventGraph',
    desc: 'Speed comes from the vector length of the velocity, IsFalling from the movement component, and Dodging from the third-person character.',
    image: {
      src: 'assets/games/blueprints/Villager_EnemyState-1600w.png',
      full: 'assets/games/blueprints/originals/Villager_EnemyState.png',
      srcset: 'assets/games/blueprints/Villager_EnemyState-1600w.png 1600w, assets/games/blueprints/originals/Villager_EnemyState.png 1917w',
      alt: 'Villager_ABP EventGraph showing velocity, IsFalling and Dodging variable updates',
      caption: 'Villager_ABP EventGraph: Velocity vector length speed calculation, IsFalling, and Dodging state caching'
    }
  }
];

// ── 9. BLUEPRINTS GAMEPLAY VIDEOS DATA ────────────────────────
// Supports local video files (assets/games/blueprints/videos/...) or YouTube/Vimeo URLs
const BP_PROJECT_VIDEOS = [
  {
    id: 'vid-bp-1',
    src: 'assets/games/blueprints/videos/coin-collector-gameplay.mp4',
    poster: 'assets/games/blueprints/videos/coin-collector-gameplay-poster.webp',
    fallbackPoster: 'assets/games/blueprints/videos/coin-collector-gameplay-poster.jpg',
    title: 'Gameplay',
    caption: 'Running through the village, collecting coins while enemies chase.'
  }
];





import { Incident, Rule, Mount, CommunityEvidence, ClaimTile } from '../types';

export const DOSSIER_INCIDENTS: Incident[] = [
  {
    id: 'land_obstruction',
    number: '01',
    title: 'Illegal Land Obstruction',
    subtitle: 'Encirclement & Barricading of Public Land',
    location: 'Igor’s Deactivated Nation Zone (X: -1450, Z: 2800)',
    dateObserved: 'July 14 - July 19, 2026',
    summary: 'Thomas strategically placed a ring of claims encircling Igor’s deactivated nation after staff declared it public land, illegally barricading community access.',
    fullNarrative: 'When player Igor deactivated his nation, GoSurvival Administration officially designated the surrounding core region as temporary public land, intended for open community access, trade routes, and fair claim expansion. Exploiting this transition, Thomas mapped out the exact perimeter and placed continuous 16x16 claim chunks forming a tight ring entirely surrounding the public land. This illegal claim wall prevents neighboring players from traversing or claiming legitimate territory, directly violating server anti-obstruction policies.',
    impactOnPlayers: [
      'Blocked neighbor expansion routes across public territory',
      'Forced players into dangerous detours or pvp-trapped bottlenecks',
      'Denied community access to public facilities declared open by Staff',
      'Monopolized resource access behind unauthorized claim barriers'
    ],
    evidenceLogs: [
      {
        id: 'log-101',
        timestamp: '2026-07-14 18:22 EST',
        type: 'Staff Notice',
        summary: 'William & Admin Team declare Igor’s deactivated nation core as Public Land.',
        details: 'Official Discord Announcement #server-news: "Igor’s nation core is now public land. Claims blocking access to this public zone are strictly forbidden under Rule 4."'
      },
      {
        id: 'log-102',
        timestamp: '2026-07-15 02:45 EST',
        type: 'RMT Block Log',
        summary: 'Thomas executes 12 consecutive chunk claims encircling coordinates -1450, 2800.',
        details: 'Realm Management Tool (RMT) logs show claim creation by Thomas blocking North, East, South, and West access vectors.'
      },
      {
        id: 'log-103',
        timestamp: '2026-07-18 14:10 EST',
        type: 'Screenshot Proof',
        summary: 'F3 Overlay screenshot showing claim barricade banners and wall structures.',
        details: 'Visual proof submitted by neighboring claim owner documenting physical obstruction walls along claim boundaries.'
      }
    ],
    rulesViolated: ['Rule 4'],
    status: 'Documented & Verified'
  },
  {
    id: 'combat_logging',
    number: '02',
    title: 'Combat Logging',
    subtitle: 'Exploiting Disconnects During Active PvP',
    location: 'Public Resource Zone & Border Claims',
    dateObserved: 'July 16 & July 18, 2026',
    summary: 'When confronted in fair PvP and reduced to critical health, Thomas repeatedly combat logged to avoid death, bypassing fair combat penalties.',
    fullNarrative: 'During multiple legitimate PvP engagements initiated near public resource zones, Thomas engaged neighboring players in combat. However, as soon as his health was depleted to low levels and loss was imminent, Thomas force-quit or logged off the server to evade death, item drops, and legitimate kill tracking. This repeated combat logging breaks PvP combat integrity on GoSurvival and exploits network disconnect windows.',
    impactOnPlayers: [
      'Robbed victorious players of legitimate PvP kills and loot drops',
      'Undermined fair combat mechanics and server competition',
      'Exploited server connection grace periods to reset positions',
      'Created persistent unfair combat behavior without consequences'
    ],
    evidenceLogs: [
      {
        id: 'log-201',
        timestamp: '2026-07-16 21:04 EST',
        type: 'Combat Tag Telemetry',
        summary: 'Thomas engaged at 2.5 hearts near X: -1410 Z: 2840 -> Disconnected.',
        details: 'Combat tag active for 8 seconds. Player Thomas left game state while taking active melee damage from Netherite sword.'
      },
      {
        id: 'log-202',
        timestamp: '2026-07-18 19:30 EST',
        type: 'Chat Log',
        summary: 'System Message: "Thomas left the game." (During active combat event)',
        details: 'Recorded video clip showing Thomas vanishing mid-swing during active arrow barrage and burning status effect.'
      }
    ],
    rulesViolated: ['Rule 5a'],
    status: 'Documented & Verified'
  },
  {
    id: 'griefing_theft',
    number: '03',
    title: 'Targeted Griefing & Horse Theft',
    subtitle: 'Vandalism of Base & Malicious Release of Prized Mounts',
    location: 'Personal Base & Stables (X: -1380, Z: 2750)',
    dateObserved: 'July 19, 2026 at 03:15 EST',
    summary: 'Targeted defacement of personal base structures and the malicious release/theft of two prized top-tier bred horses: Sir Whittington and Velvet.',
    fullNarrative: 'In retaliation for being called out on claim violations, Thomas targeted personal base territory. Exterior stone structures were defaced, sign markers altered with inflammatory language, and most egregiously, the protected stable gates were breached. Two of the server’s highest-tier, selectively bred horses—Sir Whittington (Golden Armor, 14.2 m/s speed) and Velvet (Diamond Armor, max jump height)—were maliciously stolen or released into the wild.',
    impactOnPlayers: [
      'Irreplaceable loss of weeks of genetic breeding and diamond mount armor',
      'Emotional and material damage to personal build and base integrity',
      'Targeted harassment aimed at intimidating players from speaking out',
      'Vandalism disrupting community peace and trust'
    ],
    evidenceLogs: [
      {
        id: 'log-301',
        timestamp: '2026-07-19 03:15 EST',
        type: 'RMT Block Log',
        summary: 'Lead detachment and fence gate interaction logged under user: Thomas.',
        details: 'RMT interaction log ID #89204 confirms Thomas unattached horse leads and opened locked stable gates at X: -1382 Y: 68 Z: 2754.'
      },
      {
        id: 'log-302',
        timestamp: '2026-07-19 03:22 EST',
        type: 'Screenshot Proof',
        summary: 'Defaced base wall and empty stable stalls.',
        details: 'High-res screenshots capturing missing armor stands, broken fence posts, and sign vandalism.'
      }
    ],
    rulesViolated: ['Rule 4', 'Rule 5a'],
    status: 'Documented & Verified'
  }
];

export const SERVER_RULES: Rule[] = [
  {
    id: 'rule-4',
    ruleCode: 'Rule 4',
    title: 'Property Protection & Public Land Anti-Obstruction',
    officialText: 'Players are strictly prohibited from altering, taking from, or griefing builds that do not belong to them without explicit permission. Furthermore, placing claims or structures with the intent to block, encircle, or trap public facilities, staff-designated public land, or adjacent claim expansions is forbidden.',
    plainSummary: 'Protects builds from unauthorized modification/theft and explicitly forbids barricading or encircling public lands and neighbor claims.',
    relevanceToThomas: 'Directly breached by encircling Igor’s public nation land and griefing personal stables/base builds.',
    severity: 'Critical Violation'
  },
  {
    id: 'rule-5a',
    ruleCode: 'Rule 5a',
    title: 'PvP Integrity & Anti-Combat Logging',
    officialText: 'Repeated harassment, targeted non-consensual base camping, and combat logging (disconnecting from the server while in active PvP combat or under immediate threat of death) are strictly prohibited.',
    plainSummary: 'Bans force-disconnecting during PvP to cheat death and forbids targeted harassment of specific players.',
    relevanceToThomas: 'Repeatedly alt-F4’d or combat logged when losing PvP encounters and launched targeted base harassment.',
    severity: 'Server Integrity'
  },
  {
    id: 'rule-9d',
    ruleCode: 'Rule 9d',
    title: 'Community Duty to Report Policy',
    officialText: 'All registered players on GoSurvival have a Duty to Report known or observed policy violations, exploits, or malicious infractions to the Administrative Staff. Failure to report ongoing exploits or withholding evidence undermines server security.',
    plainSummary: 'Mandates that players who witness rule breaches must gather proof and submit coordinated tickets to staff.',
    relevanceToThomas: 'Gives every GoSurvival player the formal mandate and responsibility to submit evidence against Thomas to William and admins.',
    severity: 'Mandatory Duty'
  }
];

export const MISSING_MOUNTS: Mount[] = [
  {
    id: 'mount-1',
    name: 'Sir Whittington',
    title: 'Tier-5 Palomino Thoroughbred',
    speed: '14.2 m/s (Server Max Rank)',
    jump: '4.8 Blocks Height',
    health: '28 HP (14 Hearts)',
    armor: 'Custom Engraved Gold Horse Armor',
    status: 'Stolen',
    lastSeenCoords: 'X: -1402, Y: 68, Z: 2780',
    distinguishingFeatures: [
      'Light golden flaxen mane with white blaze face marking',
      'Name tag "Sir Whittington" visible',
      'Wearing Golden Horse Armor with high speed particle trailing'
    ],
    ownerNote: 'Bred across 6 generations of speed genetics. Crucial asset for nether highway transport.',
    reward: '500 Diamond Tokens for safe return or staff recovery'
  },
  {
    id: 'mount-2',
    name: 'Velvet',
    title: 'Tier-5 Obsidian Black Courser',
    speed: '13.8 m/s High Agility',
    jump: '5.2 Blocks (Max Jump)',
    health: '30 HP (15 Hearts)',
    armor: 'Enchanted Diamond Horse Armor',
    status: 'Released on Loose',
    lastSeenCoords: 'Heading East towards X: -1200, Z: 2900',
    distinguishingFeatures: [
      'Pure jet-black coat with dark steel hooves',
      'Name tag "Velvet" in cyan color formatting',
      'Wearing Diamond Horse Armor'
    ],
    ownerNote: 'High-jump mount capable of scaling 5-block perimeter walls effortlessly.',
    reward: '500 Diamond Tokens for safe return or staff recovery'
  }
];

export const INITIAL_COMMUNITY_EVIDENCE: CommunityEvidence[] = [
  {
    id: 'ev-001',
    reporter: 'Igor_ExMember',
    timestamp: '2026-07-15 14:20',
    category: 'land_obstruction',
    coordinates: 'X: -1460, Z: 2810',
    description: 'I verified Thomas placed claims right on my former border 10 minutes after nation deactivation notice went live.',
    proofUrl: 'https://imgur.com/a/gosurvival-claim-proof1',
    status: 'Verified by Staff',
    upvotes: 24
  },
  {
    id: 'ev-002',
    reporter: 'Northern_PvP_Scout',
    timestamp: '2026-07-16 21:05',
    category: 'combat_logging',
    coordinates: 'X: -1410, Z: 2840',
    description: 'Clipped Thomas disconnecting mid-air when knocked down to 2 hearts during skirmish at public outpost.',
    proofUrl: 'https://youtube.com/watch?v=gosurvival-combatlog-clip',
    status: 'Verified by Staff',
    upvotes: 31
  },
  {
    id: 'ev-003',
    reporter: 'StableHand_Sam',
    timestamp: '2026-07-19 03:40',
    category: 'griefing_theft',
    coordinates: 'X: -1382, Z: 2754',
    description: 'Saw Thomas riding away towards eastern claims leading two armored horses on leads.',
    proofUrl: 'https://imgur.com/a/gosurvival-horse-lead-proof',
    status: 'Under Review',
    upvotes: 18
  }
];

// Grid tiles representing the land obstruction claim layout
export const CLAIM_GRID_DATA: ClaimTile[] = [
  // Row 0 (Z = -2): Northern Encapsulation Barrier Wall
  { x: -2, z: -2, chunkCoords: 'Chunk [-92, 173]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Northern Barrier Wall: Sealing North-West access corridor' },
  { x: -1, z: -2, chunkCoords: 'Chunk [-91, 173]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Northern Barrier Wall: Sealing North public entrance' },
  { x: 0, z: -2, chunkCoords: 'Chunk [-90, 173]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Northern Barrier Wall: Sealing North center highway' },
  { x: 1, z: -2, chunkCoords: 'Chunk [-89, 173]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Northern Barrier Wall: Sealing North access corridor' },
  { x: 2, z: -2, chunkCoords: 'Chunk [-88, 173]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Northern Barrier Wall: Sealing North-East access corridor' },

  // Row 1 (Z = -1): Encapsulated Public Land (North Core) flanked by Thomas
  { x: -2, z: -1, chunkCoords: 'Chunk [-92, 174]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Western Barrier Wall: Encapsulating Public Land perimeter' },
  { x: -1, z: -1, chunkCoords: 'Chunk [-91, 174]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (North-West Sector)' },
  { x: 0, z: -1, chunkCoords: 'Chunk [-90, 174]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (North Plaza)' },
  { x: 1, z: -1, chunkCoords: 'Chunk [-89, 174]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (North-East Sector)' },
  { x: 2, z: -1, chunkCoords: 'Chunk [-88, 174]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Eastern Barrier Wall: Encapsulating Public Land perimeter' },

  // Row 2 (Z = 0): Encapsulated Public Land (South Core) flanked by Thomas
  { x: -2, z: 0, chunkCoords: 'Chunk [-92, 175]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Western Barrier Wall: Encapsulating Public Land perimeter' },
  { x: -1, z: 0, chunkCoords: 'Chunk [-91, 175]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (West Wing Outpost)' },
  { x: 0, z: 0, chunkCoords: 'Chunk [-90, 175]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (Center Shrine & Spawn Portal)' },
  { x: 1, z: 0, chunkCoords: 'Chunk [-89, 175]', owner: 'Public Land', isBarricading: false, notes: 'Igor’s Deactivated Public Core (Resource & Trade Depot)' },
  { x: 2, z: 0, chunkCoords: 'Chunk [-88, 175]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'Eastern Barrier Wall: Encapsulating Public Land perimeter' },

  // Row 3 (Z = 1): Southern Barrier Wall - Directly blocking Victim Base from Public Land!
  { x: -2, z: 1, chunkCoords: 'Chunk [-92, 176]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'BLOCKING BARRIER WALL: South-West transit roadblock' },
  { x: -1, z: 1, chunkCoords: 'Chunk [-91, 176]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'BLOCKING BARRIER WALL: Directly blocking Victim Stables from Public Land' },
  { x: 0, z: 1, chunkCoords: 'Chunk [-90, 176]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'BLOCKING BARRIER WALL: Directly blocking Victim Keep from Public Land' },
  { x: 1, z: 1, chunkCoords: 'Chunk [-89, 176]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'BLOCKING BARRIER WALL: Directly blocking Victim Farmland from Public Land' },
  { x: 2, z: 1, chunkCoords: 'Chunk [-88, 176]', owner: 'Thomas (Illegal Claim)', isBarricading: true, notes: 'BLOCKING BARRIER WALL: South-East transit roadblock' },

  // Row 4 (Z = 2): Victim Base Territory (Blocked on North border by Thomas)
  { x: -2, z: 2, chunkCoords: 'Chunk [-92, 177]', owner: 'Wilderness', isBarricading: false, notes: 'Unclaimed Wilderness Perimeter' },
  { x: -1, z: 2, chunkCoords: 'Chunk [-91, 177]', owner: 'Victim Base', isBarricading: false, notes: 'Victim Base Stables & Horse Enclosure (Blocked North)' },
  { x: 0, z: 2, chunkCoords: 'Chunk [-90, 177]', owner: 'Victim Base', isBarricading: false, notes: 'Victim Base Main Keep & Storage (Blocked North)' },
  { x: 1, z: 2, chunkCoords: 'Chunk [-89, 177]', owner: 'Victim Base', isBarricading: false, notes: 'Victim Base Farmlands & Outpost (Blocked North)' },
  { x: 2, z: 2, chunkCoords: 'Chunk [-88, 177]', owner: 'Wilderness', isBarricading: false, notes: 'Unclaimed Wilderness Perimeter' }
];

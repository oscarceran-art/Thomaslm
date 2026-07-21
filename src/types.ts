export type IncidentCategory = 'land_obstruction' | 'combat_logging' | 'griefing_theft';

export interface EvidenceLog {
  id: string;
  timestamp: string;
  type: 'RMT Block Log' | 'Screenshot Proof' | 'Chat Log' | 'Combat Tag Telemetry' | 'Staff Notice';
  summary: string;
  details: string;
  location?: string;
}

export interface Incident {
  id: IncidentCategory;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  dateObserved: string;
  summary: string;
  fullNarrative: string;
  impactOnPlayers: string[];
  evidenceLogs: EvidenceLog[];
  rulesViolated: string[]; // e.g. ['Rule 4', 'Rule 5a']
  status: 'Documented & Verified' | 'Pending Admin Resolution';
}

export interface Rule {
  id: string;
  ruleCode: string; // e.g. "Rule 4", "Rule 5a", "Rule 9d"
  title: string;
  officialText: string;
  plainSummary: string;
  relevanceToThomas: string;
  severity: 'Critical Violation' | 'Server Integrity' | 'Mandatory Duty';
}

export interface Mount {
  id: string;
  name: string;
  title: string;
  speed: string;
  jump: string;
  health: string;
  armor: string;
  status: 'Stolen' | 'Released on Loose';
  lastSeenCoords: string;
  distinguishingFeatures: string[];
  ownerNote: string;
  reward?: string;
}

export interface CommunityEvidence {
  id: string;
  reporter: string;
  timestamp: string;
  category: IncidentCategory;
  coordinates: string;
  description: string;
  proofUrl: string;
  status: 'Verified by Staff' | 'Under Review';
  upvotes: number;
}

export interface ClaimTile {
  x: number;
  z: number;
  chunkCoords: string;
  owner: 'Igor (Deactivated)' | 'Thomas (Illegal Claim)' | 'Public Land' | 'Wilderness' | 'Victim Base';
  isBarricading: boolean;
  notes: string;
}

import React, { useState } from 'react';
import { DOSSIER_INCIDENTS } from '../data/dossierData';
import { Incident, EvidenceLog } from '../types';
import { Lock, Swords, Flame, ChevronRight, MapPin, Calendar, AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Terminal, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IncidentsGrid: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  const toggleLogs = (incidentId: string) => {
    setExpandedLogs(prev => ({ ...prev, [incidentId]: !prev[incidentId] }));
  };

  const handleCopyLog = (log: EvidenceLog) => {
    const textToCopy = `[GoSurvival Evidence Log] ${log.timestamp} - ${log.type} (${log.location || 'Location verified'}): ${log.summary} Details: ${log.details}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedLogId(log.id);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  const getIncidentIcon = (id: string) => {
    switch (id) {
      case 'land_obstruction':
        return <Lock className="w-6 h-6 text-orange-400" />;
      case 'combat_logging':
        return <Swords className="w-6 h-6 text-red-400" />;
      case 'griefing_theft':
        return <Flame className="w-6 h-6 text-amber-400" />;
      default:
        return <AlertOctagon className="w-6 h-6 text-orange-400" />;
    }
  };

  const getIncidentBadgeColor = (id: string) => {
    switch (id) {
      case 'land_obstruction':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'combat_logging':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'griefing_theft':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="incidents" className="py-16 md:py-24 bg-slate-950 border-b border-orange-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-400 shadow-lg">
            <Siren className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="font-bold">SECTION 2: EVIDENTIAL RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            What Happened: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-black">The 3 Incidents</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Detailed chronological breakdown of documented player rule violations on GoSurvival, complete with location coordinates and Realm Management Tool (RMT) logs.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOSSIER_INCIDENTS.map((incident) => {
            const isExpanded = !!expandedLogs[incident.id];

            return (
              <motion.div
                key={incident.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl group"
              >
                {/* Incident Header Box */}
                <div className="p-6 space-y-4">
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors shadow-inner">
                        {getIncidentIcon(incident.id)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-orange-400 font-extrabold uppercase tracking-wider">
                          INCIDENT #{incident.number}
                        </span>
                        <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          <span>{incident.status}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border font-bold ${getIncidentBadgeColor(incident.id)}`}>
                      {incident.rulesViolated.join(', ')}
                    </span>
                  </div>

                  {/* Incident Title */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 font-sans group-hover:text-orange-300 transition-colors">
                      {incident.title}
                    </h3>
                    <p className="text-xs font-mono text-orange-400/90 mt-1">
                      {incident.subtitle}
                    </p>
                  </div>

                  {/* Incident Metadata */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{incident.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{incident.dateObserved}</span>
                    </div>
                  </div>

                  {/* Short Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans pt-2 border-t border-slate-800/60">
                    {incident.summary}
                  </p>

                  {/* Impact Bullets */}
                  <div className="space-y-1.5 pt-3">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                      Impact on Community:
                    </div>
                    <ul className="space-y-1">
                      {incident.impactOnPlayers.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-300 space-x-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                {/* Evidence Logs Drawer Toggle */}
                <div className="bg-slate-950/80 border-t border-slate-800 p-4 space-y-3">
                  <button
                    onClick={() => toggleLogs(incident.id)}
                    className="w-full flex items-center justify-between text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors py-1 cursor-pointer"
                  >
                    <span className="flex items-center space-x-2 font-bold">
                      <Terminal className="w-3.5 h-3.5 text-orange-400" />
                      <span>{isExpanded ? 'Hide Verified Logs' : `View Verified Logs (${incident.evidenceLogs.length})`}</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expandable Logs List */}
                  {isExpanded && (
                    <div className="space-y-2 pt-2 transition-all">
                      {incident.evidenceLogs.map((log) => (
                        <div key={log.id} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{log.timestamp}</span>
                            <span className="text-orange-300 font-semibold px-1.5 py-0.5 bg-orange-950/60 border border-orange-500/20 rounded">
                              {log.type}
                            </span>
                          </div>
                          <p className="text-slate-200 font-sans text-xs font-medium">{log.summary}</p>
                          <p className="text-slate-400 text-[11px] leading-normal">{log.details}</p>
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={() => handleCopyLog(log)}
                              className="inline-flex items-center space-x-1 text-[10px] text-slate-400 hover:text-orange-300 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition-colors cursor-pointer"
                            >
                              {copiedLogId === log.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Log</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedIncident(incident)}
                    className="w-full mt-2 py-2 px-3 rounded bg-slate-800/90 hover:bg-orange-600 text-slate-200 hover:text-white text-xs font-mono font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Inspect Full Narrative</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative Detail Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-orange-500/40 rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-2xl shadow-orange-950/80 relative my-8">
              <button
                onClick={() => setSelectedIncident(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-sm px-2.5 py-1 bg-slate-800 rounded border border-slate-700 cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-orange-950 border border-orange-500/40">
                  {getIncidentIcon(selectedIncident.id)}
                </div>
                <div>
                  <span className="text-xs font-mono text-orange-400 font-bold uppercase">
                    INCIDENT #{selectedIncident.number} DOSSIER
                  </span>
                  <h3 className="text-2xl font-bold text-slate-100 font-sans">
                    {selectedIncident.title}
                  </h3>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div><span className="text-slate-500">Location:</span> {selectedIncident.location}</div>
                <div><span className="text-slate-500">Observed:</span> {selectedIncident.dateObserved}</div>
                <div><span className="text-slate-500">Rules Violated:</span> <strong className="text-orange-400">{selectedIncident.rulesViolated.join(', ')}</strong></div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-mono uppercase text-orange-400 font-bold">Full Event Narrative:</h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-4 rounded border border-slate-800">
                  {selectedIncident.fullNarrative}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-mono uppercase text-orange-400 font-bold">Key Community Impacts:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedIncident.impactOnPlayers.map((impact, i) => (
                    <div key={i} className="p-2.5 bg-slate-950/80 rounded border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-5 py-2 rounded bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-semibold cursor-pointer"
                >
                  Return to Incident Briefing
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

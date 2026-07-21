import React, { useState } from 'react';
import { MISSING_MOUNTS } from '../data/dossierData';
import { Mount } from '../types';
import { Sparkles, MapPin, Shield, Zap, Heart, Eye, CheckCircle2, AlertTriangle, Send, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MissingMountsCard: React.FC = () => {
  const [sightingModalMount, setSightingModalMount] = useState<Mount | null>(null);
  const [sightingCoords, setSightingCoords] = useState('');
  const [sightingNote, setSightingNote] = useState('');
  const [submittedSightings, setSubmittedSightings] = useState<Array<{ mountName: string; coords: string; note: string; time: string }>>([
    {
      mountName: 'Velvet',
      coords: 'X: -1210, Z: 2890',
      note: 'Spotted grazing near east mountain pass wearing Diamond Armor.',
      time: 'July 20, 18:30 EST'
    }
  ]);
  const [sightingSuccess, setSightingSuccess] = useState(false);

  const handleSubmitSighting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sightingCoords || !sightingModalMount) return;

    setSubmittedSightings(prev => [
      {
        mountName: sightingModalMount.name,
        coords: sightingCoords,
        note: sightingNote || 'No additional note.',
        time: 'Just now'
      },
      ...prev
    ]);

    setSightingSuccess(true);
    setTimeout(() => {
      setSightingSuccess(false);
      setSightingModalMount(null);
      setSightingCoords('');
      setSightingNote('');
    }, 2000);
  };

  return (
    <section id="mounts" className="py-16 md:py-24 bg-slate-950/90 border-b border-orange-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-mono text-amber-400 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-bold">INCIDENT 3 LOSS REPORT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            Targeted Theft: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 font-black">Sir Whittington & Velvet</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            During the base breach, Thomas unattached horse leads and released these two irreplaceable, max-stat bred mounts into the wild.
          </p>
        </div>

        {/* Mount Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MISSING_MOUNTS.map((mount) => (
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={mount.id}
              className="bg-slate-900/90 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all p-6 shadow-2xl space-y-5 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Badge Overlay */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase font-extrabold tracking-wider">
                    {mount.title}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-100 font-sans group-hover:text-amber-300 transition-colors">
                    {mount.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/50 text-xs font-mono font-bold uppercase animate-pulse flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></span>
                  STATUS: {mount.status}
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs font-mono">
                <div>
                  <div className="flex items-center justify-center space-x-1 text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Speed</span>
                  </div>
                  <span className="text-slate-100 font-bold block mt-0.5">{mount.speed}</span>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Jump</span>
                  </div>
                  <span className="text-slate-100 font-bold block mt-0.5">{mount.jump}</span>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 text-slate-400">
                    <Heart className="w-3.5 h-3.5 text-red-400" />
                    <span>Health</span>
                  </div>
                  <span className="text-slate-100 font-bold block mt-0.5">{mount.health}</span>
                </div>
              </div>

              {/* Last Seen Coords & Armor */}
              <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Armor: <strong className="text-slate-100">{mount.armor}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Last Seen: <strong className="text-orange-300">{mount.lastSeenCoords}</strong></span>
                </div>
              </div>

              {/* Distinguishing Features */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold">Distinguishing Features:</span>
                <ul className="space-y-1 text-xs text-slate-300 font-sans">
                  {mount.distinguishingFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Owner Note */}
              <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                "{mount.ownerNote}"
              </p>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSightingModalMount(mount)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-mono font-black text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
              >
                <Eye className="w-4 h-4" />
                <span>Report Sighting of {mount.name}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Recent Sightings Log */}
        {submittedSightings.length > 0 && (
          <div className="mt-10 max-w-3xl mx-auto bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-mono uppercase font-bold text-amber-400 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Community Mount Sightings Log</span>
            </h3>
            <div className="space-y-2">
              {submittedSightings.map((sig, i) => (
                <div key={i} className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold">{sig.mountName}</span>
                    <span className="text-slate-400 ml-2">@ {sig.coords}</span>
                    <p className="text-slate-300 font-sans text-xs mt-0.5">{sig.note}</p>
                  </div>
                  <span className="text-[11px] text-slate-500 shrink-0">{sig.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sighting Modal */}
        <AnimatePresence>
          {sightingModalMount && (
            <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative"
              >
                <button
                  onClick={() => setSightingModalMount(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-xs px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 cursor-pointer"
                >
                  ✕ Close
                </button>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">Report Mount Sighting</span>
                  <h3 className="text-xl font-bold text-slate-100 font-sans">
                    Spotted {sightingModalMount.name}?
                  </h3>
                </div>

                {sightingSuccess ? (
                  <div className="p-4 bg-emerald-950/80 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-300 text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400 animate-bounce" />
                    <p>Sighting report logged! Thank you for helping return our mounts.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitSighting} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Coordinates (F3 Screen) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. X: -1250, Z: 2850"
                        value={sightingCoords}
                        onChange={(e) => setSightingCoords(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Details / Heading / Observed Armor
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Grazing near birch forest, still wearing Golden Armor."
                        value={sightingNote}
                        onChange={(e) => setSightingNote(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Sighting Log</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};


import React, { useState } from 'react';
import { CLAIM_GRID_DATA } from '../data/dossierData';
import { ClaimTile } from '../types';
import { Map, AlertTriangle, ShieldCheck, Info, Layers, Navigation, ArrowUp, XCircle, CheckCircle, Flame, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ClaimsMapVisualizer: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState<ClaimTile | null>(CLAIM_GRID_DATA[12]); // default Igor center public chunk
  const [showComplianceOverlay, setShowComplianceOverlay] = useState(false);
  const [isSimulatingPath, setIsSimulatingPath] = useState(false);

  const getTileColor = (tile: ClaimTile) => {
    const isVictimBlockedChunk = tile.chunkCoords === 'Chunk [-90, 176]';
    const isVictimStartChunk = tile.chunkCoords === 'Chunk [-90, 177]';
    const isPublicTargetChunk = tile.chunkCoords === 'Chunk [-90, 175]';

    if (isSimulatingPath) {
      if (isVictimStartChunk) return 'bg-amber-600 border-amber-300 text-white font-bold ring-2 ring-amber-400 animate-pulse';
      if (isVictimBlockedChunk) return 'bg-red-700 border-red-400 text-white font-bold ring-4 ring-red-500 animate-bounce shadow-2xl shadow-red-600/80';
      if (isPublicTargetChunk) return 'bg-blue-600 border-blue-300 text-white font-bold opacity-80';
    }

    if (showComplianceOverlay) {
      if (tile.owner === 'Thomas (Illegal Claim)') {
        return 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/90';
      }
    }

    switch (tile.owner) {
      case 'Thomas (Illegal Claim)':
        return 'bg-orange-950/90 border-orange-500/70 text-orange-300 hover:bg-orange-900';
      case 'Public Land':
        return 'bg-blue-950/90 border-blue-500/70 text-blue-300 hover:bg-blue-900';
      case 'Victim Base':
        return 'bg-amber-950/90 border-amber-500/70 text-amber-300 hover:bg-amber-900';
      default:
        return 'bg-slate-900/80 border-slate-800 text-slate-500 hover:bg-slate-800';
    }
  };

  const getTileIcon = (owner: string) => {
    switch (owner) {
      case 'Public Land':
        return '🏛️';
      case 'Thomas (Illegal Claim)':
        return '🧱';
      case 'Victim Base':
        return '🏠';
      default:
        return '🌲';
    }
  };

  return (
    <section id="claims-map" className="py-12 sm:py-16 bg-slate-950 border-b border-orange-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-400 mb-2 shadow-lg">
              <Siren className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span className="font-bold">INTERACTIVE LAND ENCIRCLEMENT RADAR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
              Visual Evidence: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-black">Land Encirclement & Transit Block</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 max-w-2xl leading-relaxed">
              Demonstrating how Thomas placed a continuous ring of 16x16 claim chunks encapsulating Igor’s Public Land, physically blocking the Victim Base from accessing public territory.
            </p>
          </div>

          {/* Interactive Map Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setIsSimulatingPath(!isSimulatingPath);
                setShowComplianceOverlay(false);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-xl ${
                isSimulatingPath
                  ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse'
                  : 'bg-gradient-to-r from-red-900 to-orange-800 text-white hover:from-red-800 hover:to-orange-700 border border-red-500/50'
              }`}
            >
              <Navigation className="w-4 h-4 text-orange-200" />
              <span>{isSimulatingPath ? 'STOP SIMULATION' : '🚨 SIMULATE VICTIM TRANSIT'}</span>
            </motion.button>

            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
              <button
                onClick={() => {
                  setShowComplianceOverlay(false);
                  setIsSimulatingPath(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  !showComplianceOverlay && !isSimulatingPath
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Violation Ring</span>
              </button>
              <button
                onClick={() => {
                  setShowComplianceOverlay(true);
                  setIsSimulatingPath(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  showComplianceOverlay
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Rule Fix Overlay</span>
              </button>
            </div>
          </div>
        </div>

        {/* Path Simulator Banner Notification */}
        <AnimatePresence>
          {isSimulatingPath && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/95 border-2 border-red-500 text-red-200 font-mono text-xs shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-start space-x-3">
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sm uppercase text-white block flex items-center space-x-2">
                    <span>🚫 TRANSIT SIMULATION FAILED: PATH BLOCKED BY THOMAS (RULE 4)</span>
                  </span>
                  <p className="text-slate-200 text-xs mt-0.5 font-sans leading-relaxed">
                    Victim attempts to walk North from <strong>Victim Keep [-90, 177]</strong> to <strong>Public Shrine [-90, 175]</strong>. 
                    Path is completely blocked at <strong>Chunk [-90, 176]</strong> owned by Thomas. Traversal and build rights are denied by server claim permissions!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSimulatingPath(false)}
                className="px-3 py-1.5 rounded-lg bg-red-900 hover:bg-red-800 text-white text-xs font-bold border border-red-400 shrink-0 cursor-pointer self-end md:self-center"
              >
                Close Simulator
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Layout + Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 5x5 Grid Canvas Container */}
          <div className="lg:col-span-7 bg-slate-900/90 p-3 sm:p-6 rounded-2xl border border-orange-500/30 shadow-2xl space-y-4">
            
            {/* Compass & Coordinates Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-slate-100 font-bold">X: -1450, Z: 2800 Region</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-400 font-bold">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>NORTH (Z: -2)</span>
              </div>
            </div>

            {/* Grid Map with Directional Markers */}
            <div className="relative max-w-md mx-auto p-2 sm:p-4 bg-slate-950/90 rounded-xl border border-slate-800">
              
              {/* Compass Labels */}
              <div className="text-[10px] font-mono text-slate-400 text-center mb-1.5 uppercase tracking-widest font-semibold flex items-center justify-center space-x-1">
                <span>▲ NORTH (Public Land Perimeter)</span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 aspect-square">
                {CLAIM_GRID_DATA.map((tile, idx) => {
                  const isSelected = selectedTile?.chunkCoords === tile.chunkCoords;
                  
                  return (
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      key={idx}
                      onClick={() => setSelectedTile(tile)}
                      className={`aspect-square rounded-lg border transition-all p-1 flex flex-col justify-between text-left cursor-pointer relative group ${getTileColor(tile)} ${
                        isSelected ? 'ring-2 ring-orange-400 ring-offset-2 ring-offset-slate-950 scale-105 z-10 shadow-xl' : ''
                      }`}
                    >
                      {/* Top Row: Coords & Tile Emoji */}
                      <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono font-bold leading-none">
                        <span className="truncate">{tile.chunkCoords.split(' ')[1]}</span>
                        <span className="text-xs sm:text-sm">{getTileIcon(tile.owner)}</span>
                      </div>
                      
                      {/* Bottom Row: Owner Name */}
                      <div className="text-[8px] sm:text-[10px] font-mono leading-tight font-extrabold line-clamp-2">
                        {showComplianceOverlay && tile.owner === 'Thomas (Illegal Claim)' 
                          ? 'FREE LAND' 
                          : tile.owner.split(' ')[0]}
                      </div>

                      {tile.isBarricading && !showComplianceOverlay && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-slate-900 shadow animate-ping"></span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-amber-400 text-center mt-2 uppercase tracking-widest font-semibold flex items-center justify-center space-x-1">
                <span>▼ SOUTH (Victim Base Territory)</span>
              </div>

            </div>

            {/* Visual Legend */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm">🏛️</span>
                <span className="w-3 h-3 rounded bg-blue-500/80 border border-blue-400"></span>
                <span className="text-slate-200">Public Land (Igor Core)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm">🧱</span>
                <span className="w-3 h-3 rounded bg-orange-500/80 border border-orange-400"></span>
                <span className="text-slate-200">Thomas Encapsulation Ring</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm">🏠</span>
                <span className="w-3 h-3 rounded bg-amber-500/80 border border-amber-400"></span>
                <span className="text-slate-200">Victim Base</span>
              </div>
            </div>

          </div>

          {/* Selected Tile Inspector Side Panel */}
          <div className="lg:col-span-5 bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs sm:text-sm font-mono uppercase font-bold text-slate-200">
                  Chunk Inspector & Staff Logs
                </h3>
              </div>
              <span className="text-xs font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-500/30">
                {selectedTile ? selectedTile.chunkCoords : 'Select Chunk'}
              </span>
            </div>

            {selectedTile ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Registered Owner</label>
                  <p className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-0.5 flex items-center space-x-2">
                    <span>{getTileIcon(selectedTile.owner)}</span>
                    <span>{selectedTile.owner}</span>
                  </p>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Status & Classification</label>
                  <div className="mt-1">
                    {selectedTile.isBarricading ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-orange-950 text-orange-400 border border-orange-500/40 text-xs font-mono font-bold animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                        <span>Rule 4 Illegal Obstruction Barrier Wall</span>
                      </span>
                    ) : selectedTile.owner === 'Victim Base' ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Victim Base Territory (Blocked on North)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                        <span>Staff Designated Public Territory</span>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Log Notes & Evidence Details</label>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800 mt-1">
                    {selectedTile.notes}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/90 rounded-xl border border-orange-500/30 text-xs font-mono text-orange-300 space-y-1.5">
                  <div className="font-bold uppercase flex items-center space-x-1.5 text-orange-400">
                    <Layers className="w-4 h-4" />
                    <span>Admin Resolution Directive:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] sm:text-xs font-sans leading-relaxed">
                    {selectedTile.isBarricading 
                      ? "Execute `/claim unclaim` or force-resize Thomas’s encircling claims to dismantle the barrier wall and allow neighbor transit."
                      : selectedTile.owner === 'Victim Base'
                      ? "Re-open the northern public corridor to restore direct road access between this base and the public shrine."
                      : "Core region declared public by William. Protect from further unauthorized claims."}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">Tap any grid square above to inspect claim data.</p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};


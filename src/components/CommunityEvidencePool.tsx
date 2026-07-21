import React, { useState } from 'react';
import { INITIAL_COMMUNITY_EVIDENCE } from '../data/dossierData';
import { CommunityEvidence, IncidentCategory } from '../types';
import { FolderCheck, Plus, ThumbsUp, Link, MapPin, CheckCircle2, Clock, Filter, Send } from 'lucide-react';

export const CommunityEvidencePool: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<CommunityEvidence[]>(INITIAL_COMMUNITY_EVIDENCE);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [category, setCategory] = useState<IncidentCategory>('land_obstruction');
  const [coordinates, setCoordinates] = useState('');
  const [description, setDescription] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  const handleUpvote = (id: string) => {
    setEvidenceList(prev =>
      prev.map(ev => (ev.id === id ? { ...ev, upvotes: ev.upvotes + 1 } : ev))
    );
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !description) return;

    const newEntry: CommunityEvidence = {
      id: `ev-${Date.now()}`,
      reporter: reporterName,
      timestamp: 'Just now',
      category: category,
      coordinates: coordinates || 'X: -1450, Z: 2800',
      description,
      proofUrl: proofUrl || 'https://imgur.com/a/submitted-proof',
      status: 'Under Review',
      upvotes: 1
    };

    setEvidenceList([newEntry, ...evidenceList]);
    setShowSubmitModal(false);
    setReporterName('');
    setCoordinates('');
    setDescription('');
    setProofUrl('');
  };

  const filteredList = evidenceList.filter(ev =>
    filterCategory === 'all' ? true : ev.category === filterCategory
  );

  return (
    <section id="evidence-pool" className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-xs font-mono text-orange-400 mb-2">
              <FolderCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>COMMUNITY EVIDENCE POOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
              Pooled Player Submissions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
              Verify community proof clips, coordinates, and screenshots submitted by fellow GoSurvival players.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Category Filter */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterCategory === 'all' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCategory('land_obstruction')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterCategory === 'land_obstruction' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Land
              </button>
              <button
                onClick={() => setFilterCategory('combat_logging')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterCategory === 'combat_logging' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Combat Log
              </button>
              <button
                onClick={() => setFilterCategory('griefing_theft')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterCategory === 'griefing_theft' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Grief/Mounts
              </button>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Proof</span>
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3 shadow-lg flex flex-col justify-between hover:border-orange-500/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-400 font-bold">@{item.reporter}</span>
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{item.coordinates}</span>
                </div>

                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 hover:underline inline-flex items-center space-x-1 text-[11px]"
                >
                  <Link className="w-3 h-3" />
                  <span>View Proof Link</span>
                </a>

                <button
                  onClick={() => handleUpvote(item.id)}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />
                  <span>{item.upvotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Proof Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-orange-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-orange-400 font-bold uppercase">Community Contribution</span>
                <h3 className="text-xl font-bold text-slate-100 font-sans">
                  Pool New Evidence
                </h3>
              </div>

              <form onSubmit={handleAddEvidence} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Your In-Game Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GoSurv_Player"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded text-xs font-mono text-slate-200 focus:outline-none"
                  >
                    <option value="land_obstruction">Incident 1: Illegal Land Obstruction</option>
                    <option value="combat_logging">Incident 2: Combat Logging</option>
                    <option value="griefing_theft">Incident 3: Base Griefing & Horse Theft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Coordinates (F3 Screen)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. X: -1420, Z: 2810"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Evidence Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what you observed or clipped..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Imgur / YouTube Link
                  </label>
                  <input
                    type="text"
                    placeholder="https://imgur.com/a/..."
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold text-xs rounded transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pool Proof Entry</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

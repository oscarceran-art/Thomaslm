import React, { useState } from 'react';
import { Send, Copy, Check, ShieldAlert, FileText, Sparkles, Terminal } from 'lucide-react';

interface ReportGeneratorProps {
  onClose?: () => void;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onClose }) => {
  const [playerName, setPlayerName] = useState('');
  const [coords, setCoords] = useState('');
  const [selectedViolations, setSelectedViolations] = useState<string[]>([
    'Rule 4: Illegal Land Obstruction & Public Barricade',
    'Rule 5a: Combat Logging in Active PvP',
    'Rule 4 / 5a: Base Griefing & Stolen Mounts (Sir Whittington / Velvet)'
  ]);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const toggleViolation = (violation: string) => {
    setSelectedViolations(prev =>
      prev.includes(violation)
        ? prev.filter(v => v !== violation)
        : [...prev, violation]
    );
  };

  const generatedReportText = `**[GoSurvival Admin Ticket] Rule Violation Report regarding Player: Thomas**
**Submitted by:** ${playerName || '[Your In-Game Name]'}
**Date/Time:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} EST
**Target Player:** Thomas
**Coordinates / Location:** ${coords || 'X: -1450, Z: 2800 (Igor Public Land & Base Zone)'}

**Specific Violations Cited:**
${selectedViolations.map(v => `- ${v}`).join('\n')}

**Evidence Summary & RMT Request:**
- **Land Encirclement:** Thomas placed continuous claim chunks encircling the deactivated nation core declared as Public Land by William/Admins.
- **Combat Logging:** Disconnected during active PvP when taking critical damage.
- **Base Griefing & Horse Theft:** Breached personal stables; Sir Whittington & Velvet removed from leads.

**Proof / Screenshot Links:**
${evidenceUrl || 'https://imgur.com/a/gosurvival-evidence-proof'}

**Additional Player Notes:**
${additionalDetails || 'Fulfilling Rule 9d Duty to Report. Requesting William and staff to inspect RMT logs and enforce server anti-obstruction policy.'}

*Report generated via GoSurvival Community Dossier.*`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generatedReportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div id="report-generator" className="bg-slate-900 border border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-xs px-2.5 py-1 bg-slate-800 rounded border border-slate-700 cursor-pointer"
        >
          ✕ Close Ticket Builder
        </button>
      )}

      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/30 text-xs font-mono text-orange-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>TICKET GENERATOR FOR WILLIAM & ADMIN TEAM</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-100 font-sans">
          Draft Pre-formatted Staff Report
        </h3>
        <p className="text-xs text-slate-400 font-sans">
          Fill in your details below to generate an official Markdown report formatted for the GoSurvival Discord ticket channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Your GoSurvival In-Game Username *
            </label>
            <input
              type="text"
              placeholder="e.g. Steve_Gamer"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Incident Coordinates (F3)
            </label>
            <input
              type="text"
              placeholder="e.g. X: -1450, Y: 68, Z: 2800"
              value={coords}
              onChange={(e) => setCoords(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
              Violations Observed (Check All That Apply):
            </label>
            <div className="space-y-2">
              {[
                'Rule 4: Illegal Land Obstruction & Public Barricade',
                'Rule 5a: Combat Logging in Active PvP',
                'Rule 4 / 5a: Base Griefing & Stolen Mounts (Sir Whittington / Velvet)'
              ].map((v, i) => (
                <label key={i} className="flex items-start space-x-2.5 text-xs font-mono text-slate-300 cursor-pointer bg-slate-950 p-2.5 rounded border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedViolations.includes(v)}
                    onChange={() => toggleViolation(v)}
                    className="mt-0.5 accent-orange-500 cursor-pointer"
                  />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Imgur / YouTube Evidence Link
            </label>
            <input
              type="text"
              placeholder="e.g. https://imgur.com/a/proof"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Additional Details for Staff
            </label>
            <textarea
              rows={3}
              placeholder="Include block log request details or eyewitness notes..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="space-y-3 flex flex-col justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold uppercase text-orange-400 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Formatted Output Preview:</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Ready for Discord / Ticket</span>
            </div>

            <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap overflow-y-auto max-h-[300px] leading-relaxed">
              {generatedReportText}
            </pre>
          </div>

          <button
            onClick={handleCopyReport}
            className="w-full py-3 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-3"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300">Ticket Text Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Copy Formatted Ticket Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

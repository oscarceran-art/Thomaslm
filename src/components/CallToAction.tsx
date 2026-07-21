import React from 'react';
import { ShieldAlert, Users, Camera, Send, AlertTriangle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface CallToActionProps {
  onOpenReportGenerator: () => void;
  onScrollToEvidencePool: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenReportGenerator, onScrollToEvidencePool }) => {
  return (
    <section id="action" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main High-Impact Highlight Card */}
        <div className="bg-gradient-to-br from-orange-950/90 via-slate-900 to-slate-950 rounded-2xl border-2 border-orange-500/50 p-6 sm:p-10 md:p-12 shadow-2xl shadow-orange-950/80 space-y-8 relative overflow-hidden">
          
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-xs font-mono font-bold text-orange-300">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span>SECTION 4: CALL TO ACTION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 font-sans tracking-tight">
              How We Stop This.
            </h2>

            <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
              If he gets away with this, your base is next. We need to act as a group. Pool your evidence. If you see Thomas breaking rules, take screenshots. Ask admins to check block logs and the Realm Management Tool (RMT).
            </p>
          </div>

          {/* 3 Action Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Action Item 1 */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-orange-500/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-sans flex items-center space-x-2">
                <Users className="w-4 h-4 text-orange-400" />
                <span>Watch Each Other's Claims</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Form neighbor alliances across GoSurvival. If you notice unauthorized claim placing near public borders or player bases, notify the community immediately.
              </p>
            </div>

            {/* Action Item 2 */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-orange-500/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-sans flex items-center space-x-2">
                <Camera className="w-4 h-4 text-orange-400" />
                <span>Save Screenshots & Clips</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Press F3 to display world coordinates. Capture combat disconnect popups, altered claim banners, or horse lead detachment logs. Request RMT checks from staff.
              </p>
            </div>

            {/* Action Item 3 */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-orange-500/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-950 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-sans flex items-center space-x-2">
                <Send className="w-4 h-4 text-orange-400" />
                <span>Submit Reports to William</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Submit unified reports directly to William and the GoSurvival admin team, referencing Rule 4, Rule 5a, and your Rule 9d Duty to Report.
              </p>
            </div>

          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>Unified community reporting is the fastest path to server resolution.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenReportGenerator}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs sm:text-sm font-bold shadow-xl border border-orange-400/40 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Discord Admin Ticket</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToEvidencePool}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs sm:text-sm font-bold border border-slate-700 transition-all cursor-pointer"
              >
                <span>Pool Evidence Logs</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

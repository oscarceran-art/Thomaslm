import React from 'react';
import { ShieldAlert, Terminal, FileText, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-mono text-xs py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          
          {/* Logo & Statement */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 rounded bg-orange-950 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-200 font-bold text-sm font-sans">
                GoSurvival Community Investigation Dossier
              </div>
              <p className="text-slate-500 text-xs mt-0.5">
                Target Subject: Thomas | Server: GoSurvival.net
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#incidents" className="hover:text-orange-400 transition-colors">
              Incidents
            </a>
            <a href="#claims-map" className="hover:text-orange-400 transition-colors">
              Claim Map
            </a>
            <a href="#rules" className="hover:text-orange-400 transition-colors">
              Server Rules
            </a>
            <a href="#mounts" className="hover:text-orange-400 transition-colors">
              Stolen Mounts
            </a>
            <a href="#action" className="hover:text-orange-400 transition-colors">
              How We Stop This
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded bg-slate-900 border border-slate-800 hover:border-orange-500/40 text-slate-300 hover:text-orange-400 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Mandatory Footer Text */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <p className="text-slate-300 font-semibold font-sans text-sm">
            Built by the GoSurvival Community. Play Fair.
          </p>
          <div className="text-slate-500 text-[11px]">
            GoSurvival is an independent Minecraft multiplayer server community. Fulfill your Rule 9d Duty to Report.
          </div>
        </div>

      </div>
    </footer>
  );
};

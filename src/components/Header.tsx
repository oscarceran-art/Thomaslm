import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, FileText, MapPin, Send, Crosshair, Sparkles, Copy, Check, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenReportGenerator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReportGenerator }) => {
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyServerIp = () => {
    navigator.clipboard.writeText('play.gosurvival.net');
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-orange-500/20">
      {/* Alert Top Banner (Desktop/Tablet only) */}
      <div className="hidden sm:flex bg-gradient-to-r from-orange-950 via-red-950 to-slate-950 px-4 py-1.5 text-xs font-mono text-orange-200 border-b border-orange-500/30 items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase tracking-wider text-[10px] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-ping"></span>
            ACTIVE INVESTIGATION DOSSIER
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">SUBJECT: <strong className="text-orange-400 font-mono">THOMAS</strong></span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">SERVER: <strong className="text-slate-100 font-mono">GoSurvival.net</strong></span>
        </div>
        <div className="flex items-center space-x-3 shrink-0 text-[11px] ml-4">
          <button 
            onClick={handleCopyServerIp}
            className="text-slate-400 hover:text-orange-300 flex items-center space-x-1 transition-colors cursor-pointer min-h-[44px] sm:min-h-0 items-center"
          >
            <span>IP: <code className="text-orange-300">play.gosurvival.net</code></span>
            {copiedStatus ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Dossier Badge */}
          <a href="#hero" className="flex items-center space-x-2 sm:space-x-3 group min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-orange-950/80 border border-orange-500/40 flex items-center justify-center text-orange-400 group-hover:border-orange-400 transition-colors shadow-lg shadow-orange-950/50 shrink-0">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-mono font-bold text-slate-100 tracking-tight text-sm sm:text-base group-hover:text-orange-400 transition-colors truncate">
                  GoSurvival
                </span>
                <span className="hidden sm:inline-block text-[10px] sm:text-xs px-1.5 py-0.2 bg-slate-800 text-orange-400 border border-slate-700 font-mono rounded shrink-0">
                  RULE WATCH
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 -mt-0.5 truncate">
                DOSSIER #2026-THOMAS
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#incidents" className="hover:text-orange-400 transition-colors flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-orange-500/70" />
              <span>Incidents</span>
            </a>
            <a href="#claims-map" className="hover:text-orange-400 transition-colors flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-orange-500/70" />
              <span>Claim Map</span>
            </a>
            <a href="#rules" className="hover:text-orange-400 transition-colors flex items-center space-x-1.5">
              <Crosshair className="w-4 h-4 text-orange-500/70" />
              <span>Rules Violated</span>
            </a>
            <a href="#mounts" className="hover:text-orange-400 transition-colors flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-orange-500/70" />
              <span>Stolen Mounts</span>
            </a>
            <a href="#action" className="hover:text-orange-400 transition-colors flex items-center space-x-1.5 text-orange-400 font-semibold">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span>How We Stop This</span>
            </a>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenReportGenerator}
              className="inline-flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-md bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs sm:text-sm font-semibold font-mono shadow-lg shadow-orange-950/60 border border-orange-400/30 transition-all transform active:scale-95 cursor-pointer min-h-[40px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Submit Admin Ticket</span>
              <span className="xs:hidden">Ticket</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-orange-400 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 border-t border-slate-800/80 bg-slate-950 space-y-3 font-mono text-xs">
            <a
              href="#incidents"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:bg-orange-950/40 hover:text-orange-400 border border-slate-800/60"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Incident #1, #2 & #3 Dossiers</span>
            </a>
            <a
              href="#claims-map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:bg-orange-950/40 hover:text-orange-400 border border-slate-800/60"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Interactive Claim Map & Encirclement</span>
            </a>
            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:bg-orange-950/40 hover:text-orange-400 border border-slate-800/60"
            >
              <Crosshair className="w-4 h-4 text-orange-400" />
              <span>Rules Violated (Rule 4, Rule 5a)</span>
            </a>
            <a
              href="#mounts"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:bg-orange-950/40 hover:text-orange-400 border border-slate-800/60"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Stolen Mounts (Whittington & Velvet)</span>
            </a>
            <a
              href="#action"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-lg bg-orange-950/50 text-orange-300 border border-orange-500/30 font-bold"
            >
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span>How We Stop This (Admin Actions)</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

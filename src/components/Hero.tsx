import React, { useState } from 'react';
import { AlertTriangle, ArrowDown, ShieldAlert, FileSearch, Users, CheckCircle2, Lock, Volume2, Siren, Flame, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenReportGenerator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReportGenerator }) => {
  const [sirenActive, setSirenActive] = useState(false);

  const handleTriggerSiren = () => {
    setSirenActive(true);
    setTimeout(() => setSirenActive(false), 1500);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 border-b border-orange-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Flashing Emergency Top Banner */}
      <div className="w-full bg-gradient-to-r from-red-950 via-orange-900 to-red-950 py-2 border-y border-red-500/40 text-red-200 text-xs font-mono font-bold flex items-center justify-center space-x-3 shadow-inner overflow-hidden">
        <motion.div 
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="flex items-center space-x-2"
        >
          <Siren className="w-4 h-4 text-red-400" />
          <span className="uppercase tracking-widest text-red-300">🚨 HIGH SEVERITY EMERGENCY DOSSIER — ADMIN INTERVENTION REQUESTED</span>
          <Siren className="w-4 h-4 text-red-400" />
        </motion.div>
      </div>

      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Pulsing Red Emergency Beacon Light */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-red-600/25 via-orange-600/20 to-transparent blur-3xl rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Dossier Status Badge & Siren Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 shadow-xl text-xs font-mono text-orange-400"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="uppercase tracking-wide font-bold text-orange-300">INCIDENT REPORT & EVIDENCE DOSSIER</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-mono">TARGET: <strong className="text-red-400">THOMAS</strong></span>
            </motion.div>

            {/* Interactive Siren Sound Button */}
            <button
              onClick={handleTriggerSiren}
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer border ${
                sirenActive
                  ? 'bg-red-600 text-white border-red-400 ring-2 ring-red-400 animate-pulse'
                  : 'bg-slate-900 text-orange-400 hover:bg-slate-800 border-orange-500/40'
              }`}
              title="Test Emergency Audio Siren"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{sirenActive ? 'SIREN SOUNDING!' : 'Sound Siren 🚨'}</span>
            </button>
          </div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight"
          >
            GoSurvival Community Alert: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-red-500 font-black">
              Holding Rule-Breakers Accountable
            </span>
          </motion.h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            It’s time to stop the exploits. Read the evidence, know the rules, and join the effort to protect our server experience.
          </p>

          {/* CTA Button Pair */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#incidents"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-mono text-sm font-bold shadow-2xl shadow-orange-950/90 border border-orange-400/50 transition-all cursor-pointer group"
            >
              <FileSearch className="w-4 h-4 text-orange-200 group-hover:rotate-12 transition-transform" />
              <span>Read the Evidence</span>
              <ArrowDown className="w-4 h-4 text-orange-200 animate-bounce" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#action"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-sm font-bold border border-slate-700 hover:border-orange-500/50 shadow-xl transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Take Action</span>
            </motion.a>
          </div>

          {/* Animated Case Metric Cards */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-orange-500/40 hover:border-orange-400 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-full pointer-events-none group-hover:bg-orange-500/20 transition-all" />
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span className="text-orange-400 font-bold">INCIDENT #1</span>
                <Lock className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="text-lg sm:text-2xl font-mono font-black text-orange-400">Public Land</div>
              <p className="text-xs text-slate-300 mt-1">Illegal claim encirclement blocking Igor's former nation</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-red-500/40 hover:border-red-400 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full pointer-events-none group-hover:bg-red-500/20 transition-all" />
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span className="text-red-400 font-bold">INCIDENT #2</span>
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="text-lg sm:text-2xl font-mono font-black text-red-400">Combat Log</div>
              <p className="text-xs text-slate-300 mt-1">Repeated force disconnects in active losing PvP</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/20 transition-all" />
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span className="text-amber-400 font-bold">INCIDENT #3</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-lg sm:text-2xl font-mono font-black text-amber-400">Base Grief</div>
              <p className="text-xs text-slate-300 mt-1">Base defaced & 2 prized mounts stolen / released</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span className="text-emerald-400 font-bold">MANDATE</span>
                <Users className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-lg sm:text-2xl font-mono font-black text-emerald-400">Rule 9d</div>
              <p className="text-xs text-slate-300 mt-1">Duty to report known policy violations to William</p>
            </motion.div>

          </div>

          {/* Urgent Live Escalation Ticker */}
          <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-red-950/80 via-orange-950/90 to-red-950/80 border border-red-500/40 text-xs font-mono text-orange-200 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xl">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
              <span className="font-bold text-white uppercase">Live Case Radar:</span>
              <span className="text-slate-200">100% Verified Player Logs & Coordinates compiled</span>
            </div>
            <a 
              href="#incidents"
              className="text-orange-400 hover:text-orange-300 underline font-bold shrink-0 text-[11px]"
            >
              View Coordinates & Proof →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};


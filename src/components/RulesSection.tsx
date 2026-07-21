import React, { useState } from 'react';
import { SERVER_RULES } from '../data/dossierData';
import { Rule } from '../types';
import { ShieldAlert, BookOpen, Copy, Check, Search, Scale, AlertOctagon } from 'lucide-react';

export const RulesSection: React.FC = () => {
  const [copiedRuleId, setCopiedRuleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopyCitation = (rule: Rule) => {
    const citation = `[GoSurvival Rule Violation Citation] ${rule.ruleCode}: "${rule.officialText}" - Relevance: ${rule.relevanceToThomas}`;
    navigator.clipboard.writeText(citation);
    setCopiedRuleId(rule.id);
    setTimeout(() => setCopiedRuleId(null), 2000);
  };

  const filteredRules = SERVER_RULES.filter(
    (rule) =>
      rule.ruleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.plainSummary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="rules" className="py-16 md:py-24 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-xs font-mono text-orange-400">
              <Scale className="w-3.5 h-3.5 text-orange-400" />
              <span>SECTION 3: GOVERNING SERVER POLICY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
              The Broken Rules: <span className="text-orange-400">GoSurvival Code of Conduct</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Official GoSurvival policy citations violated by subject Thomas. These rules govern land access, combat integrity, and player reporting obligations.
            </p>
          </div>

          {/* Search Filter input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search server rules..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-orange-500 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Rules Cards List */}
        <div className="space-y-6">
          {filteredRules.map((rule) => {
            const isCopied = copiedRuleId === rule.id;

            return (
              <div
                key={rule.id}
                className="bg-slate-900/90 rounded-xl border border-slate-800 hover:border-orange-500/50 transition-all p-6 shadow-xl shadow-slate-950/60 space-y-4 relative group"
              >
                {/* Top Rule Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-mono font-bold text-orange-400 px-3 py-1 bg-orange-950/80 rounded border border-orange-500/30">
                      {rule.ruleCode}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
                      {rule.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-500/30">
                      {rule.severity}
                    </span>
                    <button
                      onClick={() => handleCopyCitation(rule)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Citation Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-orange-400" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Official Rule Quote Box */}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="text-[11px] uppercase text-orange-400 font-bold tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>Official Rule Text:</span>
                  </div>
                  <blockquote className="italic text-slate-300 border-l-2 border-orange-500 pl-3 py-0.5">
                    "{rule.officialText}"
                  </blockquote>
                </div>

                {/* Plain Summary & Relevance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                      Plain Summary:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {rule.plainSummary}
                    </p>
                  </div>

                  <div className="space-y-1 bg-orange-950/30 p-3 rounded border border-orange-500/20">
                    <span className="text-xs font-mono text-orange-400 uppercase font-bold flex items-center space-x-1">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Direct Relevance to Thomas's Actions:</span>
                    </span>
                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {rule.relevanceToThomas}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rule 9d Duty Notice Banner */}
        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-red-950/80 via-orange-950/60 to-slate-900 border border-red-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-red-400 font-mono text-xs font-bold uppercase">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>Mandatory Server Mandate: Rule 9d (Duty to Report)</span>
            </div>
            <p className="text-sm text-slate-200 font-sans">
              "All players have a Duty to Report known policy violations to William and the GoSurvival admin team."
            </p>
          </div>

          <a
            href="#action"
            className="shrink-0 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg transition-colors shadow-lg cursor-pointer"
          >
            Fulfill Your Duty & Report
          </a>
        </div>

      </div>
    </section>
  );
};

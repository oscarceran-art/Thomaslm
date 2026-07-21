import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IncidentsGrid } from './components/IncidentsGrid';
import { ClaimsMapVisualizer } from './components/ClaimsMapVisualizer';
import { RulesSection } from './components/RulesSection';
import { MissingMountsCard } from './components/MissingMountsCard';
import { CallToAction } from './components/CallToAction';
import { ReportGenerator } from './components/ReportGenerator';
import { CommunityEvidencePool } from './components/CommunityEvidencePool';
import { Footer } from './components/Footer';
import { Map, FileText, Send, ShieldAlert } from 'lucide-react';

export default function App() {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleOpenReportGenerator = () => {
    setShowReportModal(true);
  };

  const handleScrollToEvidencePool = () => {
    const element = document.getElementById('evidence-pool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMap = () => {
    const element = document.getElementById('claims-map');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToIncidents = () => {
    const element = document.getElementById('incidents');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200 flex flex-col">
      {/* Header */}
      <Header onOpenReportGenerator={handleOpenReportGenerator} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <Hero onOpenReportGenerator={handleOpenReportGenerator} />

        {/* Section 2: What Happened (The Incidents Grid) */}
        <IncidentsGrid />

        {/* Visual Map Evidence Inspector for Incident 1 */}
        <ClaimsMapVisualizer />

        {/* Section 3: The Broken Rules */}
        <RulesSection />

        {/* Missing Mounts Tribute & Sighting Tracker for Incident 3 */}
        <MissingMountsCard />

        {/* Section 4: Call to Action (How We Stop This) */}
        <CallToAction 
          onOpenReportGenerator={handleOpenReportGenerator} 
          onScrollToEvidencePool={handleScrollToEvidencePool}
        />

        {/* Embedded Ticket Generator */}
        <section className="py-12 bg-slate-950 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReportGenerator />
          </div>
        </section>

        {/* Community Evidence Submissions Pool */}
        <CommunityEvidencePool />
      </main>

      {/* Floating Ticket Generator Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-auto py-4">
            <ReportGenerator onClose={() => setShowReportModal(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

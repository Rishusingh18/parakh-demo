import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TenderHub } from './pages/TenderHub';
import { BidVerification } from './pages/BidVerification';
import { GovtConnectors } from './pages/GovtConnectors';
import { EligibilityRules } from './pages/EligibilityRules';
import { AuditLog } from './pages/AuditLog';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9FF]">
        <Header />
        <Sidebar />
        {/* Main content area — offset for fixed header (104px) and sidebar (288px) */}
        <div className="pl-72 pt-[104px] min-h-screen">
          <main className="p-4 max-w-[1440px] mx-auto pb-16">
            <Routes>
              <Route path="/" element={<TenderHub />} />
              <Route path="/verify" element={<BidVerification />} />
              <Route path="/verify/:bidId" element={<BidVerification />} />
              <Route path="/connectors" element={<GovtConnectors />} />
              <Route path="/rules" element={<EligibilityRules />} />
              <Route path="/audit" element={<AuditLog />} />
            </Routes>
          </main>
        </div>

        {/* Footer bar */}
        <div className="fixed bottom-0 left-72 right-0 z-30 bg-[#0B2545] border-t-2 border-[#D97706] px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#778db2]">
            <span>PARAKH GeM 4.0 • Smart India Hackathon 2026</span>
            <span>|</span>
            <span>Problem Statement ID: 26100 • Team SMART-D</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#778db2]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              SANDBOX MODE
            </span>
            <span>|</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

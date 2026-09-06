import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'VIEWER'>(() => localStorage.getItem('officerRole') as any || 'ADMIN');

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as 'ADMIN' | 'VIEWER';
    setRole(newRole);
    localStorage.setItem('officerRole', newRole);
    window.dispatchEvent(new Event('roleChange'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-header">
      {/* Tricolor Bar */}
      <div className="tricolor-bar" />


      {/* Main Header */}
      <div className="h-16 px-4 flex items-center justify-between gap-4">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 min-w-max">
          <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#D97706] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
          </div>
          <div className="flex flex-col">
            <div className="font-serif text-[18px] font-semibold text-[#0B2545] tracking-tight leading-tight">PARAKH GeM 4.0</div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">Sovereign Public Procurement Platform</div>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#74777F] text-[18px]">search</span>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search Tender ID, GeM Reference, Ministry Docket..."
              className="w-full pl-10 pr-4 py-1.5 bg-[#E6EEFF] text-[#0D1C2F] placeholder:text-[#74777F] text-[13px] rounded border-0 focus:outline-none focus:ring-1 focus:ring-[#FE932C] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded text-[11px] font-mono font-bold text-[#065F46]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            SYSTEM LIVE
          </div>

          {/* Notifications */}
          <button className="relative p-1.5 text-[#44474E] hover:text-[#0D1C2F] rounded transition-colors" aria-label="Active tender notifications">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FE932C] rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-[#DDE9FF] hidden sm:block" />

          {/* Officer Profile Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={handleRoleChange}
              className="text-[13px] font-semibold text-[#0D1C2F] bg-transparent border-none focus:ring-0 cursor-pointer text-right outline-none"
            >
              <option value="ADMIN">Rajesh Varma, IAS (Admin)</option>
              <option value="VIEWER">Priya Sharma (Viewer)</option>
            </select>
            <div className="w-8 h-8 rounded-full bg-[#0B2545] flex items-center justify-center text-white font-bold text-sm ring-2 ring-[#C4C6CF]">
              {role === 'ADMIN' ? 'RV' : 'PS'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

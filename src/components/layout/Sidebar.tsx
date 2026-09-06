import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'gavel', label: 'Tenders & Bids', hindi: 'निविदा एवं बोलियां', exact: true },
  { path: '/verify', icon: 'fact_check', label: 'Bid Verification', hindi: 'बोली सत्यापन एवं साक्ष्य' },
  { path: '/connectors', icon: 'hub', label: 'Govt Connectors', hindi: 'सरकारी पोर्टल एकीकरण' },
  { path: '/rules', icon: 'rule', label: 'Eligibility & Rules', hindi: 'पात्रता एवं मूल्यांकन नियम' },
  { path: '/audit', icon: 'policy', label: 'Audit & Vigilance', hindi: 'सतर्कता एवं लेखा परीक्षा' },
  { path: '/sandbox', icon: 'database', label: 'Sandbox Databases', hindi: 'सैंडबॉक्स डेटाबेस एक्सप्लोरर' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#0B2545] z-40 flex flex-col pt-[104px] pb-4 shadow-sidebar">


      {/* Navigation */}
      <nav className="flex-1 px-2 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-150 ${
              isActive(item)
                ? 'bg-[#D97706] text-white font-semibold shadow-sm border-l-4 border-[#FE932C]'
                : 'text-[#EBF1FF] hover:bg-[#001026] hover:text-white border-l-4 border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-semibold leading-tight truncate">{item.label}</span>
              <span className="text-[10px] opacity-75 tracking-wide mt-0.5">{item.hindi}</span>
            </div>
          </Link>
        ))}
      </nav>


    </aside>
  );
};

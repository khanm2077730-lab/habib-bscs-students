import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip */}
      <div
        className={`absolute right-16 bg-slate-900/95 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap transition-all duration-200 pointer-events-none ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat with Habib (+92 343 0978427)
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-slate-900 border-t border-r border-slate-700 transform rotate-45 -translate-y-1/2" />
      </div>

      {/* Floating Button */}
      <a
        href={SITE_CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Chat with Habib on WhatsApp (+92 343 0978427)"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-200 border-2 border-slate-900"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};

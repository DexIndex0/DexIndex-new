import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-blue-900/40 bg-[#050811] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0029FF] to-[#041562] border border-blue-400/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/90" />
          </div>
          <span className="font-display font-extrabold text-sm text-white tracking-tight">
            Dex<span className="text-[#0029FF]">Index</span>
          </span>
          <span className="text-slate-600">·</span>
          <span>90-Starter Pokédex Archive</span>
        </div>

        {/* Development Note */}
        <div className="text-center sm:text-right text-slate-500">
          © {new Date().getFullYear()} DexIndex. All rights to Pokémon belong to Nintendo / Game Freak.
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const DevelopmentNotice: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    soundEngine.click();
    setIsMinimized(!isMinimized);
  };

  return (
    <aside 
      aria-label="Development status"
      className="fixed bottom-6 left-6 z-50 max-w-sm transition-all duration-300"
    >
      <div className="rounded-2xl glass-panel border border-blue-400/40 p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(0,41,255,0.3)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Pulsing indicator jewel with red hue */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-full h-full rounded-full bg-[#FF2A55] opacity-75 animate-ping" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#FF2A55] shadow-[0_0_8px_#FF2A55]" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs tracking-wide text-white uppercase">
                Development In Progress
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30">
                v0.2
              </span>
            </div>
          </div>

          <button
            onClick={toggleMinimize}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/50 transition-colors cursor-pointer"
            title={isMinimized ? "Expand notice" : "Minimize notice"}
            aria-label={isMinimized ? "Expand development notice" : "Minimize development notice"}
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {!isMinimized && (
          <div className="mt-2.5 pt-2.5 border-t border-blue-500/20 text-xs text-slate-300/90 leading-relaxed font-sans">
            <p>
              DexIndex is actively in development. Entries #0001 through #0081 and Gen 10 starters are cataloged. Unrevealed Gen 10 starter evolutions will be officially showcased in 2027.
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-blue-400">
              <Sparkles className="w-3 h-3 text-[#FF2A55]" />
              <span>Gen 10 starter evolutions arriving in 2027</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

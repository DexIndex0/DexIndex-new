import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleMute }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#070A12]/85 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Brand Wordmark with signature crimson jewel */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#0029FF] to-[#041562] border border-blue-400/50 shadow-[0_0_15px_rgba(0,41,255,0.4)]">
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF2A55] shadow-[0_0_8px_#FF2A55]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Dex<span className="text-[#0029FF] drop-shadow-[0_0_14px_rgba(0,41,255,0.8)]">Index</span>
            </span>
            <span className="text-slate-600 font-mono text-sm">/</span>
            <span className="text-xs font-mono font-semibold tracking-wider text-blue-300/80 uppercase">
              The Pokédex
            </span>
          </div>
        </div>

        {/* Status / Audio Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-xs font-mono text-slate-300 hover:text-white hover:border-blue-400/60 transition-all cursor-pointer active:scale-95"
            title={isMuted ? "Enable Sound" : "Mute Sound"}
            aria-label="Toggle Pokédex sound"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span className="hidden sm:inline text-blue-300 font-semibold">Sound ON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

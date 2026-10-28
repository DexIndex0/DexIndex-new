import React from 'react';
import { Sparkles, Layers, ShieldCheck, Flame, Leaf, Droplets } from 'lucide-react';

export const HeaderNotice: React.FC = () => {
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-72 bg-[#0029FF]/18 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 mb-6 shadow-[0_0_15px_rgba(0,41,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#FF2A55] shadow-[0_0_8px_#FF2A55]" />
          <span>90 STARTER ENTRIES</span>
          <span className="text-blue-500">·</span>
          <span className="text-white font-semibold">GEN 1 THROUGH GEN 10</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02] text-balance">
          DexIndex.
        </h1>

        <p className="mt-4 font-display font-bold text-xl sm:text-2xl text-blue-300 tracking-wide">
          The Starter Archive
        </p>

        {/* Narrative Description Block */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl glass-panel border border-blue-400/30 max-w-2xl mx-auto text-left shadow-[0_12px_40px_rgba(0,41,255,0.2)]">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-blue-900/40 border border-blue-400/40 text-blue-300 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#0029FF]" />
            </div>
            <div>
              <h2 className="font-display font-black text-sm uppercase tracking-wider text-white">
                Evolutionary Lineage Architecture
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Following a custom structure organized across every generational Fire, Grass, and Water starter line. Slots #0083–#0084, #0086–#0087, and #0089–#0090 are reserved for the unrevealed Generation 10 starter evolutions, scheduled for release in 2027.
              </p>
            </div>
          </div>
        </div>

        {/* Lineage Summary Badges (No Segmented Tabs) */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-white font-bold">Fire Lines</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">Grass Lines</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-bold">Water Lines</span>
          </div>
          <span>·</span>
          <span className="text-purple-300 font-bold">6 Classified (2027)</span>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PokemonEntry, getPokemonArtworkUrl } from '../data/pokemon';
import { X, Flame, Leaf, Droplets, Sparkles, HelpCircle, Activity, Ruler, Weight as WeightIcon, Zap, Award } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface PokemonExpandedViewProps {
  pokemon: PokemonEntry | null;
  onClose: () => void;
}

export const PokemonExpandedView: React.FC<PokemonExpandedViewProps> = ({ pokemon, onClose }) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.click();
        onClose();
      }
    };
    if (pokemon) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [pokemon, onClose]);

  if (!pokemon) return null;

  const artworkUrl = getPokemonArtworkUrl(pokemon.nationalId);
  const primaryType = pokemon.types[0];

  const typeThemeMap: Record<string, {
    glow: string;
    border: string;
    tag: string;
    badgeBg: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = {
    Fire: {
      glow: 'from-amber-500/35 via-red-600/30 to-transparent',
      border: 'border-red-500/50 shadow-[0_0_35px_rgba(255,42,85,0.4)]',
      tag: 'text-orange-300',
      badgeBg: 'bg-red-950/70 text-orange-300 border-red-500/40',
      icon: Flame,
    },
    Grass: {
      glow: 'from-emerald-500/35 via-teal-600/30 to-transparent',
      border: 'border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.4)]',
      tag: 'text-emerald-300',
      badgeBg: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
      icon: Leaf,
    },
    Water: {
      glow: 'from-blue-500/35 via-[#0029FF]/30 to-transparent',
      border: 'border-blue-500/50 shadow-[0_0_35px_rgba(0,41,255,0.45)]',
      tag: 'text-blue-300',
      badgeBg: 'bg-blue-950/70 text-blue-300 border-blue-500/40',
      icon: Droplets,
    },
    Mystery: {
      glow: 'from-purple-500/35 via-indigo-600/30 to-transparent',
      border: 'border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.4)]',
      tag: 'text-purple-300',
      badgeBg: 'bg-purple-950/70 text-purple-300 border-purple-500/40',
      icon: HelpCircle,
    },
  };

  const typeTheme = typeThemeMap[primaryType] || {
    glow: 'from-blue-500/25 to-transparent',
    border: 'border-blue-500/40 shadow-[0_0_30px_rgba(0,41,255,0.3)]',
    tag: 'text-blue-300',
    badgeBg: 'bg-blue-950/70 text-blue-300 border-blue-500/40',
    icon: Sparkles,
  };

  // Base Stat Total calculation
  const bst = pokemon.stats
    ? pokemon.stats.hp +
      pokemon.stats.attack +
      pokemon.stats.defense +
      pokemon.stats.spAttack +
      pokemon.stats.spDefense +
      pokemon.stats.speed
    : null;

  const statItems = pokemon.stats
    ? [
        { label: 'HP', val: pokemon.stats.hp, max: 160, barColor: 'from-emerald-500 to-green-400' },
        { label: 'Attack', val: pokemon.stats.attack, max: 160, barColor: 'from-orange-500 to-amber-400' },
        { label: 'Defense', val: pokemon.stats.defense, max: 160, barColor: 'from-amber-500 to-yellow-400' },
        { label: 'Sp. Atk', val: pokemon.stats.spAttack, max: 160, barColor: 'from-sky-500 to-blue-400' },
        { label: 'Sp. Def', val: pokemon.stats.spDefense, max: 160, barColor: 'from-indigo-500 to-purple-400' },
        { label: 'Speed', val: pokemon.stats.speed, max: 160, barColor: 'from-pink-500 to-rose-400' },
      ]
    : [];

  // Motion variants for staggered top-to-down waterfall cascade
  const waterfallContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.1,
      },
    },
  };

  const waterfallItem = {
    hidden: { opacity: 0, y: -32, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      key={`expanded-${pokemon.dexId}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto backdrop-blur-3xl bg-[#040714]/92 text-slate-100 flex flex-col justify-start"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.click();
          onClose();
        }
      }}
    >
        {/* Full-Screen Inner Canvas */}
        <div className="relative w-full max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col justify-between">
          
          {/* Top Header Bar with Close Button */}
          <div className="w-full flex items-center justify-between pb-6 border-b border-blue-900/40">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A55] shadow-[0_0_10px_#FF2A55] animate-pulse" />
              <span className="font-display font-black text-xs sm:text-sm tracking-widest text-blue-300 uppercase">
                DexIndex Archive // Specimen Profile
              </span>
            </div>

            {/* Top-Right Dismiss Button */}
            <button
              onClick={() => {
                soundEngine.click();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-slate-300 hover:text-white cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(0,41,255,0.3)] flex items-center gap-2"
              title="Close view (Esc)"
              aria-label="Close view"
            >
              <span className="text-xs font-mono font-bold hidden sm:inline text-slate-300">CLOSE [ESC]</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Full-Screen Layout: Top-Left Gliding Picture + Top-to-Down Waterfall Stats */}
          <div className="mt-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ========================================================================= */}
            {/* 1. TOP-LEFT GLIDING PICTURE WITH SPRING PHYSICS                           */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-start lg:sticky lg:top-8">
              <motion.div
                initial={{ x: 120, y: 150, scale: 0.65, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                  mass: 0.8,
                }}
                className={`w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0D153A] via-[#080D21] to-[#040714] border-2 ${typeTheme.border} backdrop-blur-2xl flex flex-col items-center relative overflow-hidden`}
              >
                {/* Background Specular Flare */}
                <div className={`absolute -top-12 -left-12 w-44 h-44 rounded-full bg-gradient-to-tr ${typeTheme.glow} blur-2xl pointer-events-none`} />

                {/* Top Number & Tag */}
                <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-4 z-10">
                  <span className="text-blue-300 font-bold text-sm tracking-wider">{pokemon.dexId}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-[11px] text-blue-300 font-mono">
                    {pokemon.generation}
                  </span>
                </div>

                {/* The Small Holographic Circle with the Pokémon's picture */}
                <div className="relative my-4 w-44 h-44 sm:w-52 sm:h-52 rounded-full holo-circle flex items-center justify-center shadow-[0_0_45px_rgba(0,41,255,0.5)] z-10">
                  {/* Type gradient aura */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${typeTheme.glow} opacity-90`} />
                  <div className="absolute inset-2 rounded-full border border-blue-400/35" />

                  {/* 1. Classified Gen 10 Evolutions */}
                  {pokemon.isUnrevealed ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-3 animate-pulse">
                      <HelpCircle className="w-16 h-16 text-purple-300" />
                      <span className="text-xs font-mono font-bold text-purple-300 mt-2 uppercase tracking-widest">
                        Classified · 2027
                      </span>
                    </div>
                  ) : pokemon.customArtType ? (
                    /* 2. Custom Gen 10 Starters (Pombon, Browt, Gecqua) */
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      {pokemon.customArtType === 'pombon' && (
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_30px_#FF2A55] p-3">
                          <Flame className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      )}
                      {pokemon.customArtType === 'browt' && (
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 flex items-center justify-center shadow-[0_0_30px_#10B981] p-3">
                          <Leaf className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      )}
                      {pokemon.customArtType === 'gecqua' && (
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center shadow-[0_0_30px_#0029FF] p-3">
                          <Droplets className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                  ) : artworkUrl ? (
                    /* 3. Official High-Res Artwork */
                    <img
                      src={artworkUrl}
                      alt={pokemon.name}
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
                    />
                  ) : (
                    <Sparkles className="w-14 h-14 text-blue-400" />
                  )}
                </div>

                {/* Name below picture */}
                <div className="text-center w-full mt-2 z-10">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
                    {pokemon.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 block mt-1">
                    {pokemon.category}
                  </span>

                  {/* Types Pill Badges */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border ${typeTheme.badgeBg}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ========================================================================= */}
            {/* 2. TOP-TO-DOWN STAGGERED WATERFALL ANIMATION (STATISTICS RECTANGLES)      */}
            {/* ========================================================================= */}
            <motion.div
              variants={waterfallContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 flex flex-col space-y-4 w-full"
            >
              
              {/* Rectangle 1: Species & Lineage Header Banner */}
              <motion.div
                variants={waterfallItem}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#0e1742]/90 to-[#060a1a]/95 border border-blue-500/30 shadow-[0_6px_20px_rgba(0,41,255,0.15)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
                  <span>Species Classification</span>
                  <span className="text-slate-400">{pokemon.dexId}</span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {pokemon.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-xs font-mono text-slate-300">
                  <span className="text-blue-300 font-semibold">{pokemon.category}</span>
                  <span>·</span>
                  <span className="text-slate-400">{pokemon.generation}</span>
                </div>
              </motion.div>

              {/* Rectangle 2: Official Pokédex Field Bio */}
              <motion.div
                variants={waterfallItem}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#0e1742]/80 to-[#060a1a]/90 border border-blue-500/25 shadow-md backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-blue-300 font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#0029FF]" />
                  <span>Pokédex Field Description</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {pokemon.description}
                </p>
              </motion.div>

              {/* Rectangles 3-6: Physical Attributes & Abilities in Rounded Rectangles */}
              <motion.div
                variants={waterfallItem}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {/* Height Rectangle */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0e1742]/70 to-[#060a1a]/90 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Ruler className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Height</span>
                  </div>
                  <span className="text-white font-mono font-bold text-xs sm:text-sm">{pokemon.height}</span>
                </div>

                {/* Weight Rectangle */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0e1742]/70 to-[#060a1a]/90 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <WeightIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Weight</span>
                  </div>
                  <span className="text-white font-mono font-bold text-xs sm:text-sm">{pokemon.weight}</span>
                </div>

                {/* Primary Ability Rectangle */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0e1742]/70 to-[#060a1a]/90 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Ability</span>
                  </div>
                  <span className="text-white font-mono font-bold text-xs truncate max-w-full">
                    {pokemon.abilities.join(', ')}
                  </span>
                </div>

                {/* Hidden Ability Rectangle */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0e1742]/70 to-[#060a1a]/90 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Hidden</span>
                  </div>
                  <span className="text-blue-300 font-mono font-bold text-xs truncate max-w-full">
                    {pokemon.hiddenAbility || 'None'}
                  </span>
                </div>
              </motion.div>

              {/* Rectangles 7-12: Individual Base Stats in Small Rounded Rectangles */}
              {pokemon.stats && (
                <motion.div
                  variants={waterfallItem}
                  className="space-y-2.5 pt-1"
                >
                  <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#FF2A55]" />
                      <span className="font-bold text-white uppercase tracking-wider">
                        Base Combat Statistics
                      </span>
                    </div>
                    {bst && (
                      <span className="text-blue-300 font-bold">
                        Total Base Stats: <span className="text-emerald-400 tabular-nums">{bst}</span>
                      </span>
                    )}
                  </div>

                  {/* 6 Individual Small Rounded Rectangles for each Stat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {statItems.map((stat) => {
                      const percentage = Math.min(100, Math.round((stat.val / stat.max) * 100));
                      return (
                        <div
                          key={stat.label}
                          className="p-3 rounded-2xl bg-gradient-to-br from-[#0e1742]/80 to-[#060a1a]/95 border border-blue-500/25 flex flex-col justify-between shadow-sm"
                        >
                          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                            <span className="text-slate-400 font-semibold">{stat.label}</span>
                            <span className="font-bold text-white tabular-nums text-sm">{stat.val}</span>
                          </div>
                          {/* Progress Meter Bar */}
                          <div className="w-full h-2 rounded-full bg-blue-950/90 border border-blue-500/20 overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                              className={`h-full rounded-full bg-gradient-to-r ${stat.barColor}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Special Classified League Dossier Rectangle for Unrevealed Gen 10 Evolutions */}
              {pokemon.isUnrevealed && (
                <motion.div
                  variants={waterfallItem}
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-indigo-950/30 border border-purple-500/40 text-xs font-mono text-purple-200 space-y-2.5 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                >
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                    <span>SEALED POKÉMON LEAGUE ARCHIVE // 2027 REVEAL</span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    The Pokémon Company has scheduled the global reveal for the intermediate and final evolutions of Pombon, Browt, and Gecqua in 2027. Full combat metrics, dual typing, and official artwork will be automatically integrated upon release.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom Footnote */}
          <div className="mt-8 pt-4 border-t border-blue-900/40 text-center text-xs font-mono text-slate-500">
            DexIndex Official Dossier · Click anywhere on the background or press ESC to return
          </div>
        </div>
      </motion.div>
  );
};

import React, { useState } from 'react';
import { PokemonEntry, getPokemonArtworkUrl } from '../data/pokemon';
import { Flame, Leaf, Droplets, HelpCircle, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface PokemonCardProps {
  pokemon: PokemonEntry;
  onSelect: (pokemon: PokemonEntry) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onSelect }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const artworkUrl = getPokemonArtworkUrl(pokemon.nationalId);

  // Type-based aesthetic glowing backdrop
  const primaryType = pokemon.types[0];
  const typeThemeMap: Record<string, {
    glow: string;
    border: string;
    tag: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = {
    Fire: {
      glow: 'from-amber-500/25 via-red-600/20 to-transparent',
      border: 'hover:border-red-400/60',
      tag: 'text-orange-300',
      icon: Flame,
    },
    Grass: {
      glow: 'from-emerald-500/25 via-teal-600/20 to-transparent',
      border: 'hover:border-emerald-400/60',
      tag: 'text-emerald-300',
      icon: Leaf,
    },
    Water: {
      glow: 'from-blue-500/25 via-[#0029FF]/20 to-transparent',
      border: 'hover:border-blue-400/60',
      tag: 'text-blue-300',
      icon: Droplets,
    },
    Mystery: {
      glow: 'from-purple-500/25 via-indigo-600/20 to-transparent',
      border: 'hover:border-purple-400/60',
      tag: 'text-purple-300',
      icon: HelpCircle,
    },
  };

  const typeTheme = typeThemeMap[primaryType] || {
    glow: 'from-blue-500/20 to-transparent',
    border: 'hover:border-blue-400/50',
    tag: 'text-blue-300',
    icon: Sparkles,
  };

  const TypeIcon = typeTheme.icon;

  return (
    <div
      onClick={() => {
        soundEngine.click();
        onSelect(pokemon);
      }}
      className={`group relative p-4 rounded-3xl glass-panel glass-panel-hover flex flex-col items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1.5 active:translate-y-0 ${typeTheme.border}`}
    >
      {/* Top Bar: 4-digit dex ID & Type Indicator */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
        <span className="text-blue-300 font-bold">{pokemon.dexId}</span>
        <div className="flex items-center gap-1">
          <TypeIcon className={`w-3 h-3 ${typeTheme.tag}`} />
          <span className={`text-[10px] font-semibold ${typeTheme.tag}`}>
            {pokemon.isUnrevealed ? 'Gen 10' : primaryType}
          </span>
        </div>
      </div>

      {/* The Small Holographic Circle with the Pokémon's picture */}
      <div className="relative my-2.5 w-24 h-24 rounded-full holo-circle flex items-center justify-center transition-all duration-300 group-hover:scale-108 group-hover:shadow-[0_0_30px_rgba(0,41,255,0.5)]">
        {/* Glowing backdrop based on elemental type */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${typeTheme.glow} opacity-60 group-hover:opacity-100 transition-opacity`} />
        
        {/* Holographic aperture ring */}
        <div className="absolute inset-1 rounded-full border border-blue-400/25" />

        {/* 1. Unrevealed Gen 10 Evolution Slot (Classified 2027) */}
        {pokemon.isUnrevealed ? (
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
            <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-400/40 flex items-center justify-center animate-pulse">
              <HelpCircle className="w-6 h-6 text-purple-300" />
            </div>
            <span className="text-[9px] font-mono font-bold text-purple-300 mt-1 tracking-wider uppercase">
              2027
            </span>
          </div>
        ) : pokemon.customArtType ? (
          /* 2. Custom Gen 10 Starter (Pombon, Browt, Gecqua) */
          <div className="relative z-10 flex flex-col items-center justify-center">
            {pokemon.customArtType === 'pombon' && (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_15px_#FF2A55] p-2">
                <Flame className="w-8 h-8 text-white drop-shadow" />
              </div>
            )}
            {pokemon.customArtType === 'browt' && (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 flex items-center justify-center shadow-[0_0_15px_#10B981] p-2">
                <Leaf className="w-8 h-8 text-white drop-shadow" />
              </div>
            )}
            {pokemon.customArtType === 'gecqua' && (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center shadow-[0_0_15px_#0029FF] p-2">
                <Droplets className="w-8 h-8 text-white drop-shadow" />
              </div>
            )}
          </div>
        ) : (
          /* 3. Official High-Res Artwork */
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            {artworkUrl && !imgError ? (
              <img
                src={artworkUrl}
                alt={pokemon.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-18 h-18 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                  imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              />
            ) : null}

            {(!imgLoaded || imgError) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <TypeIcon className="w-8 h-8 text-slate-400/50 animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Below the picture: the Pokémon's name written on it */}
      <div className="mt-2 text-center w-full">
        <h3 className="font-display font-extrabold text-sm sm:text-base tracking-wide text-white group-hover:text-blue-300 transition-colors block truncate">
          {pokemon.name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 mt-0.5">
          {pokemon.isUnrevealed ? (
            <span className="text-purple-300/90 font-medium">Reveal in 2027</span>
          ) : (
            <span>{pokemon.types.join(' · ')}</span>
          )}
        </div>
      </div>
    </div>
  );
};

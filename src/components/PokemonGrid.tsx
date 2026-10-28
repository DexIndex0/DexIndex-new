import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { POKEMON_ROSTER, PokemonEntry } from '../data/pokemon';
import { PokemonCard } from './PokemonCard';
import { PokemonExpandedView } from './PokemonExpandedView';

export const PokemonGrid: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonEntry | null>(null);

  return (
    <section className="relative pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 90-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {POKEMON_ROSTER.map((pokemon) => (
          <PokemonCard
            key={pokemon.dexId}
            pokemon={pokemon}
            onSelect={(p) => setSelectedPokemon(p)}
          />
        ))}
      </div>

      {/* Smooth Full-Screen Expanded View with AnimatePresence */}
      <AnimatePresence>
        {selectedPokemon && (
          <PokemonExpandedView
            key={selectedPokemon.dexId}
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

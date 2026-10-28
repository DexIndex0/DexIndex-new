/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeaderNotice } from './components/HeaderNotice';
import { PokemonGrid } from './components/PokemonGrid';
import { DevelopmentNotice } from './components/DevelopmentNotice';
import { Footer } from './components/Footer';
import { soundEngine } from './lib/sound';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setSoundEnabled(!nextMuted);
    if (!nextMuted) {
      soundEngine.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 relative selection:bg-[#0029FF] selection:text-white">
      {/* Background subtle radial dot grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 41, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Navbar */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content: Header Notice & 90 Pokemon Grid */}
      <main className="relative z-10">
        <HeaderNotice />
        <PokemonGrid />
      </main>

      {/* Corner Floating Development Tag */}
      <DevelopmentNotice />

      {/* Quiet Clean Footer */}
      <Footer />
    </div>
  );
}


import React from 'react';
import type { Creature } from '../types';

interface CreatureDisplayProps {
  creature: Creature;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-amber-400 mb-2 font-cinzel tracking-wide">{title}</h3>
    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{children}</p>
  </div>
);

const CreatureDisplay: React.FC<CreatureDisplayProps> = ({ creature }) => {
  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl animate-fadeIn">
      <h2 className="text-4xl font-bold text-amber-500 mb-6 text-center font-cinzel tracking-wider">{creature.name}</h2>
      
      {creature.imageUrl && (
        <div className="mb-8 flex justify-center">
          <img 
            src={creature.imageUrl} 
            alt={`Image of ${creature.name}`} 
            className="rounded-lg shadow-2xl max-w-full h-auto md:max-w-md border-4 border-slate-700 hover:border-amber-500 transition-all duration-300"
          />
        </div>
      )}

      <DetailSection title="Appearance">
        {creature.description}
      </DetailSection>
      
      <DetailSection title="Habitat">
        {creature.habitat}
      </DetailSection>

      <DetailSection title="Abilities">
        {creature.abilities}
      </DetailSection>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreatureDisplay;
    
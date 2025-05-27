
import React, { useState } from 'react';

interface KeywordInputProps {
  onGenerate: (keywords: string) => void;
  isLoading: boolean;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ onGenerate, isLoading }) => {
  const [keywords, setKeywords] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;
    onGenerate(keywords);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-slate-800 rounded-lg shadow-xl">
      <div>
        <label htmlFor="keywords" className="block text-lg font-medium text-amber-300 font-cinzel">
          Whisper Your Creature's Essence
        </label>
        <p className="text-sm text-slate-400 mb-2">Enter keywords like "shadow wolf, glowing eyes, forest spirit, ancient runes".</p>
        <textarea
          id="keywords"
          name="keywords"
          rows={4}
          className="mt-1 block w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-slate-100 placeholder-slate-400"
          placeholder="e.g., fiery phoenix, ice breath, mountain peak, starlight feathers"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading || !keywords.trim()}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors duration-150 font-cinzel tracking-wider"
        >
          {isLoading ? 'Weaving Magic...' : 'Summon Creature'}
        </button>
      </div>
    </form>
  );
};

export default KeywordInput;
    
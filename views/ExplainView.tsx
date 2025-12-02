import React, { useState } from 'react';
import { explainConcept } from '../services/geminiService';
import { WritingResponse } from '../types';
import Loading from '../components/Loading';
import ResultCard from '../components/ResultCard';
import { BookOpen } from 'lucide-react';

const ExplainView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WritingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await explainConcept(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What should I explain? / என்ன விளக்கம் வேண்டும்?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="e.g., GST, Inflation, AI"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
          />
          <button
            onClick={handleExplain}
            disabled={loading || !query.trim()}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <BookOpen size={24} />
          </button>
        </div>
      </div>

      {loading && <Loading />}

      {result && (
        <div className="space-y-4 mt-4">
          <ResultCard label="Simple Tamil Explanation" content={result.tamil} bgColor="bg-purple-50" />
          <ResultCard label="English Explanation" content={result.english} bgColor="bg-white" />
        </div>
      )}
    </div>
  );
};

export default ExplainView;
import React, { useState } from 'react';
import { getGovtHelp } from '../services/geminiService';
import { TOPICS } from '../types';
import Loading from '../components/Loading';
import { Search } from 'lucide-react';

const GovtHelpView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setQuery(searchTerm); // Sync input if clicked from quick link
    setLoading(true);
    setContent('');
    const data = await getGovtHelp(searchTerm);
    setContent(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      {/* Search Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Search Govt/Job Topic
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            placeholder="Ask about certificates, jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={loading || !query.trim()}
            className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            <Search size={24} />
          </button>
        </div>
      </div>

      {/* Quick Links */}
      {!content && !loading && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 ml-1">QUICK HELP / விரைவான உதவி</h3>
          <div className="grid grid-cols-2 gap-3">
            {TOPICS.GOVT.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSearch(topic)}
                className="p-3 text-sm text-amber-800 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors text-left"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loading />}

      {content && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-in fade-in">
           <div className="prose prose-sm prose-amber max-w-none whitespace-pre-wrap leading-relaxed text-gray-800">
             {content}
           </div>
        </div>
      )}
    </div>
  );
};

export default GovtHelpView;
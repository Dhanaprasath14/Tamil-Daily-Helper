import React, { useState } from 'react';
import { generateWriting } from '../services/geminiService';
import { TOPICS, WritingResponse } from '../types';
import Loading from '../components/Loading';
import ResultCard from '../components/ResultCard';
import { PenLine } from 'lucide-react';

const WriteView: React.FC = () => {
  const [contentType, setContentType] = useState(TOPICS.WRITE[0]);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<WritingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await generateWriting(contentType, topic);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">I want to write a...</label>
          <select
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            {TOPICS.WRITE.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic / காரணம் (e.g., Sick leave for 2 days)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Enter reason or details..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold shadow hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <PenLine size={18} />
          {loading ? 'Writing...' : 'Write For Me'}
        </button>
      </div>

      {loading && <Loading />}

      {result && (
        <div className="space-y-4 mt-6">
          <ResultCard label="Tamil Version" content={result.tamil} bgColor="bg-emerald-50" />
          <ResultCard label="English Version" content={result.english} bgColor="bg-white" />
        </div>
      )}
    </div>
  );
};

export default WriteView;
import React, { useState } from 'react';
import { translateText } from '../services/geminiService';
import { ArrowRightLeft } from 'lucide-react';
import Loading from '../components/Loading';
import ResultCard from '../components/ResultCard';

const TranslateView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTranslatedText('');
    const result = await translateText(inputText);
    setTranslatedText(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full space-y-4 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Type in Tamil or English / தமிழ் அல்லது ஆங்கிலத்தில் தட்டச்சு செய்க
        </label>
        <textarea
          className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px] text-lg"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading || !inputText.trim()}
        className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold shadow-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? 'Translating...' : (
          <>
            <span>Translate</span>
            <ArrowRightLeft size={20} />
          </>
        )}
      </button>

      {loading && <Loading />}

      {!loading && translatedText && (
        <div className="mt-4">
           <ResultCard label="Translation / மொழிபெயர்ப்பு" content={translatedText} bgColor="bg-blue-50" />
        </div>
      )}
    </div>
  );
};

export default TranslateView;
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultCardProps {
  label: string;
  content: string;
  bgColor?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, content, bgColor = "bg-white" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className={`p-4 rounded-xl border border-gray-100 shadow-sm ${bgColor} space-y-2`}>
      <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
        <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{label}</h3>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-orange-600 transition-colors"
          title="Copy text"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
        {content}
      </div>
    </div>
  );
};

export default ResultCard;
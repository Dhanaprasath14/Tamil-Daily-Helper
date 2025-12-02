import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500 animate-pulse">Thinking / யோசிக்கிறேன்...</p>
    </div>
  );
};

export default Loading;
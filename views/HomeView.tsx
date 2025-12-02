import React from 'react';
import { ViewState } from '../types';
import { Languages, PenTool, BookOpen, Briefcase, MessageCircle } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: ViewState.TRANSLATE,
      label: "Translate",
      subLabel: "தமிழ் ↔ English",
      icon: <Languages size={28} />,
      color: "bg-blue-100 text-blue-600",
      border: "border-blue-200"
    },
    {
      id: ViewState.WRITE,
      label: "Write for Me",
      subLabel: "Letters, Emails, Msgs",
      icon: <PenTool size={28} />,
      color: "bg-emerald-100 text-emerald-600",
      border: "border-emerald-200"
    },
    {
      id: ViewState.EXPLAIN,
      label: "Explain Simply",
      subLabel: "Understand concepts",
      icon: <BookOpen size={28} />,
      color: "bg-purple-100 text-purple-600",
      border: "border-purple-200"
    },
    {
      id: ViewState.GOVT,
      label: "Govt / Job Help",
      subLabel: "Guides & Terms",
      icon: <Briefcase size={28} />,
      color: "bg-amber-100 text-amber-600",
      border: "border-amber-200"
    },
    {
      id: ViewState.CHAT,
      label: "General Chat",
      subLabel: "Ask anything",
      icon: <MessageCircle size={28} />,
      color: "bg-rose-100 text-rose-600",
      border: "border-rose-200"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center p-5 rounded-2xl border ${item.border} bg-white shadow-sm hover:shadow-md transition-all active:scale-95 text-left`}
          >
            <div className={`p-3 rounded-full ${item.color} mr-4`}>
              {item.icon}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{item.label}</h2>
              <p className="text-gray-500 text-sm font-medium">{item.subLabel}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mt-6">
        <h3 className="font-semibold text-orange-800 mb-1">💡 Tip / குறிப்பு:</h3>
        <p className="text-sm text-orange-700">
          This app works best with internet connection.
          <br/>
          இந்த செயலியை பயன்படுத்த இணைய இணைப்பு தேவை.
        </p>
      </div>
    </div>
  );
};

export default HomeView;
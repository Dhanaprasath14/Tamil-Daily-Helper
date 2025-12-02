import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack: boolean;
  onBack: () => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, onMenuClick }) => {
  return (
    <header className="bg-orange-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3 max-w-2xl mx-auto">
        {showBack ? (
          <button 
            onClick={onBack}
            className="p-1 hover:bg-orange-700 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button 
            onClick={onMenuClick}
            className="p-1 hover:bg-orange-700 rounded-full transition-colors"
            title="Open Menu"
          >
             <Menu size={24} />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold leading-tight">{title}</h1>
          {!showBack && <p className="text-xs text-orange-100 opacity-90">Your Tamil–English Smart Assistant</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
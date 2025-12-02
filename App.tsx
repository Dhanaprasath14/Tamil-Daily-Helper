import React, { useState } from 'react';
import { ViewState } from './types';
import Header from './components/Header';
import MenuModal from './components/MenuModal';
import HomeView from './views/HomeView';
import TranslateView from './views/TranslateView';
import WriteView from './views/WriteView';
import ExplainView from './views/ExplainView';
import GovtHelpView from './views/GovtHelpView';
import ChatView from './views/ChatView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView onNavigate={setCurrentView} />;
      case ViewState.TRANSLATE:
        return <TranslateView />;
      case ViewState.WRITE:
        return <WriteView />;
      case ViewState.EXPLAIN:
        return <ExplainView />;
      case ViewState.GOVT:
        return <GovtHelpView />;
      case ViewState.CHAT:
        return <ChatView />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case ViewState.HOME: return "Tamil Daily Helper";
      case ViewState.TRANSLATE: return "Translate / மொழிபெயர்ப்பு";
      case ViewState.WRITE: return "Write for Me / எழுதுங்கள்";
      case ViewState.EXPLAIN: return "Explain Simply / விளக்கம்";
      case ViewState.GOVT: return "Govt & Job Help / உதவி";
      case ViewState.CHAT: return "General Chat / அரட்டை";
      default: return "Tamil Daily Helper";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        title={getTitle()} 
        showBack={currentView !== ViewState.HOME} 
        onBack={() => setCurrentView(ViewState.HOME)} 
        onMenuClick={() => setIsMenuOpen(true)}
      />
      
      <main className="flex-grow max-w-2xl mx-auto w-full p-4 md:p-6">
        {renderView()}
      </main>

      {currentView === ViewState.HOME && (
         <footer className="p-4 text-center text-gray-400 text-xs mt-auto">
            Created by DP
         </footer>
      )}

      {isMenuOpen && <MenuModal onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default App;
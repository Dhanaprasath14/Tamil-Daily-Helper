import React from 'react';
import { X, Phone, Info, HelpCircle } from 'lucide-react';

interface MenuModalProps {
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Info size={20} />
            Help & Options
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-orange-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          
          {/* Usage Tips */}
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <HelpCircle size={18} className="text-orange-600" />
              How to use / எப்படி பயன்படுத்துவது?
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Use the <strong>Microphone</strong> in chat to speak.</li>
              <li>Type in <strong>Tanglish</strong> (e.g., "Sappadu") for translations.</li>
              <li>Use <strong>Govt Help</strong> for certificate doubts.</li>
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Phone size={18} className="text-red-600" />
              Emergency Numbers / அவசர எண்கள்
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                <div className="text-xs text-red-500 font-bold uppercase">Police</div>
                <div className="text-xl font-bold text-red-700">100</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                <div className="text-xs text-red-500 font-bold uppercase">Ambulance</div>
                <div className="text-xl font-bold text-red-700">108</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                <div className="text-xs text-red-500 font-bold uppercase">Women Help</div>
                <div className="text-xl font-bold text-red-700">1091</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                <div className="text-xs text-red-500 font-bold uppercase">Child Help</div>
                <div className="text-xl font-bold text-red-700">1098</div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">App Version 1.0 • Created by DP</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuModal;
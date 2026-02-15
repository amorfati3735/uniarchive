import React from 'react';
import { Home, Search, Layers, Library, User } from 'lucide-react';
import { ViewMode } from '../types';

interface Props {
    activeTab: ViewMode;
    onNavigate: (mode: ViewMode) => void;
    onSearch: () => void;
    isLoggedIn: boolean;
    onLogin: () => void;
}

export const MobileNav: React.FC<Props> = ({ activeTab, onNavigate, onSearch, isLoggedIn, onLogin }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-uni-dark/95 backdrop-blur-xl border-t border-uni-border z-50 h-16 px-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center h-full max-w-sm mx-auto">
                <button
                    onClick={() => onNavigate(ViewMode.DISCOVER)}
                    className={`flex flex-col items-center gap-1 ${activeTab === ViewMode.DISCOVER ? 'text-uni-neon' : 'text-uni-muted'}`}
                >
                    <Home size={20} strokeWidth={activeTab === ViewMode.DISCOVER ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Home</span>
                </button>

                <button
                    onClick={onSearch}
                    className="flex flex-col items-center gap-1 text-uni-muted hover:text-uni-contrast active:scale-95 transition-transform"
                >
                    <div className="bg-uni-panel p-1.5 rounded-full border border-uni-border -mt-4 shadow-lg">
                        <Search size={20} className="text-uni-contrast" />
                    </div>
                    <span className="text-[10px] font-bold mt-1">Search</span>
                </button>

                <button
                    onClick={() => onNavigate(ViewMode.ANALYTICS)}
                    className={`flex flex-col items-center gap-1 ${activeTab === ViewMode.ANALYTICS ? 'text-uni-neon' : 'text-uni-muted'}`}
                >
                    <Layers size={20} strokeWidth={activeTab === ViewMode.ANALYTICS ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Stats</span>
                </button>

                <button
                    onClick={() => onNavigate(ViewMode.LIBRARY)}
                    className={`flex flex-col items-center gap-1 ${activeTab === ViewMode.LIBRARY ? 'text-uni-neon' : 'text-uni-muted'}`}
                >
                    <Library size={20} strokeWidth={activeTab === ViewMode.LIBRARY ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Lib</span>
                </button>

                {/* <button 
          onClick={isLoggedIn ? () => {} : onLogin}
          className={`flex flex-col items-center gap-1 ${isLoggedIn ? 'text-uni-contrast' : 'text-uni-muted'}`}
        >
          <User size={20} />
          <span className="text-[10px] font-bold">{isLoggedIn ? 'Me' : 'Login'}</span>
        </button> */}
            </div>
        </div>
    );
};

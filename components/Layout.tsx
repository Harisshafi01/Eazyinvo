
import React from 'react';
import { Sun, Moon, Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  activeTab: 'landing' | 'editor' | 'dashboard';
  setActiveTab: (tab: 'landing' | 'editor' | 'dashboard') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, setTheme, activeTab, setActiveTab }) => {
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="bg-black dark:bg-white p-1.5 rounded-lg text-white dark:text-black group-hover:scale-105 transition-transform">
              <span className="sr-only">Home</span>
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">Ease<span className="opacity-50">Invo</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'editor' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              Create
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              Dashboard
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-black dark:text-white border border-gray-100 dark:border-zinc-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Mini Version */}
      <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-900 py-4 no-print">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-black dark:text-white" />
              <span className="font-bold text-sm uppercase tracking-widest">EaseInvo</span>
            </div>
            <p className="text-gray-500 dark:text-zinc-500 text-[10px] max-w-xs leading-tight mb-2">
              Premium invoicing experience. Fast, minimal, and private. <br></br>
              <b>Founded </b> by <b>Haris Shafi,</b> driven by a vision to make invoicing effortless for freelancers and small businesses everywhere
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Twitter"><Twitter size={14} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Github"><Github size={14} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Linkedin"><Linkedin size={14} /></a>
              <a href="https://www.instagram.com/easeinvo/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[9px] uppercase tracking-widest mb-2 text-gray-400">Navigation</h4>
            <ul className="space-y-1 text-[11px] font-medium">
              <li><button onClick={() => setActiveTab('editor')} className="hover:text-gray-400 transition-colors">Create</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-gray-400 transition-colors">Dashboard</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[9px] uppercase tracking-widest mb-2 text-gray-400">Created By</h4>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold leading-none">
                <span className="text-black dark:text-white">Haris Shafi</span>
              </p>
              <ul className="space-y-1 text-[11px] font-medium">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-4 pt-3 border-t border-gray-50 dark:border-zinc-900 text-center text-[9px] uppercase tracking-widest text-gray-400 font-bold">
          &copy; {new Date().getFullYear()} EaseInvo &mdash; Haris Shafi
        </div>
      </footer>
    </div>
  );
};

export default Layout;

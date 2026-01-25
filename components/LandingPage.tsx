
import React from 'react';
import { CheckCircle, FileText, ShieldCheck, Zap, Download, Globe } from 'lucide-react';

interface LandingPageProps {
  onCreateClick: () => void;
  onViewSample: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreateClick, onViewSample }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 border border-black dark:border-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 animate-fade-in">
            <Zap size={12} />
            <span>Open Source & Free</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-black dark:text-white leading-[0.9]">
            INVOICING <br />
            <span className="opacity-20">SIMPLIFIED.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-500 max-w-xl mx-auto mb-14 font-medium leading-relaxed">
            Professional layouts with real-time preview. No signup. No tracking. Just clean, high-contrast invoices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onCreateClick}
              className="w-full sm:w-auto px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <FileText size={20} />
              Start Generating
            </button>
            <button 
              onClick={onViewSample}
              className="w-full sm:w-auto px-10 py-5 border border-black dark:border-white text-black dark:text-white rounded-full font-bold text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              View Samples
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800">
            {[
              { title: "ZERO FRICTION", desc: "No registration required. Open the app and start typing immediately.", icon: <Zap /> },
              { title: "LOCAL FIRST", desc: "Your financial data is private. Everything is stored in your browser's local storage.", icon: <ShieldCheck /> },
              { title: "VECTOR PDF", desc: "High-quality PDF exports that look perfect on any screen or paper.", icon: <Download /> },
              { title: "AUTO SAVE", desc: "Never lose a draft. We automatically save your work as you edit.", icon: <CheckCircle /> },
              { title: "GLOBAL READY", desc: "Support for major currencies and customizable tax rates.", icon: <Globe /> },
              { title: "SINGLE PAGE", desc: "Optimized layouts designed to fit perfectly on standard A4 documents.", icon: <FileText /> },
            ].map((f, i) => (
              <div key={i} className="p-12 bg-white dark:bg-black group transition-colors">
                <div className="w-10 h-10 mb-8 text-black dark:text-white group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-black dark:text-white">{f.title}</h3>
                <p className="text-gray-500 dark:text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aesthetic Image Section */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto px-4">
           <div className="relative aspect-[16/9] bg-black dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl group">
             <img 
               src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" 
               alt="Aesthetic Desktop" 
               className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-center px-6">
                  DESIGNED FOR <br /> PROFESSIONALS
                </h2>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;


import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import InvoiceEditor from './components/InvoiceEditor';
import InvoicePreview from './components/InvoicePreview';
import { Invoice } from './types';
import { INITIAL_INVOICE, SAMPLE_INVOICE } from './constants';
import { downloadPDF } from './utils/pdf';
import { Download, Save, ArrowLeft, RotateCcw, Eye, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'editor' | 'dashboard'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(INITIAL_INVOICE);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('easeinvo_invoices');
    const savedTheme = localStorage.getItem('easeinvo_theme');
    const savedDraft = localStorage.getItem('easeinvo_draft');

    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    if (savedDraft) setCurrentInvoice(JSON.parse(savedDraft));
  }, []);

  useEffect(() => {
    localStorage.setItem('easeinvo_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('easeinvo_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentInvoice.id === 'temp-id') {
      localStorage.setItem('easeinvo_draft', JSON.stringify(currentInvoice));
    }
  }, [currentInvoice]);

  const handleNewInvoice = () => {
    const newInvoice = { ...INITIAL_INVOICE, id: 'temp-id', invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}` };
    setCurrentInvoice(newInvoice);
    setActiveTab('editor');
  };

  const handleViewSample = () => {
    const sample = { ...SAMPLE_INVOICE, id: 'temp-id' };
    setCurrentInvoice(sample);
    setActiveTab('editor');
  };

  const handleSaveInvoice = () => {
    const idToSave = currentInvoice.id === 'temp-id' ? Math.random().toString(36).substr(2, 9) : currentInvoice.id;
    const invoiceToSave = { ...currentInvoice, id: idToSave };
    
    setInvoices(prev => {
      const exists = prev.find(inv => inv.id === idToSave);
      if (exists) {
        return prev.map(inv => inv.id === idToSave ? invoiceToSave : inv);
      }
      return [invoiceToSave, ...prev];
    });

    setCurrentInvoice(invoiceToSave);
    alert('Invoice saved successfully in local storage.');
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Delete this record permanently from history?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setActiveTab('editor');
  };

  const handleReset = () => {
    if (confirm('Reset to initial template? This will clear current draft.')) {
      setCurrentInvoice(INITIAL_INVOICE);
    }
  };

  const onDownloadPDF = () => downloadPDF(currentInvoice.invoiceNumber);

  return (
    <Layout 
      theme={theme} 
      setTheme={setTheme} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'landing' && (
        <LandingPage onCreateClick={handleNewInvoice} onViewSample={handleViewSample} />
      )}

      {activeTab === 'dashboard' && (
        <Dashboard 
          invoices={invoices} 
          onEdit={handleEditInvoice} 
          onDelete={handleDeleteInvoice}
          onNew={handleNewInvoice}
        />
      )}

      {activeTab === 'editor' && (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
          {/* Editor Side */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white dark:bg-black border-r border-gray-100 dark:border-zinc-900">
             <div className="sticky top-0 z-10 bg-white/95 dark:bg-black/95 backdrop-blur-sm p-4 md:p-6 border-b border-gray-50 dark:border-zinc-900 flex items-center justify-between">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full text-black dark:text-white transition-all flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">HISTORY</span>
                </button>
                <div className="flex gap-2 md:gap-4">
                   <button 
                     onClick={handleReset}
                     className="p-2.5 bg-gray-50 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-all"
                     title="Reset Template"
                   >
                     <RotateCcw size={18} />
                   </button>
                   <button 
                     onClick={handleSaveInvoice}
                     className="px-4 md:px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 hover:opacity-80 transition-all shadow-lg"
                   >
                     <Save size={16} />
                     <span className="hidden sm:inline">SAVE SYNC</span>
                   </button>
                </div>
             </div>
             <div className="p-4 md:p-8">
               <InvoiceEditor invoice={currentInvoice} setInvoice={setCurrentInvoice} />
             </div>
          </div>

          {/* Preview Side (Desktop) */}
          <div className="hidden lg:block lg:w-1/2 h-full relative bg-gray-100 dark:bg-zinc-900 group">
             <InvoicePreview invoice={currentInvoice} />
             
             {/* Desktop Action Sidebar */}
             <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button 
                  onClick={onDownloadPDF}
                  className="bg-black text-white dark:bg-white dark:text-black px-6 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
                >
                  <Download size={20} />
                  <span className="font-black text-[10px] uppercase tracking-widest">DOWNLOAD PDF</span>
                </button>
             </div>
          </div>

          {/* Mobile Preview Modal */}
          {showMobilePreview && (
            <div className="fixed inset-0 z-[60] bg-white dark:bg-black lg:hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 dark:border-zinc-900 flex justify-between items-center">
                <span className="font-black text-xs uppercase tracking-widest">REAL-TIME PREVIEW</span>
                <button onClick={() => setShowMobilePreview(false)} className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-grow overflow-auto bg-gray-100 dark:bg-zinc-950 p-4">
                <div className="max-w-[500px] mx-auto scale-[0.85] origin-top">
                  <InvoicePreview invoice={currentInvoice} />
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-zinc-900">
                <button 
                  onClick={onDownloadPDF}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
                >
                  <Download size={16} /> DOWNLOAD PDF
                </button>
              </div>
            </div>
          )}

          {/* Mobile Bottom Action Bar */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 w-full max-w-sm">
            <button 
              onClick={() => setShowMobilePreview(true)}
              className="flex-grow bg-black dark:bg-white text-white dark:text-black py-4 px-6 rounded-full shadow-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-transform active:scale-95 border border-black dark:border-white"
            >
              <Eye size={20} />
              PREVIEW
            </button>
            <button 
              onClick={onDownloadPDF}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-full shadow-2xl transition-transform active:scale-95 text-black dark:text-white"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;


import React from 'react';
import { Invoice, InvoiceItem, InvoiceTemplate } from '../types';
import { CURRENCIES, ACCENT_COLORS } from '../constants';
import { Plus, Trash2, Upload, Building2, UserCircle2, ListTodo, Palette, Settings, ChevronDown, Percent } from 'lucide-react';

interface InvoiceEditorProps {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ invoice, setInvoice }) => {
  const [activeSection, setActiveSection] = React.useState<'business' | 'client' | 'items' | 'styling' | 'extra'>('business');

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    const newItems = invoice.items.map(item => 
      item.id === id ? { ...item, ...updates, total: (updates.quantity !== undefined ? updates.quantity : item.quantity) * (updates.rate !== undefined ? updates.rate : item.rate) } : item
    );
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      quantity: 1,
      rate: 0,
      total: 0
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  const removeItem = (id: string) => {
    setInvoice({ ...invoice, items: invoice.items.filter(i => i.id !== id) });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoice({ ...invoice, sender: { ...invoice.sender, logo: reader.result as string } });
      };
      reader.readAsDataURL(file);
    }
  };

  const SectionHeader: React.FC<{ id: typeof activeSection; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button 
      onClick={() => setActiveSection(activeSection === id ? activeSection : id)}
      className={`w-full flex items-center justify-between py-6 border-b transition-all ${activeSection === id ? 'border-black dark:border-white opacity-100' : 'border-gray-100 dark:border-zinc-900 opacity-40 hover:opacity-100'}`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span className="font-black text-xs uppercase tracking-[0.2em]">{label}</span>
      </div>
      <ChevronDown size={16} className={`transition-transform duration-300 ${activeSection === id ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-12 no-print">
      
      {/* Quick Settings Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Invoice ID</label>
            <input 
              type="text" 
              value={invoice.invoiceNumber} 
              onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})}
              className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-2 text-sm font-bold focus:border-black dark:focus:border-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Currency</label>
            <select 
               value={invoice.currency}
               onChange={(e) => setInvoice({...invoice, currency: e.target.value})}
               className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-2 text-sm font-bold focus:border-black dark:focus:border-white outline-none transition-all appearance-none"
            >
               {CURRENCIES.map(c => <option key={c.code} value={c.symbol} className="bg-white dark:bg-black">{c.code}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Issue Date</label>
            <input 
              type="date" 
              value={invoice.issueDate} 
              onChange={(e) => setInvoice({...invoice, issueDate: e.target.value})}
              className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-2 text-sm font-bold focus:border-black dark:focus:border-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Due Date</label>
            <input 
              type="date" 
              value={invoice.dueDate} 
              onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
              className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-2 text-sm font-bold focus:border-black dark:focus:border-white outline-none transition-all"
            />
          </div>
      </div>

      <div className="space-y-2">
        {/* 1. Business */}
        <div>
          <SectionHeader id="business" icon={<Building2 size={18} />} label="SENDER DETAILS" />
          {activeSection === 'business' && (
            <div className="py-10 space-y-8 animate-fade-in">
               <div className="flex items-center gap-10">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden transition-all group-hover:border-black dark:group-hover:border-white">
                       {invoice.sender.logo ? (
                         <img src={invoice.sender.logo} className="w-full h-full object-contain" alt="Logo" />
                       ) : (
                         <Upload size={24} className="text-gray-300 dark:text-zinc-700" />
                       )}
                    </div>
                    <input type="file" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-1">Company Branding</h4>
                    <p className="text-xs text-gray-400">Upload your business logo here.</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <input placeholder="Business Name" value={invoice.sender.name} onChange={(e) => setInvoice({...invoice, sender: {...invoice.sender, name: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                 <input placeholder="Business Email" value={invoice.sender.email} onChange={(e) => setInvoice({...invoice, sender: {...invoice.sender, email: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                 <input placeholder="Business Phone Number" value={invoice.sender.phone} onChange={(e) => setInvoice({...invoice, sender: {...invoice.sender, phone: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all col-span-full" />
                 <textarea placeholder="Business Address" rows={3} value={invoice.sender.address} onChange={(e) => setInvoice({...invoice, sender: {...invoice.sender, address: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all col-span-full" />
               </div>
            </div>
          )}
        </div>

        {/* 2. Client */}
        <div>
          <SectionHeader id="client" icon={<UserCircle2 size={18} />} label="CLIENT DETAILS" />
          {activeSection === 'client' && (
            <div className="py-10 space-y-8 animate-fade-in">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <input placeholder="Client Full Name" value={invoice.client.name} onChange={(e) => setInvoice({...invoice, client: {...invoice.client, name: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                 <input placeholder="Client Contact Email" value={invoice.client.email} onChange={(e) => setInvoice({...invoice, client: {...invoice.client, email: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all" />
                 <input placeholder="Client Phone Number" value={invoice.client.phone} onChange={(e) => setInvoice({...invoice, client: {...invoice.client, phone: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all col-span-full" />
                 <textarea placeholder="Client Billing Address" rows={3} value={invoice.client.address} onChange={(e) => setInvoice({...invoice, client: {...invoice.client, address: e.target.value}})} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all col-span-full" />
               </div>
            </div>
          )}
        </div>

        {/* 3. Items & Calculations */}
        <div>
          <SectionHeader id="items" icon={<ListTodo size={18} />} label="LINE ITEMS & TAXES" />
          {activeSection === 'items' && (
            <div className="py-10 space-y-6 animate-fade-in">
               <div className="space-y-4">
                 {invoice.items.map((item) => (
                   <div key={item.id} className="grid grid-cols-12 gap-4 items-start pb-4 border-b border-gray-50 dark:border-zinc-900">
                     <div className="col-span-12 md:col-span-6">
                        <input placeholder="Service or product description..." value={item.name} onChange={(e) => updateItem(item.id, { name: e.target.value })} className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium outline-none" />
                     </div>
                     <div className="col-span-4 md:col-span-2">
                        <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })} className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium text-center outline-none" />
                     </div>
                     <div className="col-span-5 md:col-span-3">
                        <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, { rate: parseFloat(e.target.value) || 0 })} className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium text-right outline-none" />
                     </div>
                     <div className="col-span-3 md:col-span-1 flex items-center justify-end h-14">
                       <button onClick={() => removeItem(item.id)} className="p-2 text-gray-300 hover:text-black dark:hover:text-white transition-all"><Trash2 size={20} /></button>
                     </div>
                   </div>
                 ))}
               </div>
               <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-gray-100 dark:border-zinc-900 rounded-2xl text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                 <Plus size={16} /> ADD LINE
               </button>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100 dark:border-zinc-900">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2"><Percent size={12}/> VAT / Tax Rate (%)</label>
                    <input 
                      type="number" 
                      value={invoice.taxRate} 
                      onChange={(e) => setInvoice({...invoice, taxRate: parseFloat(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2"><Percent size={12}/> Overall Discount (%)</label>
                    <input 
                      type="number" 
                      value={invoice.discountRate} 
                      onChange={(e) => setInvoice({...invoice, discountRate: parseFloat(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium outline-none"
                    />
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* 4. Styling */}
        <div>
          <SectionHeader id="styling" icon={<Palette size={18} />} label="VISUAL THEME" />
          {activeSection === 'styling' && (
            <div className="py-10 space-y-12 animate-fade-in">
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Template Structure</h4>
                  <div className="grid grid-cols-3 gap-4">
                     {(['modern', 'classic', 'minimal'] as InvoiceTemplate[]).map(t => (
                       <button key={t} onClick={() => setInvoice({...invoice, template: t})} className={`py-4 rounded-2xl border transition-all text-[10px] uppercase font-black tracking-widest ${invoice.template === t ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-gray-100 dark:border-zinc-900 text-gray-400 hover:text-black dark:hover:text-white'}`}>
                         {t}
                       </button>
                     ))}
                  </div>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Contrast Point</h4>
                  <div className="flex flex-wrap gap-4">
                     {ACCENT_COLORS.map(c => (
                       <button key={c.value} onClick={() => setInvoice({...invoice, accentColor: c.value})} className={`w-12 h-12 rounded-full transition-all border-2 ${invoice.accentColor === c.value ? 'border-black dark:border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: c.value }} aria-label={c.name} />
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* 5. Extra */}
        <div>
           <SectionHeader id="extra" icon={<Settings size={18} />} label="NOTES & TERMS" />
           {activeSection === 'extra' && (
             <div className="py-10 space-y-8 animate-fade-in">
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Notes</label>
                 <textarea 
                   rows={3} 
                   value={invoice.notes} 
                   onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
                   className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium outline-none"
                   placeholder="Thank you for your business!"
                 />
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Terms & Conditions</label>
                 <textarea 
                   rows={3} 
                   value={invoice.terms} 
                   onChange={(e) => setInvoice({...invoice, terms: e.target.value})}
                   className="w-full p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-none font-medium outline-none"
                   placeholder="Payment is due within 30 days."
                 />
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;

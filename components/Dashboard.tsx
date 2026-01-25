
import React from 'react';
import { Invoice } from '../types';
import { Plus, Trash2, Eye, FileText, Search } from 'lucide-react';

interface DashboardProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ invoices, onEdit, onDelete, onNew }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">DASHBOARD</h1>
          <p className="text-gray-500 dark:text-zinc-500 font-medium">History of your generated invoices.</p>
        </div>
        <button 
          onClick={onNew}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-transform hover:scale-105"
        >
          <Plus size={20} />
          NEW INVOICE
        </button>
      </div>

      <div className="bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-zinc-900 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-zinc-900">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
            />
          </div>
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="py-32 text-center">
            <div className="text-gray-300 dark:text-zinc-800 mb-6 flex justify-center">
              <FileText size={64} />
            </div>
            <h3 className="text-xl font-bold mb-2">NO RECORDS FOUND</h3>
            <p className="text-gray-400 dark:text-zinc-600 mb-8 max-w-xs mx-auto">You haven't saved any invoices yet. Start by creating a new one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-8 py-6">ID</th>
                  <th className="px-8 py-6">CLIENT</th>
                  <th className="px-8 py-6">DATE</th>
                  <th className="px-8 py-6">TOTAL</th>
                  <th className="px-8 py-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-zinc-900">
                {filteredInvoices.map((inv) => {
                   const subtotal = inv.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
                   const tax = subtotal * (inv.taxRate / 100);
                   const discount = subtotal * (inv.discountRate / 100);
                   const total = subtotal + tax - discount;
                   
                   return (
                    <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                      <td className="px-8 py-8 font-black text-black dark:text-white">#{inv.invoiceNumber}</td>
                      <td className="px-8 py-8">
                        <div className="font-bold text-sm">{inv.client.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{inv.client.email}</div>
                      </td>
                      <td className="px-8 py-8 text-sm font-medium text-gray-500">{inv.issueDate}</td>
                      <td className="px-8 py-8 font-black text-sm">{inv.currency}{total.toLocaleString()}</td>
                      <td className="px-8 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => onEdit(inv)}
                            className="p-3 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => onDelete(inv.id)}
                            className="p-3 bg-gray-100 dark:bg-zinc-900 text-gray-400 hover:text-red-600 rounded-xl transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const discount = subtotal * (invoice.discountRate / 100);
  const total = subtotal + tax - discount;

  const renderTemplate = () => {
    switch (invoice.template) {
      case 'classic':
        return (
          <div className="min-h-full flex flex-col p-4 sm:p-8 md:p-12 bg-white text-slate-900">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-12 border-b-2 pb-6 md:pb-8" style={{ borderColor: invoice.accentColor }}>
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: invoice.accentColor }}>Invoice</h1>
                <p className="text-slate-500 font-bold">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-left md:text-right">
                {invoice.sender.logo && <img src={invoice.sender.logo} className="h-10 md:h-12 w-auto mb-2 md:ml-auto" alt="Logo" />}
                <h2 className="text-lg md:text-xl font-bold">{invoice.sender.name}</h2>
                <p className="text-sm text-slate-500 whitespace-pre-wrap">{invoice.sender.address}</p>
                {invoice.sender.phone && <p className="text-sm text-slate-400 mt-1">{invoice.sender.phone}</p>}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-8 md:mb-12">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bill To:</h3>
                <h4 className="text-lg font-bold">{invoice.client.name}</h4>
                <p className="text-sm text-slate-500 whitespace-pre-wrap">{invoice.client.address}</p>
                {invoice.client.phone && <p className="text-sm text-slate-400 mt-1">{invoice.client.phone}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between md:justify-end md:gap-8">
                  <span className="text-slate-400 text-xs font-bold uppercase">Date:</span>
                  <span className="text-sm font-medium">{invoice.issueDate}</span>
                </div>
                <div className="flex justify-between md:justify-end md:gap-8">
                  <span className="text-slate-400 text-xs font-bold uppercase">Due Date:</span>
                  <span className="text-sm font-medium">{invoice.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full mb-8 border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-left border-b-2" style={{ borderColor: invoice.accentColor }}>
                    <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Description</th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-slate-400">Qty</th>
                    <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Rate</th>
                    <th className="py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item, i) => (
                    <tr key={item.id || i}>
                      <td className="py-4 font-medium">{item.name || 'Untitled Item'}</td>
                      <td className="py-4 px-4 text-center">{item.quantity}</td>
                      <td className="py-4 px-4 text-right">{invoice.currency} {item.rate.toLocaleString()}</td>
                      <td className="py-4 text-right font-semibold">{invoice.currency} {(item.quantity * item.rate).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center md:justify-end">
              <div className="w-full md:w-72 space-y-3 bg-slate-50 p-4 md:p-6 rounded-lg">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span>{invoice.currency} {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t-2" style={{ borderTopColor: invoice.accentColor }}>
                  <span>TOTAL</span>
                  <span style={{ color: invoice.accentColor }}>{invoice.currency} {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Notes</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{invoice.notes}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Terms</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{invoice.terms}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 overflow-auto p-2 sm:p-4 md:p-8">
      <div
        className="mx-auto w-full max-w-[800px] shadow-2xl origin-top transition-transform scale-100 bg-white"
        id="invoice-capture-area"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default InvoicePreview;

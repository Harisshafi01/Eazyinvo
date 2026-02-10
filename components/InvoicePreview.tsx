
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
          <div className="min-h-full flex flex-col p-12 bg-white text-slate-900">
            <div className="flex justify-between items-start mb-12 border-b-2 pb-8" style={{ borderColor: invoice.accentColor }}>
              <div>
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: invoice.accentColor }}>Invoice</h1>
                <p className="text-slate-500 font-bold">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                {invoice.sender.logo && <img src={invoice.sender.logo} className="h-12 w-auto ml-auto mb-4" alt="Logo" />}
                <h2 className="text-xl font-bold">{invoice.sender.name}</h2>
                <p className="text-sm text-slate-500 whitespace-pre-wrap">{invoice.sender.address}</p>
                {invoice.sender.phone && <p className="text-sm text-slate-400 mt-1">{invoice.sender.phone}</p>}
              </div>
            </div>

            <div className="flex justify-between mb-12">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bill To:</h3>
                <h4 className="text-lg font-bold">{invoice.client.name}</h4>
                <p className="text-sm text-slate-500 whitespace-pre-wrap">{invoice.client.address}</p>
                {invoice.client.phone && <p className="text-sm text-slate-400 mt-1">{invoice.client.phone}</p>}
              </div>
              <div className="text-right space-y-2">
                 <div className="flex justify-end gap-8">
                   <span className="text-slate-400 text-xs font-bold uppercase">Date:</span>
                   <span className="text-sm font-medium">{invoice.issueDate}</span>
                 </div>
                 <div className="flex justify-end gap-8">
                   <span className="text-slate-400 text-xs font-bold uppercase">Due Date:</span>
                   <span className="text-sm font-medium">{invoice.dueDate}</span>
                 </div>
              </div>
            </div>

            <table className="w-full mb-8 border-collapse">
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

            <div className="mt-4 flex justify-end">
              <div className="w-72 space-y-3 bg-slate-50 p-6 rounded-lg">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span>{invoice.currency} {subtotal.toLocaleString()}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span>{invoice.currency} {tax.toLocaleString()}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-rose-500 text-sm">
                    <span>Discount ({invoice.discountRate}%)</span>
                    <span>-{invoice.currency} {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-black pt-4 border-t-2" style={{ borderTopColor: invoice.accentColor }}>
                  <span>TOTAL</span>
                  <span style={{ color: invoice.accentColor }}>{invoice.currency} {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 gap-12">
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

      case 'minimal':
        return (
          <div className="min-h-full flex flex-col p-12 bg-white text-slate-900 font-light">
             <div className="flex justify-between items-start mb-16">
                <div>
                   <h2 className="text-2xl font-bold mb-1">{invoice.sender.name}</h2>
                   <p className="text-sm text-slate-400 max-w-xs">{invoice.sender.address}</p>
                   {invoice.sender.phone && <p className="text-sm text-slate-300 mt-1">{invoice.sender.phone}</p>}
                </div>
                <div className="text-right">
                   <h1 className="text-5xl font-black opacity-10 uppercase -mr-2 mb-2">Invoice</h1>
                   <div className="text-sm">
                      <p className="font-bold">NO. {invoice.invoiceNumber}</p>
                      <p className="text-slate-400">{invoice.issueDate}</p>
                   </div>
                </div>
             </div>

             <div className="mb-16">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-bold">Billed to</p>
                <h3 className="text-xl font-bold">{invoice.client.name}</h3>
                <p className="text-slate-400 text-sm max-w-xs">{invoice.client.address}</p>
                {invoice.client.phone && <p className="text-xs text-slate-400 mt-1">{invoice.client.phone}</p>}
             </div>

             <div className="mb-12">
                <div className="grid grid-cols-12 gap-4 border-b-2 border-slate-900 pb-2 mb-4">
                  <div className="col-span-6 text-xs font-bold uppercase">Description</div>
                  <div className="col-span-2 text-center text-xs font-bold uppercase">Qty</div>
                  <div className="col-span-4 text-right text-xs font-bold uppercase">Total</div>
                </div>
                {invoice.items.map((item, i) => (
                  <div key={item.id || i} className="grid grid-cols-12 gap-4 py-4 border-b border-slate-100">
                    <div className="col-span-6">
                       <p className="font-bold">{item.name}</p>
                       <p className="text-xs text-slate-400">{invoice.currency}{item.rate} / unit</p>
                    </div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-4 text-right font-bold text-lg">{invoice.currency}{(item.quantity * item.rate).toLocaleString()}</div>
                  </div>
                ))}
             </div>

             <div className="mt-4 flex justify-between items-start">
                <div className="max-w-xs space-y-6">
                   <div>
                      <p className="text-xs font-bold uppercase mb-2">Terms</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{invoice.terms}</p>
                   </div>
                   {invoice.notes && (
                      <div>
                        <p className="text-xs font-bold uppercase mb-2">Note</p>
                        <p className="text-xs text-slate-500 italic">{invoice.notes}</p>
                      </div>
                   )}
                </div>
                <div className="w-56 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                   <div className="flex justify-between py-1 text-xs opacity-60">
                      <span>Subtotal</span>
                      <span>{invoice.currency}{subtotal.toLocaleString()}</span>
                   </div>
                   {tax > 0 && (
                     <div className="flex justify-between py-1 text-xs opacity-60">
                        <span>Tax ({invoice.taxRate}%)</span>
                        <span>{invoice.currency}{tax.toLocaleString()}</span>
                     </div>
                   )}
                   {discount > 0 && (
                     <div className="flex justify-between py-1 text-xs text-rose-400">
                        <span>Discount</span>
                        <span>-{invoice.currency}{discount.toLocaleString()}</span>
                     </div>
                   )}
                   <div className="flex justify-between py-2 text-2xl font-black mt-4 border-t border-white/20">
                      <span>Total</span>
                      <span>{invoice.currency}{total.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'modern':
      default:
        return (
          <div className="min-h-full flex flex-col bg-white text-slate-900">
            {/* Header Accent */}
            <div className="h-4 w-full" style={{ backgroundColor: invoice.accentColor }}></div>
            
            <div className="p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {invoice.sender.logo ? (
                      <img src={invoice.sender.logo} className="h-10 w-auto" alt="Logo" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: invoice.accentColor }}>
                        {invoice.sender.name[0]}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold tracking-tight">{invoice.sender.name}</h2>
                  </div>
                  <div className="space-y-1 text-sm text-slate-500">
                    <p className="whitespace-pre-wrap">{invoice.sender.address}</p>
                    <p>{invoice.sender.email}</p>
                    {invoice.sender.phone && <p>{invoice.sender.phone}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl font-black mb-2 opacity-10">INVOICE</h1>
                  <p className="text-lg font-bold">#{invoice.invoiceNumber}</p>
                  <div className="mt-4 text-sm text-slate-500">
                    <p>Issued: {invoice.issueDate}</p>
                    <p>Due: {invoice.dueDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 mb-10 flex justify-between items-center border border-slate-100">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Billed To</p>
                  <h3 className="text-xl font-bold mb-1">{invoice.client.name}</h3>
                  <p className="text-sm text-slate-500 max-w-xs whitespace-pre-wrap">{invoice.client.address}</p>
                  <p className="text-sm text-indigo-600 font-medium mt-2">{invoice.client.email}</p>
                  {invoice.client.phone && <p className="text-xs text-slate-400 mt-1">{invoice.client.phone}</p>}
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Amount Due</p>
                   <p className="text-5xl font-black tracking-tighter" style={{ color: invoice.accentColor }}>{invoice.currency}{total.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-10">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <th className="py-4">Item & Description</th>
                      <th className="py-4 px-4 text-center">Qty</th>
                      <th className="py-4 px-4 text-right">Price</th>
                      <th className="py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {invoice.items.map((item, i) => (
                      <tr key={item.id || i}>
                        <td className="py-6 pr-4">
                          <p className="font-bold text-slate-800">{item.name}</p>
                        </td>
                        <td className="py-6 px-4 text-center text-slate-600 font-medium">{item.quantity}</td>
                        <td className="py-6 px-4 text-right text-slate-600">{invoice.currency}{item.rate.toLocaleString()}</td>
                        <td className="py-6 text-right font-bold text-slate-900 text-lg">{invoice.currency}{(item.quantity * item.rate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-between gap-12 pt-8 border-t border-slate-100">
                 <div className="flex-grow max-w-md">
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Terms & Conditions</h4>
                      <p className="text-xs text-slate-500 leading-relaxed italic">{invoice.terms}</p>
                    </div>
                    {invoice.notes && (
                       <div>
                         <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Additional Notes</h4>
                         <p className="text-xs text-slate-500">{invoice.notes}</p>
                       </div>
                    )}
                 </div>
                 <div className="w-72 space-y-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">{invoice.currency}{subtotal.toLocaleString()}</span>
                    </div>
                    {tax > 0 && (
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>VAT / Tax ({invoice.taxRate}%)</span>
                        <span className="font-semibold text-slate-900">{invoice.currency}{tax.toLocaleString()}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-rose-500">
                        <span>Discount ({invoice.discountRate}%)</span>
                        <span className="font-semibold">-{invoice.currency}{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-2xl font-black pt-5 border-t-4 border-slate-900" style={{ color: invoice.accentColor }}>
                      <span>TOTAL DUE</span>
                      <span>{invoice.currency}{total.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 overflow-auto p-4 md:p-8">
      <div 
        className="mx-auto w-full max-w-[800px] shadow-2xl origin-top transition-transform scale-100 bg-white" 
        id="invoice-capture-area"
        style={{ minHeight: '1123px' }} // Approx A4 height at 96dpi
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default InvoicePreview;

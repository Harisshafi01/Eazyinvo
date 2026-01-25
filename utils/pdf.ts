
/**
 * Generates and downloads a PDF file directly using html2pdf.
 * Optimized to attempt to fit content on a single page.
 */
export const downloadPDF = (invoiceNumber: string) => {
  const element = document.getElementById('invoice-capture-area');
  if (!element) return;

  const opt = {
    margin: 0,
    filename: `invoice-${invoiceNumber}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 3, 
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // @ts-ignore - html2pdf is loaded from CDN
  html2pdf().set(opt).from(element).save();
};

export const downloadAsJSON = (invoice: any) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoice, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `invoice-${invoice.invoiceNumber}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

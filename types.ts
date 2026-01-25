
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface BusinessDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  logo?: string;
}

export interface ClientDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export type InvoiceTemplate = 'classic' | 'modern' | 'minimal';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  sender: BusinessDetails;
  client: ClientDetails;
  items: InvoiceItem[];
  currency: string;
  taxRate: number;
  discountRate: number;
  notes: string;
  terms: string;
  template: InvoiceTemplate;
  accentColor: string;
}

export interface AppState {
  invoices: Invoice[];
  currentInvoice: Invoice;
  theme: 'light' | 'dark';
}

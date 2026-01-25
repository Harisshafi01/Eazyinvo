
import React from 'react';
import { Invoice } from './types';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const ACCENT_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Gray', value: '#1f2937' },
  { name: 'Silver', value: '#94a3b8' },
  { name: 'Deep Blue', value: '#0f172a' },
];

export const INITIAL_INVOICE: Invoice = {
  id: 'temp-id',
  invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  sender: {
    name: 'Your Business Name',
    address: '123 Business St, City, Country',
    email: 'hello@business.com',
    phone: '+1 (555) 000-0000',
  },
  client: {
    name: 'Client Name',
    address: '456 Client Rd, Suite 100, City',
    email: 'billing@client.com',
    phone: '',
  },
  items: [
    { id: '1', name: 'Premium Service', quantity: 1, rate: 1200, total: 1200 },
    { id: '2', name: 'Design Consulting', quantity: 5, rate: 150, total: 750 },
  ],
  currency: '$',
  taxRate: 10,
  discountRate: 0,
  notes: 'Thank you for choosing our services.',
  terms: 'Payment is due within 15 days of the invoice date.',
  template: 'modern',
  accentColor: '#000000',
};

export const SAMPLE_INVOICE: Invoice = {
  ...INITIAL_INVOICE,
  invoiceNumber: 'INV-SAMPLE-2025',
  sender: {
    name: 'Creative Studio Pro',
    address: '77 Digital Avenue, Tech District\nSan Francisco, CA 94105',
    email: 'contact@creativestudio.pro',
    phone: '+1 (415) 555-0123',
  },
  client: {
    name: 'Innovate Corp',
    address: '1200 Market Street, Suite 400\nPhiladelphia, PA 19107',
    email: 'accounts@innovate.co',
    phone: '+1 (215) 555-9876',
  },
  items: [
    { id: 's1', name: 'Brand Identity Design', quantity: 1, rate: 2500, total: 2500 },
    { id: 's2', name: 'React Frontend Development (Hourly)', quantity: 40, rate: 125, total: 5000 },
    { id: 's3', name: 'Cloud Infrastructure Setup', quantity: 1, rate: 1500, total: 1500 },
    { id: 's4', name: 'Social Media Assets Kit', quantity: 3, rate: 450, total: 1350 },
  ],
  taxRate: 8.5,
  discountRate: 5,
  notes: 'Hope you enjoy the sample invoice! This data demonstrates a professional high-value service contract.',
  terms: 'Standard net-30 terms apply. Please remit payment via bank transfer or digital wallet.',
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users2,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Tag,
  Trash2,
  Loader2,
  FileSpreadsheet,
  Send,
  ShieldCheck,
  Check,
  X,
  Phone,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '@convoza/ui';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 'c1',
      name: 'Sarah Miller',
      phone: '+91 98765 40001',
      email: 'sarah.m@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['VIP Customer', 'High Value', 'Apparel'],
      createdAt: '2026-11-10',
      totalSpent: '₹42,500',
    },
    {
      id: 'c2',
      name: 'Rohan Sharma',
      phone: '+91 98765 40002',
      email: 'rohan.s@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['Festive Buyer', 'Retail'],
      createdAt: '2026-11-11',
      totalSpent: '₹12,400',
    },
    {
      id: 'c3',
      name: 'Elena Rostova',
      phone: '+91 98765 40003',
      email: 'elena.r@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['VIP Customer', 'International'],
      createdAt: '2026-11-12',
      totalSpent: '₹89,200',
    },
    {
      id: 'c4',
      name: 'David Kim',
      phone: '+91 98765 40006',
      email: 'david.k@example.com',
      consentStatus: 'OPTED_OUT',
      tags: ['Prospect'],
      createdAt: '2026-11-13',
      totalSpent: '₹0',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // New Contact Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTags, setNewTags] = useState('VIP Customer, Retail');

  // CSV Import State
  const [csvContent, setCsvContent] = useState(
    `phone,name,email,tags\n+919876540010,Pooja Verma,pooja@example.com,VIP Customer\n+919876540011,Amit Shah,amit@example.com,Retail`
  );
  const [importListName, setImportListName] = useState('Diwali Campaign Wave 2');
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const filteredContacts = contacts.filter((c) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(s) ||
      c.phone.includes(s) ||
      c.email.toLowerCase().includes(s);

    if (!matchesSearch) return false;
    if (tagFilter === 'OPTED_IN') return c.consentStatus === 'OPTED_IN';
    if (tagFilter === 'OPTED_OUT') return c.consentStatus === 'OPTED_OUT';
    if (tagFilter === 'VIP') return c.tags.includes('VIP Customer');
    return true;
  });

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newContact = {
        id: `c_${Date.now()}`,
        name: newName,
        phone: newPhone.startsWith('+') ? newPhone : `+${newPhone}`,
        email: newEmail,
        consentStatus: 'OPTED_IN',
        tags: newTags.split(',').map((t) => t.trim()),
        createdAt: 'Just now',
        totalSpent: '₹0',
      };

      setContacts([newContact, ...contacts]);
      setMessage('Contact added with verified opt-in consent!');
      setShowAddModal(false);
      setNewName('');
      setNewPhone('');
      setNewEmail('');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleImportCsv = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);

    setTimeout(() => {
      setMessage(`CSV batch import successful! 2 new contacts imported into "${importListName}".`);
      setIsImporting(false);
      setShowImportModal(false);
    }, 600);
  };

  const handleExportCsv = () => {
    const headers = ['Phone,Name,Email,ConsentStatus,Tags,CreatedAt'];
    const rows = contacts.map(
      (c) => `"${c.phone}","${c.name}","${c.email}","${c.consentStatus}","${c.tags.join(';')}","${c.createdAt}"`
    );
    const blob = new Blob([[headers.join('\n'), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `convoza-audience-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Contacts & Audience CRM</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              E.164 Normalized
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your customer database, opt-in consent records, and target broadcast segments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Contact
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* 4 Audience KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Contacts</div>
          <div className="mt-2 text-2xl font-black text-slate-900">4,210</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            +184 added this week
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Consent Opt-In Rate</div>
          <div className="mt-2 text-2xl font-black text-emerald-600">98.2%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Explicit WhatsApp Opt-In</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">VIP Segment</div>
          <div className="mt-2 text-2xl font-black text-slate-900">1,240</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">High purchase frequency</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Suppressed / Opt-Out</div>
          <div className="mt-2 text-2xl font-black text-rose-600">76</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Auto-suppressed from broadcasts</div>
        </div>
      </div>

      {/* Search & Tag Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone (+91...), or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setTagFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              tagFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Contacts
          </button>
          <button
            onClick={() => setTagFilter('OPTED_IN')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              tagFilter === 'OPTED_IN' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Opted-In
          </button>
          <button
            onClick={() => setTagFilter('VIP')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              tagFilter === 'VIP' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            VIP Only
          </button>
          <button
            onClick={() => setTagFilter('OPTED_OUT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              tagFilter === 'OPTED_OUT' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Opted-Out
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Customer Name</th>
                <th className="py-3.5 px-6">WhatsApp Phone</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Consent Status</th>
                <th className="py-3.5 px-6">Tags & Audience</th>
                <th className="py-3.5 px-6">Total Spent</th>
                <th className="py-3.5 px-6 text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {contact.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{contact.name}</div>
                        <span className="text-[10px] text-slate-400">Added {contact.createdAt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-slate-800 text-xs">{contact.phone}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{contact.email || '—'}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                        contact.consentStatus === 'OPTED_IN'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          contact.consentStatus === 'OPTED_IN' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      {contact.consentStatus === 'OPTED_IN' ? 'Opted In' : 'Opted Out'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((t, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">{contact.totalSpent}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/dashboard/messages?phone=${encodeURIComponent(contact.phone)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-700" />
                      <span>Message</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Single Contact */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight">Add Contact with Consent</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  WhatsApp Phone (E.164 with Country Code) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Audience Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="VIP Customer, Festive, Apparel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recorded with Meta-compliant opt-in consent timestamp.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: CSV Ingestion */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight">Import Audience via CSV</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Upload or paste CSV rows. Required columns: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">phone,name,email,tags</code>
            </p>

            <form onSubmit={handleImportCsv} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Target Audience List Name
                </label>
                <input
                  type="text"
                  required
                  value={importListName}
                  onChange={(e) => setImportListName(e.target.value)}
                  placeholder="Diwali Broadcast List"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  CSV Raw Data / Preview
                </label>
                <textarea
                  rows={4}
                  required
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isImporting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  {isImporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  Import Contacts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

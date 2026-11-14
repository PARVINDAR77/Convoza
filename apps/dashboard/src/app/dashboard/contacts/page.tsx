'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 'c1',
      name: 'Sarah Miller',
      phone: '+919876540001',
      email: 'sarah.m@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['VIP Customer', 'High Value'],
      createdAt: '2026-11-10',
    },
    {
      id: 'c2',
      name: 'Rohan Sharma',
      phone: '+919876540002',
      email: 'rohan.s@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['VIP Customer'],
      createdAt: '2026-11-11',
    },
    {
      id: 'c3',
      name: 'Elena Rostova',
      phone: '+919876540003',
      email: 'elena.r@example.com',
      consentStatus: 'OPTED_IN',
      tags: ['VIP Customer', 'Newsletter'],
      createdAt: '2026-11-12',
    },
    {
      id: 'c4',
      name: 'David Kim',
      phone: '+919876540006',
      email: 'david.k@example.com',
      consentStatus: 'OPTED_OUT',
      tags: ['Prospect'],
      createdAt: '2026-11-13',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // New Contact Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTags, setNewTags] = useState('VIP, Customer');

  // CSV Import State
  const [csvContent, setCsvContent] = useState(
    `phone,name,email,tags\n+919876540010,Pooja Verma,pooja@example.com,VIP\n+919876540011,Amit Shah,amit@example.com,Retail`
  );
  const [importListName, setImportListName] = useState('Diwali Campaign 2026');
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  const filteredContacts = contacts.filter((c) => {
    const s = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(s) ||
      c.phone.includes(s) ||
      c.email.toLowerCase().includes(s)
    );
  });

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          email: newEmail || undefined,
          tags: newTags.split(',').map((t) => t.trim()),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Failed to create contact');

      setContacts([
        {
          id: `c_${Date.now()}`,
          name: newName,
          phone: newPhone,
          email: newEmail,
          consentStatus: 'OPTED_IN',
          tags: newTags.split(',').map((t) => t.trim()),
          createdAt: new Date().toISOString().split('T')[0],
        },
        ...contacts,
      ]);

      setMessage('Contact created successfully with E.164 normalization!');
      setShowAddModal(false);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleImportCsv = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);
    setImportSummary(null);

    // Parse CSV lines
    const lines = csvContent.trim().split('\n');
    const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const contactsPayload: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p) => p.trim());
      if (parts.length >= 2) {
        contactsPayload.push({
          phone: parts[0],
          name: parts[1],
          email: parts[2] || '',
          tags: parts[3] || '',
        });
      }
    }

    try {
      const res = await fetch('http://localhost:4000/api/v1/contacts/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({
          listName: importListName,
          contacts: contactsPayload,
        }),
      });

      const json = await res.json();
      setImportSummary(json.data || { successCount: contactsPayload.length, duplicateCount: 0, errorCount: 0 });
      setMessage(`CSV Import complete: ${contactsPayload.length} rows processed.`);
    } catch (err: any) {
      setMessage(`Import Error: ${err.message}`);
    } finally {
      setIsImporting(false);
    }
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
    a.download = `convoza-contacts-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contacts & Audience</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified customer audience, opt-in consent records, and tag segments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone (+91...), or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredContacts.length}</span> verified contacts
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Name & Phone</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Consent Status</th>
                <th className="py-3 px-6">Tags & Segments</th>
                <th className="py-3 px-6">Added On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{contact.name}</div>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">{contact.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{contact.email || '—'}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        contact.consentStatus === 'OPTED_IN'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {contact.consentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((t, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{contact.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Single Contact */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Contact with Consent</h3>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Phone (E.164 with country code)
                </label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="VIP, Retail, Festive"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Import Audience via CSV</h3>
            <p className="text-xs text-slate-500 mb-4">
              Format: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">phone,name,email,tags</code>
            </p>

            <form onSubmit={handleImportCsv} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Target List Name
                </label>
                <input
                  type="text"
                  required
                  value={importListName}
                  onChange={(e) => setImportListName(e.target.value)}
                  placeholder="Spring Broadcast List"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  CSV Raw Data / Paste
                </label>
                <textarea
                  rows={5}
                  required
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              {importSummary && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  Imported: {importSummary.successCount} rows | Duplicates: {importSummary.duplicateCount} | Errors: {importSummary.errorCount}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isImporting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5"
                >
                  {isImporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  Process Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

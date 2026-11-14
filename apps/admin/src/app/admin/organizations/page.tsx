'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

export default function AdminOrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orgs, setOrgs] = useState([
    {
      id: 'org-1',
      name: 'Apex Global Retail',
      slug: 'apex-global-retail',
      plan: 'Growth Plan',
      phoneNumbersCount: 1,
      contactsCount: 4210,
      isSuspended: false,
      suspensionReason: null,
      createdAt: '2026-11-10',
    },
    {
      id: 'org-2',
      name: 'Zara FinCorp Solutions',
      slug: 'zara-fincorp',
      plan: 'Enterprise Plan',
      phoneNumbersCount: 4,
      contactsCount: 48900,
      isSuspended: false,
      suspensionReason: null,
      createdAt: '2026-11-08',
    },
    {
      id: 'org-3',
      name: 'QuickSpam Marketing Agency',
      slug: 'quickspam-agency',
      plan: 'Starter Plan',
      phoneNumbersCount: 1,
      contactsCount: 1200,
      isSuspended: true,
      suspensionReason: 'Meta Acceptable Use Policy violation: Unsolicited broadcasting',
      createdAt: '2026-11-01',
    },
  ]);

  const [selectedOrgForSuspend, setSelectedOrgForSuspend] = useState<any>(null);
  const [suspendReason, setSuspendReason] = useState('Violation of WhatsApp acceptable use policy');
  const [message, setMessage] = useState<string | null>(null);

  const handleSuspend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrgForSuspend) return;

    setOrgs(
      orgs.map((o) =>
        o.id === selectedOrgForSuspend.id
          ? { ...o, isSuspended: true, suspensionReason: suspendReason }
          : o
      )
    );
    setMessage(`Organization ${selectedOrgForSuspend.name} has been suspended.`);
    setSelectedOrgForSuspend(null);
  };

  const handleRestore = (orgId: string) => {
    setOrgs(
      orgs.map((o) =>
        o.id === orgId ? { ...o, isSuspended: false, suspensionReason: null } : o
      )
    );
    setMessage('Organization reinstated to active status.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Organizations Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global tenant administration, status enforcement, and policy monitoring.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-6">Organization</th>
                <th className="py-3 px-6">Subscription Plan</th>
                <th className="py-3 px-6">Numbers</th>
                <th className="py-3 px-6">Audience Size</th>
                <th className="py-3 px-6">Tenancy Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{org.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{org.slug}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">{org.plan}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{org.phoneNumbersCount}</td>
                  <td className="py-4 px-6 text-slate-700 font-semibold">{org.contactsCount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    {org.isSuspended ? (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                        SUSPENDED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {org.isSuspended ? (
                      <button
                        onClick={() => handleRestore(org.id)}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedOrgForSuspend(org)}
                        className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-lg"
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspend Dialog */}
      {selectedOrgForSuspend && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Suspend Organization</h3>
            <p className="text-xs text-slate-500 mb-4">
              Suspending <strong>{selectedOrgForSuspend.name}</strong> will immediately halt all outbound campaigns and revoke agent dashboard access.
            </p>

            <form onSubmit={handleSuspend} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Reason for Suspension
                </label>
                <textarea
                  rows={3}
                  required
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrgForSuspend(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Confirm Suspension
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

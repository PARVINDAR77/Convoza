'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  User,
  Building2,
  Search,
  Filter,
  ShieldAlert,
  Terminal,
  X,
  Copy,
  Check,
  Lock,
} from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<'ALL' | 'ORGANIZATION' | 'CAMPAIGN' | 'SECURITY'>('ALL');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const [logs, setLogs] = useState([
    {
      id: 'log-1',
      action: 'ORGANIZATION_SUSPENDED',
      severity: 'CRITICAL',
      resource: 'organization',
      resourceId: 'org-3',
      user: 'admin@convoza.io',
      ip: '192.168.1.10',
      date: '2026-11-14 09:30:12',
      metadata: {
        reason: 'Meta Acceptable Use Policy violation: Unsolicited broadcasting',
        actionBy: 'Master Super Admin',
        suspendedTenant: 'QuickSpam Marketing Agency',
      },
    },
    {
      id: 'log-2',
      action: 'CAMPAIGN_BATCH_QUEUED',
      severity: 'INFO',
      resource: 'campaign',
      resourceId: 'c-2849',
      user: 'alex@apexretail.com',
      ip: '49.207.18.22',
      date: '2026-11-14 08:00:04',
      metadata: {
        campaignName: 'Weekend VIP Flash Sale Announcement',
        totalRecipients: 500,
        workerAssigned: 'outbox-worker-03',
      },
    },
    {
      id: 'log-3',
      action: 'WHATSAPP_ACCOUNT_CONNECTED',
      severity: 'INFO',
      resource: 'whatsapp_account',
      resourceId: 'acc-1',
      user: 'alex@apexretail.com',
      ip: '49.207.18.22',
      date: '2026-11-10 14:15:33',
      metadata: {
        wabaId: '109823746591029',
        phoneNumberId: '102938475610293',
        cipher: 'AES-256-GCM',
      },
    },
    {
      id: 'log-4',
      action: 'ROOT_SUPER_ADMIN_LOGIN',
      severity: 'WARNING',
      resource: 'session',
      resourceId: 'sess-8912',
      user: 'admin@convoza.io',
      ip: '127.0.0.1',
      date: 'Today, 06:00:15',
      metadata: {
        authMethod: 'Password + Hardware TOTP',
        ipOrigin: 'Localhost Secure Proxy',
      },
    },
  ]);

  const filteredLogs = logs.filter((l) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      l.action.toLowerCase().includes(s) ||
      l.user.toLowerCase().includes(s) ||
      l.ip.includes(s) ||
      l.resourceId.toLowerCase().includes(s);

    if (!matchesSearch) return false;
    if (actionFilter === 'ORGANIZATION') return l.resource === 'organization';
    if (actionFilter === 'CAMPAIGN') return l.resource === 'campaign';
    if (actionFilter === 'SECURITY') return l.severity === 'CRITICAL' || l.severity === 'WARNING';
    return true;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Platform Security Audit Trail</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
              Immutable Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-proof audit records of administrative operations, tenant policy enforcements, and broadcast telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic SHA-256 Verified</span>
          </span>
        </div>
      </div>

      {/* 4 Security Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Audit Records</div>
          <div className="mt-2 text-2xl font-black text-slate-900">18,420</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Retained for 365 days
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Critical Enforcements</div>
          <div className="mt-2 text-2xl font-black text-rose-600">14</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Tenancy suspensions & blocks</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Failed Auth Attempts</div>
          <div className="mt-2 text-2xl font-black text-amber-600">2</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Rate limited by WAF proxy</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ledger Integrity</div>
          <div className="mt-2 text-2xl font-black text-emerald-600">100%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Zero tamper anomalies</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by action, actor, resource ID, or IP..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'ORGANIZATION', 'CAMPAIGN', 'SECURITY'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActionFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                actionFilter === filter
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'ALL' ? 'All Events' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6">Severity</th>
                <th className="py-3.5 px-6">Action Performed</th>
                <th className="py-3.5 px-6">Target Resource</th>
                <th className="py-3.5 px-6">Actor / User</th>
                <th className="py-3.5 px-6 font-mono">IP Address</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {l.date}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        l.severity === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : l.severity === 'WARNING'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          l.severity === 'CRITICAL' ? 'bg-rose-600' : l.severity === 'WARNING' ? 'bg-amber-500' : 'bg-slate-400'
                        }`}
                      />
                      {l.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900 text-xs">
                    {l.action}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-[11px]">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      {l.resource}:{l.resourceId}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{l.user}</td>
                  <td className="py-4 px-6 font-mono text-slate-500">{l.ip}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedLog(l)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Inspect Log Payload */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-black text-slate-900 tracking-tight">Audit Event Telemetry</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Event Action:</span>
                <span className="font-bold text-slate-900 font-mono">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Actor:</span>
                <span className="font-bold text-slate-900">{selectedLog.user}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Client IP:</span>
                <span className="font-mono text-slate-700">{selectedLog.ip}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Timestamp:</span>
                <span className="font-mono text-slate-700">{selectedLog.date}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Metadata Payload JSON:
              </span>
              <pre className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
                {JSON.stringify(selectedLog.metadata, null, 2)}
              </pre>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2));
                  setCopiedPayload(true);
                  setTimeout(() => setCopiedPayload(false), 2000);
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied' : 'Copy Event JSON'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

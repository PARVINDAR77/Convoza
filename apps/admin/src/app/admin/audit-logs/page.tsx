'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, User, Building2 } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([
    {
      id: 'log-1',
      action: 'ORGANIZATION_SUSPENDED',
      resource: 'organization',
      resourceId: 'org-3',
      user: 'admin@convoza.io',
      ip: '192.168.1.10',
      date: '2026-11-14 09:30:12',
    },
    {
      id: 'log-2',
      action: 'CAMPAIGN_BATCH_QUEUED',
      resource: 'campaign',
      resourceId: 'c-2849',
      user: 'alex@apexretail.com',
      ip: '49.207.18.22',
      date: '2026-11-14 08:00:04',
    },
    {
      id: 'log-3',
      action: 'WHATSAPP_ACCOUNT_CONNECTED',
      resource: 'whatsapp_account',
      resourceId: 'acc-1',
      user: 'alex@apexretail.com',
      ip: '49.207.18.22',
      date: '2026-11-10 14:15:33',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Security Audit Trail</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Immutable audit records of administrative, authorization, and broadcast events.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Action</th>
                <th className="py-3 px-6">Resource Target</th>
                <th className="py-3 px-6">Actor</th>
                <th className="py-3 px-6 font-mono">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">{l.date}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{l.action}</td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-[11px]">
                    {l.resource}:{l.resourceId}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{l.user}</td>
                  <td className="py-4 px-6 font-mono text-slate-400">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

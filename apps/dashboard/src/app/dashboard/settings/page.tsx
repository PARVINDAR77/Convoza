'use client';

import React, { useState } from 'react';
import {
  Settings,
  Users2,
  Key,
  ShieldAlert,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  Globe,
  Radio,
  Lock,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'team' | 'api-keys' | 'org'>('team');

  // Team Members State
  const [members, setMembers] = useState([
    { id: 'm1', name: 'Alex Vance', email: 'alex@apexretail.com', role: 'ORG_OWNER', status: 'ACTIVE' },
    { id: 'm2', name: 'Devon Lee', email: 'devon.l@apexretail.com', role: 'ORG_ADMIN', status: 'ACTIVE' },
    { id: 'm3', name: 'Priya Verma', email: 'priya.v@apexretail.com', role: 'AGENT', status: 'ACTIVE' },
  ]);

  // API Keys State
  const [apiKeys, setApiKeys] = useState([
    { id: 'k1', name: 'Shopify Checkout Webhook', prefix: 'cvz_live_8192af', createdAt: 'Nov 10, 2026' },
  ]);

  const [newKeyGenerated, setNewKeyGenerated] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('AGENT');
  const [message, setMessage] = useState<string | null>(null);

  const handleGenerateApiKey = () => {
    const rawKey = `cvz_live_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 18)}`;
    setApiKeys([
      {
        id: `k_${Date.now()}`,
        name: 'Backend ERP Integration',
        prefix: rawKey.slice(0, 16),
        createdAt: 'Just now',
      },
      ...apiKeys,
    ]);
    setNewKeyGenerated(rawKey);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([
      {
        id: `m_${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'INVITED',
      },
      ...members,
    ]);
    setMessage(`Invitation email dispatched to ${inviteEmail}!`);
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Organization & Team Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage team memberships, role-based access control (RBAC), and developer API tokens.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('team')}
          className={`pb-3 ${
            activeTab === 'team'
              ? 'border-b-2 border-emerald-600 text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Team Members ({members.length})
        </button>
        <button
          onClick={() => setActiveTab('api-keys')}
          className={`pb-3 ${
            activeTab === 'api-keys'
              ? 'border-b-2 border-emerald-600 text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Developer API Keys
        </button>
      </div>

      {/* TAB 1: Team Members */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Team Seats & Access Control</h2>
              <p className="text-xs text-slate-500 mt-0.5">Invite agents, managers, and administrators</p>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Invite Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{m.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{m.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: API Keys */}
      {activeTab === 'api-keys' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">REST API Tokens</h2>
              <p className="text-xs text-slate-500 mt-0.5">Use these keys to authenticate external HTTP requests to CONVOZA</p>
            </div>

            <button
              onClick={handleGenerateApiKey}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Key className="w-4 h-4" /> Generate New API Key
            </button>
          </div>

          {newKeyGenerated && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-900 block">
                Save your API Secret now (it will not be shown again):
              </span>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-amber-300 font-mono text-xs">
                <span>{newKeyGenerated}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(newKeyGenerated)}
                  className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{k.name}</h3>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">{k.prefix}••••••••••••</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Created {k.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Invite Team Member */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Invite Team Member</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="agent@apexretail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Role & Permissions
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  <option value="AGENT">Agent (Inbox & Contacts only)</option>
                  <option value="MANAGER">Manager (Campaigns & Templates)</option>
                  <option value="ORG_ADMIN">Organization Admin (Full Access)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

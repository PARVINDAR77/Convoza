'use client';

import React, { useState } from 'react';
import {
  Bot,
  Plus,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  Zap,
  MessageSquare,
  Tag,
  Clock,
} from 'lucide-react';

export default function AutomationsPage() {
  const [rules, setRules] = useState([
    {
      id: 'rule-1',
      name: 'Keyword Auto-Responder "PRICE"',
      trigger: 'KEYWORD_DETECTED',
      keyword: 'PRICE, PRICING, COST',
      action: 'Send Pricing Catalog Template & Tag "Interested in Pricing"',
      isActive: true,
      executionCount: 412,
    },
    {
      id: 'rule-2',
      name: 'After-Hours Welcome Responder',
      trigger: 'INCOMING_MESSAGE',
      keyword: 'Any Message',
      action: 'Send Away Message: "We are currently offline. Our team will respond by 9 AM."',
      isActive: true,
      executionCount: 189,
    },
    {
      id: 'rule-3',
      name: 'VIP Lead Qualification',
      trigger: 'CAMPAIGN_REPLY',
      keyword: 'YES, DEMO',
      action: 'Assign to Agent "Alex Vance" & Priority Notification',
      isActive: false,
      executionCount: 56,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [responseText, setResponseText] = useState('');

  const toggleRule = (id: string) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    setRules([
      {
        id: `rule_${Date.now()}`,
        name,
        trigger: 'KEYWORD_DETECTED',
        keyword,
        action: `Auto-reply: "${responseText.slice(0, 30)}..."`,
        isActive: true,
        executionCount: 0,
      },
      ...rules,
    ]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Automations & Rule Engine</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build event-driven triggers, keyword auto-replies, and intelligent agent routing rules.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Create Automation Rule
        </button>
      </div>

      {/* Rules Cards */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${
                  rule.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{rule.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rule.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {rule.isActive ? 'ACTIVE' : 'PAUSED'}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Trigger: <strong className="text-slate-700">{rule.trigger}</strong></span>
                  <span>•</span>
                  <span>Keywords: <strong className="text-slate-700">{rule.keyword}</strong></span>
                  <span>•</span>
                  <span>Action: <strong className="text-slate-700">{rule.action}</strong></span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600">
                  {rule.executionCount.toLocaleString()} lifetime triggers executed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleRule(rule.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  rule.isActive
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {rule.isActive ? 'Pause Rule' : 'Activate Rule'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Rule */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create Auto-Reply Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Catalog Request Responder"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Trigger Keywords (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="CATALOG, BROCHURE, PDF"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Automated Reply Text
                </label>
                <textarea
                  rows={3}
                  required
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Hi! Here is our latest digital product catalog: https://convoza.io/catalog.pdf"
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
                  Save & Enable Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
  ArrowRight,
  Sparkles,
  ShieldCheck,
  X,
  HelpCircle,
} from 'lucide-react';

export default function AutomationsPage() {
  const [rules, setRules] = useState([
    {
      id: 'rule-1',
      name: 'Keyword Auto-Responder "PRICE"',
      trigger: 'KEYWORD_DETECTED',
      keyword: 'PRICE, PRICING, COST, RATE',
      action: 'Send Interactive Pricing Template & Tag "Lead: High Intent"',
      isActive: true,
      executionCount: 412,
      latency: '110ms',
    },
    {
      id: 'rule-2',
      name: 'After-Hours Away Message Responder',
      trigger: 'INCOMING_OUT_OF_HOURS',
      keyword: 'Any Inbound Message (8 PM - 9 AM)',
      action: 'Send Away Message: "We are currently offline. Our team responds at 9 AM."',
      isActive: true,
      executionCount: 189,
      latency: '95ms',
    },
    {
      id: 'rule-3',
      name: 'VIP Lead Qualification & Agent Routing',
      trigger: 'CAMPAIGN_REPLY',
      keyword: 'YES, DEMO, INTERESTED',
      action: 'Assign to Agent "Alex Vance" & Send Urgent Push Notification',
      isActive: false,
      executionCount: 56,
      latency: '130ms',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [responseText, setResponseText] = useState('');
  const [triggerType, setTriggerType] = useState('KEYWORD_DETECTED');

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
        trigger: triggerType,
        keyword: keyword.toUpperCase(),
        action: `Auto-reply: "${responseText.slice(0, 35)}..."`,
        isActive: true,
        executionCount: 0,
        latency: '105ms',
      },
      ...rules,
    ]);
    setShowAddModal(false);
    setName('');
    setKeyword('');
    setResponseText('');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Automations & Rule Engine</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              Event Driven
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build zero-latency keyword auto-responders, after-hours away bots, and automated agent routing.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" /> Create Automation Flow
        </button>
      </div>

      {/* 4 Automation Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Automated Executions</div>
          <div className="mt-2 text-2xl font-black text-slate-900">657</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Saved ~42 agent hours
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Avg Response Latency</div>
          <div className="mt-2 text-2xl font-black text-emerald-600">110 ms</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Instant serverless dispatch</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Triggers</div>
          <div className="mt-2 text-2xl font-black text-slate-900">2 / 3 Rules</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Listening on Cloud API webhooks</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Success Rate</div>
          <div className="mt-2 text-2xl font-black text-slate-900">99.8%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">0 webhook drops</div>
        </div>
      </div>

      {/* Visual Flow Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                    rule.isActive
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">{rule.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        rule.isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {rule.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">ID: {rule.id} • Latency: {rule.latency}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    rule.isActive
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20'
                  }`}
                >
                  {rule.isActive ? 'Pause Flow' : 'Activate Flow'}
                </button>
              </div>
            </div>

            {/* Visual Node Flow */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-11 gap-3 items-center text-xs">
              {/* Node 1: Trigger */}
              <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Trigger Event
                </div>
                <div className="font-bold text-slate-900">{rule.trigger}</div>
                <div className="text-[11px] text-slate-500 font-mono">Keywords: {rule.keyword}</div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-center text-slate-400">
                <ArrowRight className="w-5 h-5 hidden md:block" />
                <span className="block md:hidden text-center text-xs font-bold">↓</span>
              </div>

              {/* Node 2: Action */}
              <div className="md:col-span-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase text-[10px] tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Automated Action
                </div>
                <div className="font-bold text-emerald-950">{rule.action}</div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  Executed {rule.executionCount.toLocaleString()} times
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Rule */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight">Create Automation Flow</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Flow Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Catalog Request Auto-Responder"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Trigger Event Type
                </label>
                <select
                  value={triggerType}
                  onChange={(e) => setTriggerType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 shadow-xs"
                >
                  <option value="KEYWORD_DETECTED">Customer Inbound Keyword Match</option>
                  <option value="INCOMING_OUT_OF_HOURS">Out-of-Hours Inbound Message</option>
                  <option value="CAMPAIGN_REPLY">Broadcast Campaign Reply</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Match Keywords (comma separated) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="CATALOG, BROCHURE, PRICING, MENU"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Automated Reply Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Hi! Here is our digital catalog: https://apexretail.com/catalog.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
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
                  Save & Activate Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

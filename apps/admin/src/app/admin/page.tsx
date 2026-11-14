'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  CreditCard,
  Smartphone,
  Send,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  IndianRupee,
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1420,
    activeOrganizations: 382,
    activeSubscriptions: 354,
    connectedWhatsAppAccounts: 412,
    connectedPhoneNumbers: 498,
    totalMessagesSent: 4892300,
    deliveredMessages: 4821000,
    failedMessages: 71300,
    activeCampaigns: 48,
    mrrInr: 1768000, // ₹17.68 Lakhs MRR
    queueHealth: {
      pendingJobs: 14,
      processingJobs: 8,
      failedJobs: 2,
      deadLetterJobs: 0,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Super Admin Console</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Global metrics, tenant oversight, revenue tracking, and asynchronous queue health.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total MRR</span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            ₹{(stats.mrrInr / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">354 Active Paid Tenancies</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Active Organizations</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{stats.activeOrganizations}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 1,420 registered users</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Connected Phone Numbers</span>
            <Smartphone className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{stats.connectedPhoneNumbers}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Official Meta Cloud API</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Messages Processed</span>
            <Send className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {(stats.totalMessagesSent / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">98.5% Delivery Success</div>
        </div>
      </div>

      {/* Transactional Outbox Queue Health Monitor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">PostgreSQL Transactional Queue Health</h2>
              <p className="text-xs text-slate-500">Worker processes with FOR UPDATE SKIP LOCKED</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Healthy & Processing
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Pending Jobs</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {stats.queueHealth.pendingJobs}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Processing Jobs</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">
              {stats.queueHealth.processingJobs}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Retry Retries</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {stats.queueHealth.failedJobs}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Dead Letter Queue</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {stats.queueHealth.deadLetterJobs}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


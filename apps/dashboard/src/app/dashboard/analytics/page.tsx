'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Eye,
  Send,
  Flame,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '@convoza/ui';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [downloading, setDownloading] = useState(false);

  const dailyData = [
    { day: 'Mon', sent: 12400, delivered: 12250, read: 9800, replies: 2100 },
    { day: 'Tue', sent: 18900, delivered: 18650, read: 14900, replies: 3450 },
    { day: 'Wed', sent: 15300, delivered: 15100, read: 12100, replies: 2800 },
    { day: 'Thu', sent: 22100, delivered: 21800, read: 17400, replies: 4100 },
    { day: 'Fri', sent: 28400, delivered: 28000, read: 22400, replies: 5200 },
    { day: 'Sat', sent: 19800, delivered: 19500, read: 15600, replies: 3700 },
    { day: 'Sun', sent: 11550, delivered: 11400, read: 9100, replies: 1950 },
  ];

  const handleExportCsv = () => {
    setDownloading(true);
    setTimeout(() => {
      const headers = ['Day,Sent,Delivered,Read,Replies'];
      const rows = dailyData.map((d) => `${d.day},${d.sent},${d.delivered},${d.read},${d.replies}`);
      const blob = new Blob([[headers.join('\n'), ...rows].join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `convoza-analytics-${timeRange}.csv`;
      a.click();
      setDownloading(false);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Performance & Delivery Analytics</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              Real-Time Webhooks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track end-to-end Meta WhatsApp Cloud API throughput, delivery rates, open rates, and conversation conversions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 text-xs font-bold text-slate-600 shadow-xs">
            {(['24h', '7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  timeRange === r ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-100'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Exporting...' : 'Export CSV Report'}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivered Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">98.6%</div>
          <div className="mt-1 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +0.8% vs previous period
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">126,700 confirmed deliveries</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Read / Open Rate</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">79.2%</div>
          <div className="mt-1 text-xs text-sky-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 8x higher than email
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">101,300 opened within 15 min</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Inbound Replies</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">18.4%</div>
          <div className="mt-1 text-xs text-amber-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.1% reply rate
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">23,300 active inbound chats</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Undelivered / Bounced</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-rose-600">1.4%</div>
          <div className="mt-1 text-xs text-slate-500 font-medium">1,750 invalid / blocked numbers</div>
          <span className="text-[11px] text-slate-400 mt-2 block">Auto-suppressed from re-sends</span>
        </div>
      </div>

      {/* Visual Conversion Funnel */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">Full-Funnel WhatsApp Conversion Pipeline</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status events from transactional message dispatch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stage 1: Outbox Queued</div>
            <div className="text-xl font-black text-slate-900 mt-1">128,450</div>
            <div className="text-xs text-slate-500 mt-1">100% Dispatched</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-slate-700 h-1.5 rounded-full w-full" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Stage 2: Delivered</div>
            <div className="text-xl font-black text-emerald-950 mt-1">126,700</div>
            <div className="text-xs text-emerald-700 font-bold mt-1">98.6% Deliverability</div>
            <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '98.6%' }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200/80">
            <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Stage 3: Read & Opened</div>
            <div className="text-xl font-black text-sky-950 mt-1">101,300</div>
            <div className="text-xs text-sky-700 font-bold mt-1">79.2% Open Rate</div>
            <div className="w-full bg-sky-200 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: '79.2%' }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Stage 4: Customer Reply</div>
            <div className="text-xl font-black text-amber-950 mt-1">23,300</div>
            <div className="text-xs text-amber-700 font-bold mt-1">18.4% Inbound Conversions</div>
            <div className="w-full bg-amber-200 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '18.4%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Messaging Volume Visual Bar Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-6">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">Daily WhatsApp Outbound Volume</h2>
            <p className="text-xs text-slate-500 mt-0.5">Aggregated from Meta Cloud API delivery webhooks</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded bg-slate-300" /> Sent
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded bg-emerald-500" /> Delivered
            </span>
            <span className="flex items-center gap-1.5 text-sky-600">
              <span className="w-3 h-3 rounded bg-sky-500" /> Read
            </span>
          </div>
        </div>

        {/* Visual Bars */}
        <div className="grid grid-cols-7 gap-4 h-64 items-end pt-6">
          {dailyData.map((d, i) => {
            const maxSent = 30000;
            const deliveredHeight = (d.delivered / maxSent) * 100;
            const readHeight = (d.read / maxSent) * 100;

            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1.5 font-mono">
                  {(d.delivered / 1000).toFixed(1)}k
                </div>
                <div className="w-full max-w-[52px] bg-slate-100 rounded-t-2xl flex items-end justify-center relative overflow-hidden h-full">
                  {/* Delivered bar */}
                  <div
                    className="w-full bg-emerald-500 absolute bottom-0 rounded-t-2xl transition-all duration-500 group-hover:bg-emerald-600"
                    style={{ height: `${deliveredHeight}%` }}
                  />
                  {/* Read bar */}
                  <div
                    className="w-full bg-sky-400 absolute bottom-0 rounded-t-2xl transition-all duration-500 opacity-80"
                    style={{ height: `${readHeight}%` }}
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-slate-800">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

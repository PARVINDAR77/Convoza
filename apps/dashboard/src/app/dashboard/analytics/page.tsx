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
} from 'lucide-react';
import { StatCard } from '@convoza/ui';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const dailyData = [
    { day: 'Mon', sent: 12400, delivered: 12250, read: 9800 },
    { day: 'Tue', sent: 18900, delivered: 18650, read: 14900 },
    { day: 'Wed', sent: 15300, delivered: 15100, read: 12100 },
    { day: 'Thu', sent: 22100, delivered: 21800, read: 17400 },
    { day: 'Fri', sent: 28400, delivered: 28000, read: 22400 },
    { day: 'Sat', sent: 19800, delivered: 19500, read: 15600 },
    { day: 'Sun', sent: 11550, delivered: 11400, read: 9100 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics & Reports</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive delivery tracking, engagement rates, and message category breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg ${timeRange === '7d' ? 'bg-slate-900 text-white' : ''}`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg ${timeRange === '30d' ? 'bg-slate-900 text-white' : ''}`}
            >
              Last 30 Days
            </button>
          </div>

          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all">
            <Download className="w-4 h-4" /> Export CSV Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Delivered Rate"
          value="98.6%"
          change="+0.8%"
          isPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="126,700 delivered"
        />
        <StatCard
          title="Read Rate"
          value="79.2%"
          change="+3.4%"
          isPositive={true}
          icon={<Eye className="w-5 h-5" />}
          subtitle="101,300 read"
        />
        <StatCard
          title="Direct Reply Rate"
          value="18.4%"
          change="+2.1%"
          isPositive={true}
          icon={<MessageSquare className="w-5 h-5" />}
          subtitle="23,300 conversations"
        />
        <StatCard
          title="Failed / Blocked"
          value="1.4%"
          change="-0.4%"
          isPositive={true}
          icon={<Flame className="w-5 h-5" />}
          subtitle="1,750 failed"
        />
      </div>

      {/* Daily Volume Visual Bars */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">7-Day Outbound Messaging Volume</h2>
            <p className="text-xs text-slate-500 mt-0.5">Aggregated from Meta Cloud API delivery webhooks</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded bg-slate-300" /> Sent
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded bg-emerald-500" /> Delivered
            </span>
            <span className="flex items-center gap-1.5 text-teal-700">
              <span className="w-3 h-3 rounded bg-teal-400" /> Read
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-7 gap-4 h-64 items-end pt-6">
          {dailyData.map((d, i) => {
            const maxSent = 30000;
            const sentHeight = (d.sent / maxSent) * 100;
            const deliveredHeight = (d.delivered / maxSent) * 100;
            const readHeight = (d.read / maxSent) * 100;

            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {(d.delivered / 1000).toFixed(1)}k
                </div>
                <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl flex items-end justify-center relative overflow-hidden h-full">
                  <div
                    className="w-full bg-slate-200 absolute bottom-0 transition-all duration-500"
                    style={{ height: `${sentHeight}%` }}
                  />
                  <div
                    className="w-full bg-emerald-500 absolute bottom-0 transition-all duration-500"
                    style={{ height: `${deliveredHeight}%` }}
                  />
                  <div
                    className="w-full bg-teal-400 absolute bottom-0 transition-all duration-500"
                    style={{ height: `${readHeight}%` }}
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-slate-700">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


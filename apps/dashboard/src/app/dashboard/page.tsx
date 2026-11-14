'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  Eye,
  Flame,
  Plus,
  ArrowUpRight,
  Smartphone,
  Users2,
  FileCode2,
  Inbox,
  Clock,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '@convoza/ui';

export default function DashboardOverviewPage() {
  const [metrics, setMetrics] = useState({
    totalMessages: 128450,
    deliveryRate: 98.6,
    readRate: 79.2,
    activeCampaigns: 2,
    replyCount: 1429,
  });

  const [campaigns, setCampaigns] = useState([
    {
      id: 'c1',
      name: 'Weekend VIP Flash Sale Announcement',
      status: 'COMPLETED',
      sent: 500,
      delivered: 489,
      read: 412,
      date: 'Today, 09:30 AM',
    },
    {
      id: 'c2',
      name: 'Cart Recovery - Festive Wave 1',
      status: 'PROCESSING',
      sent: 1200,
      delivered: 1180,
      read: 940,
      date: 'Today, 08:00 AM',
    },
    {
      id: 'c3',
      name: 'Loyalty Rewards Tier Upgrade',
      status: 'SCHEDULED',
      sent: 0,
      delivered: 0,
      read: 0,
      date: 'Tomorrow, 10:00 AM',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics for your WhatsApp Business campaigns and shared inbox.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </Link>
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Send Single Message
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Messages Sent"
          value={metrics.totalMessages.toLocaleString()}
          change="+18.4%"
          isPositive={true}
          icon={<Send className="w-5 h-5" />}
          subtitle="This billing period"
        />
        <StatCard
          title="Delivery Rate"
          value={`${metrics.deliveryRate}%`}
          change="+0.8%"
          isPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="Meta Tier 10K High Quality"
        />
        <StatCard
          title="Read / Open Rate"
          value={`${metrics.readRate}%`}
          change="+4.2%"
          isPositive={true}
          icon={<Eye className="w-5 h-5" />}
          subtitle="8x higher than email"
        />
        <StatCard
          title="Active Campaigns"
          value={metrics.activeCampaigns}
          change="Running"
          isPositive={true}
          icon={<Flame className="w-5 h-5" />}
          subtitle="Asynchronous worker queue"
        />
      </div>

      {/* Connected WhatsApp Account Status Card & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Number Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Connected Phone Number
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud API
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">+91 98765 43210</h3>
                <p className="text-xs text-slate-500">Apex Retail Official • WABA Verified</p>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Quality Rating:</span>
                <span className="font-semibold text-emerald-600">HIGH (Green)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Messaging Limit:</span>
                <span className="font-semibold text-slate-900">10,000 unique recipients / 24h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Webhook Status:</span>
                <span className="font-semibold text-emerald-600">Subscribed & Active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/dashboard/whatsapp"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Manage WhatsApp Numbers & Webhooks <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Quick Operations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/dashboard/templates"
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <FileCode2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Template Builder</span>
              <span className="text-[10px] text-slate-400">Meta approvals</span>
            </Link>

            <Link
              href="/dashboard/campaigns"
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Bulk Broadcast</span>
              <span className="text-[10px] text-slate-400">High-speed outbox</span>
            </Link>

            <Link
              href="/dashboard/inbox"
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <Inbox className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Shared Inbox</span>
              <span className="text-[10px] text-slate-400">Live multi-agent</span>
            </Link>

            <Link
              href="/dashboard/contacts"
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Import CSV</span>
              <span className="text-[10px] text-slate-400">Audience lists</span>
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">24-Hour Customer Window Policy Active</h4>
                <p className="text-[11px] text-slate-500">
                  Free-form replies enabled for conversations with active inbound messages in the last 24 hours.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/inbox"
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            >
              Go to Inbox
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Campaigns</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time status updates from worker queues</p>
          </div>
          <Link
            href="/dashboard/campaigns"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View All Campaigns <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Campaign Name</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Recipients / Progress</th>
                <th className="py-3 px-6">Delivered / Read</th>
                <th className="py-3 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <Link href={`/dashboard/campaigns?id=${camp.id}`} className="hover:text-emerald-600">
                      {camp.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        camp.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : camp.status === 'PROCESSING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{camp.sent} sent</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {camp.delivered} delivered • {camp.read} read
                  </td>
                  <td className="py-4 px-6 text-slate-400">{camp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


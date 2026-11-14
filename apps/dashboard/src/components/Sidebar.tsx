'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Smartphone,
  FileCode2,
  Users2,
  Send,
  Flame,
  Inbox,
  Bot,
  BarChart3,
  CreditCard,
  Settings,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'WhatsApp Numbers', href: '/dashboard/whatsapp', icon: Smartphone },
  { name: 'Template Builder', href: '/dashboard/templates', icon: FileCode2 },
  { name: 'Contacts & Lists', href: '/dashboard/contacts', icon: Users2 },
  { name: 'Send Message', href: '/dashboard/messages', icon: Send },
  { name: 'Bulk Campaigns', href: '/dashboard/campaigns', icon: Flame },
  { name: 'Shared Inbox', href: '/dashboard/inbox', icon: Inbox },
  { name: 'Automations', href: '/dashboard/automations', icon: Bot },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Billing & Plans', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Team & Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 text-slate-300">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">CONVOZA</span>
              <span className="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                Conversations. Connected.
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1.5 rounded-lg mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">Official Cloud API v20.0</span>
        </div>
        <p className="text-[11px] text-slate-500 px-1">
          CONVOZA SaaS v1.0 • Multi-Tenant
        </p>
      </div>
    </aside>
  );
};


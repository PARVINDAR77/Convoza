'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Smartphone,
  Flame,
  ShieldAlert,
  Settings,
  MessageSquare,
  Activity,
} from 'lucide-react';

const navItems = [
  { name: 'Platform Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Organizations', href: '/admin/organizations', icon: Building2 },
  { name: 'Users & RBAC', href: '/admin/users', icon: Users },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 text-slate-300">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">CONVOZA</span>
            <span className="block text-[10px] text-rose-400 font-bold uppercase tracking-wider">
              Super Admin Console
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1.5 rounded-lg mb-2">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Queue Engine Active</span>
        </div>
        <p className="text-[10px] text-slate-500">System Admin • Full Authorization</p>
      </div>
    </aside>
  );
};

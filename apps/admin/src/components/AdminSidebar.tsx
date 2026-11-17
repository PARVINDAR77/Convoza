'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  Activity,
  Server,
  Zap,
  Radio,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
  }[];
}

const navSections: NavSection[] = [
  {
    title: 'CORE TELEMETRY',
    items: [
      { name: 'Platform Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'TENANT OVERSIGHT',
    items: [
      { name: 'Organizations', href: '/admin/organizations', icon: Building2, badge: '382', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
      { name: 'Users & RBAC', href: '/admin/users', icon: Users, badge: '1,420', badgeColor: 'bg-slate-800 text-slate-300 border-slate-700' },
    ],
  },
  {
    title: 'SECURITY & GOVERNANCE',
    items: [
      { name: 'Security Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert, badge: 'Active', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/90 flex flex-col justify-between shrink-0 text-slate-300 select-none shadow-2xl lg:shadow-xl transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/90 bg-slate-950/60 sticky top-0 backdrop-blur z-10">
            <Link href="/admin" onClick={onClose} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/25 group-hover:scale-105 transition-transform duration-200">
                <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-white font-sans">CONVOZA</span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/30">
                    ROOT
                  </span>
                </div>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Super Admin Console
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Close navigation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="p-3 space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-bold text-slate-500 tracking-wider">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                        isActive
                          ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-600/30 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/90'
                      }`}
                    >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-rose-400'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Cluster Health Footer */}
      <div className="p-3.5 border-t border-slate-800/90 bg-slate-950/80 space-y-2.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-rose-400" /> Worker Cluster
            </span>
            <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 8 Nodes
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Queue Latency</span>
            <span className="font-bold text-emerald-400">42 ms</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[10px] text-slate-500 font-medium">
          <span>Root Node: admin-east-01</span>
          <span className="text-emerald-400/80 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> SECURE
          </span>
        </div>
      </div>
    </aside>
    </>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '../../components/AdminSidebar';
import {
  ShieldAlert,
  Server,
  Activity,
  ExternalLink,
  Lock,
  Radio,
  Sparkles,
  Menu,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top App Header */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Drawer Toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle admin navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider truncate max-w-[140px] sm:max-w-none">
                Root System Oversight
              </span>
            </div>

            <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Multi-Tenant Cluster Operational (99.99% SLA)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="http://localhost:3001/dashboard"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5 bg-slate-900 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl shadow-xs">
              <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-[10px] text-white shrink-0">
                SA
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-extrabold leading-tight text-white">admin@convoza.io</div>
                <div className="text-[9px] text-rose-300 font-bold uppercase tracking-wider">Master Root</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

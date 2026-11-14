'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  ChevronDown,
  Bell,
  LogOut,
  Plus,
  ShieldCheck,
  Check,
  Smartphone,
} from 'lucide-react';

export const TopNav = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [orgName, setOrgName] = useState('Apex Global Retail');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('convoza_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
      {/* Organization Switcher & WhatsApp Phone Status */}
      <div className="flex items-center gap-4">
        {/* Org Pill */}
        <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200">
          <Building2 className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-bold text-slate-900">{orgName}</span>
          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            Active
          </span>
        </div>

        {/* WhatsApp Phone Status Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-emerald-900">+91 98765 43210</span>
          <span className="text-emerald-700">• Tier 10K (High Quality)</span>
        </div>
      </div>

      {/* Right Controls: Quick Action, Notifications, User Menu */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/campaigns?new=true"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AV'}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || 'Alex Vance'}
              </div>
              <div className="text-[11px] text-slate-500">Org Owner</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">{user?.name || 'Alex Vance'}</div>
                <div className="text-[11px] text-slate-500 truncate">{user?.email || 'alex@apexretail.com'}</div>
              </div>
              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="block px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Team & Organization Settings
              </Link>
              <Link
                href="/dashboard/billing"
                onClick={() => setProfileOpen(false)}
                className="block px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Subscription & Quota
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors mt-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Filter,
  ArrowUpRight,
  UserCheck,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'SUPER_ADMIN' | 'CUSTOMER_USER'>('ALL');
  const [message, setMessage] = useState<string | null>(null);

  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'CONVOZA System Admin',
      email: 'admin@convoza.io',
      phone: '+1 800 266 8692',
      isSuperAdmin: true,
      role: 'SUPER_ADMIN',
      orgName: 'CONVOZA Platform Infrastructure',
      twoFactor: true,
      lastLogin: '5 mins ago',
      createdAt: '2026-11-01',
    },
    {
      id: 'u2',
      name: 'Alex Vance',
      email: 'alex@apexretail.com',
      phone: '+91 98765 43200',
      isSuperAdmin: false,
      role: 'ORG_OWNER',
      orgName: 'Apex Global Retail',
      twoFactor: true,
      lastLogin: 'Today, 09:15 AM',
      createdAt: '2026-11-10',
    },
    {
      id: 'u3',
      name: 'Devon Lee',
      email: 'devon.l@apexretail.com',
      phone: '+91 98765 43201',
      isSuperAdmin: false,
      role: 'ORG_ADMIN',
      orgName: 'Apex Global Retail',
      twoFactor: true,
      lastLogin: 'Yesterday',
      createdAt: '2026-11-11',
    },
    {
      id: 'u4',
      name: 'Zara Operations Lead',
      email: 'ops@zarafincorp.com',
      phone: '+91 98765 43202',
      isSuperAdmin: false,
      role: 'ORG_OWNER',
      orgName: 'Zara FinCorp Solutions',
      twoFactor: false,
      lastLogin: 'Nov 14',
      createdAt: '2026-11-08',
    },
  ]);

  const toggleSuperAdmin = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const newState = !u.isSuperAdmin;
          return {
            ...u,
            isSuperAdmin: newState,
            role: newState ? 'SUPER_ADMIN' : 'ORG_OWNER',
          };
        }
        return u;
      })
    );
    setMessage('User authorization updated successfully!');
  };

  const filteredUsers = users.filter((u) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.phone.includes(s) ||
      u.orgName.toLowerCase().includes(s);

    if (!matchesSearch) return false;
    if (roleFilter === 'SUPER_ADMIN') return u.isSuperAdmin;
    if (roleFilter === 'CUSTOMER_USER') return !u.isSuperAdmin;
    return true;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Platform Users & RBAC Directory</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
              Master Access
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global directory of all registered platform users, administrative authorizations, and organization memberships.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
            Total Users: <strong className="text-slate-900">1,420 Globally</strong>
          </span>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* 4 Directory KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Users</div>
          <div className="mt-2 text-2xl font-black text-slate-900">1,420</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            +142 this billing cycle
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Super Administrators</div>
          <div className="mt-2 text-2xl font-black text-rose-600">2</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Root authorization access</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">2FA Security Enforced</div>
          <div className="mt-2 text-2xl font-black text-emerald-600">94.8%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">TOTP hardware / authenticator</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Sessions</div>
          <div className="mt-2 text-2xl font-black text-slate-900">890</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Concurrent JWT tokens active</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, or organization..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'SUPER_ADMIN', 'CUSTOMER_USER'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setRoleFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                roleFilter === filter
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'ALL' ? 'All Roles' : filter === 'SUPER_ADMIN' ? 'Super Admins' : 'Customer Users'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-6">User Name</th>
                <th className="py-3.5 px-6">Work Email</th>
                <th className="py-3.5 px-6">Contact Phone</th>
                <th className="py-3.5 px-6">Organization</th>
                <th className="py-3.5 px-6">Role / Authorization</th>
                <th className="py-3.5 px-6">2FA Security</th>
                <th className="py-3.5 px-6 text-right">Root Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{u.name}</div>
                        <span className="text-[10px] text-slate-400">Joined {u.createdAt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{u.email}</td>
                  <td className="py-4 px-6 font-mono text-slate-600">{u.phone}</td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{u.orgName}</td>
                  <td className="py-4 px-6">
                    {u.isSuperAdmin ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        SUPER_ADMIN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {u.twoFactor ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" /> Enforced
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Disabled</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleSuperAdmin(u.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        u.isSuperAdmin
                          ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {u.isSuperAdmin ? 'Demote Super Admin' : 'Grant Super Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

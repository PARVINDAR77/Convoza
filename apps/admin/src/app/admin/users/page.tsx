'use client';

import React, { useState } from 'react';
import { Users, Search, CheckCircle2 } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'CONVOZA System Admin',
      email: 'admin@convoza.io',
      phone: '+1 800 266 8692',
      isSuperAdmin: true,
      orgCount: 0,
      createdAt: '2026-11-01',
    },
    {
      id: 'u2',
      name: 'Alex Vance',
      email: 'alex@apexretail.com',
      phone: '+91 98765 43200',
      isSuperAdmin: false,
      orgCount: 1,
      createdAt: '2026-11-10',
    },
    {
      id: 'u3',
      name: 'Devon Lee',
      email: 'devon.l@apexretail.com',
      phone: '+91 98765 43201',
      isSuperAdmin: false,
      orgCount: 1,
      createdAt: '2026-11-11',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Users & RBAC</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Global directory of all registered users and tenant authorizations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-6">User Name</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Super Admin</th>
                <th className="py-3 px-6">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-bold text-slate-900">{u.name}</td>
                  <td className="py-4 px-6 text-slate-600">{u.email}</td>
                  <td className="py-4 px-6 font-mono text-slate-500">{u.phone}</td>
                  <td className="py-4 px-6">
                    {u.isSuperAdmin ? (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                        SUPER_ADMIN
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        CUSTOMER_USER
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-slate-400">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

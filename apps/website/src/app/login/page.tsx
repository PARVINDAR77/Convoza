'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@apexretail.com');
  const [password, setPassword] = useState('Demo@Convoza2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Login failed. Please check your credentials.');
      }

      // Store tokens and user info
      localStorage.setItem('convoza_access_token', json.data.tokens.accessToken);
      localStorage.setItem('convoza_refresh_token', json.data.tokens.refreshToken);
      localStorage.setItem('convoza_user', JSON.stringify(json.data.user));
      if (json.data.organizations && json.data.organizations.length > 0) {
        localStorage.setItem('convoza_org_id', json.data.organizations[0].id);
      }

      // Redirect to Dashboard
      window.location.href = 'http://localhost:3001/dashboard';
    } catch (err: any) {
      setError(err.message || 'Network error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">Log in to CONVOZA</h2>
          <p className="mt-1.5 text-xs text-slate-500">Access your organization and WhatsApp automation</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
              Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@apexretail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Start 14-day free trial
          </Link>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-slate-500 text-[11px] leading-relaxed border border-slate-200">
          <strong>Demo Credentials:</strong><br />
          Email: <code className="text-slate-800">alex@apexretail.com</code><br />
          Password: <code className="text-slate-800">Demo@Convoza2026!</code>
        </div>
      </div>
    </div>
  );
}

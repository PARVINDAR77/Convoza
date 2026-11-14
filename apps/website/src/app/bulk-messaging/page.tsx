import React from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ShieldCheck, Flame, ArrowRight, BarChart2 } from 'lucide-react';

export default function BulkMessagingPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Broadcast Messaging Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            High-Impact Bulk WhatsApp Campaigns
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Reach 100,000+ customers with personalized offers, order alerts, and seasonal sales. Backed by PostgreSQL transactional queues.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">50 Messages / Second</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Asynchronous worker cluster with automatic rate limiting and phone-number-level concurrency controls prevents Meta API throttling.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Automatic Opt-Out Exclusion</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Guaranteed compliance. Any contact with OPTED_OUT status is automatically suppressed before broadcast dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Granular Delivery Receipts</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Real-time progress bars for Sent, Delivered, Read, and Failed counts powered by Meta webhooks.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md"
          >
            Launch Your First Campaign <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


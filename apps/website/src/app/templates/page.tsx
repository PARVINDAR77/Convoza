import React from 'react';
import Link from 'next/link';
import { MessageSquare, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Official Meta Message Templates
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Design, Test, and Sync WhatsApp Templates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Create high-converting templates with dynamic placeholders, interactive buttons, and media headers. Direct synchronization with Meta Cloud API.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Marketing Templates</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Promotions, seasonal flash sales, product launches, and re-engagement campaigns with customizable CTA buttons.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Utility Templates</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Order confirmations, shipping updates, payment receipts, appointment reminders, and billing statements.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Authentication Templates</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              One-time passwords (OTP) with one-tap autofill buttons compliant with global WhatsApp security standards.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md"
          >
            Create Your First Template <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

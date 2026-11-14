import React from 'react';
import { ShieldCheck, MessageSquare, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Our Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Conversations. Connected.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            CONVOZA was founded on a simple principle: modern consumers prefer messaging over email, but businesses need enterprise-grade reliability, compliance, and multi-tenant security to scale.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Policy Compliant</h3>
            <p className="mt-2 text-sm text-slate-600">
              Zero unofficial scraping. We integrate only through Meta's certified Cloud APIs to protect your business reputation and phone number quality rating.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Global Scalability</h3>
            <p className="mt-2 text-sm text-slate-600">
              Architected with PostgreSQL transactional outboxes, horizontal API replicas, and sub-500ms response targets to handle massive broadcast spikes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Developer First</h3>
            <p className="mt-2 text-sm text-slate-600">
              Every dashboard feature is built on documented REST endpoints and webhooks, allowing seamless ERP, Shopify, and custom software integrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


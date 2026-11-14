import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms and Conditions</h1>
        <p className="text-xs text-slate-500 mb-8">Effective Date: November 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the CONVOZA SaaS platform, you agree to be bound by these Terms and Conditions and our Acceptable Use Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Platform Usage & Multi-Tenancy</h2>
            <p>
              Users are granted a non-exclusive license to use CONVOZA services within their subscribed quota limits. Account credentials and API keys must be kept secure. Cross-tenant probing or unauthorized attempts to access another organization's records will result in immediate suspension.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Subscription Billing & Taxes</h2>
            <p>
              Subscriptions are billed in advance on a recurring monthly or annual basis. Messaging charges imposed directly by Meta for WhatsApp conversation windows are separate from CONVOZA software license fees.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Service Level & Availability</h2>
            <p>
              We target 99.9% platform availability. Maintenance windows and scheduled updates are communicated in advance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


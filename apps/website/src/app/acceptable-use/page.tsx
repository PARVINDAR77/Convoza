import React from 'react';

export default function AcceptableUsePolicyPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">WhatsApp Acceptable Use Policy</h1>
        <p className="text-xs text-slate-500 mb-8">Compliance Standard: Meta Business Policy 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Explicit Customer Opt-In Mandatory</h2>
            <p>
              Businesses must obtain explicit opt-in consent from recipients before sending any WhatsApp template messages. Importing third-party contact lists without verifiable consent records is strictly forbidden and grounds for account termination.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Respect Opt-Outs & STOP Requests</h2>
            <p>
              If a recipient replies STOP, UNSUBSCRIBE, or indicates withdrawal of consent, the organization must promptly set the contact's consent status to OPTED_OUT. CONVOZA enforces automatic suppression of marketing broadcasts for opted-out contacts.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Prohibited Content Categories</h2>
            <p>
              In accordance with Meta's Commerce Policy, users may not transmit content relating to illegal products, counterfeit goods, unlicensed pharmaceuticals, adult content, gambling, predatory lending, or deceptive marketing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Quality Score & Anti-Spam Enforcement</h2>
            <p>
              Organizations must maintain a high or medium phone number quality rating on Meta. High block rates, spam reports, or consecutive template rejections may trigger automated messaging tier restrictions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


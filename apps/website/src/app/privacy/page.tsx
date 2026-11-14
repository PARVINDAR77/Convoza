import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">CONVOZA Privacy Policy</h1>
        <p className="text-xs text-slate-500 mb-8">Last Updated: November 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>
              CONVOZA Technologies Inc. ("CONVOZA", "we", "us") provides a software-as-a-service WhatsApp business automation platform. This Privacy Policy details how we collect, process, and safeguard customer personal data and phone numbers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Data We Process</h2>
            <p>
              We process organization account details, user profiles, Meta WhatsApp Business Account (WABA) identifiers, phone number records, encrypted credentials, message status receipts, and customer contact information uploaded by organizations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Meta WhatsApp Cloud API Compliance</h2>
            <p>
              All message transmission is routed exclusively through official Meta WhatsApp Business Cloud APIs. We never sell, lease, or monetize customer contact records or message payloads.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Cryptographic Storage & Security</h2>
            <p>
              All integration credentials and Meta permanent access tokens are encrypted at rest using AES-256-GCM. Authentication tokens use Argon2/bcrypt hashing, and tenant data is strictly partitioned with tenant-aware relational constraints.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Data Retention & Deletion</h2>
            <p>
              Organizations may export or delete their contacts, conversations, and account records at any time. When an organization is deleted, all stored credentials and message histories are permanently wiped from the database.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


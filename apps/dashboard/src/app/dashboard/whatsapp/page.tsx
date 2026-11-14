'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Plus,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  Loader2,
  KeyRound,
  Check,
} from 'lucide-react';

export default function WhatsAppAccountsPage() {
  const [activeTab, setActiveTab] = useState<'connected' | 'connect-manual' | 'embedded-signup'>('connected');

  // Manual Form State
  const [name, setName] = useState('Apex Official WhatsApp');
  const [wabaId, setWabaId] = useState('109823746591029');
  const [phoneNumberId, setPhoneNumberId] = useState('102938475610293');
  const [accessToken, setAccessToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Connected accounts list
  const [accounts, setAccounts] = useState([
    {
      id: 'acc-1',
      name: 'Apex Official WhatsApp',
      wabaId: '109823746591029',
      status: 'CONNECTED',
      onboardingType: 'EMBEDDED_SIGNUP',
      webhookSubscribed: true,
      lastSyncedAt: 'Just now',
      phoneNumbers: [
        {
          id: 'pn-1',
          phoneNumberId: '102938475610293',
          displayPhoneNumber: '+91 98765 43210',
          verifiedName: 'Apex Retail Official',
          qualityRating: 'GREEN',
          messagingLimitTier: 'TIER_10K',
          codeVerificationStatus: 'VERIFIED',
          isDefault: true,
        },
      ],
    },
  ]);

  const handleValidateManual = async () => {
    setIsValidating(true);
    setValidationResult(null);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:4000/api/v1/whatsapp/manual/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({ phoneNumberId, accessToken }),
      });

      const json = await res.json();
      if (json.data?.isValid) {
        setValidationResult({
          success: true,
          details: json.data.data,
        });
      } else {
        setValidationResult({
          success: false,
          error: json.data?.error || json.error?.message || 'Verification failed on Meta Graph API.',
        });
      }
    } catch (err: any) {
      setValidationResult({ success: false, error: err.message || 'API connection error' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleConnectManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:4000/api/v1/whatsapp/manual/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({ name, wabaId, phoneNumberId, accessToken }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to connect WhatsApp account');
      }

      setMessage('WhatsApp account successfully connected and encrypted with AES-256-GCM!');
      setActiveTab('connected');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSyncAccount = async (accId: string) => {
    setSyncingId(accId);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/whatsapp/accounts/${accId}/sync`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
      });
      const json = await res.json();
      if (json.success) {
        setMessage('Account quality ratings and tiers synchronized with Meta!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">WhatsApp Phone Numbers</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect and manage official Meta WhatsApp Business Accounts (WABA) and messaging assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('embedded-signup')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Meta Embedded Signup
          </button>
          <button
            onClick={() => setActiveTab('connect-manual')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <KeyRound className="w-4 h-4" /> Manual Connection
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('connected')}
          className={`pb-3 ${
            activeTab === 'connected'
              ? 'border-b-2 border-emerald-600 text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Connected Numbers ({accounts.length})
        </button>
        <button
          onClick={() => setActiveTab('embedded-signup')}
          className={`pb-3 ${
            activeTab === 'embedded-signup'
              ? 'border-b-2 border-emerald-600 text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Meta Embedded Signup Wizard
        </button>
        <button
          onClick={() => setActiveTab('connect-manual')}
          className={`pb-3 ${
            activeTab === 'connect-manual'
              ? 'border-b-2 border-emerald-600 text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Manual WABA Credentials
        </button>
      </div>

      {/* Tab 1: Connected Numbers List */}
      {activeTab === 'connected' && (
        <div className="space-y-4">
          {accounts.map((acc) => (
            <div key={acc.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{acc.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {acc.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">WABA ID: {acc.wabaId}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSyncAccount(acc.id)}
                    disabled={syncingId === acc.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingId === acc.id ? 'animate-spin' : ''}`} />
                    Sync with Meta
                  </button>
                </div>
              </div>

              {/* Phone Numbers List */}
              <div className="mt-4 space-y-3">
                {acc.phoneNumbers.map((pn) => (
                  <div
                    key={pn.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{pn.displayPhoneNumber}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                            Default Sending Number
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{pn.verifiedName} • ID: {pn.phoneNumberId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Quality</span>
                        <span className="font-bold text-emerald-600">{pn.qualityRating}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Limit Tier</span>
                        <span className="font-bold text-slate-900">{pn.messagingLimitTier}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Verification</span>
                        <span className="font-bold text-emerald-600">{pn.codeVerificationStatus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Meta Embedded Signup Wizard */}
      {activeTab === 'embedded-signup' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Official Meta Embedded Signup</h2>
              <p className="text-xs text-slate-500">Facebook Login for Business WhatsApp onboarding</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Meta Embedded Signup allows your organization to grant WhatsApp messaging permissions in just 2 minutes directly inside the official Meta dialog. All business verification, phone number registration, and payment method linking are handled securely on Meta servers.
          </p>

          <div className="space-y-4 mb-8 text-xs text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Step 1: Authenticate with your Facebook Business Manager profile.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Step 2: Select or create your WhatsApp Business Account (WABA).</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Step 3: Register and verify your phone number via SMS or Voice OTP.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Step 4: CONVOZA automatically subscribes to webhooks and encrypts tokens.</span>
            </div>
          </div>

          <button
            onClick={() => {
              alert('Meta Embedded Signup Dialog would launch here in production using your configured Meta App ID.');
            }}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            Launch Meta Embedded Signup <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tab 3: Manual WABA Connection Form */}
      {activeTab === 'connect-manual' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Manual Authorized Connection</h2>
              <p className="text-xs text-slate-500">Provide direct Meta Cloud API credentials</p>
            </div>
          </div>

          <form onSubmit={handleConnectManual} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Connection Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Apex Official WhatsApp"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                WhatsApp Business Account (WABA) ID
              </label>
              <input
                type="text"
                required
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                placeholder="109823746591029"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Phone Number ID
              </label>
              <input
                type="text"
                required
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="102938475610293"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Permanent System User Access Token
              </label>
              <input
                type="password"
                required
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="EAAG... (Stored encrypted with AES-256-GCM)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>

            {/* Validation Feedback */}
            {validationResult && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  validationResult.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {validationResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Valid Meta Credentials! Verified Name: {validationResult.details?.verified_name}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{validationResult.error}</span>
                  </>
                )}
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleValidateManual}
                disabled={isValidating || !phoneNumberId || !accessToken}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {isValidating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                Validate Against Meta API
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                Connect Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


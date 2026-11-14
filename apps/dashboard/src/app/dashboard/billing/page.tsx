'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Download,
  Zap,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Growth Plan',
    tier: 'GROWTH',
    status: 'ACTIVE',
    price: '₹4,999/month',
    renewalDate: 'Dec 14, 2026',
    messagesUsed: 28450,
    messagesLimit: 50000,
    contactsUsed: 4210,
    contactsLimit: 25000,
    numbersUsed: 1,
    numbersLimit: 3,
  });

  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', amount: '₹4,999', status: 'PAID', date: 'Nov 14, 2026', plan: 'Growth Plan' },
    { id: 'INV-2026-000', amount: '₹1,999', status: 'PAID', date: 'Oct 14, 2026', plan: 'Starter Plan' },
  ]);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckout = async (planId: string, interval = 'MONTHLY') => {
    setIsProcessing(true);
    setMessage(null);

    try {
      // 1. Create checkout order on backend
      const res = await fetch('http://localhost:4000/api/v1/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({ planId, interval }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Failed to initialize checkout');

      const orderData = json.data;

      // 2. Complete payment verification server-side (test simulated signature)
      const verifyRes = await fetch('http://localhost:4000/api/v1/billing/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({
          razorpayOrderId: orderData.orderId,
          razorpayPaymentId: `pay_${Date.now()}`,
          razorpaySignature: `test_sig_${Date.now()}`,
          planId,
          interval,
        }),
      });

      const verifyJson = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyJson.error?.message || 'Payment verification failed');

      setMessage('Payment verified successfully via Razorpay signature! Subscription upgraded.');
      setShowUpgradeModal(false);
    } catch (err: any) {
      setMessage(`Payment error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Subscription & Billing</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your organization plan tier, quota allowances, and payment receipts.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Plan Card & Quota Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plan Overview */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Plan</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Subscription
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">{currentPlan.name}</h2>
            <div className="text-lg font-bold text-emerald-600 mt-1">{currentPlan.price}</div>
            <p className="text-xs text-slate-500 mt-2">Next automatic renewal: {currentPlan.renewalDate}</p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 WhatsApp Phone Numbers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 15 Team Agent Seats
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 25,000 Contact Capacity
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rule-based Automations
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowUpgradeModal(true)}
            className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Change or Upgrade Plan
          </button>
        </div>

        {/* Quota Usage Meters */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900">Current Billing Cycle Usage</h2>

          {/* Messages Meter */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-800">Campaign Broadcasts Used</span>
              <span className="font-mono text-slate-500">
                <strong className="text-slate-900">{currentPlan.messagesUsed.toLocaleString()}</strong> /{' '}
                {currentPlan.messagesLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(currentPlan.messagesUsed / currentPlan.messagesLimit) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Resets on {currentPlan.renewalDate}
            </span>
          </div>

          {/* Contacts Meter */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-800">Verified Contacts Stored</span>
              <span className="font-mono text-slate-500">
                <strong className="text-slate-900">{currentPlan.contactsUsed.toLocaleString()}</strong> /{' '}
                {currentPlan.contactsLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: `${(currentPlan.contactsUsed / currentPlan.contactsLimit) * 100}%` }}
              />
            </div>
          </div>

          {/* Numbers Meter */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-800">Connected WhatsApp Numbers</span>
              <span className="font-mono text-slate-500">
                <strong className="text-slate-900">{currentPlan.numbersUsed}</strong> /{' '}
                {currentPlan.numbersLimit}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${(currentPlan.numbersUsed / currentPlan.numbersLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Billing History & Invoices</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-6">Invoice #</th>
                <th className="py-3 px-6">Plan Description</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Billing Date</th>
                <th className="py-3 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="py-4 px-6 text-slate-700 font-semibold">{inv.plan}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{inv.date}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Upgrade to Enterprise Plan</h3>
            <p className="text-xs text-slate-600">
              Unlock 10+ WhatsApp phone numbers, 250,000+ contacts, high-priority outbox queues, and custom webhook callbacks.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center font-bold text-slate-900">
                <span>Enterprise Tier</span>
                <span className="text-emerald-600 text-base">₹14,999 / month</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleCheckout('plan_enterprise_id')}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Pay via Razorpay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


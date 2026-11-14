'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const comparison = [
    { feature: 'Official Meta Cloud API', starter: true, growth: true, enterprise: true },
    { feature: 'Meta Embedded Signup', starter: true, growth: true, enterprise: true },
    { feature: 'WhatsApp Numbers Allowed', starter: '1 Number', growth: '3 Numbers', enterprise: '10+ Numbers' },
    { feature: 'Team Agent Seats', starter: '3 Agents', growth: '15 Agents', enterprise: 'Unlimited' },
    { feature: 'Contact Capacity', starter: '2,500', growth: '25,000', enterprise: '250,000+' },
    { feature: 'Campaign Messages / Month', starter: '5,000', growth: '50,000', enterprise: '500,000+' },
    { feature: 'Shared Team Inbox', starter: true, growth: true, enterprise: true },
    { feature: 'Meta Template Builder', starter: true, growth: true, enterprise: true },
    { feature: 'Rule-based Automations', starter: false, growth: true, enterprise: true },
    { feature: 'Advanced Analytics & Exports', starter: false, growth: true, enterprise: true },
    { feature: 'Developer REST APIs', starter: false, growth: true, enterprise: true },
    { feature: 'Dedicated IP & 99.99% SLA', starter: false, growth: false, enterprise: true },
  ];

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transparent Pricing for Modern Brands
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Choose the plan tailored to your team size and campaign volumes. Upgrade or downgrade at any time.
          </p>

          <div className="mt-8 inline-flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                period === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                period === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <p className="text-xs text-slate-500 mt-1">For small businesses starting out</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {period === 'yearly' ? '₹1,599' : '₹1,999'}
                </span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>
            <Link
              href="/register"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Growth</h3>
              <p className="text-xs text-slate-500 mt-1">For scaling e-commerce & retail brands</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {period === 'yearly' ? '₹3,999' : '₹4,999'}
                </span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>
            <Link
              href="/register"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">For high-throughput broadcast leaders</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {period === 'yearly' ? '₹11,999' : '₹14,999'}
                </span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
            Detailed Plan Comparison
          </div>
          <div className="divide-y divide-slate-100">
            {comparison.map((c, i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-3.5 text-sm items-center hover:bg-slate-50/50">
                <div className="font-medium text-slate-900">{c.feature}</div>
                <div className="text-slate-600 text-center">
                  {typeof c.starter === 'boolean' ? (
                    c.starter ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 inline" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 inline" />
                    )
                  ) : (
                    c.starter
                  )}
                </div>
                <div className="text-slate-600 text-center font-semibold">
                  {typeof c.growth === 'boolean' ? (
                    c.growth ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 inline" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 inline" />
                    )
                  ) : (
                    c.growth
                  )}
                </div>
                <div className="text-slate-600 text-center font-semibold">
                  {typeof c.enterprise === 'boolean' ? (
                    c.enterprise ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 inline" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 inline" />
                    )
                  ) : (
                    c.enterprise
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

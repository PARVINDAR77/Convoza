'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Zap,
  Users,
  Send,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  Inbox,
  Flame,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const faqs = [
    {
      q: 'Does CONVOZA use official WhatsApp APIs or unofficial web scrapers?',
      a: 'CONVOZA exclusively integrates with the official Meta WhatsApp Business Platform Cloud API. We do not use QR code scraping, unofficial web clients, or browser automation. Your numbers are fully protected from bans and compliant with Meta policies.',
    },
    {
      q: 'What is Meta Embedded Signup?',
      a: 'Meta Embedded Signup allows your organization to onboard and verify WhatsApp phone numbers in under 2 minutes directly from the CONVOZA dashboard using official Facebook Login for Business.',
    },
    {
      q: 'How does the 24-hour customer service window work?',
      a: 'Meta WhatsApp Business policy allows free-form two-way conversations when a customer initiates or replies to a message. Once 24 hours elapse, only pre-approved WhatsApp Templates can be sent to re-open the conversation.',
    },
    {
      q: 'Can multiple agents manage the same WhatsApp number simultaneously?',
      a: 'Yes! Our Shared Inbox is built for multi-agent support teams with role-based access control, ticket assignment, internal private notes, and real-time Socket.IO live updates.',
    },
    {
      q: 'How fast can CONVOZA send bulk campaign broadcasts?',
      a: 'Our PostgreSQL-backed transactional worker engine is architected to process up to 50 messages per second per phone number with automatic exponential backoff retry and delivery status tracking.',
    },
  ];

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Next-Generation WhatsApp Business Automation</span>
          <span className="hidden sm:inline-block text-emerald-400">•</span>
          <span className="hidden sm:inline-block text-emerald-700">Official Meta Cloud API</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Conversations that convert. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Connected at enterprise scale.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          CONVOZA connects your business to 2+ billion WhatsApp users with instant Meta Embedded Signup, high-throughput bulk campaigns, collaborative shared team inbox, and intelligent auto-reply rules.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all"
          >
            Start Free 14-Day Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="http://localhost:3001"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm transition-all"
          >
            Explore Live Dashboard
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2-minute setup
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Meta verified provider
          </span>
        </div>

        {/* Product Dashboard Showcase */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/80 max-w-6xl mx-auto">
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden text-left p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs text-slate-400 font-mono">convoza.io/dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Meta Cloud API Connected
                </span>
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-xs font-medium text-slate-400">Total Outbound Sent</div>
                <div className="text-2xl font-bold text-white mt-1">128,450</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">↑ +24.8% this week</div>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-xs font-medium text-slate-400">Delivery Rate</div>
                <div className="text-2xl font-bold text-white mt-1">98.6%</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">Tier 10K High Quality</div>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-xs font-medium text-slate-400">Read / Open Rate</div>
                <div className="text-2xl font-bold text-white mt-1">79.2%</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">8x higher than Email</div>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="text-xs font-medium text-slate-400">Active Conversations</div>
                <div className="text-2xl font-bold text-white mt-1">1,429</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">12 Agents Online</div>
              </div>
            </div>

            {/* Live Chat Mockup */}
            <div className="mt-6 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col gap-3">
              <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Live Customer Interaction — Shared Team Inbox
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">
                  SM
                </div>
                <div className="bg-slate-800 text-slate-200 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none max-w-md">
                  Hi! Can I modify my shipping address for order #APX-4912?
                </div>
              </div>
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-emerald-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-none max-w-md">
                  Certainly Sarah! I have updated your destination to 44 Orchard Blvd. Your dispatch is confirmed for tomorrow morning! 🚚
                  <div className="text-[10px] text-emerald-100 mt-1 text-right">Delivered • 10:14 AM ✓✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Enterprise Capabilities</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything your business needs for WhatsApp automation
          </p>
          <p className="mt-4 text-base text-slate-600">
            Engineered with strict multi-tenancy, transactional outbox reliability, and official Meta Cloud APIs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Meta Embedded Signup</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Connect official WABA assets and numbers in seconds with Facebook Login for Business dialogs, without complex manual setup.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">High-Throughput Bulk Campaigns</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Send tens of thousands of personalized messages with dynamic parameters, consent suppression, and background worker queues.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Multi-Agent Shared Inbox</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Professional 3-column team workspace with ticket routing, agent assignments, 24-hour window validation, and real-time Socket.IO.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Meta Template Builder</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Draft, customize, preview, and submit Marketing, Utility, and Auth templates directly to Meta with live approval sync.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Automated Workflow Bots</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Configure event-driven triggers, keyword responders, and automatic agent assignment rules without writing code.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Analytics & Real-time Webhooks</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Track delivery receipts, open rates, response times, and export contact metrics with developer REST APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Transparent Pricing</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plans built to scale with your message volume
          </p>
          <p className="mt-3 text-slate-600">All plans include official Meta Cloud API connectivity.</p>

          <div className="mt-8 inline-flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingPeriod === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <p className="text-xs text-slate-500 mt-1">Essential automation for growing teams</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'yearly' ? '₹1,599' : '₹1,999'}
                </span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1 WhatsApp Phone Number
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 Team Agent Seats
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2,500 Contact Allowance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 5,000 Campaign Broadcasts/mo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Shared WhatsApp Inbox
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Growth</h3>
              <p className="text-xs text-slate-500 mt-1">For scaling brands & high-velocity sales</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'yearly' ? '₹3,999' : '₹4,999'}
                </span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 WhatsApp Phone Numbers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 15 Team Agent Seats
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 25,000 Contact Allowance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 50,000 Campaign Broadcasts/mo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rule-based Automations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Advanced Analytics & Reports
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">Dedicated throughput & custom integrations</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'yearly' ? '₹11,999' : '₹14,999'}
                </span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 10+ WhatsApp Phone Numbers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Team Seats
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 250,000+ Contact Capacity
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated IP & High-priority Outbox
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom Webhooks & 99.99% SLA
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 block text-center py-2.5 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Frequently Asked Questions</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">Everything you need to know</p>
        </div>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                {faq.q}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High-impact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to connect with your customers on WhatsApp?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-300">
              Join thousands of fast-growing businesses delivering 98%+ open rates with CONVOZA.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/30 transition-all"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-all"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


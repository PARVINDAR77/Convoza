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
  Globe,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Package,
  Headphones,
  Check,
  Star,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [phoneChat, setPhoneChat] = useState<Array<{ id: string; text: string; sender: 'bot' | 'reply'; time: string }>>([]);
  const [isPhoneTyping, setIsPhoneTyping] = useState(false);

  const handlePhoneAction = (action: string) => {
    if (isPhoneTyping) return;
    setIsPhoneTyping(true);
    setTimeout(() => {
      setIsPhoneTyping(false);
      if (action === 'track') {
        setPhoneChat((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: '🚚 BlueDart Express: Shipment #12345 is Out for Delivery! Expected delivery today before 4:00 PM.',
            sender: 'reply',
            time: '10:25 AM',
          },
        ]);
      } else {
        setPhoneChat((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: '👋 Support Agent Alex has joined this chat. How can we help you today with order #12345?',
            sender: 'reply',
            time: '10:25 AM',
          },
        ]);
      }
    }, 800);
  };

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
      
      {/* ========================================================= */}
      {/* EXACT REFERENCE HERO SECTION (DARK GREEN LUXURY THEME)    */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-b from-[#031d16] via-[#04281e] to-[#021812] pt-14 pb-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-950 overflow-hidden">
        
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Headlines, Copy, CTAs, Checkmarks */}
          <div className="lg:col-span-7 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Business Automation Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14]">
              Grow Your Business with <br />
              <span className="text-emerald-400">WhatsApp Automation</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Broadcast campaigns, automate conversations, manage customers, and build stronger relationships on WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-base shadow-lg shadow-emerald-400/25 hover:shadow-emerald-400/35 transition-all"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="http://localhost:3001/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-white font-semibold text-base border border-emerald-500/40 shadow-sm transition-all"
              >
                View Demo
              </a>
            </div>

            {/* Feature Checkmarks Row */}
            <div className="mt-10 pt-6 border-t border-emerald-900/50 grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                <span>Official WhatsApp API</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                <span>Bulk & Individual Messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                <span>Automation & Chatbot</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                <span>Shared Team Inbox</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Mockup with 3D WhatsApp Logo */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop behind Phone */}
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl transform scale-90 -z-10" />

            {/* Floating 3D WhatsApp Icon (Right Side of Phone) */}
            <div className="absolute -bottom-4 -right-4 sm:-right-8 z-30 animate-float-reverse">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] p-1 shadow-2xl shadow-emerald-500/60 border-2 border-emerald-300 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageSquare className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white drop-shadow" />
                </div>
              </div>
            </div>

            {/* Smartphone Outer Shell */}
            <div className="relative w-full max-w-[340px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-700/80 shadow-2xl shadow-emerald-950/80 overflow-hidden animate-float-slow">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                <div className="w-10 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* WhatsApp App Header */}
              <div className="bg-[#075E54] pt-7 pb-3 px-4 flex items-center justify-between text-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 border border-emerald-400/50 flex items-center justify-center text-white font-bold text-xs">
                    YB
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-white">Your Business</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" />
                    </div>
                    <span className="text-[11px] text-emerald-200 block leading-tight">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-emerald-100">
                  <Video className="w-4 h-4 cursor-pointer" />
                  <Phone className="w-4 h-4 cursor-pointer" />
                  <MoreVertical className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* WhatsApp Chat Body Wallpaper */}
              <div className="bg-[#EFEAE2] p-3.5 min-h-[380px] flex flex-col justify-between text-slate-800 text-xs">
                
                {/* Messages Container */}
                <div className="space-y-3">
                  
                  {/* Encrypted Notice */}
                  <div className="mx-auto bg-[#FDF4C5] text-[10px] text-slate-600 px-3 py-1 rounded-md text-center max-w-[260px] shadow-sm">
                    🔒 Messages are end-to-end encrypted with Meta Cloud API.
                  </div>

                  {/* Incoming WhatsApp Business Template Card */}
                  <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-md border border-slate-200 max-w-[270px]">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>Hello Sarah!</span>
                      <span>🎉</span>
                    </div>
                    <p className="mt-1.5 text-slate-700 leading-relaxed text-[11px]">
                      Your order <strong>#12345</strong> has been shipped and is on the way.
                    </p>
                    <p className="mt-1 text-slate-700 text-[11px]">
                      Track here:{' '}
                      <span className="text-blue-600 font-medium underline">https://track.com</span>
                    </p>

                    <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-end gap-1">
                      <span>10:24 AM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    </div>

                    {/* Interactive CTA Buttons inside Template Card */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                      <button
                        onClick={() => handlePhoneAction('track')}
                        className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 border border-emerald-200/80 active:scale-95"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Track Order</span>
                      </button>
                      <button
                        onClick={() => handlePhoneAction('support')}
                        className="w-full py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 border border-slate-200 active:scale-95"
                      >
                        <Headphones className="w-3.5 h-3.5 text-slate-500" />
                        <span>Contact Support</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Action Response Message */}
                  {phoneChat.map((msg) => (
                    <div key={msg.id} className="bg-[#D9FDD3] rounded-xl rounded-tr-none p-2.5 shadow-sm border border-emerald-200 ml-auto max-w-[250px] animate-fade-in">
                      <p className="text-[11px] text-slate-800 leading-snug">{msg.text}</p>
                      <div className="mt-1 text-[9px] text-slate-500 flex items-center justify-end gap-1">
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3 h-3 text-blue-500" />
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator inside Phone */}
                  {isPhoneTyping && (
                    <div className="bg-white rounded-lg p-2 shadow-sm w-fit flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 typing-dot-3" />
                    </div>
                  )}
                </div>

                {/* Input Simulation Bar */}
                <div className="pt-2 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-slate-400 border border-slate-200">
                    Type a message...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ENTERPRISE CAPABILITIES FEATURE GRID                     */}
      {/* ========================================================= */}
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
          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Meta Embedded Signup</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Connect official WABA assets and numbers in seconds with Facebook Login for Business dialogs, without complex manual setup.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">High-Throughput Bulk Campaigns</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Send tens of thousands of personalized messages with dynamic parameters, consent suppression, and background worker queues.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Multi-Agent Shared Inbox</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Equip support and sales teams with 3-column ticket routing, 24-hour window countdowns, private internal notes, and Socket.IO real-time streaming.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Visual Template Builder</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Design Marketing, Utility, and Authentication templates with dynamic variables, interactive buttons, and real-time WhatsApp phone previews.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Automated Workflow Engine</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Trigger instant auto-replies, business hours logic, and automated team assignment based on message keywords and contact tags.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AES-256 Encrypted Security</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Bank-grade token encryption, HMAC timing-safe webhook verification, refresh token rotation, and strict multi-tenant isolation.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PRICING PLANS SECTION                                     */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Transparent Pricing</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, predictable plans for every stage
          </p>
          <p className="mt-4 text-base text-slate-600">
            No hidden markups. You pay Meta official conversation fees directly at cost.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-slate-200/80">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                billingPeriod === 'yearly' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Annual Billing <span className="text-[10px] bg-emerald-700/80 px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <p className="mt-2 text-sm text-slate-600">For small businesses getting started with WhatsApp marketing.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'monthly' ? '₹2,499' : '₹1,999'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <ul className="mt-8 space-y-3.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1 WhatsApp Phone Number
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 10,000 Monthly Messages
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2 Team Agent Seats
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Meta Embedded Signup
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard Outbox Worker
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="mt-8 block w-full text-center py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Growth</h3>
              <p className="mt-2 text-sm text-slate-600">For scaling e-commerce brands and multi-agent customer service teams.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'monthly' ? '₹5,999' : '₹4,799'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <ul className="mt-8 space-y-3.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 WhatsApp Phone Numbers
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 50,000 Monthly Messages
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 10 Team Agent Seats
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3-Column Shared Team Inbox
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated Workflow Rules
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Priority Worker Dispatch (50 msg/s)
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="mt-8 block w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-md shadow-emerald-600/20"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
              <p className="mt-2 text-sm text-slate-600">For high-volume retail leaders and organizations needing dedicated scale.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingPeriod === 'monthly' ? '₹14,999' : '₹11,999'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <ul className="mt-8 space-y-3.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Phone Numbers
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Messages (Meta at cost)
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Team Agent Seats
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated Worker Cluster
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 99.9% SLA & Dedicated Support
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 block w-full text-center py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS SECTION                       */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Got Questions?</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-7.5">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL HIGH-CONVERTING CTA                                 */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to connect your business to 2+ billion WhatsApp users?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get started in 2 minutes with official Meta Embedded Signup. 14-day free trial, no credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-base transition-colors shadow-lg shadow-emerald-400/20"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-colors"
            >
              Schedule Demo Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

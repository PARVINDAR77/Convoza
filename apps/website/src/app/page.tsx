'use client';

import React, { useState, useEffect } from 'react';
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
  Smartphone,
  Clock,
  TrendingUp,
  Activity,
  Check,
  CheckCheck,
  Star,
  Play,
  Filter,
  Search,
  Tag,
  UserCheck,
  Layers,
  ArrowUpRight,
  PhoneCall,
  BellRing
} from 'lucide-react';

export default function HomePage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activeTab, setActiveTab] = useState<'inbox' | 'broadcast' | 'automations' | 'analytics'>('inbox');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'bot'; time: string }>>([
    {
      id: '1',
      text: 'Hi there! Has my Diwali festival order #APX-9081 shipped yet?',
      sender: 'user',
      time: '10:14 AM',
    },
    {
      id: '2',
      text: 'Hello Sarah! 🎁 Yes! Your order was dispatched via BlueDart Express. Tracking ID: BD-88291. Expected arrival is tomorrow by 2:00 PM!',
      sender: 'bot',
      time: '10:14 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Quick reply simulator in the hero chat mockup
  const handleQuickReply = (replyText: string, botResponse: string) => {
    if (isTyping) return;
    const userMsg = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'user' as const,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot' as const,
          time: 'Just now',
        },
      ]);
    }, 1100);
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
    <div className="bg-slate-50 overflow-hidden relative">
      {/* Dynamic Background Ambient Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 -right-20 w-[550px] h-[550px] bg-teal-400/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-80 left-1/3 w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-3xl" />
      </div>

      {/* ========================================================= */}
      {/* UPGRADED PROFESSIONAL ANIMATED HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/90 text-emerald-900 text-xs sm:text-sm font-semibold mb-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-medium text-slate-800">Official Meta WhatsApp Cloud API v20.0</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Verified Tech Provider
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Conversations that convert. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
            Connected at enterprise scale.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          CONVOZA connects your business to 2+ billion WhatsApp customers. Launch high-speed broadcasts, collaborate in a real-time shared team inbox, and automate personalized workflows with <strong>zero account ban risk</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free 14-Day Trial <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
          <a
            href="http://localhost:3001/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200/90 shadow-sm hover:shadow transition-all group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Explore Live Dashboard</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </a>
        </div>

        {/* Social Proof & Trust Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">AK</div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">SJ</div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">MR</div>
            </div>
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="font-bold text-slate-900 ml-1">4.9/5</span> from 2,400+ companies
            </div>
          </div>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
          </span>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2-minute Embedded Signup
          </span>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> SOC2 Type II Certified
          </span>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE SHOWCASE DECK WITH FLOATING ANIMATED WIDGETS */}
        {/* ========================================================= */}
        <div className="mt-14 relative max-w-6xl mx-auto">
          
          {/* Floating Orbit Widget 1: Top-Left Broadcast Progress */}
          <div className="hidden lg:flex absolute -top-8 -left-10 z-20 animate-float-slow items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 text-left w-64">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">Diwali Flash Sale</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">98.6%</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">14,280 delivered • Tier 10K</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[98%]" />
              </div>
            </div>
          </div>

          {/* Floating Orbit Widget 2: Top-Right Auto-Reply Simulator */}
          <div className="hidden lg:flex absolute -top-6 -right-8 z-20 animate-float-reverse items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 text-left w-72">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Auto-Reply Triggered</span>
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded-full">118ms</span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1 truncate">Shopify Order API → WhatsApp ✓✓</div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                <CheckCheck className="w-3 h-3 text-emerald-500" /> Customer satisfaction 99.4%
              </div>
            </div>
          </div>

          {/* Floating Orbit Widget 3: Bottom-Left Service Window Timer */}
          <div className="hidden lg:flex absolute -bottom-6 -left-6 z-20 animate-float-reverse items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 text-left w-64">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">24-Hour Customer Window</div>
              <div className="text-sm font-extrabold text-amber-600 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>23h : 48m : 12s Remaining</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Free-form two-way chat active</div>
            </div>
          </div>

          {/* Floating Orbit Widget 4: Bottom-Right Zero Ban Guarantee */}
          <div className="hidden lg:flex absolute -bottom-6 -right-6 z-20 animate-float-slow items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 text-left w-64">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Meta Verified Architecture</div>
              <div className="text-xs font-semibold text-emerald-600 mt-0.5">Zero Account Bans Guaranteed</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Transactional Outbox Queue Active</div>
            </div>
          </div>

          {/* Master Frame Container */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-4 shadow-2xl shadow-slate-300/70">
            <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden text-left">
              
              {/* Window Header with Browser Dots & Interactive Tabs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80 gap-4">
                
                {/* Traffic Light Dots + URL */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-bold">https://</span>app.convoza.io/dashboard
                  </div>
                </div>

                {/* Interactive Feature Tabs */}
                <div className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700/70 overflow-x-auto text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'inbox'
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Shared Team Inbox</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('broadcast')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'broadcast'
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Bulk Broadcast</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('automations')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'automations'
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Auto Workflows</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'analytics'
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Live Analytics</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Tab 1: 3-Column Shared Inbox Simulation */}
              {activeTab === 'inbox' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] bg-slate-900 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                  
                  {/* Left Column: Conversations List */}
                  <div className="lg:col-span-4 p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider pb-1">
                      <span>Active Conversations</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">12 Live</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400">
                      <Search className="w-3.5 h-3.5" />
                      <span>Search customer, order #...</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                      {/* Active Contact Item */}
                      <div className="p-3 rounded-xl bg-slate-800/90 border border-emerald-500/40 shadow-sm flex items-start gap-3 cursor-pointer">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                            SJ
                          </div>
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate">Sarah Jenkins</span>
                            <span className="text-[10px] text-emerald-400 font-mono">10:14 AM</span>
                          </div>
                          <div className="text-[11px] text-slate-300 truncate mt-0.5">Has my Diwali festival order #APX-9081...</div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded font-semibold">VIP Client</span>
                            <span className="text-[9px] bg-slate-700 text-slate-300 px-1.5 py-0.2 rounded">Order Inquiry</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Contact Item */}
                      <div className="p-3 rounded-xl bg-slate-850/50 hover:bg-slate-800/60 border border-transparent transition-all flex items-start gap-3 opacity-75">
                        <div className="w-9 h-9 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs">
                          RV
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-300 truncate">Rahul Verma</span>
                            <span className="text-[10px] text-slate-500 font-mono">09:50 AM</span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">Interested in Enterprise Tier pricing...</div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[9px] bg-blue-950 text-blue-400 border border-blue-800/80 px-1.5 py-0.2 rounded font-semibold">Sales Lead</span>
                          </div>
                        </div>
                      </div>

                      {/* Third Contact Item */}
                      <div className="p-3 rounded-xl bg-slate-850/50 hover:bg-slate-800/60 border border-transparent transition-all flex items-start gap-3 opacity-60">
                        <div className="w-9 h-9 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs">
                          DC
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-300 truncate">David Chen</span>
                            <span className="text-[10px] text-slate-500 font-mono">Yesterday</span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">Thanks! The template was approved.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Column: Live Chat Thread */}
                  <div className="lg:col-span-5 p-4 flex flex-col justify-between bg-slate-950/60">
                    <div>
                      {/* Thread Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <div>
                            <div className="text-xs font-bold text-white">Sarah Jenkins (+91 98765 43210)</div>
                            <div className="text-[10px] text-slate-400">Assigned to: Alex Kumar • Online</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          <span>24h Window Active</span>
                        </div>
                      </div>

                      {/* Messages Feed */}
                      <div className="py-4 space-y-3">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === 'bot' ? 'items-end' : 'items-start'}`}
                          >
                            <div
                              className={`max-w-[85%] text-xs px-3.5 py-2.5 rounded-2xl ${
                                msg.sender === 'bot'
                                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/80'
                              }`}
                            >
                              {msg.text}
                              <div
                                className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                                  msg.sender === 'bot' ? 'text-emerald-200' : 'text-slate-400'
                                }`}
                              >
                                <span>{msg.time}</span>
                                {msg.sender === 'bot' && <CheckCheck className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Interactive Typing Indicator */}
                        {isTyping && (
                          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-400 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-1" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-2" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-3" />
                            <span className="text-[10px] text-slate-400 ml-1">CONVOZA Bot responding...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Quick-Reply Chips */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" /> Click to test simulated reply:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() =>
                            handleQuickReply(
                              '📍 Track Package Live',
                              'Courier update: Parcel BD-88291 is currently at Mumbai Sorting Hub. On schedule for delivery tomorrow!'
                            )
                          }
                          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-[11px] text-slate-300 transition-all font-medium"
                        >
                          📍 Track Package Live
                        </button>
                        <button
                          onClick={() =>
                            handleQuickReply(
                              '🎁 Apply Festival Coupon',
                              'Coupon DIWALI50 applied successfully! ₹500 discount recorded on your Apex account.'
                            )
                          }
                          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-[11px] text-slate-300 transition-all font-medium"
                        >
                          🎁 Apply Festival Coupon
                        </button>
                        <button
                          onClick={() =>
                            handleQuickReply(
                              '👨‍💼 Talk to Senior Agent',
                              'Routing conversation to Alex Kumar (Senior Concierge). Agent connected.'
                            )
                          }
                          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-[11px] text-slate-300 transition-all font-medium"
                        >
                          👨‍💼 Talk to Senior Agent
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Contact Intel & Private Notes */}
                  <div className="lg:col-span-3 p-4 bg-slate-900/90 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Contact Profile</div>
                      
                      <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                        <div className="text-xs font-bold text-white">Sarah Jenkins</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">sarah.j@gmail.com</div>
                        <div className="text-[11px] text-slate-400 font-mono">+91 98765 43210</div>

                        <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Consent:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-400" /> OPTED IN (Web)
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400 font-medium mb-1.5">Assigned Agent</div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold">AK</div>
                            <span>Alex Kumar</span>
                          </div>
                          <span className="text-[10px] text-emerald-400">Online</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400 font-medium mb-1.5">Private Internal Note</div>
                        <div className="bg-amber-950/40 border border-amber-800/60 rounded-lg p-2.5 text-[11px] text-amber-200 leading-relaxed">
                          📌 Customer requested express delivery priority. Packaging team alerted.
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                      ⚡ Socket.IO real-time channel connected
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 2: High-Speed Broadcast Campaigns */}
              {activeTab === 'broadcast' && (
                <div className="p-6 sm:p-8 bg-slate-900 min-h-[460px] flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Processing Outbox Queue</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1.5">Campaign: Diwali Festival 50% Off Blast</h3>
                        <p className="text-xs text-slate-400">Target Segment: VIP Customers + Cart Abandoners (Last 30 Days)</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-white font-mono">14,280 / 14,280</div>
                        <div className="text-xs text-emerald-400 font-semibold">100% Dispatched (50 msg/sec)</div>
                      </div>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="mt-6">
                      <div className="flex justify-between text-xs text-slate-400 font-medium mb-2">
                        <span>Delivery Throughput: 50 msg/sec per phone number</span>
                        <span className="text-emerald-400 font-bold">99.1% Success Rate</span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[99.1%] transition-all duration-1000" />
                      </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 font-medium">Recipients</div>
                        <div className="text-2xl font-bold text-white mt-1">14,280</div>
                        <div className="text-[11px] text-slate-400 mt-1">0 Opted-out excluded</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 font-medium">Delivered</div>
                        <div className="text-2xl font-bold text-emerald-400 mt-1">14,152</div>
                        <div className="text-[11px] text-emerald-400 mt-1">99.1% Delivery rate</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 font-medium">Read Rate</div>
                        <div className="text-2xl font-bold text-teal-400 mt-1">11,840</div>
                        <div className="text-[11px] text-teal-400 mt-1">82.9% Open rate</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400 font-medium">Replies Received</div>
                        <div className="text-2xl font-bold text-amber-400 mt-1">2,310</div>
                        <div className="text-[11px] text-amber-400 mt-1">19.5% Conversion</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Transactional Outbox Queue (`FOR UPDATE SKIP LOCKED`) active
                    </span>
                    <span className="font-mono text-emerald-400">Meta WABA: 109823746591029</span>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 3: Automated Workflows Simulator */}
              {activeTab === 'automations' && (
                <div className="p-6 sm:p-8 bg-slate-900 min-h-[460px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-white">Rule: Order Status Instant Tracking</h3>
                        <p className="text-xs text-slate-400">Automated Webhook Resolver • Triggered on Inbound Customer Messages</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE RULE
                      </span>
                    </div>

                    {/* Step-by-Step Flow Nodes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Step 1: Trigger</div>
                        <div className="text-sm font-bold text-white mt-1">Inbound Message</div>
                        <p className="text-xs text-slate-400 mt-1">Customer texts containing: `order`, `track`, `dispatch`, `package`</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Step 2: Condition</div>
                        <div className="text-sm font-bold text-white mt-1">Window Check</div>
                        <p className="text-xs text-slate-400 mt-1">24h Customer Service Window is OPEN & Verified</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Step 3: Action</div>
                        <div className="text-sm font-bold text-white mt-1">REST API Query</div>
                        <p className="text-xs text-slate-400 mt-1">Query Shopify / ERP Order API by recipient phone number</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Step 4: Dispatch</div>
                        <div className="text-sm font-bold text-white mt-1">Instant WhatsApp</div>
                        <p className="text-xs text-slate-400 mt-1">Send personalized status + tracking button in 118ms</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Rule Execution Metrics</div>
                        <div className="text-[11px] text-slate-400">Triggered 1,842 times today • Average execution time: 118ms • 0 failures</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Success: 100%</span>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 4: Live Analytics & Performance Chart */}
              {activeTab === 'analytics' && (
                <div className="p-6 sm:p-8 bg-slate-900 min-h-[460px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-white">Organization Performance (Last 30 Days)</h3>
                        <p className="text-xs text-slate-400">Data synchronized directly with Meta Cloud Platform</p>
                      </div>
                      <div className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
                        Total Volume: 14,320 Messages
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400">Total Sent</div>
                        <div className="text-2xl font-bold text-white mt-1">14,320</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-1">↑ +24.8% vs last month</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400">Delivered</div>
                        <div className="text-2xl font-bold text-white mt-1">13,982</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-1">97.6% Deliverability</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400">Read Receipts</div>
                        <div className="text-2xl font-bold text-white mt-1">11,406</div>
                        <div className="text-xs text-teal-400 font-semibold mt-1">81.6% Read Rate</div>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="text-xs text-slate-400">Customer Replies</div>
                        <div className="text-2xl font-bold text-white mt-1">2,184</div>
                        <div className="text-xs text-amber-400 font-semibold mt-1">19.1% Engagement</div>
                      </div>
                    </div>

                    {/* Animated SVG Trend Line */}
                    <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span className="font-semibold text-slate-300">Message Volume & Engagement Curve</span>
                        <span className="text-emerald-400 font-mono">High Quality Tier 10K</span>
                      </div>
                      <svg viewBox="0 0 500 120" className="w-full h-24 stroke-emerald-500 fill-none">
                        <path
                          d="M 0 100 Q 80 40 160 70 T 320 30 T 500 15"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="drop-shadow-[0_4px_12px_rgba(16,185,129,0.5)]"
                        />
                        <path
                          d="M 0 100 Q 80 40 160 70 T 320 30 T 500 15 L 500 120 L 0 120 Z"
                          fill="url(#emeraldGradient)"
                          opacity="0.18"
                        />
                        <defs>
                          <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-center text-xs text-slate-500">
                    Live production metrics matching CONVOZA customer dashboard
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ENTERPRISE CAPABILITIES FEATURE GRID */}
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
      {/* PRICING PLANS */}
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
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3-Column Shared Team Inbox
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated Workflow Rules
                </li>
                <li className="flex items-center gap-2.5">
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
      {/* FREQUENTLY ASKED QUESTIONS */}
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
      {/* FINAL HIGH-CONVERTING CTA */}
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-base transition-colors shadow-lg shadow-emerald-500/20"
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

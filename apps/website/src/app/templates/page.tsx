'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCheck,
  Smartphone,
  ShieldCheck,
  SlidersHorizontal,
  MessageSquare,
  Lock,
  Layers,
  Send,
  Zap,
  ShoppingBag,
  PhoneCall,
  ExternalLink,
  Copy
} from 'lucide-react';

function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-12 scale-[0.98] blur-[1px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<'marketing' | 'utility' | 'auth'>('marketing');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const templateData = {
    marketing: {
      category: 'MARKETING',
      name: 'festive_mega_sale_v2',
      header: 'IMAGE (Dynamic banner uploaded)',
      body: 'Hi {{1}}! 🎉 Our Diwali Super Sale is officially live. Enjoy an exclusive {{2}}% OFF on all trending styles today only. Valid for the next 24 hours!',
      buttons: [
        { type: 'url', label: 'Shop Now (Dynamic URL)', icon: <ExternalLink className="w-3.5 h-3.5" /> },
        { type: 'quick_reply', label: 'Opt-Out of Offers', icon: <Check className="w-3.5 h-3.5" /> }
      ],
      complianceScore: '100% Meta Verified',
      approvalSpeed: '< 15 Minutes (Instant AI Sync)',
      phoneText: 'Hi Priya! 🎉 Our Diwali Super Sale is officially live. Enjoy an exclusive 30% OFF on all trending styles today only. Valid for the next 24 hours!',
      button1: 'Shop Now →',
      button2: 'Opt-Out of Offers',
    },
    utility: {
      category: 'UTILITY',
      name: 'shipping_tracking_update',
      header: 'DOCUMENT (PDF Invoice attached)',
      body: 'Hello {{1}}, your order {{2}} has been dispatched via Bluedart (AWB: {{3}}). Tap below to track your live package delivery.',
      buttons: [
        { type: 'url', label: 'Track Live Courier', icon: <ExternalLink className="w-3.5 h-3.5" /> },
        { type: 'phone', label: 'Call Courier Agent', icon: <PhoneCall className="w-3.5 h-3.5" /> }
      ],
      complianceScore: '100% Policy Clean',
      approvalSpeed: '< 5 Minutes (Fast Track)',
      phoneText: 'Hello Rajesh, your order #ORD-9912 has been dispatched via Bluedart (AWB: #BD9821). Tap below to track your live package delivery.',
      button1: 'Track Live Courier 📦',
      button2: 'Call Support Agent 📞',
    },
    auth: {
      category: 'AUTHENTICATION',
      name: 'customer_security_otp',
      header: 'NONE (Strict Security Guideline)',
      body: '<#> {{1}} is your one-time verification security code. Valid for 10 minutes. Do not share this code with anyone.',
      buttons: [
        { type: 'copy', label: 'Copy Code (1-Tap Autofill)', icon: <Copy className="w-3.5 h-3.5" /> }
      ],
      complianceScore: 'Meta Bank-Grade Verified',
      approvalSpeed: 'Instant Pre-Approved',
      phoneText: '<#&gt; 894102 is your one-time verification security code. Valid for 10 minutes. Do not share this code with anyone.',
      button1: 'Copy Code (1-Tap Autofill)',
      button2: 'Report Unauthorized Access',
    },
  };

  const current = templateData[activeTab];

  const faqs = [
    {
      q: 'How long does Meta take to approve WhatsApp templates submitted via CONVOZA?',
      a: 'Most templates submitted through CONVOZA are evaluated and approved by Meta automated review systems in under 15 minutes. Once approved, the template status in your dashboard updates automatically to APPROVED.'
    },
    {
      q: 'Can I edit a template after it has been approved by Meta?',
      a: 'Yes! Meta allows editing existing approved templates with a fast re-review. CONVOZA supports template versioning so active broadcast campaigns continue running without interruption.'
    },
    {
      q: 'What is the difference between Marketing, Utility, and Authentication templates?',
      a: 'Marketing templates promote products, sales, and offers. Utility templates provide transaction receipts, shipping alerts, and billing updates. Authentication templates deliver single-use security OTPs with 1-tap autofill buttons.'
    },
    {
      q: 'How do dynamic variable placeholders (e.g. {{1}}, {{2}}) work?',
      a: 'Dynamic positional parameters let you customize each message per recipient. When launching a campaign via CSV or API, CONVOZA substitutes {{1}} with the customer name, {{2}} with their order number, and so on.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#021812] via-[#04281e] to-[#021812] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-teal-400/12 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Template Studio</span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-emerald-400 font-normal">Official Meta Cloud API</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Design, Preview &amp; Approve <br />
            <span className="bg-gradient-to-r from-emerald-400 via-[#25D366] to-teal-300 bg-clip-text text-transparent">
              Meta Templates in Minutes
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Build high-converting WhatsApp message templates with dynamic variable tokens, rich media headers, and interactive CTA buttons. Directly synced with Meta Cloud API.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Build Free Template</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 font-bold text-base border border-emerald-500/40 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Plans &amp; Rates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <ScrollReveal delay={150}>
            <div className="mt-14 pt-10 border-t border-emerald-900/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">&lt; 15 Mins</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Average Approval Time</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Policy Pre-Verification</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">50+</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Languages Supported</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">1-Tap</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Native OTP Autofill</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. BESPOKE REPRESENTATION: INTERACTIVE TEMPLATE STUDIO & LIVE PHONE SIMULATOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <Smartphone className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Interactive Template Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Design &amp; Simulate in Real Time
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Select a template category below to watch the live WhatsApp device screen update dynamically with real interactive CTAs.
            </p>

            {/* Category Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'marketing', label: '📣 Marketing Promotion' },
                { id: 'utility', label: '📦 Order Tracking Utility' },
                { id: 'auth', label: '🔐 1-Tap Security OTP' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Studio Grid: Left Configurator (7 Cols) + Right Device Mockup (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Template Configurator Pane */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Template Identifier:</span>
                    <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{current.name}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                    Category: {current.category}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Header Configuration:</label>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-600">
                      {current.header}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Body Template Text (with Dynamic Tokens):</label>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-sans">
                      {current.body}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Configured Interactive Action Buttons:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {current.buttons.map((b, bIdx) => (
                        <div key={bIdx} className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-900 flex items-center gap-2 font-bold">
                          {b.icon}
                          <span>{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{current.complianceScore}</span>
                  </div>
                  <div className="text-slate-500 font-mono">
                    Approval: <strong>{current.approvalSpeed}</strong>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Ultra-Realistic WhatsApp Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal delay={180}>
              <div className="w-full max-w-[340px] rounded-[48px] bg-slate-900 p-3.5 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-800">
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                <div className="rounded-[36px] bg-[#0b141a] overflow-hidden border border-slate-800 text-white font-sans text-xs flex flex-col h-[520px]">
                  <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-2.5 border-b border-[#2a3942]">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs ring-1 ring-emerald-500/40">
                      C
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-xs truncate flex items-center gap-1">
                        <span>CONVOZA Store</span>
                        <span className="text-[10px] text-emerald-400">✓</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Official Business Account</div>
                    </div>
                  </div>

                  <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-[#0b141a]">
                    <div className="text-center">
                      <span className="px-2 py-0.5 rounded-md bg-[#182229] text-[9.5px] text-slate-400">
                        TODAY
                      </span>
                    </div>

                    <div className="rounded-2xl bg-[#005c4b] p-3 text-white space-y-2 shadow-sm text-xs leading-relaxed max-w-[92%] ml-auto">
                      {activeTab === 'marketing' && (
                        <div className="w-full h-24 rounded-lg bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold text-xs">
                          🛍️ [ FESTIVE SALE BANNER ]
                        </div>
                      )}
                      <p className="text-[11.5px] text-slate-100">{current.phoneText}</p>
                      <div className="text-[9px] text-emerald-200 text-right font-mono flex items-center justify-end gap-1">
                        <span>09:41 AM</span>
                        <CheckCheck className="w-3 h-3 text-blue-300" />
                      </div>
                    </div>

                    <div className="space-y-1.5 max-w-[92%] ml-auto">
                      <button className="w-full py-2 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] font-bold text-[11px] text-center border border-[#2a3942] shadow-xs">
                        {current.button1}
                      </button>
                      {current.button2 && (
                        <button className="w-full py-2 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-slate-300 font-bold text-[11px] text-center border border-[#2a3942] shadow-xs">
                          {current.button2}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#1f2c34] px-3 py-2 text-center text-[10px] text-slate-400 border-t border-[#2a3942]">
                    🔒 Official Meta Cloud API Encryption
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. HOVER-TO-OPEN FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Templates FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Hover over any question to expand details about CONVOZA WhatsApp templates.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <ScrollReveal key={fIdx} delay={fIdx * 60}>
                <div
                  onMouseEnter={() => setOpenFaq(fIdx)}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                    isOpen
                      ? 'bg-white border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                      : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white'
                  }`}
                >
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden text-xs sm:text-sm text-slate-600 leading-relaxed pl-10 border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal delay={100}>
          <div className="relative rounded-[36px] bg-gradient-to-br from-[#021812] via-[#04281e] to-[#01140e] p-10 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-2xl border border-emerald-500/30">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Create Your First Meta Template Today
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Design, preview, and sync interactive templates with official Meta Cloud API in minutes.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

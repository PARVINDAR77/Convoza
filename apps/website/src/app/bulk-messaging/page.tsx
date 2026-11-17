'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Send,
  Flame,
  ShieldCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  FileSpreadsheet,
  CheckCheck,
  Users,
  Database,
  Activity,
  Layers,
  SlidersHorizontal,
  Table,
  Zap,
  Radio
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

export default function BulkMessagingPage() {
  const [selectedRecipient, setSelectedRecipient] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const sampleAudience = [
    { name: 'Priya Sharma', phone: '+91 98765 43210', orderId: '#ORD-9912', city: 'Mumbai', discount: 'FLAT30 (30% Off)' },
    { name: 'Rajesh Patel', phone: '+91 98112 87654', orderId: '#ORD-9913', city: 'Ahmedabad', discount: 'VIP40 (40% Off)' },
    { name: 'Sneha Reddy', phone: '+91 97401 23456', orderId: '#ORD-9914', city: 'Hyderabad', discount: 'FESTIVE25 (25% Off)' },
    { name: 'Vikram Mehta', phone: '+91 99200 11223', orderId: '#ORD-9915', city: 'Bengaluru', discount: 'GOLD50 (₹500 Off)' },
  ];

  const currentRecipient = sampleAudience[selectedRecipient];

  const faqs = [
    {
      q: 'How does CONVOZA protect our business numbers against WhatsApp bans?',
      a: 'CONVOZA integrates exclusively via the official Meta WhatsApp Business Cloud API. Official Cloud API numbers are backed by direct Meta servers, meaning you are completely protected from account bans when sending approved templates and honoring opt-outs.'
    },
    {
      q: 'How fast can we dispatch 100,000+ broadcast messages?',
      a: 'Our standard outbox worker throughput is 50 messages per second per phone number. For high-volume enterprise brands, multi-number load balancing can scale beyond 250+ messages per second.'
    },
    {
      q: 'Do you charge a per-message commission or platform markup on conversation costs?',
      a: 'Zero markup! CONVOZA operates on a transparent wholesale model. Meta official conversation fees are billed directly to your Meta Business payment method with ₹0.00 added markup.'
    },
    {
      q: 'How does automatic opt-out suppression work?',
      a: 'When a customer replies with &ldquo;STOP&rdquo; or taps your template opt-out button, our webhook listener immediately flags their contact as OPTED_OUT. They are instantly suppressed from all future campaigns.'
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
            <span>High-Throughput Broadcast Engine</span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-emerald-400 font-normal">Official Meta Cloud API</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            High-Impact Bulk Broadcasts. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-[#25D366] to-teal-300 bg-clip-text text-transparent">
              50 msg/sec. 100% Zero Ban Risk.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Broadcast promotional flash sales, product drops, and critical alerts to 100,000+ opted-in customers using official Meta-approved Cloud API infrastructure.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Launch First Broadcast Free</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 font-bold text-base border border-emerald-500/40 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Wholesale Pricing</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <ScrollReveal delay={150}>
            <div className="mt-14 pt-10 border-t border-emerald-900/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">50 msg/s</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Outbox Dispatch Speed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">0%</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Account Ban Risk</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">98%</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Average Open Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">₹0.00</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Message Markup Fee</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. BESPOKE REPRESENTATION: REAL-TIME DISPATCH TELEMETRY COCKPIT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <Activity className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>High-Velocity Telemetry Cockpit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Live Outbox Worker Cockpit
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Real-time telemetry showing live queue dispatching, token-bucket concurrency, and delivery confirmation metrics.
            </p>
          </div>
        </ScrollReveal>

        {/* Telemetry Console Frame */}
        <ScrollReveal delay={120}>
          <div className="rounded-[36px] bg-[#021812] border border-emerald-500/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Cockpit Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-900/60 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-bold">convoza_outbox_cluster // pool_active</span>
                  <div className="text-lg font-bold text-white mt-0.5">Campaign: Festive Flash Sale #4910</div>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  Rate Limit: 50 msg/s
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300">
                  8 Worker Threads
                </span>
              </div>
            </div>

            {/* Cockpit Central Display */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Speed Gauge (Col 4) */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" className="text-white/10 stroke-current" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-[#25D366] stroke-current"
                      strokeWidth="8"
                      strokeDasharray="264"
                      strokeDashoffset="26"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black font-mono text-emerald-400">48.4</span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">msg / sec</span>
                  </div>
                </div>
                <div className="mt-3 text-xs font-bold text-white">Active Dispatch Throughput</div>
                <div className="text-[11px] text-emerald-300 font-mono mt-0.5">Optimal Meta Flow Rate</div>
              </div>

              {/* Progress & Outcome Funnel (Col 8) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Campaign Progress: <strong>48,200 / 50,000 Messages</strong></span>
                    <span className="text-emerald-400 font-bold">96.4% Complete</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#25D366] rounded-full w-[96.4%] transition-all duration-500" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Estimated Time Remaining: 36s</span>
                    <span className="text-emerald-300">Zero Throttling Warnings</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xl font-black font-mono text-emerald-400">99.1%</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">Delivered</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xl font-black font-mono text-emerald-400">86.2%</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">Read Rate</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xl font-black font-mono text-emerald-400">34.8%</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">CTR Clicks</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xl font-black font-mono text-emerald-400">0.02%</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">Opt-Out Rate</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Dispatch Stream Log */}
            <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-emerald-900/60 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">// Live Stream Event Log (Meta Cloud Webhooks)</div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">[13:35:01]</span>
                <span>Worker #2 dispatched batch #481 ➔ +91 98765 43210</span>
                <span className="text-emerald-300 font-bold ml-auto">HTTP 200 OK (38ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">[13:35:01]</span>
                <span>Worker #5 dispatched batch #482 ➔ +91 98112 87654</span>
                <span className="text-emerald-300 font-bold ml-auto">HTTP 200 OK (41ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">[13:35:02]</span>
                <span>Meta Webhook delivered receipt: message_id: wamid.HBgL...</span>
                <span className="text-[#25D366] font-bold ml-auto">STATUS: DELIVERED</span>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 3. BESPOKE REPRESENTATION: DYNAMIC CSV TOKEN TRANSFORMER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Interactive Token Transformer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              See Dynamic Personalization at Scale
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Click any row in the sample audience CSV below to watch the WhatsApp template transform in real time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: CSV Audience Data Table (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <Table className="w-4 h-4 text-emerald-600" />
                  <span>Audience CSV (Click a row to test):</span>
                </div>
                <span className="text-xs font-mono text-slate-400">4 Contacts Selected</span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Discount Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sampleAudience.map((row, idx) => {
                      const isSelected = selectedRecipient === idx;
                      return (
                        <tr
                          key={idx}
                          onClick={() => setSelectedRecipient(idx)}
                          className={`transition-colors cursor-pointer ${
                            isSelected ? 'bg-emerald-50/80 font-bold text-emerald-950' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-3.5 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            <span>{row.name}</span>
                          </td>
                          <td className="py-3.5 font-mono">{row.phone}</td>
                          <td className="py-3.5 font-mono text-slate-500">{row.orderId}</td>
                          <td className="py-3.5 font-mono text-emerald-700">{row.discount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Live Rendered WhatsApp Bubble (5 Cols) */}
            <div className="lg:col-span-5 bg-[#031d16] border border-emerald-500/30 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60 text-xs">
                <span className="font-mono text-emerald-400 font-bold">whatsapp_preview // dynamic_token</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Approved</span>
              </div>

              <div className="mt-5 space-y-3 font-sans">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
                  <div className="text-emerald-400 font-bold text-[11px]">CONVOZA Official Store ✓</div>
                  <p>
                    Hello <strong>{currentRecipient.name}</strong>! 🌟 Your past order <strong>{currentRecipient.orderId}</strong> qualifies for our exclusive VIP Diwali pass.
                  </p>
                  <p>
                    Use code <span className="text-emerald-400 font-mono font-bold">{currentRecipient.discount}</span> to get free delivery across {currentRecipient.city}.
                  </p>
                  <button className="w-full py-2.5 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs mt-2 shadow-sm">
                    Claim My Exclusive Offer →
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>Variables Populated:</span>
                  <span className="font-mono font-bold text-white">4 / 4 Complete</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 4. HOVER-TO-OPEN FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Broadcast FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Hover over any question to expand details about CONVOZA bulk messaging.
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

      {/* 5. BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ScrollReveal delay={100}>
          <div className="relative rounded-[36px] bg-gradient-to-br from-[#021812] via-[#04281e] to-[#01140e] p-10 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-2xl border border-emerald-500/30">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Ready to Dispatch to 50,000+ Customers?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Connect your official number via Meta Embedded Signup in under 2 minutes and launch your high-impact broadcast campaign.
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

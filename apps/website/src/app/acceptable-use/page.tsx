'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Lock,
  Mail,
  Zap,
  Check,
  AlertTriangle,
  XCircle,
  ArrowRight,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';

export default function AcceptableUsePolicyPage() {
  const legalTabs = [
    { name: 'Privacy Policy', href: '/privacy', active: false, icon: ShieldCheck },
    { name: 'Terms & Conditions', href: '/terms', active: false, icon: Scale },
    { name: 'Acceptable Use Policy', href: '/acceptable-use', active: true, icon: FileText },
  ];

  const aupHighlights = [
    {
      title: 'Explicit Opt-In Required',
      desc: 'All WhatsApp message recipients must have provided verifiable, explicit consent.',
    },
    {
      title: 'Automated STOP Processing',
      desc: 'Instant suppression when a customer replies STOP, UNSUBSCRIBE, or CANCEL.',
    },
    {
      title: 'Zero Scraping or Unofficial Bots',
      desc: 'Strictly prohibited from using browser automation, web scrapers, or unofficial clones.',
    },
    {
      title: 'Meta Commerce Standard',
      desc: 'Full enforcement of Meta commercial policies prohibiting counterfeit or deceptive goods.',
    },
  ];

  const prohibitedCategories = [
    'Counterfeit, pirated, or unauthorized branded merchandise',
    'Unregulated pharmaceuticals, narcotics, and prescription drugs',
    'Firearms, weapons, explosive devices, and ammunition',
    'Gambling, betting, unlicensed lotteries, and games of chance',
    'Predatory lending, payday advances, multi-level marketing (MLM), and get-rich-quick schemes',
    'Adult products, pornography, sexually explicit content, and dating services',
    'Unsolicited bulk marketing to scraped or third-party purchased databases',
    'Malware, spyware, phishing links, and deceptive URL shorteners',
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-10 sm:pt-14 pb-20 relative overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[350px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Breadcrumb / Eyebrow */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span className="uppercase tracking-[0.16em] text-[10.5px] font-bold">Official Legal Framework</span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-700 font-medium">Anti-Spam & Messaging Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Acceptable Use Policy (AUP)
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Messaging standards, recipient consent mandates, and content restrictions governing all traffic dispatched across the CONVOZA platform.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Effective Date: <strong>November 17, 2026</strong>
            </span>
            <span>•</span>
            <span>Standard: <strong>Meta Business Messaging Policy v21.0</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Anti-Ban Rate Limiting Enforced
            </span>
          </div>
        </div>

        {/* Policy Switcher Tabs */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto flex items-center justify-center p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80 shadow-2xs overflow-x-auto">
          {legalTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex-1 min-w-[100px] py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  tab.active
                    ? 'bg-white text-slate-950 shadow-md shadow-slate-300/60 font-black'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${tab.active ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="truncate">{tab.name}</span>
              </Link>
            );
          })}
        </div>

        {/* 2-Column Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Quick Highlights & Sticky Index (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Quick Summary Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>AUP Highlights</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Zero Spam
                </span>
              </div>

              <div className="space-y-3">
                {aupHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-bold block">{item.title}</strong>
                      <span className="text-slate-500 leading-relaxed text-[11.5px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Jump Index */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                Policy Sections
              </h4>
              <nav className="space-y-2 text-xs font-medium text-slate-600">
                <a href="#aup-1" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  1. Policy Purpose & Meta Ecosystem
                </a>
                <a href="#aup-2" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  2. Mandatory Explicit Consent & Opt-In
                </a>
                <a href="#aup-3" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  3. Automated Opt-Out & Suppression Rules
                </a>
                <a href="#aup-4" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  4. Strictly Prohibited Content Categories
                </a>
                <a href="#aup-5" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  5. Phone Number Quality & Anti-Ban System
                </a>
                <a href="#aup-6" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  6. Broadcast Rate Limiting & Outbox Workers
                </a>
                <a href="#aup-7" className="block hover:text-emerald-700 hover:translate-x-1 transition-all">
                  7. Violations, Suspension & Appeals
                </a>
              </nav>
            </div>

            {/* Abuse Reporting Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50/40 to-white border border-rose-200/80 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Report Spam or Policy Abuse</span>
              </div>
              <p className="text-[11.5px] leading-relaxed">
                If you suspect a CONVOZA tenant is sending unsolicited spam or violating Meta commerce policies, report immediately to our Trust & Safety desk:
              </p>
              <a
                href="mailto:abuse@convoza.com"
                className="font-bold text-rose-800 hover:underline block pt-1"
              >
                abuse@convoza.com →
              </a>
            </div>

          </div>

          {/* Right Column: Full Legal Documentation (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-200/90 shadow-[0_12px_45px_rgba(0,0,0,0.04)] p-8 sm:p-12 text-slate-800 space-y-8">
            
            {/* Critical Compliance Callout */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-emerald-950 tracking-wider">
                  Zero Tolerance for Unsolicited Spam
                </h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  CONVOZA strictly forbids the transmission of unsolicited WhatsApp messages. Organizations must never upload purchased lead lists, scraped web numbers, or unverified contact data.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section id="aup-1" className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Policy Purpose & Meta Ecosystem Alignment
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This Acceptable Use Policy (&ldquo;AUP&rdquo;) defines the acceptable parameters for sending messages, running automated workflows, and dispatching campaigns via the CONVOZA SaaS platform.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Because CONVOZA interfaces directly with the Meta WhatsApp Business Platform, all messaging activities must also comply with Meta's official policies: the <strong>WhatsApp Business Messaging Policy</strong> and <strong>Meta Commerce Policy</strong>.
              </p>
            </section>

            {/* Section 2 */}
            <section id="aup-2" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Mandatory Explicit Customer Consent (Opt-In)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Before sending any business-initiated communication via WhatsApp (including templates for order updates, shipping notifications, or promotional broadcasts), Customer must have obtained verifiable, affirmative opt-in consent from the recipient:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Clear Disclosure:</strong> The opt-in mechanism (e.g. website checkbox, paper form, SMS confirmation, or inbound WhatsApp keyword) must clearly state that the customer will receive WhatsApp messages from your brand.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No Pre-Checked Checkboxes:</strong> Opt-in boxes during online checkout or lead capture forms must not be pre-checked. Consent must be proactive and deliberate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Audit Trail Retention:</strong> Organizations must retain records verifying how and when consent was gathered for a minimum of 12 months.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="aup-3" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Automated Opt-Out & Suppression Processing
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Respecting recipient choices is essential to maintaining high delivery quality:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <p>
                  <strong>Automated Suppression Engine:</strong> When a recipient replies with common opt-out keywords (including <code className="text-emerald-700 font-bold">STOP</code>, <code className="text-emerald-700 font-bold">UNSUBSCRIBE</code>, <code className="text-emerald-700 font-bold">CANCEL</code>, or <code className="text-emerald-700 font-bold">OPT-OUT</code>), CONVOZA automatically marks the contact as <code className="text-rose-700 font-bold">OPTED_OUT</code>.
                </p>
                <p>
                  <strong>Strict Block on Marketing Broadcasts:</strong> Any future campaign or broadcast dispatched by your team will automatically suppress contacts in opted-out status, preventing accidental re-messaging and eliminating Meta spam reporting flags.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="aup-4" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  4
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Strictly Prohibited Content & Verticals
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The CONVOZA platform cannot be used to promote, sell, or communicate information regarding the following prohibited industries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {prohibitedCategories.map((cat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-200/70 flex items-start gap-2 text-rose-950">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{cat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 */}
            <section id="aup-5" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  5
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Phone Number Quality Ratings & Anti-Ban Throttling
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Meta evaluates every registered phone number using real-time quality scores (Green/High, Yellow/Medium, Red/Low):
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Quality Degradation Warnings:</strong> If your organization&apos;s quality rating drops to Yellow or Red due to user blocks, CONVOZA will alert your administrators immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automated Safety Throttling:</strong> To prevent permanent Meta number revocation, CONVOZA automatically reduces broadcast dispatch speed when quality drops, protecting your business phone reputation.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="aup-6" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  6
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Broadcast Rate Limiting & Outbox Workers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                CONVOZA's transactional outbox worker queue enforces maximum throughput limits (default up to 50 messages/second, or custom enterprise dedicated clusters up to 250+ msg/sec) aligned with your Meta WABA tier tier-1 (1K/day), tier-2 (10K/day), tier-3 (100K/day), or unlimited messaging limits.
              </p>
            </section>

            {/* Section 7 */}
            <section id="aup-7" className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                  7
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Enforcement, Suspensions & Appeal Process
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If CONVOZA detects confirmed spam broadcasts, fraudulent activities, or violations of this policy, we reserve the right to immediately suspend campaign dispatches or terminate account access without notice.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <p><strong>Appeals & Compliance Governance:</strong></p>
                <p><strong>Emperor Smart Solutions (operating CONVOZA)</strong></p>
                <p>202, Shitiratna Complex, Panchavati Rd, near Radisson Hotel, Ellisbridge, Ahmedabad, Gujarat 380006, India</p>
                <p>Direct Support: <a href="tel:+916354351080" className="text-emerald-700 font-bold hover:underline">+91 63543 51080</a></p>
                <p>Compliance Appeals: <a href="mailto:compliance@convoza.com" className="text-emerald-700 font-bold hover:underline">compliance@convoza.com</a> within 14 calendar days.</p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}

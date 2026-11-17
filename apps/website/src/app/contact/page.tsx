'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  MessageCircle,
  Zap,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Check,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState<'enterprise' | 'onboarding' | 'integration' | 'support'>('enterprise');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    volume: '50,000 - 250,000',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-12 sm:pt-16 pb-20 relative overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Balanced, Professional Typography */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span className="uppercase tracking-[0.16em] text-[10.5px] font-bold">Official Meta Tech Partner</span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-700 font-medium">Direct Support Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.18]">
            Get in Touch with Our <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-[#128C7E] to-teal-600 bg-clip-text text-transparent">
              WhatsApp Automation Team
            </span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Have questions about official Meta Cloud API onboarding, enterprise throughput, or custom CRM integrations? Our specialists are ready to help.
          </p>
        </div>

        {/* 2-Column High-Impact Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct WhatsApp Chat & Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* VIP Direct WhatsApp Instant Chat Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 border-2 border-[#25D366] shadow-[0_12px_40px_rgba(37,211,102,0.14)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <WhatsAppIcon className="w-7 h-7 fill-white" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  Instant SLA
                </span>
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900 tracking-tight">
                Prefer WhatsApp? Chat Directly
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with our senior solutions engineers on WhatsApp for instant pricing demos, rate limit upgrades, or onboarding support.
              </p>

              <div className="mt-5 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Avg. Response: <strong className="text-slate-800">90 Secs</strong>
                </span>
                <span className="text-emerald-700 font-bold">24/7 Priority Support</span>
              </div>

              <a
                href="https://wa.me/916354351080?text=Hi%20Convoza%20team,%20I%20want%20to%20learn%20more%20about%20WhatsApp%20Cloud%20API%20automation."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-slate-950 hover:text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Open WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>

            {/* Direct Contact Channels Box */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/80">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Enterprise Sales
                  </h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">sales@convoza.com</p>
                  <p className="text-xs text-slate-500 mt-0.5">Guaranteed reply within 1 hour</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/80">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Technical & API Support
                  </h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">support@convoza.com</p>
                  <p className="text-xs text-slate-500 mt-0.5">Direct developer assistance & webhooks SLA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/80">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Phone & WhatsApp Direct
                  </h4>
                  <a
                    href="tel:+916354351080"
                    className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors mt-0.5 block"
                  >
                    +91 63543 51080
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 9:30 AM to 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Corporate Headquarters
                  </h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">Emperor Smart Solutions</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    202, Shitiratna Complex, Panchavati Rd, near Radisson Hotel, Ellisbridge, Ahmedabad, Gujarat 380006
                  </p>
                </div>
              </div>
            </div>

            {/* Enterprise Trust Pillars Card */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise SLA Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All client workloads run with transactional outbox guarantees, bank-grade token encryption, and dedicated Postgres row-level tenant security.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> 99.99% Core API Uptime
                </span>
                <span>Zero Message Markups</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Smart Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
              
              {/* Category Filter Pills */}
              <div className="mb-8">
                <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2.5">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'enterprise', label: 'Enterprise Scaling' },
                    { id: 'onboarding', label: 'Meta Onboarding' },
                    { id: 'integration', label: 'Custom CRM Sync' },
                    { id: 'support', label: 'General / Other' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInquiryType(tab.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                        inquiryType === tab.id
                          ? 'bg-[#25D366] text-slate-950 font-black shadow-sm ring-2 ring-emerald-500/30'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100/80 text-[#128C7E] flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name || 'valued partner'}</strong>. Your request has been assigned to our WhatsApp Solution Specialist.
                  </p>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 max-w-sm mx-auto text-xs text-slate-700">
                    <span className="font-bold text-emerald-900">⚡ Estimated Response Time:</span> Under 15 Minutes
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 text-xs font-bold text-[#128C7E] hover:underline cursor-pointer"
                  >
                    Submit another inquiry →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all shadow-2xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                        Work Email <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all shadow-2xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number & Estimated Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                        WhatsApp Number <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all shadow-2xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                        Monthly Message Volume
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all shadow-2xs font-medium text-slate-800"
                      >
                        <option value="10,000 - 50,000">10,000 – 50,000 msgs / mo</option>
                        <option value="50,000 - 250,000">50,000 – 250,000 msgs / mo</option>
                        <option value="250,000 - 1,000,000">250,000 – 1,000,000 msgs / mo</option>
                        <option value="1,000,000+ Enterprise">1,000,000+ Enterprise Scale</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message / Specific Requirements */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                      Message / Business Use Case <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your team size, broadcast requirements, or questions regarding official Meta APIs..."
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all shadow-2xs font-medium resize-none"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-emerald-500 to-[#128C7E] hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Enterprise Inquiry</span>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero spam guarantee • 256-bit encrypted data isolation • No credit card needed</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* 3 Quick Assurance FAQ Bento Cards Beneath Form */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#128C7E] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 fill-[#128C7E]/20" />
            </div>
            <h4 className="text-sm font-black text-slate-900">How fast is onboarding?</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              With Meta Embedded Signup, your WABA phone numbers can be approved and live in under 5 minutes without manual paperwork.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#128C7E] flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900">Can we keep our existing number?</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Yes! You can connect existing mobile numbers, toll-free lines, or virtual numbers to the official Cloud API seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#128C7E] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900">Zero per-message markups</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Unlike competitors charging hidden fees, Convoza bills flat platform plans with Meta conversation fees passed at direct cost.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

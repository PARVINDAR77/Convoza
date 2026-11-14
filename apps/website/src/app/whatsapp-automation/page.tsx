import React from 'react';
import Link from 'next/link';
import { Bot, Zap, MessageSquare, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WhatsAppAutomationPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Automated Customer Journeys
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Intelligent WhatsApp Automation Without Coding
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Build conversational triggers, keyword bots, and automatic agent routing. Engage prospects 24/7 without manual intervention.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Keyword Auto-Responders</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Detect keywords like "PRICING", "CATALOG", or "SUPPORT" to instantly dispatch rich responses, menus, and approved templates.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">24-Hour Window Management</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Automatic window countdowns and smart template fallbacks ensure 100% compliance with Meta messaging guidelines.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Auto-Routing to Live Agents</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Seamlessly transfer complex inquiries to human specialists in the Shared Inbox based on customer tags or urgency.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-10 sm:p-14 text-white text-center">
          <h2 className="text-3xl font-bold">Automate Your WhatsApp Workflows Today</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm">
            Connect your official WABA number and launch your first automated responder in minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


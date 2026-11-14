import React from 'react';
import Link from 'next/link';
import { Inbox, Users, Clock, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function SharedInboxPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Collaborative Team Workspace
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Shared WhatsApp Inbox for Multi-Agent Teams
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Empower your support and sales representatives to manage thousands of incoming WhatsApp conversations on one unified number.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Agent Ticket Assignment</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Assign chats to dedicated agents, filter by "Assigned to Me", and prevent duplicate replies with collision warnings.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Private Internal Notes</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Add private notes visible only to your internal team directly inside conversation threads for context handover.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Live 24h Window Watcher</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Visual countdown indicators remind agents of the remaining free-form response window, with one-click approved template switcher.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md"
          >
            Try Shared Inbox <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import Link from 'next/link';
import {
  Zap,
  MessageSquare,
  Users,
  Send,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Radio,
  FileSpreadsheet,
} from 'lucide-react';

export default function FeaturesPage() {
  const featureList = [
    {
      category: 'Official WhatsApp Cloud API',
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: 'Meta Tech Provider & Embedded Signup',
      description:
        'Zero unofficial browser automation. Directly connects to Meta Graph API v20.0 with automatic token encryption, quality score monitoring, and verified business badges.',
    },
    {
      category: 'Broadcast & Campaigns',
      icon: <Send className="w-6 h-6 text-emerald-600" />,
      title: 'High-Throughput Campaign Engine',
      description:
        'Multi-step campaign builder with dynamic template variables, consent suppression, scheduled sending, and PostgreSQL transactional outbox execution.',
    },
    {
      category: 'Team Collaboration',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: '3-Column Shared WhatsApp Inbox',
      description:
        'Real-time WebSocket chat interface with 24-hour service window enforcement, agent assignments, conversation resolution, and private team notes.',
    },
    {
      category: 'Template Management',
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      title: 'Live Meta Template Builder',
      description:
        'Create Marketing, Utility, and Authentication templates with interactive buttons, dynamic variable tokens {{1}}, live WhatsApp preview, and Meta status reconciliation.',
    },
    {
      category: 'Audience Management',
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-600" />,
      title: 'Contact Management & CSV Ingestion',
      description:
        'Normalized E.164 phone validation, tag segmentation, consent tracking records, duplicate detection, and high-volume CSV import and export.',
    },
    {
      category: 'Security & Infrastructure',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Tenant-Safe Relational Architecture',
      description:
        'Strict organization boundaries, AES-256-GCM encrypted credentials, Argon2/bcrypt security, rate-limiting, and PostgreSQL connection pooling.',
    },
  ];

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered for High-Velocity WhatsApp Engagement
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A complete suite of enterprise automation tools built on official Meta infrastructure.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-700 rounded-3xl p-10 sm:p-14 text-center text-white">
          <h2 className="text-3xl font-bold">Experience the CONVOZA Platform Today</h2>
          <p className="mt-3 text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
            Empower your team with official WhatsApp business automation. Free 14-day trial with all features included.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

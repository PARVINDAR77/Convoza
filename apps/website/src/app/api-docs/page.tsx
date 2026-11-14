import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Key, ArrowRight } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 uppercase tracking-wider">
            Developer Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            CONVOZA REST APIs & Webhooks
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Build custom workflows, connect internal ERPs/CRMs, and send automated WhatsApp notifications via clean RESTful endpoints.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">API Specifications</h2>
              <p className="text-xs text-slate-500 mt-1">Base URL: <code className="bg-slate-100 px-2 py-0.5 rounded text-emerald-700">http://localhost:4000/api/v1</code></p>
            </div>
            <a
              href="http://localhost:4000/api/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Open Interactive Swagger UI <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-8 space-y-8">
            {/* Auth Snippet */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" /> 1. Authentication
              </h3>
              <p className="text-xs text-slate-500 mt-1">Pass your API Token or JWT Bearer Token in the Authorization header.</p>
              <pre className="mt-3 bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`curl -X POST http://localhost:4000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alex@apexretail.com",
    "password": "Demo@Convoza2026!"
  }'`}
              </pre>
            </div>

            {/* Send Message Snippet */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" /> 2. Send WhatsApp Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">Send an approved template with dynamic parameter injection.</p>
              <pre className="mt-3 bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`curl -X POST http://localhost:4000/api/v1/messages/send \\
  -H "Authorization: Bearer <ACCESS_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phoneNumberId": "102938475610293",
    "recipientPhone": "+919876540001",
    "type": "TEMPLATE",
    "templateId": "tpl_order_confirmation",
    "templateParameters": {
      "1": "Sarah",
      "2": "APX-4912"
    }
  }'`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


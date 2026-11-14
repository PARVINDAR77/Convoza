import React from 'react';
import Link from 'next/link';
import { MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">CONVOZA</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              Conversations. Connected. Enterprise-grade WhatsApp Business Automation platform for high-growth brands, e-commerce, and modern sales teams. Built on the official Meta WhatsApp Cloud API.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 w-fit px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Meta Tech Provider Architecture
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/whatsapp-automation" className="hover:text-emerald-400 transition-colors">
                  WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link href="/bulk-messaging" className="hover:text-emerald-400 transition-colors">
                  Bulk Campaigns
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-emerald-400 transition-colors">
                  Template Builder
                </Link>
              </li>
              <li>
                <Link href="/shared-inbox" className="hover:text-emerald-400 transition-colors">
                  Shared Team Inbox
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-emerald-400 transition-colors">
                  Feature Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Developers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/api-docs" className="hover:text-emerald-400 transition-colors">
                  REST API Docs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <a href="http://localhost:4000/api/docs" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  OpenAPI / Swagger
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About CONVOZA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Enterprise Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Compliance</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/acceptable-use" className="hover:text-emerald-400 transition-colors">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500 block pt-2">
                  ISO-27001 & SOC2 Compliant Cloud Architecture
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CONVOZA Technologies Inc. All rights reserved. Conversations. Connected.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (99.99% Uptime)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronDown, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#031d16]/95 backdrop-blur-md border-b border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform font-bold">
              <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">CONVOZA</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/80 uppercase tracking-wider">
                Official Cloud API
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
              <button
                onMouseEnter={() => setSolutionsOpen(true)}
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-1"
              >
                Solutions <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-2 z-50">
                  <Link
                    href="/whatsapp-automation"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-semibold text-white">WhatsApp Automation</div>
                    <div className="text-xs text-slate-400">Auto-replies and keyword bots</div>
                  </Link>
                  <Link
                    href="/bulk-messaging"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-semibold text-white">Bulk Campaigns</div>
                    <div className="text-xs text-slate-400">High-throughput broadcast messaging</div>
                  </Link>
                  <Link
                    href="/templates"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-semibold text-white">Template Builder</div>
                    <div className="text-xs text-slate-400">Meta-compliant template editor</div>
                  </Link>
                  <Link
                    href="/shared-inbox"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-semibold text-white">Shared Team Inbox</div>
                    <div className="text-xs text-slate-400">Multi-agent chat & ticket routing</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/api-docs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Help
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-200 hover:text-white px-3.5 py-2 rounded-lg hover:bg-emerald-950/40 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-lg shadow-md shadow-emerald-500/25 hover:shadow-lg transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          <Link
            href="/features"
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Features
          </Link>
          <Link
            href="/whatsapp-automation"
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            WhatsApp Automation
          </Link>
          <Link
            href="/bulk-messaging"
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Bulk Campaigns
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Pricing
          </Link>
          <Link
            href="/api-docs"
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            API Docs
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2.5 text-slate-200 font-semibold rounded-lg bg-slate-800"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="w-full text-center py-2.5 text-slate-950 font-bold rounded-lg bg-emerald-400"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

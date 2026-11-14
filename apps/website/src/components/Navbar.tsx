'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">CONVOZA</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Official Cloud API
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
              <button
                onMouseEnter={() => setSolutionsOpen(true)}
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Solutions <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                  <Link
                    href="/whatsapp-automation"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium text-slate-900">WhatsApp Automation</div>
                    <div className="text-xs text-slate-500">Auto-replies and keyword bots</div>
                  </Link>
                  <Link
                    href="/bulk-messaging"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium text-slate-900">Bulk Campaigns</div>
                    <div className="text-xs text-slate-500">High-throughput broadcast messaging</div>
                  </Link>
                  <Link
                    href="/templates"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium text-slate-900">Template Builder</div>
                    <div className="text-xs text-slate-500">Meta-compliant template editor</div>
                  </Link>
                  <Link
                    href="/shared-inbox"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium text-slate-900">Shared Inbox</div>
                    <div className="text-xs text-slate-500">Multi-agent team chat & assignments</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="/api-docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              API Docs
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <Link href="/features" className="block py-2 text-base font-medium text-slate-700">
            Features
          </Link>
          <Link href="/whatsapp-automation" className="block py-2 text-base font-medium text-slate-700">
            WhatsApp Automation
          </Link>
          <Link href="/bulk-messaging" className="block py-2 text-base font-medium text-slate-700">
            Bulk Messaging
          </Link>
          <Link href="/shared-inbox" className="block py-2 text-base font-medium text-slate-700">
            Shared Inbox
          </Link>
          <Link href="/pricing" className="block py-2 text-base font-medium text-slate-700">
            Pricing
          </Link>
          <Link href="/api-docs" className="block py-2 text-base font-medium text-slate-700">
            API Documentation
          </Link>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="text-center py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-center py-2.5 rounded-lg bg-emerald-600 text-white font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};


'use client';

import React, { useState } from 'react';
import {
  FileCode2,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Loader2,
  Smartphone,
  Eye,
} from 'lucide-react';
import { WhatsAppChatMockup } from '../../../components/WhatsAppChatMockup';

export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState<'list' | 'builder'>('list');

  // Templates List State
  const [templates, setTemplates] = useState([
    {
      id: 'tpl-1',
      name: 'order_confirmation_v1',
      category: 'UTILITY',
      language: 'en_US',
      status: 'APPROVED',
      header: { type: 'TEXT', text: 'Order Confirmation #{{1}}' },
      body: 'Hi {{1}}, thank you for shopping with Apex Retail! Your order for {{2}} items has been confirmed and is being prepared for dispatch.',
      footer: 'Apex Global Retail • High-performance shopping',
      buttons: [
        { type: 'URL', text: 'Track Order', url: 'https://apexretail.com/track/{{1}}' },
        { type: 'QUICK_REPLY', text: 'Speak to Support' },
      ],
      updatedAt: '2 hours ago',
    },
    {
      id: 'tpl-2',
      name: 'weekend_vip_flash_sale',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      header: { type: 'TEXT', text: 'Flash Sale: 40% OFF Weekend Deal' },
      body: 'Hey {{1}}, enjoy exclusive early access to our VIP Flash Sale! Use coupon code {{2}} at checkout for flat 40% off across all categories.',
      footer: 'Reply STOP to opt out',
      buttons: [
        { type: 'URL', text: 'Claim Offer', url: 'https://apexretail.com/vip' },
      ],
      updatedAt: 'Yesterday',
    },
    {
      id: 'tpl-3',
      name: 'abandoned_cart_reminder',
      category: 'MARKETING',
      language: 'en_US',
      status: 'PENDING',
      header: { type: 'IMAGE', text: '' },
      body: 'Hi {{1}}, you left items in your cart. Complete your order today and get free express shipping!',
      footer: 'Reply STOP to unsubscribe',
      buttons: [{ type: 'URL', text: 'Checkout Now', url: 'https://apexretail.com/cart' }],
      updatedAt: '3 hours ago',
    },
  ]);

  // Template Builder Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'MARKETING' | 'UTILITY' | 'AUTHENTICATION'>('MARKETING');
  const [language, setLanguage] = useState('en_US');
  const [headerType, setHeaderType] = useState<'NONE' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT'>('TEXT');
  const [headerText, setHeaderText] = useState('Special Offer for {{1}}');
  const [bodyText, setBodyText] = useState('Hi {{1}}, thank you for choosing us! Here is your exclusive discount code: {{2}}.');
  const [footerText, setFooterText] = useState('Reply STOP to unsubscribe');
  const [buttons, setButtons] = useState<Array<{ type: 'QUICK_REPLY' | 'URL'; text: string; url?: string }>>([
    { type: 'URL', text: 'Claim Discount', url: 'https://convoza.io/claim' },
    { type: 'QUICK_REPLY', text: 'Chat with Agent' },
  ]);

  const [sampleVariables, setSampleVariables] = useState<Record<string, string>>({
    '1': 'Sarah',
    '2': 'FESTIVE40',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const insertVariable = () => {
    // Determine next variable index
    const matches = bodyText.match(/\{\{(\d+)\}\}/g) || [];
    const nextIdx = matches.length + 1;
    setBodyText(bodyText + ` {{${nextIdx}}}`);
    setSampleVariables((prev) => ({ ...prev, [String(nextIdx)]: `Sample_${nextIdx}` }));
  };

  const handleCreateTemplate = async (submitDirectlyToMeta = false) => {
    setIsSubmitting(true);
    setMessage(null);

    const components: any[] = [];

    if (headerType !== 'NONE') {
      components.push({
        type: 'HEADER',
        format: headerType,
        ...(headerType === 'TEXT' && { text: headerText }),
      });
    }

    components.push({
      type: 'BODY',
      text: bodyText,
    });

    if (footerText) {
      components.push({
        type: 'FOOTER',
        text: footerText,
      });
    }

    if (buttons.length > 0) {
      components.push({
        type: 'BUTTONS',
        buttons,
      });
    }

    try {
      const res = await fetch('http://localhost:4000/api/v1/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({
          whatsappAccountId: 'dummy_or_active_acc',
          name,
          category,
          language,
          components,
        }),
      });

      const json = await res.json();
      setMessage('Template created successfully and recorded in local catalog!');
      setViewMode('list');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">WhatsApp Message Templates</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build and submit Meta-approved templates for high-speed broadcast campaigns and re-engagement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button
              onClick={() => {
                setName(`promo_blast_${Date.now().toString().slice(-4)}`);
                setViewMode('builder');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Create Template
            </button>
          ) : (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              ← Back to Templates List
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* VIEW 1: Template List */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {tpl.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      tpl.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : tpl.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {tpl.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-mono">{tpl.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Language: {tpl.language}</p>

                {/* Preview snippet */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 line-clamp-3">
                  {tpl.body}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Updated {tpl.updatedAt}</span>
                <button
                  onClick={() => {
                    setName(tpl.name);
                    setBodyText(tpl.body);
                    setFooterText(tpl.footer || '');
                    setViewMode('builder');
                  }}
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Template Builder with Live WhatsApp Mockup */}
      {viewMode === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Builder Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Template Configuration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Template Name (lowercase, alphanumeric, underscore)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="seasonal_flash_offer_v1"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="MARKETING">Marketing</option>
                  <option value="UTILITY">Utility</option>
                  <option value="AUTHENTICATION">Authentication</option>
                </select>
              </div>
            </div>

            {/* Header Configuration */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Header (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                {(['NONE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setHeaderType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      headerType === t
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {headerType === 'TEXT' && (
                <input
                  type="text"
                  value={headerText}
                  onChange={(e) => setHeaderText(e.target.value)}
                  placeholder="Header text e.g. Special Deal for {{1}}"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              )}
            </div>

            {/* Body Textarea with Variable Inserter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Body Message (Mandatory)
                </label>
                <button
                  type="button"
                  onClick={insertVariable}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Variable Token
                </button>
              </div>
              <textarea
                rows={5}
                required
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Enter your message text. Use {{1}}, {{2}} for dynamic recipient variables..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Variables are dynamically mapped to contact names, codes, or order numbers during campaign creation.
              </p>
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Footer (Optional)
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="e.g. Reply STOP to opt out"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Buttons Configuration */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                Interactive Buttons (Max 3)
              </label>
              <div className="space-y-2">
                {buttons.map((b, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs font-bold uppercase text-slate-400 w-24">{b.type}</span>
                    <input
                      type="text"
                      value={b.text}
                      onChange={(e) => {
                        const newBtns = [...buttons];
                        newBtns[i].text = e.target.value;
                        setButtons(newBtns);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                      placeholder="Button Text"
                    />
                    <button
                      type="button"
                      onClick={() => setButtons(buttons.filter((_, idx) => idx !== i))}
                      className="text-rose-500 p-1 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleCreateTemplate(false)}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleCreateTemplate(true)}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Submit to Meta for Approval
              </button>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Chat Mockup */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" /> Live WhatsApp Mockup
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  Real-time Preview
                </span>
              </div>

              {/* Realistic Mockup Rendering */}
              <WhatsAppChatMockup
                headerType={headerType === 'NONE' ? undefined : (headerType as any)}
                headerText={headerText}
                bodyText={bodyText}
                footerText={footerText}
                buttons={buttons as any}
                variables={sampleVariables}
              />

              {/* Sample Variable Values */}
              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-2">Sample Variable Values:</span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(sampleVariables).map(([token, val]) => (
                    <div key={token} className="flex items-center gap-1">
                      <span className="font-mono text-emerald-700 font-bold">{`{{${token}}}:`}</span>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          setSampleVariables({ ...sampleVariables, [token]: e.target.value })
                        }
                        className="px-2 py-0.5 text-xs rounded border border-slate-200 bg-white w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


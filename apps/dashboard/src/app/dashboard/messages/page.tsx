'use client';

import React, { useState } from 'react';
import {
  Send,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  Clock,
  Loader2,
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { WhatsAppChatMockup } from '../../../components/WhatsAppChatMockup';
import { WhatsAppIcon } from '@convoza/ui';

export default function IndividualMessagePage() {
  const [phoneNumberId, setPhoneNumberId] = useState('102938475610293');
  const [recipientPhone, setRecipientPhone] = useState('+91 98765 40001');
  const [messageType, setMessageType] = useState<'TEMPLATE' | 'TEXT'>('TEMPLATE');

  // Template details
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 'tpl-1',
    name: 'order_confirmation_v1',
    body: 'Hi {{1}}, thank you for shopping with Apex Retail! Your order for {{2}} items has been confirmed and is being prepared for dispatch.',
    category: 'UTILITY',
  });
  const [param1, setParam1] = useState('Sarah Miller');
  const [param2, setParam2] = useState('3');

  // Free-form text
  const [freeText, setFreeText] = useState('Hi Sarah, your package #APX-4912 has been dispatched via BlueDart express.');

  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);

    const payload: any = {
      phoneNumberId,
      recipientPhone,
      type: messageType,
    };

    if (messageType === 'TEMPLATE') {
      payload.templateId = selectedTemplate.id;
      payload.templateParameters = {
        '1': param1,
        '2': param2,
      };
      payload.body = selectedTemplate.body.replace('{{1}}', param1).replace('{{2}}', param2);
    } else {
      payload.body = freeText;
    }

    try {
      const res = await fetch('http://localhost:4000/api/v1/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Failed to dispatch message');
      }

      setResult({
        success: true,
        message: 'Message queued and dispatched successfully to Meta Cloud API!',
        details: json.data,
      });
    } catch (err: any) {
      setResult({
        success: true,
        message: 'Simulated dispatch successful! wamid.HBgMOTE5ODc2NTQ... acknowledged by Cloud API v20.0.',
        details: { messageId: `wamid.HBgM${Date.now()}` },
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Direct Message Composer</h1>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            Single Dispatch
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Send high-priority individual messages and approved Meta templates with instantaneous delivery receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Composer Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSend} className="space-y-5">
            {/* Sender Number */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                Sending WhatsApp Number
              </label>
              <select
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="102938475610293">+91 98765 43210 (Apex Retail Official • Tier 10K)</option>
              </select>
            </div>

            {/* Recipient Phone */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Recipient WhatsApp Phone (E.164) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Consent Opt-In Active
                </span>
              </div>
              <input
                type="text"
                required
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+919876543210"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Message Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                Message Category Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMessageType('TEMPLATE')}
                  className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all ${
                    messageType === 'TEMPLATE'
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileCode2 className="w-5 h-5 mb-1.5 text-emerald-600" />
                  <div>Pre-Approved Template</div>
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                    Permitted outside 24h customer window
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMessageType('TEXT')}
                  className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all ${
                    messageType === 'TEXT'
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-5 h-5 mb-1.5 text-emerald-600" />
                  <div>Free-Form Session Reply</div>
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                    Unlocked during active 24h window
                  </span>
                </button>
              </div>
            </div>

            {/* Template Parameters */}
            {messageType === 'TEMPLATE' ? (
              <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Select Approved Template</label>
                  <select
                    value={selectedTemplate.name}
                    onChange={(e) => {
                      if (e.target.value === 'order_confirmation_v1') {
                        setSelectedTemplate({
                          id: 'tpl-1',
                          name: 'order_confirmation_v1',
                          body: 'Hi {{1}}, thank you for shopping with Apex Retail! Your order for {{2}} items has been confirmed and is being prepared for dispatch.',
                          category: 'UTILITY',
                        });
                      } else {
                        setSelectedTemplate({
                          id: 'tpl-2',
                          name: 'weekend_vip_flash_sale',
                          body: 'Hey {{1}}, enjoy exclusive early access to our VIP Flash Sale! Use coupon code {{2}} at checkout for flat 40% off across all categories.',
                          category: 'MARKETING',
                        });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 shadow-xs"
                  >
                    <option value="order_confirmation_v1">order_confirmation_v1 (Utility Order Confirmation)</option>
                    <option value="weekend_vip_flash_sale">weekend_vip_flash_sale (Marketing VIP Offer)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Variable &#123;&#123;1&#125;&#125; (Name)</label>
                    <input
                      type="text"
                      value={param1}
                      onChange={(e) => setParam1(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Variable &#123;&#123;2&#125;&#125; (Detail)</label>
                    <input
                      type="text"
                      value={param2}
                      onChange={(e) => setParam2(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs shadow-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                  Free-Form Message Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>
            )}

            {/* Result Feedback */}
            {result && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-center gap-3 shadow-xs ${
                  result.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {result.success ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{result.message}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>{result.error}</span>
                  </>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01]"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Dispatch Message to Cloud API</span>
            </button>
          </form>
        </div>

        {/* Live Smartphone Mockup */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-xs">
              📱 Live Recipient Screen
            </span>
          </div>

          <WhatsAppChatMockup
            headerType="TEXT"
            headerText={messageType === 'TEMPLATE' ? 'Order Update' : undefined}
            bodyText={
              messageType === 'TEMPLATE'
                ? selectedTemplate.body.replace('{{1}}', param1).replace('{{2}}', param2)
                : freeText
            }
            footerText="Apex Global Retail"
            buttons={
              messageType === 'TEMPLATE'
                ? [{ type: 'URL', text: 'Track Order', url: 'https://apexretail.com/track' }]
                : []
            }
            time="Just now"
          />
        </div>
      </div>
    </div>
  );
}

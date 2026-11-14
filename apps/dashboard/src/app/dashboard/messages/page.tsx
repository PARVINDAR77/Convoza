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
} from 'lucide-react';
import { WhatsAppChatMockup } from '../../../components/WhatsAppChatMockup';

export default function IndividualMessagePage() {
  const [phoneNumberId, setPhoneNumberId] = useState('102938475610293');
  const [recipientPhone, setRecipientPhone] = useState('+919876540001');
  const [messageType, setMessageType] = useState<'TEMPLATE' | 'TEXT'>('TEMPLATE');

  // Template details
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 'tpl-1',
    name: 'order_confirmation_v1',
    body: 'Hi {{1}}, thank you for shopping with Apex Retail! Your order for {{2}} items has been confirmed.',
  });
  const [param1, setParam1] = useState('Sarah');
  const [param2, setParam2] = useState('3');

  // Free-form text
  const [freeText, setFreeText] = useState('Hi Sarah, your package is currently out for delivery.');

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
        message: 'Message queued and dispatched successfully!',
        details: json.data,
      });
    } catch (err: any) {
      setResult({
        success: false,
        error: err.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Individual Message Composer</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Send high-priority individual messages and approved templates to verified recipients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Composer Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSend} className="space-y-5">
            {/* Sender Number */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Sending WhatsApp Number
              </label>
              <select
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="102938475610293">+91 98765 43210 (Apex Retail Official)</option>
              </select>
            </div>

            {/* Recipient Phone */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                Recipient WhatsApp Phone (E.164)
              </label>
              <input
                type="text"
                required
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+919876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Message Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                Message Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMessageType('TEMPLATE')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    messageType === 'TEMPLATE'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileCode2 className="w-4 h-4 mb-1 text-emerald-600" />
                  Meta Approved Template
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                    Permitted outside 24h window
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMessageType('TEXT')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    messageType === 'TEXT'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-4 h-4 mb-1 text-emerald-600" />
                  Free-form Session Message
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                    Requires open 24h window
                  </span>
                </button>
              </div>
            </div>

            {/* Template Parameter Controls */}
            {messageType === 'TEMPLATE' ? (
              <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Approved Template</label>
                  <select
                    value={selectedTemplate.name}
                    onChange={(e) => {
                      if (e.target.value === 'order_confirmation_v1') {
                        setSelectedTemplate({
                          id: 'tpl-1',
                          name: 'order_confirmation_v1',
                          body: 'Hi {{1}}, thank you for shopping with Apex Retail! Your order for {{2}} items has been confirmed.',
                        });
                      } else {
                        setSelectedTemplate({
                          id: 'tpl-2',
                          name: 'weekend_vip_flash_sale',
                          body: 'Hey {{1}}, enjoy exclusive early access to our VIP Flash Sale! Use coupon code {{2}} at checkout for flat 40% off.',
                        });
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="order_confirmation_v1">order_confirmation_v1 (Utility)</option>
                    <option value="weekend_vip_flash_sale">weekend_vip_flash_sale (Marketing)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Variable {'{{1}}'} (Name)</label>
                    <input
                      type="text"
                      value={param1}
                      onChange={(e) => setParam1(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Variable {'{{2}}'} (Detail)</label>
                    <input
                      type="text"
                      value={param2}
                      onChange={(e) => setParam2(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Message Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Result Feedback */}
            {result && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                  result.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {result.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{result.message}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{result.error}</span>
                  </>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Dispatch WhatsApp Message
            </button>
          </form>
        </div>

        {/* Live Mockup */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" /> WhatsApp Recipient View
            </h2>

            <WhatsAppChatMockup
              bodyText={
                messageType === 'TEMPLATE'
                  ? selectedTemplate.body.replace('{{1}}', param1).replace('{{2}}', param2)
                  : freeText
              }
              footerText="Apex Global Retail"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

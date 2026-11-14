'use client';

import React, { useState } from 'react';
import {
  Flame,
  Plus,
  Play,
  Pause,
  XCircle,
  CheckCircle2,
  Users2,
  Calendar,
  Send,
  Eye,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BarChart2,
} from 'lucide-react';
import { WhatsAppChatMockup } from '../../../components/WhatsAppChatMockup';

export default function CampaignsPage() {
  const [view, setView] = useState<'list' | 'wizard'>('list');

  // Campaigns list
  const [campaigns, setCampaigns] = useState([
    {
      id: 'c1',
      name: 'Weekend VIP Flash Sale Announcement',
      status: 'COMPLETED',
      totalRecipients: 500,
      sentCount: 500,
      deliveredCount: 489,
      readCount: 412,
      failedCount: 11,
      repliedCount: 84,
      createdAt: '2026-11-12',
    },
    {
      id: 'c2',
      name: 'Cart Recovery - Festive Wave 1',
      status: 'PROCESSING',
      totalRecipients: 1200,
      sentCount: 840,
      deliveredCount: 810,
      readCount: 650,
      failedCount: 4,
      repliedCount: 38,
      createdAt: 'Today',
    },
  ]);

  // 10-Step Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignName, setCampaignName] = useState('Festive Mega Sale 2026');
  const [phoneNumberId, setPhoneNumberId] = useState('102938475610293');
  const [audienceType, setAudienceType] = useState('ALL_OPTED_IN');
  const [templateId, setTemplateId] = useState('tpl-2');
  const [variableMap, setVariableMap] = useState<Record<string, string>>({
    '1': 'contact.name',
    '2': 'FESTIVE40',
  });
  const [scheduleType, setScheduleType] = useState<'NOW' | 'LATER'>('NOW');
  const [scheduledDate, setScheduledDate] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:4000/api/v1/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
          'x-organization-id': localStorage.getItem('convoza_org_id') || '',
        },
        body: JSON.stringify({
          name: campaignName,
          phoneNumberId,
          templateId,
          variableMapping: variableMap,
          scheduledAt: scheduleType === 'LATER' && scheduledDate ? scheduledDate : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Failed to create campaign');

      // Start the campaign immediately if scheduled for now
      if (scheduleType === 'NOW' && json.data?.id) {
        await fetch(`http://localhost:4000/api/v1/campaigns/${json.data.id}/start`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
            'x-organization-id': localStorage.getItem('convoza_org_id') || '',
          },
        });
      }

      setMessage('Campaign created and dispatched to transactional outbox worker queue!');
      setView('list');
      setWizardStep(1);
    } catch (err: any) {
      setMessage(`Campaign Launch Error: ${err.message}`);
    } finally {
      setIsLaunching(false);
    }
  };

  const handlePause = async (id: string) => {
    await fetch(`http://localhost:4000/api/v1/campaigns/${id}/pause`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
        'x-organization-id': localStorage.getItem('convoza_org_id') || '',
      },
    });
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, status: 'PAUSED' } : c))
    );
  };

  const handleResume = async (id: string) => {
    await fetch(`http://localhost:4000/api/v1/campaigns/${id}/resume`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
        'x-organization-id': localStorage.getItem('convoza_org_id') || '',
      },
    });
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, status: 'PROCESSING' } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Bulk Campaigns</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Broadcast high-converting WhatsApp campaigns with consent validation and rate-limited worker queues.
          </p>
        </div>

        {view === 'list' ? (
          <button
            onClick={() => {
              setCampaignName(`Campaign_${Date.now().toString().slice(-4)}`);
              setView('wizard');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Create Campaign Wizard
          </button>
        ) : (
          <button
            onClick={() => setView('list')}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            ← Back to Campaigns
          </button>
        )}
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* VIEW 1: Campaigns Table */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-6">Campaign Name</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Audience</th>
                  <th className="py-3 px-6">Sent / Delivered</th>
                  <th className="py-3 px-6">Read Rate</th>
                  <th className="py-3 px-6">Replies</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((camp) => {
                  const deliveryPct = Math.round((camp.deliveredCount / (camp.sentCount || 1)) * 100);
                  const readPct = Math.round((camp.readCount / (camp.deliveredCount || 1)) * 100);

                  return (
                    <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{camp.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{camp.createdAt}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            camp.status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : camp.status === 'PROCESSING'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {camp.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {camp.totalRecipients.toLocaleString()} contacts
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-bold text-slate-900">{camp.sentCount}</span> /{' '}
                          <span className="text-emerald-600 font-bold">{camp.deliveredCount}</span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${deliveryPct}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">{readPct}%</td>
                      <td className="py-4 px-6 font-bold text-emerald-600">{camp.repliedCount}</td>
                      <td className="py-4 px-6 text-right">
                        {camp.status === 'PROCESSING' ? (
                          <button
                            onClick={() => handlePause(camp.id)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center gap-1 font-bold"
                          >
                            <Pause className="w-4 h-4" /> Pause
                          </button>
                        ) : camp.status === 'PAUSED' ? (
                          <button
                            onClick={() => handleResume(camp.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg inline-flex items-center gap-1 font-bold"
                          >
                            <Play className="w-4 h-4" /> Resume
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: 10-Step Wizard */}
      {view === 'wizard' && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
              <span className="text-emerald-600">Step {wizardStep} of 5</span>
              <span>
                {wizardStep === 1 && 'Campaign Details'}
                {wizardStep === 2 && 'Select Audience & Suppression'}
                {wizardStep === 3 && 'Choose Approved Template'}
                {wizardStep === 4 && 'Variable Mapping & Preview'}
                {wizardStep === 5 && 'Schedule & Launch'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${(wizardStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Details */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Campaign Details</h2>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Sending WhatsApp Phone Number
                </label>
                <select
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                >
                  <option value="102938475610293">+91 98765 43210 (Apex Retail Official • 10K Tier)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Audience Selection & Suppression */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Select Target Audience</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAudienceType('ALL_OPTED_IN')}
                  className={`p-4 rounded-xl border text-left text-xs font-bold transition-all ${
                    audienceType === 'ALL_OPTED_IN'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Users2 className="w-5 h-5 text-emerald-600 mb-2" />
                  All Opted-In Contacts
                  <span className="block text-[11px] font-normal text-slate-500 mt-1">
                    5 verified contacts with active consent
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudienceType('VIP_ONLY')}
                  className={`p-4 rounded-xl border text-left text-xs font-bold transition-all ${
                    audienceType === 'VIP_ONLY'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Flame className="w-5 h-5 text-emerald-600 mb-2" />
                  VIP Customers Only
                  <span className="block text-[11px] font-normal text-slate-500 mt-1">
                    Tag: VIP Customer (3 contacts)
                  </span>
                </button>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <span className="font-bold">Automatic Compliance Guarantee:</span> Opted-out contacts (STOP replies) are automatically excluded during dispatch.
              </div>
            </div>
          )}

          {/* Step 3: Template Selection */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Select Approved Template</h2>
              <div className="space-y-3">
                <div
                  onClick={() => setTemplateId('tpl-2')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    templateId === 'tpl-2'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">weekend_vip_flash_sale</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      APPROVED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Hey {'{{1}}'}, enjoy exclusive early access to our VIP Flash Sale! Use coupon code {'{{2}}'} at checkout...
                  </p>
                </div>

                <div
                  onClick={() => setTemplateId('tpl-1')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    templateId === 'tpl-1'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">order_confirmation_v1</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      APPROVED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Hi {'{{1}}'}, thank you for shopping with Apex Retail! Your order for {'{{2}}'} items has been confirmed...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Variable Mapping & Preview */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Variable Mapping & Message Preview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                    Map Variable {'{{1}}'}
                  </label>
                  <select
                    value={variableMap['1']}
                    onChange={(e) => setVariableMap({ ...variableMap, '1': e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  >
                    <option value="contact.name">Contact Full Name</option>
                    <option value="contact.phone">Contact Phone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                    Map Variable {'{{2}}'}
                  </label>
                  <input
                    type="text"
                    value={variableMap['2']}
                    onChange={(e) => setVariableMap({ ...variableMap, '2': e.target.value })}
                    placeholder="Coupon code or value"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <WhatsAppChatMockup
                  bodyText={`Hey ${variableMap['1'] === 'contact.name' ? 'Sarah' : '+919876540001'}, enjoy exclusive early access to our VIP Flash Sale! Use coupon code ${variableMap['2']} at checkout for flat 40% off across all categories.`}
                  footerText="Reply STOP to opt out"
                />
              </div>
            </div>
          )}

          {/* Step 5: Schedule & Launch */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Schedule & Launch Review</h2>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Campaign Name:</span>
                  <span className="font-bold text-slate-900">{campaignName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sending Number:</span>
                  <span className="font-bold text-slate-900">+91 98765 43210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Eligible Recipients:</span>
                  <span className="font-bold text-emerald-600">5 Contacts (0 Suppressed)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Throughput:</span>
                  <span className="font-bold text-slate-900">&lt; 1 second (50 msg/sec)</span>
                </div>
              </div>

              <div className="pt-4">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  Execution Timing
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setScheduleType('NOW')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      scheduleType === 'NOW' ? 'bg-emerald-600 text-white' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Send Immediately
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType('LATER')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      scheduleType === 'LATER' ? 'bg-emerald-600 text-white' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Schedule for Later
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
            ) : <div />}

            {wizardStep < 5 ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isLaunching}
                onClick={handleLaunchCampaign}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                {isLaunching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
                Confirm & Launch Campaign
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


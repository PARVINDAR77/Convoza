'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  Tag,
  FileText,
  FileCode2,
  Paperclip,
  Check,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import io from 'socket.io-client';

export default function SharedInboxPage() {
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      contactId: 'c1',
      contact: {
        name: 'Sarah Miller',
        phone: '+919876540001',
        email: 'sarah.m@example.com',
        tags: ['VIP Customer', 'High Value'],
      },
      status: 'OPEN',
      unreadCount: 1,
      lastMessagePreview: 'Could you confirm when order #APX-4912 will be delivered?',
      lastMessageAt: '10:14 AM',
      isWindowActive: true,
      assignedAgent: { name: 'Alex Vance' },
    },
    {
      id: 'conv-2',
      contactId: 'c2',
      contact: {
        name: 'Rohan Sharma',
        phone: '+919876540002',
        email: 'rohan.s@example.com',
        tags: ['VIP Customer'],
      },
      status: 'OPEN',
      unreadCount: 0,
      lastMessagePreview: 'Thanks! The coupon worked seamlessly.',
      lastMessageAt: 'Yesterday',
      isWindowActive: false,
      assignedAgent: null,
    },
  ]);

  const [selectedConvId, setSelectedConvId] = useState('conv-1');
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'ASSIGNED_ME' | 'RESOLVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected conversation message thread
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'm1',
      direction: 'INBOUND',
      body: 'Hi there! Could you confirm when order #APX-4912 will be delivered?',
      time: '10:14 AM',
      status: 'DELIVERED',
    },
    {
      id: 'm2',
      direction: 'OUTBOUND',
      body: 'Hello Sarah! I checked with our fulfillment logistics. Your order is scheduled for delivery tomorrow before 1:00 PM.',
      time: '10:16 AM',
      status: 'READ',
    },
  ]);

  const [replyText, setReplyText] = useState('');
  const [internalNotes, setInternalNotes] = useState([
    { id: 'n1', author: 'Alex Vance', content: 'Customer verified order APX-4912.', date: '10:15 AM' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Socket.IO real-time connection
  useEffect(() => {
    const token = localStorage.getItem('convoza_access_token');
    const socket = io('http://localhost:4000/inbox', {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('message:new', (msg) => {
      if (msg.conversationId === selectedConvId) {
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            direction: msg.direction,
            body: msg.body,
            time: 'Just now',
            status: msg.status,
          },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedConvId]);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      direction: 'OUTBOUND',
      body: replyText,
      time: 'Just now',
      status: 'SENT',
    };

    setMessages([...messages, newMsg]);
    setReplyText('');

    // Send to backend API
    fetch(`http://localhost:4000/api/v1/inbox/conversations/${selectedConvId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('convoza_access_token') || ''}`,
        'x-organization-id': localStorage.getItem('convoza_org_id') || '',
      },
      body: JSON.stringify({ type: 'TEXT', body: newMsg.body }),
    }).catch(console.error);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setInternalNotes([
      { id: `n_${Date.now()}`, author: 'Alex Vance', content: newNoteText, date: 'Just now' },
      ...internalNotes,
    ]);
    setNewNoteText('');
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex">
      {/* COLUMN 1: Conversations List (Width: 320px) */}
      <div className="w-80 border-r border-slate-200 flex flex-col shrink-0">
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-1 text-[11px] font-bold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg ${
                filter === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('UNREAD')}
              className={`px-2.5 py-1 rounded-lg ${
                filter === 'UNREAD' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('ASSIGNED_ME')}
              className={`px-2.5 py-1 rounded-lg ${
                filter === 'ASSIGNED_ME' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              Assigned to Me
            </button>
          </div>
        </div>

        {/* Conversations Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-emerald-50/50 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{conv.contact.name}</span>
                  <span className="text-[10px] text-slate-400">{conv.lastMessageAt}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">{conv.lastMessagePreview}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    {conv.contact.tags.map((t, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COLUMN 2: Message Thread & Composer (Flex-1) */}
      <div className="flex-1 flex flex-col bg-[#F0F2F5]/40 border-r border-slate-200">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{activeConv.contact.name}</h2>
            <p className="text-[11px] text-slate-400 font-mono">{activeConv.contact.phone}</p>
          </div>

          {/* 24h Customer Service Window Status Indicator */}
          <div className="flex items-center gap-3">
            {activeConv.isWindowActive ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                24h Window Active (18h left)
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                24h Window Closed • Approved Templates Only
              </div>
            )}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => {
            const isOut = m.direction === 'OUTBOUND';
            return (
              <div key={m.id} className={`flex ${isOut ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md px-4 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm leading-relaxed ${
                    isOut
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <div>{m.body}</div>
                  <div
                    className={`mt-1 text-[10px] flex items-center justify-end gap-1 ${
                      isOut ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.time}</span>
                    {isOut && <span className="font-bold">✓✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSendReply} className="flex items-center gap-3">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                activeConv.isWindowActive
                  ? 'Type your message to customer...'
                  : 'Customer window closed. Click Template to re-engage...'
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>

      {/* COLUMN 3: Contact & Internal Notes Panel (Width: 320px) */}
      <div className="w-80 bg-white flex flex-col shrink-0 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Contact Context
          </h3>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Full Name</span>
              <span className="font-bold text-slate-900">{activeConv.contact.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Phone Number</span>
              <span className="font-mono text-slate-700">{activeConv.contact.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Email</span>
              <span className="text-slate-700">{activeConv.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Ticket Assignment */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Assigned Agent
          </label>
          <select className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50">
            <option>Alex Vance (You)</option>
            <option>Unassigned</option>
          </select>
        </div>

        {/* Internal Team Notes */}
        <div className="pt-4 border-t border-slate-100 flex-1 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Internal Team Notes
          </h3>

          <form onSubmit={handleAddNote} className="mb-4">
            <textarea
              rows={2}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Add private note visible only to agents..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs mb-2"
            />
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Add Note
            </button>
          </form>

          <div className="space-y-2 overflow-y-auto">
            {internalNotes.map((note) => (
              <div key={note.id} className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs">
                <div className="flex justify-between items-center text-[10px] text-amber-800 font-bold mb-1">
                  <span>{note.author}</span>
                  <span className="text-amber-600 font-normal">{note.date}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

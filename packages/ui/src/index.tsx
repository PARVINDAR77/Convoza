import React from 'react';

// Design Tokens
export const THEME_COLORS = {
  primary: '#25D366',       // WhatsApp Green
  primaryDark: '#128C7E',   // WhatsApp Teal/Dark Green
  primaryLight: '#DCF8C6',  // WhatsApp Chat Bubble Light Green
  navySidebar: '#0F172A',   // Dark Navy Sidebar
  navySidebarHover: '#1E293B',
  surfaceLight: '#F8FAFC',
  borderLight: '#E2E8F0',
};

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon && <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};

export interface BadgeProps {
  status: string;
  variant?: 'green' | 'blue' | 'yellow' | 'red' | 'gray';
  children?: React.ReactNode;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, variant, children }) => {
  const getStyle = () => {
    switch (variant || status.toLowerCase()) {
      case 'approved':
      case 'connected':
      case 'delivered':
      case 'read':
      case 'active':
      case 'opted_in':
      case 'green':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
      case 'pending_verification':
      case 'scheduled':
      case 'processing':
      case 'yellow':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'failed':
      case 'rejected':
      case 'disconnected':
      case 'restricted':
      case 'opted_out':
      case 'red':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'draft':
      case 'paused':
      case 'resolved':
      case 'gray':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children || status}
    </span>
  );
};

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

export interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = 'w-5 h-5',
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.011 2.012c-5.508 0-9.989 4.48-9.989 9.988 0 1.761.459 3.477 1.332 4.993L2 22l5.137-1.348a9.967 9.967 0 004.874 1.348h.004c5.508 0 9.99-4.481 9.99-9.988 0-2.668-1.039-5.176-2.926-7.063a9.93 9.93 0 00-7.068-2.937zm0 18.291h-.003a8.318 8.318 0 01-4.24-1.161l-.304-.18-3.153.827.841-3.073-.198-.315a8.307 8.307 0 01-1.274-4.401c0-4.595 3.738-8.334 8.335-8.334 2.227 0 4.321.868 5.895 2.443a8.277 8.277 0 012.438 5.892c0 4.596-3.738 8.302-8.338 8.302zm4.57-6.222c-.25-.125-1.482-.731-1.712-.815-.23-.083-.397-.125-.564.125-.167.25-.647.814-.793.981-.146.167-.292.188-.543.063-.25-.126-1.058-.39-2.015-1.243-.744-.664-1.247-1.485-1.393-1.736-.146-.25-.015-.386.11-.51.113-.112.25-.292.376-.438.125-.146.167-.25.25-.417.084-.167.042-.313-.02-.438-.063-.125-.564-1.357-.773-1.859-.204-.488-.41-.422-.564-.43-.146-.007-.313-.009-.48-.009-.167 0-.438.063-.668.313-.23.25-.877.857-.877 2.09 0 1.233.898 2.423 1.023 2.59.125.167 1.767 2.7 4.28 3.785.598.258 1.064.412 1.428.528.601.191 1.147.164 1.579.1.481-.072 1.482-.606 1.691-1.191.209-.585.209-1.087.146-1.192-.062-.104-.229-.167-.48-.292z" />
    </svg>
  );
};



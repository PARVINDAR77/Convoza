import React from 'react';
import { ExternalLink, CornerDownLeft, PhoneCall, Image, FileText, Video } from 'lucide-react';

export interface WhatsAppChatMockupProps {
  headerType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  headerText?: string;
  headerMediaUrl?: string;
  bodyText: string;
  footerText?: string;
  buttons?: Array<{
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
    text: string;
    url?: string;
  }>;
  variables?: Record<string, string>;
  time?: string;
}

export const WhatsAppChatMockup: React.FC<WhatsAppChatMockupProps> = ({
  headerType = 'TEXT',
  headerText,
  headerMediaUrl,
  bodyText,
  footerText,
  buttons = [],
  variables = {},
  time = '10:14 AM',
}) => {
  // Replace tokens like {{1}}, {{2}} with dynamic variables
  const renderText = (str?: string) => {
    if (!str) return '';
    return str.replace(/\{\{(\d+)\}\}/g, (match, p1) => {
      return variables[p1] !== undefined ? variables[p1] : match;
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#E5DDD5] rounded-2xl p-4 shadow-inner border border-slate-300 font-sans">
      {/* WhatsApp Chat Bubble */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden text-slate-800 text-sm max-w-xs ml-auto">
        {/* Header Preview */}
        {headerType === 'IMAGE' && (
          <div className="h-36 bg-slate-200 flex items-center justify-center text-slate-400">
            <Image className="w-8 h-8" />
          </div>
        )}
        {headerType === 'VIDEO' && (
          <div className="h-36 bg-slate-900 flex items-center justify-center text-white">
            <Video className="w-8 h-8" />
          </div>
        )}
        {headerType === 'DOCUMENT' && (
          <div className="p-3 bg-slate-100 flex items-center gap-2 border-b border-slate-200">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-700 truncate">Document Attachment.pdf</span>
          </div>
        )}
        {headerType === 'TEXT' && headerText && (
          <div className="p-3 pb-1 font-bold text-slate-900 text-sm">
            {renderText(headerText)}
          </div>
        )}

        {/* Body Text */}
        <div className="p-3 text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
          {renderText(bodyText) || 'Enter body text...'}
        </div>

        {/* Footer Text */}
        {footerText && (
          <div className="px-3 pb-1 text-[11px] text-slate-400">
            {renderText(footerText)}
          </div>
        )}

        {/* Timestamp & Delivery Checkmark */}
        <div className="px-3 pb-2 flex items-center justify-end gap-1 text-[10px] text-slate-400">
          <span>{time}</span>
          <span className="text-emerald-500 font-bold">✓✓</span>
        </div>

        {/* Interactive Buttons */}
        {buttons.length > 0 && (
          <div className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/50">
            {buttons.map((btn, idx) => (
              <div
                key={idx}
                className="py-2 px-3 text-center text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1.5 hover:bg-slate-100 cursor-pointer"
              >
                {btn.type === 'URL' && <ExternalLink className="w-3.5 h-3.5" />}
                {btn.type === 'QUICK_REPLY' && <CornerDownLeft className="w-3.5 h-3.5" />}
                {btn.type === 'PHONE_NUMBER' && <PhoneCall className="w-3.5 h-3.5" />}
                <span>{btn.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


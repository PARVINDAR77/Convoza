import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'CONVOZA — Conversations. Connected. | WhatsApp Business Automation SaaS',
  description:
    'Complete WhatsApp Business Automation SaaS. Meta Embedded Signup, Template Builder, Shared Team Inbox, Bulk Campaigns, and API-driven Outbox Workers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Git Playground — Interactive Learning Environment',
  description:
    'Master Git commands, branching strategies, and real-world industry workflows with an interactive terminal and live branch visualization.',
  openGraph: {
    title: 'Git Playground',
    description: 'Interactive Git learning environment with guided scenarios and visual branch diagrams.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts Dashboard',
  description: 'Next.js frontend connected to the Laravel posts API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

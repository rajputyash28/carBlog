import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RouteTransition from '@/components/RouteTransition';
import HeaderWrapper from '@/components/HeaderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car Blog - Your Journey Your Car Your Way',
  description: 'Discover the latest car reviews, technology updates, and automotive insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderWrapper>
        <main>{children}</main>
        </HeaderWrapper>
        <RouteTransition />
      </body>
    </html>
  );
}
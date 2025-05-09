import { MainNav } from '@/components/MainNav';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import AuthProvider from './AuthProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GymDB - Gym Management System',
  description:
    'A comprehensive gym management system for tracking members, classes, and trainers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col items-center dark`}
      >
        <AuthProvider>
          <MainNav />
          <main className="flex-1 w-full">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

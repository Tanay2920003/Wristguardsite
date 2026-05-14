import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://watchlockfind.vercel.app'), // Replace with your actual domain
  title: "Watch Lock & Find | Find & Secure Your Phone",
  description: "Instantly find and secure your Android phone directly from your Galaxy Watch.",
  keywords: ["Galaxy Watch", "Find My Phone", "Remote Lock", "Android Security", "Wear OS", "Phone Tracker"],
  authors: [{ name: "Watch Lock & Find Team" }],
  openGraph: {
    title: "Watch Lock & Find | Find & Secure Your Phone",
    description: "Instantly find and secure your Android phone directly from your Galaxy Watch.",
    url: 'https://watchlockfind.vercel.app',
    siteName: 'Watch Lock & Find',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Watch Lock & Find | Find & Secure Your Phone",
    description: "Instantly find and secure your Android phone directly from your Galaxy Watch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

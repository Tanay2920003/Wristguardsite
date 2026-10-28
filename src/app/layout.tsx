import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["500", "700", "800"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

const title = "Watch Lock & Find | Find My Phone From Your Watch";
const description =
  "Ring, lock and locate your Android phone from your Galaxy Watch or Wear OS watch. One tap, even on silent. Pro launching soon with a 7-day free trial.";

export const metadata: Metadata = {
  metadataBase: new URL("https://watchlockfind.vercel.app"),
  title,
  description,
  keywords: [
    "Find my phone from watch",
    "Remote phone lock",
    "Galaxy Watch utility",
    "Wear OS phone finder",
    "Silent mode override",
    "Android phone tracker",
    "Watch Lock & Find",
  ],
  authors: [{ name: "Tanay Anand Mishra", url: "https://x.com/Tan_appdevelope" }],
  openGraph: {
    title,
    description,
    url: "https://watchlockfind.vercel.app",
    siteName: "Watch Lock & Find",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Tan_appdevelope",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased dark`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

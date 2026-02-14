import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://findyourval.vercel.app"),
  title: "Find Your Match",
  description: "Connect with people. Find your perfect match.",
  openGraph: {
    title: "Find Your Match",
    description: "Connect with people. Find your perfect match.",
    type: "website",
    locale: "en_US",
    siteName: "Find Your Match",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Match",
    description: "Connect with people. Find your perfect match.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fillout",
  description: "Robert Ostermann: Fillout Frontend Take-home",
  authors: { name: "Robert Ostermann", url: "https://github.com/RobertOstermann" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div
          id="background"
          className="from-background-primary/75 to-background bg-linear-to-b h-full"
        >
          {children}
        </div>
      </body>
    </html>
  );
}

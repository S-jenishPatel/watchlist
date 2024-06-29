import type { Metadata } from "next";

import { inter } from "@/components/fonts";

import "./globals.css";

import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Save all your favourite Movies and Series at one place",
  applicationName: "Watchlist",
  authors: [
    { name: "Jenish Patel S", url: "https://github.com/S-jenishPatel" },
  ],
  creator: "Jenish Patel S",
  keywords: ["watchlist", "nextjs", "moives", "tv"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} custom-scrollbar`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

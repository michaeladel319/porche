import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Porsche Excellence",
  description: "Precision. Performance. Perfection. Experience the world's most iconic sports cars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col peachy-gradient overflow-hidden" suppressHydrationWarning>
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

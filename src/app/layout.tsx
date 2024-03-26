"use client";
import { Inter } from "next/font/google";
import { QueryClientProvider, QueryClient } from "react-query";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.className} bg-gravel-50 dark:bg-[#0F0E10]`}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}

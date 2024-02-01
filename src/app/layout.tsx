"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "react-query";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body
          className={`flex flex-col gap-4 bg-gray-100 min-h-screen ${inter.className}`}
        >
          <Navbar />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}

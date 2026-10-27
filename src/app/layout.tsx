import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blutube",
  description: "Blutube — a YouTube-style video platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0d12] text-[#f3f5f9] antialiased">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="min-w-0 flex-1 px-3 py-4 md:px-5">{children}</main>
        </div>
      </body>
    </html>
  );
}

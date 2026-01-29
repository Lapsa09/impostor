import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impostor Futbolero",
  description: "Juego social de fútbol - ¿Quién es el impostor?",
  appleWebApp: {
    title: "Impostor",
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
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <main className="min-h-dvh relative grid place-items-center bg-linear-to-br from-green-600 via-green-700 to-green-900 p-4">
          {children}
          <Toaster duration={1500} />
          <Link
            className="text-xs mx-auto absolute bottom-4 hover:text-white"
            href="https://es.vecteezy.com/"
          >
            PNGs por Vecteezy
          </Link>
        </main>
      </body>
    </html>
  );
}

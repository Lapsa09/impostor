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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  keywords: [
    "juego",
    "fútbol",
    "impostor",
    "social",
    "multijugador",
    "futbol",
    "juego de mesa",
  ],
  authors: [{ name: "Impostor Futbolero" }],
  openGraph: {
    title: "Impostor Futbolero",
    description: "Juego social de fútbol - ¿Quién es el impostor?",
    type: "website",
    locale: "es_ES",
    siteName: "Impostor Futbolero",
    images: [
      {
        url: "/icon1.png",
        width: 512,
        height: 512,
        alt: "Impostor Futbolero Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impostor Futbolero",
    description: "Juego social de fútbol - ¿Quién es el impostor?",
    images: ["/icon1.png"],
  },
  appleWebApp: {
    title: "Impostor",
    capable: true,
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png",
    shortcut: "/icon1.png",
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
            className="text-xs mx-auto absolute bottom-0 hover:text-white"
            href="https://es.vecteezy.com/"
          >
            PNGs por Vecteezy
          </Link>
        </main>
      </body>
    </html>
  );
}

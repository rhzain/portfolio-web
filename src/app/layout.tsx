import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AgentationToolbar } from "@/components/dev/agentation-toolbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/pebble-toast";
import { GradientBackground } from "@/components/animate-ui/components/backgrounds/gradient";
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
  title: "rhzain",
  description:
    "A personal developer portfolio featuring selected work, experience, technical capabilities, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-transparent">
        <ThemeProvider>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0"
          >
            <GradientBackground />
          </div>
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
          </div>
          <AgentationToolbar />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

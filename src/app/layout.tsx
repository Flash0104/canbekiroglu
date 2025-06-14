import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
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
  title: "Can Bekiroglu - Software Engineer",
  description: "Personal portfolio of a passionate software engineer specializing in modern web development with React, Next.js, and TypeScript.",
  keywords: ["Software Engineer", "Web Developer", "React", "Next.js", "TypeScript", "Portfolio", "Can Bekiroglu"],
  authors: [{ name: "Can Bekiroglu" }],
  creator: "Can Bekiroglu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://canbekiroglu-portfolio.vercel.app",
    title: "Can Bekiroglu - Software Engineer",
    description: "Personal portfolio of a passionate software engineer specializing in modern web development.",
    siteName: "Can Bekiroglu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can Bekiroglu - Software Engineer",
    description: "Personal portfolio of a passionate software engineer specializing in modern web development.",
    creator: "@canbekiroglu777",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

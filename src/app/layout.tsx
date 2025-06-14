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
  title: "Can Bekiroglu - Software Engineer & Full-Stack Developer",
  description: "Can Bekiroglu - Computer Engineering student at University of Duisburg-Essen. Experienced software engineer specializing in React, Next.js, TypeScript, Python, and modern web development. Based in Duisburg, Germany.",
  keywords: [
    "Can Bekiroglu", 
    "canbekiroglu", 
    "Software Engineer", 
    "Full-Stack Developer", 
    "Web Developer", 
    "Computer Engineering", 
    "University of Duisburg-Essen",
    "React Developer", 
    "Next.js Developer", 
    "TypeScript Developer",
    "Python Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Duisburg Germany",
    "Portfolio",
    "Web Development",
    "Software Development",
    "Data Analysis",
    "Machine Learning"
  ],
  authors: [{ name: "Can Bekiroglu" }],
  creator: "Can Bekiroglu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://canbekiroglu.vercel.app",
    title: "Can Bekiroglu - Software Engineer & Full-Stack Developer",
    description: "Computer Engineering student and experienced software engineer specializing in modern web development. Based in Duisburg, Germany.",
    siteName: "Can Bekiroglu - Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can Bekiroglu - Software Engineer & Full-Stack Developer",
    description: "Computer Engineering student and experienced software engineer specializing in modern web development. Based in Duisburg, Germany.",
    creator: "@canbekiroglu777",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

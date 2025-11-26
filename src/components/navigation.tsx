"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { Globe, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Component is mounted
  }, []);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
    { href: "/caglar", label: "Çağlar Bekiroğlu", special: true },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="ml-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Can Bekiroglu
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-foreground bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-200 dark:border-blue-800"
                  : "special" in item && item.special
                  ? "text-foreground bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300 dark:border-emerald-700 hover:from-emerald-500/20 hover:to-teal-500/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400 transition-all duration-300">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "en" | "de" | "tr")}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    language === lang.code ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10" : ""
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative overflow-hidden"
            suppressHydrationWarning
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-foreground border border-blue-200 dark:border-blue-800"
                          : "special" in item && item.special
                          ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-foreground border border-emerald-300 dark:border-emerald-700 hover:from-emerald-500/20 hover:to-teal-500/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Mobile Language Selector */}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Language</p>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as "en" | "de" | "tr");
                            setIsOpen(false);
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-left transition-all ${
                            language === lang.code 
                              ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-foreground" 
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Download, ExternalLink, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export default function Home() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data); // Show all projects
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: "React", color: "from-blue-500 to-cyan-500" },
    { name: "Next.js", color: "from-purple-500 to-pink-500" },
    { name: "TypeScript", color: "from-yellow-500 to-orange-500" },
    { name: "Node.js", color: "from-green-500 to-emerald-500" },
    { name: "Python", color: "from-blue-600 to-purple-600" },
    { name: "AWS", color: "from-orange-500 to-red-500" },
  ];

  const scrollLeft = () => {
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -320, // Width of one card + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 320, // Width of one card + gap
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t("hero.greeting")}{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Can Bekiroglu
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  {t("hero.role")}
                </p>
                <p className="text-lg text-muted-foreground max-w-lg">
                  {t("hero.description")}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://github.com/Flash0104" target="_blank">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://www.linkedin.com/in/canbekiroglu777" target="_blank">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    {t("hero.contact")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  {t("hero.download")}
                </Button>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                    <Image
                      src="/profile.jpg"
                      alt="Can Bekiroglu"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("skills.title")}{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t("skills.subtitle")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("skills.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`p-6 rounded-xl bg-gradient-to-br ${skill.color} text-white text-center font-semibold shadow-lg`}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {t("projects.featured")}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t("projects.title")}
                </span>
              </h2>
              <p className="text-muted-foreground">
                {t("projects.description")}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" asChild className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] hover:[text-shadow:0_0_8px_rgba(168,85,247,0.9),0_0_16px_rgba(168,85,247,0.6)]">
                <Link href="/projects">
                  {t("projects.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scrollable Projects Container */}
          <div className="relative group">
            {/* Left Arrow */}
            <motion.button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Scrollable Projects */}
            <div 
              ref={setScrollContainer}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-card rounded-lg p-6 border animate-pulse flex-shrink-0"
                      style={{ width: '300px', height: '400px' }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <div className="h-48 bg-muted rounded-lg mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 w-16 bg-muted rounded"></div>
                        <div className="h-6 w-16 bg-muted rounded"></div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl overflow-hidden border border-purple-400/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-400/60 transition-all duration-300 flex-shrink-0"
                      style={{ width: '300px' }}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.titleKey}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(254,240,138,0.8)] group-hover:[text-shadow:0_0_10px_rgba(254,240,138,0.9),0_0_20px_rgba(254,240,138,0.6),0_0_30px_rgba(254,240,138,0.4)]">
                          {t(project.titleKey)}
                        </h3>
                        <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed group-hover:text-slate-200 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(226,232,240,0.7)] group-hover:[text-shadow:0_0_8px_rgba(226,232,240,0.8),0_0_16px_rgba(226,232,240,0.5)]">
                          {t(project.descriptionKey)}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => {
                            const colors = [
                              "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
                              "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
                              "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30"
                            ];
                            return (
                              <Badge 
                                key={tech} 
                                variant="outline" 
                                className={`text-xs font-medium border ${colors[techIndex % colors.length]}`}
                              >
                                {tech}
                              </Badge>
                            );
                          })}
                        </div>
                        
                        {/* Buttons at bottom of card */}
                        <div className="flex gap-3 mt-4">
                          {project.githubUrl && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild 
                              className="flex-1 bg-white/90 border-gray-700 text-black hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-500 hover:text-purple-600 hover:scale-105 transition-all duration-300 font-semibold shadow-sm hover:shadow-purple-200"
                            >
                              <Link href={project.githubUrl} target="_blank">
                                <Github className="h-4 w-4 mr-2" />
                                {t("projects.code")}
                              </Link>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button 
                              size="sm" 
                              asChild 
                              className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-purple-500 hover:to-pink-600 hover:scale-105 text-white font-semibold shadow-lg hover:shadow-purple-400/50 transition-all duration-300"
                            >
                              <Link href={project.liveUrl} target="_blank">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("projects.demo")}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("hero.greeting")}{" "}
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Can Bekiroglu
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("hero.role")}
              </motion.p>
              <motion.p 
                className="text-lg text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("hero.description")}
              </motion.p>
            </div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" asChild className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-400 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] hover:[text-shadow:0_0_8px_rgba(59,130,246,0.9),0_0_16px_rgba(59,130,246,0.6)]">
                  <Link href="https://github.com/Flash0104" target="_blank">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" asChild className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:border-blue-400 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] hover:[text-shadow:0_0_8px_rgba(6,182,212,0.9),0_0_16px_rgba(6,182,212,0.6)]">
                  <Link href="https://www.linkedin.com/in/canbekiroglu777" target="_blank">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.9)] hover:[text-shadow:0_0_12px_rgba(168,85,247,1),0_0_24px_rgba(168,85,247,0.7),0_0_36px_rgba(168,85,247,0.5)]">
                  <Link href="/contact">
                    {t("hero.contact")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="hover:bg-gradient-to-r hover:from-green-500/10 hover:to-blue-500/10 hover:border-green-400 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] hover:[text-shadow:0_0_8px_rgba(34,197,94,0.9),0_0_16px_rgba(34,197,94,0.6)]">
                  <Download className="mr-2 h-5 w-5" />
                  {t("hero.download")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div 
            className="flex justify-start lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <Image
                src="/profile.jpg"
                alt="Can Bekiroglu"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                priority
              />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("skills.title")}{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t("skills.subtitle")}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className={`p-6 rounded-xl bg-gradient-to-br ${skill.color} text-white text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.5, 
              }}
              viewport={{ once: true }}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {t("projects.featured")}{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("projects.title")}
              </span>
            </h2>
            <p className="text-muted-foreground">
              {t("projects.description")}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" asChild className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] hover:[text-shadow:0_0_8px_rgba(168,85,247,0.9),0_0_16px_rgba(168,85,247,0.6)]">
              <Link href="/projects">
                {t("projects.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scrollable Projects Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          {/* Scrollable Projects */}
          <div 
            ref={setScrollContainer}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-card rounded-lg p-6 border animate-pulse flex-shrink-0"
                    style={{ width: '300px', height: '400px' }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="h-48 bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                    </div>
                  </motion.div>
                ))
              ) : (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="group bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl overflow-hidden border border-purple-400/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-400/60 transition-all duration-300 flex-shrink-0"
                    style={{ width: '300px' }}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.titleKey}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(254,240,138,0.8)] group-hover:[text-shadow:0_0_10px_rgba(254,240,138,0.9),0_0_20px_rgba(254,240,138,0.6),0_0_30px_rgba(254,240,138,0.4)]">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed group-hover:text-slate-200 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(226,232,240,0.7)] group-hover:[text-shadow:0_0_8px_rgba(226,232,240,0.8),0_0_16px_rgba(226,232,240,0.5)]">
                        {t(project.descriptionKey)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => {
                          const colors = [
                            "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
                            "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
                            "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30"
                          ];
                          return (
                            <Badge 
                              key={tech} 
                              variant="outline" 
                              className={`text-xs font-medium border ${colors[techIndex % colors.length]}`}
                            >
                              {tech}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      {/* Buttons at bottom of card */}
                      <div className="flex gap-3 mt-4">
                        {project.githubUrl && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild 
                            className="flex-1 bg-white/90 border-gray-700 text-black hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-500 hover:text-purple-600 hover:scale-105 transition-all duration-300 font-semibold shadow-sm hover:shadow-purple-200"
                          >
                            <Link href={project.githubUrl} target="_blank">
                              <Github className="h-4 w-4 mr-2" />
                              {t("projects.code")}
                            </Link>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button 
                            size="sm" 
                            asChild 
                            className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-purple-500 hover:to-pink-600 hover:scale-105 text-white font-semibold shadow-lg hover:shadow-purple-400/50 transition-all duration-300"
                          >
                            <Link href={project.liveUrl} target="_blank">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {t("projects.demo")}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

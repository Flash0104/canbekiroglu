"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ExternalLink, Github } from "lucide-react";
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

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t("projects.pageTitle")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("projects.pageDescription")}
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border animate-pulse">
              <div className="h-48 bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-muted rounded"></div>
                <div className="h-6 w-16 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl overflow-hidden border border-purple-400/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-400/60 hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
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
                
                {/* Technologies */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-200 mb-2">{t("projects.technologies")}:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => {
                      const colors = [
                        "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
                        "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
                        "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30",
                        "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30"
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
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="flex-1 bg-white/90 border-gray-700 text-black hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-500 hover:text-purple-600 hover:scale-105 transition-all duration-300 font-semibold shadow-sm hover:shadow-purple-200"
                    >
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        {t("projects.github")}
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
                        {t("projects.live")}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t("projects.noProjects")}</p>
        </div>
      )}
    </div>
  );
} 
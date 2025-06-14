'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { Project } from '@/lib/projects';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  const title = t(project.titleKey);
  const description = t(project.descriptionKey);

  // Create a placeholder SVG for failed images
  const createPlaceholder = (title: string) => {
    const encoded = encodeURIComponent(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <rect x="20" y="20" width="360" height="260" rx="10" fill="white"/>
        <text x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#374151">${title}</text>
        <text x="200" y="160" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#6b7280">Project Preview</text>
        <rect x="160" y="180" width="80" height="30" rx="5" fill="#3b82f6"/>
        <text x="200" y="200" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="white">View Project</text>
      </svg>
    `);
    return `data:image/svg+xml,${encoded}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={imageError ? createPlaceholder(title) : project.image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
          priority={false}
        />
      </div>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4 mr-2" />
            {t("projects.code")}
          </Link>
        </Button>
        
        <Button asChild size="sm" className="flex-1">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t("projects.demo")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 
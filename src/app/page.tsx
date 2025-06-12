import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/lib/projects';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

export default async function HomePage() {
  const projects = await getAllProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Hi, I'm{' '}
              <span className="text-primary">Can Bekiroglu</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              Software Engineer & Full-Stack Developer
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a passionate software engineer with expertise in modern web technologies. 
              I love building scalable applications and solving complex problems with clean, 
              efficient code. Currently focused on React, Next.js, and cloud technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              <Link
                href="https://github.com/Flash0104"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/canbekiroglu777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/profile.jpg"
                alt="Can Bekiroglu"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">
              Some of my recent work that I'm proud of
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
            'MongoDB', 'AWS', 'Docker', 'Git', 'Tailwind CSS', 'GraphQL'
          ].map((skill) => (
            <div
              key={skill}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-center font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a project in mind or just want to chat about technology, 
            I'd love to hear from you.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

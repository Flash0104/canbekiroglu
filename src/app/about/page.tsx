"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Bio Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src="/profile.jpg"
                  alt="Can Bekiroglu"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">{t("about.myStory")}</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  {t("about.story1")}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t("about.story2")}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t("about.story3")}
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
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
                <Link
                  href="mailto:canbek0104@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t("about.skills")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("about.frontend")}</CardTitle>
                <CardDescription>{t("about.frontendDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("about.backend")}</CardTitle>
                <CardDescription>{t("about.backendDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("about.toolsCloud")}</CardTitle>
                <CardDescription>{t("about.toolsCloudDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Docker', 'Git', 'Vercel', 'Firebase', 'Supabase'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t("about.experience")}</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("about.dataAnalyst")}</CardTitle>
                    <CardDescription>{t("about.monayDesc")}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Oct 2023 - Dec 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t("about.istanbulRemote")}</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("about.dataAnalystTask1")}</li>
                  <li>{t("about.dataAnalystTask2")}</li>
                  <li>{t("about.dataAnalystTask3")}</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Python', 'Pandas', 'MongoDB', 'PostgreSQL', 'Machine Learning'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("about.itInfrastructure")}</CardTitle>
                    <CardDescription>{t("about.priorimDesc")}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Feb 2023 - Jul 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t("about.dusseldorfHybrid")}</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("about.itTask1")}</li>
                  <li>{t("about.itTask2")}</li>
                  <li>{t("about.itTask3")}</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['HTML', 'IT Infrastructure Management', 'Web Development'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t("about.education")}</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("about.bachelorTitle")}</CardTitle>
                    <CardDescription>{t("about.universityDuisburg")}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">2024 - Present</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t("about.duisburgLocation")}</p>
                <p className="text-muted-foreground">
                  {t("about.bachelorDesc")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t("about.foundationTitle")}</CardTitle>
                    <CardDescription>{t("about.fhAachen")}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">2022 - 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t("about.aachenLocation")}</p>
                <p className="text-muted-foreground mb-2">{t("about.grade")}</p>
                <p className="text-muted-foreground">
                  {t("about.foundationDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
} 
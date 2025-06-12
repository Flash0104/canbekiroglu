import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Get to know more about my journey, skills, and passion for technology
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
              <h2 className="text-2xl font-bold mb-4">My Story</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  I&apos;m a passionate Computer Engineering student at the University of Duisburg-Essen with hands-on 
                  experience in data analysis and IT infrastructure. My journey began with a foundation year at 
                  FH Aachen University of Applied Sciences, where I built strong fundamentals in computer engineering 
                  and achieved a solid 3.2 GPA.
                </p>
                <p className="text-muted-foreground mb-4">
                  Through internships at Monay and PrioRim Technologies, I&apos;ve gained practical experience in data 
                  analysis using Python, Pandas, and Machine Learning, as well as IT infrastructure management. 
                  I specialize in modern web development with React, Next.js, and TypeScript, combining my 
                  analytical background with full-stack development skills.
                </p>
                <p className="text-muted-foreground mb-6">
                  Currently pursuing my Bachelor&apos;s degree while continuously expanding my technical skills, 
                  I&apos;m passionate about creating innovative digital solutions and exploring the intersection 
                  of data science and web development. I&apos;m fluent in German and English, enabling me to work 
                  effectively in international environments.
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
          <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>Modern web interfaces</CardDescription>
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
                <CardTitle>Backend</CardTitle>
                <CardDescription>Server-side development</CardDescription>
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
                <CardTitle>Tools & Cloud</CardTitle>
                <CardDescription>Development & deployment</CardDescription>
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
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Data Analyst Internship</CardTitle>
                    <CardDescription>Monay · Apprenticeship</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Oct 2023 - Dec 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Istanbul, Turkey · Remote</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Developed data analysis solutions using Python and Pandas for financial data processing</li>
                  <li>Implemented machine learning models with PostgreSQL and MongoDB integration</li>
                  <li>Created automated data pipelines and visualization dashboards</li>
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
                    <CardTitle>IT Infrastructure</CardTitle>
                    <CardDescription>PrioRim Technologies · Work Study</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Feb 2023 - Jul 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Düsseldorf, North Rhine-Westphalia, Germany · Hybrid</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Collaborated with PrioRim Technologies and Altinsoy Manufaktur on infrastructure projects</li>
                  <li>Configured and managed furniture website systems and IT infrastructure</li>
                  <li>Developed technical solutions for web-based business applications</li>
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
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Bachelor of Science - BS, Computer Engineering</CardTitle>
                    <CardDescription>University of Duisburg-Essen</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Oct 2022 - Jun 2025</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Duisburg, Germany</p>
                <p className="text-muted-foreground">
                  Currently pursuing Bachelor&apos;s degree in Computer Engineering with focus on software development, 
                  data structures, algorithms, and modern web technologies. Developing expertise in machine learning 
                  and full-stack development.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['German', 'Machine Learning', 'Computer Engineering'].map((skill) => (
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
                    <CardTitle>Internship / Freshman Institute, Computer Engineering</CardTitle>
                    <CardDescription>FH Aachen University of Applied Sciences</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Oct 2021 - Jul 2022</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Aachen, Germany · Grade: 3.2 GPA (%80)</p>
                <p className="text-muted-foreground">
                  Foundation year program covering essential computer engineering fundamentals including 
                  IT, Mathematics, Physics, and language skills. Strong performance in technical subjects 
                  with comprehensive preparation for advanced studies.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['CSS', 'German', 'IT Fundamentals', 'Mathematics', 'Physics'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
} 
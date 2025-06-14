import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export async function getAllProjects(): Promise<Project[]> {
  const projectsPath = path.join(process.cwd(), 'content/projects.json');
  const fileContents = fs.readFileSync(projectsPath, 'utf8');
  const projects: Project[] = JSON.parse(fileContents);
  return projects;
} 
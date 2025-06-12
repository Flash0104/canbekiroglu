# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a blog system, project showcase, and contact form.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark mode support
- **Blog System**: Markdown-based blog with frontmatter support
- **Project Showcase**: Dynamic project cards with GitHub and live demo links
- **Contact Form**: Functional contact form (ready for backend integration)
- **SEO Optimized**: Built-in SEO with sitemap and meta tags
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized for Core Web Vitals

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Content**: Markdown with gray-matter
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
├── src/
│   ├── app/                 # App Router pages
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog pages
│   │   ├── contact/        # Contact page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...            # Custom components
│   └── lib/               # Utility functions
├── content/               # Content files
│   ├── blog/             # Blog posts (Markdown)
│   └── projects.json     # Project data
└── public/               # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Flash0104/Portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information
1. Update `src/app/layout.tsx` with your name and details
2. Replace placeholder content in all pages
3. Add your profile picture to `public/profile.jpg`

### Projects
Edit `content/projects.json` to add your projects:
```json
{
  "id": "1",
  "title": "Your Project",
  "description": "Project description",
  "technologies": ["React", "Next.js"],
  "githubUrl": "https://github.com/yourusername/project",
  "liveUrl": "https://project.vercel.app",
  "image": "/projects/project.jpg"
}
```

### Blog Posts
Add Markdown files to `content/blog/` with frontmatter:
```markdown
---
title: "Your Blog Post"
date: "2024-01-01"
description: "Post description"
tags: ["tag1", "tag2"]
---

Your blog content here...
```

### Styling
- Colors and themes: `src/app/globals.css`
- Component styles: Individual component files
- Dark mode: Automatically handled by next-themes

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Update URLs**
   - Update the domain in `src/app/sitemap.ts`
   - Update social links in components

### Deploy on Other Platforms

The project can also be deployed on:
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect your GitHub repo
- **DigitalOcean App Platform**: Use the GitHub integration

## 📧 Contact Form Integration

The contact form currently logs to console. To make it functional:

1. **Using Formspree**:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

2. **Using Resend**:
   ```typescript
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Page**: Create a new folder in `src/app/`
2. **New Component**: Add to `src/components/`
3. **New Blog Post**: Add Markdown file to `content/blog/`
4. **New Project**: Update `content/projects.json`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Flash0104/Portfolio/issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

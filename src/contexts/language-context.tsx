"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "de" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About", 
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    
    // Hero Section
    "hero.greeting": "Hi, I'm",
    "hero.role": "Software Engineer & Full-Stack Developer",
    "hero.description": "I'm a passionate software engineer with expertise in modern web technologies. I love building scalable applications and solving complex problems with clean, efficient code. Currently focused on React, Next.js, and cloud technologies.",
    "hero.contact": "Get In Touch",
    "hero.download": "Download CV",
    
    // Projects
    "projects.featured": "Featured",
    "projects.title": "Projects",
    "projects.description": "Some of my recent work that I'm proud of",
    "projects.viewAll": "View All Projects",
    "projects.code": "Code",
    "projects.demo": "Live Demo",
    "projects.pageTitle": "My Projects",
    "projects.pageDescription": "A collection of projects I've worked on, showcasing my skills in web development, mobile apps, and software engineering.",
    "projects.loading": "Loading projects...",
    "projects.noProjects": "No projects found.",
    "projects.technologies": "Technologies",
    "projects.github": "View on GitHub",
    "projects.live": "Live Demo",
    
    // Project Details
    "project.lieferspatz.title": "Lieferspatz - Food Delivery Platform",
    "project.lieferspatz.description": "A comprehensive food delivery platform with multi-user authentication (Customer, Restaurant, Admin), real-time cart management, and PostgreSQL database. Features include restaurant dashboards, order processing, and payment integration.",
    "project.screener.title": "Screener - Live Streaming & Recording Platform",
    "project.screener.description": "A complete video collaboration platform with WebRTC live streaming, professional screen recording, and cloud video management. Features real-time peer-to-peer video calls, screen capture with camera overlay, and Cloudinary-powered video gallery.",
    "project.taskmanager.title": "Task Management App",
    "project.taskmanager.description": "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    "project.weather.title": "Weather Dashboard",
    "project.weather.description": "A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using multiple weather APIs.",
    "project.portfolio.title": "Portfolio Website",
    "project.portfolio.description": "A modern, responsive portfolio website built with Next.js 14, featuring a blog system, project showcase, and contact form.",
    "project.chatapp.title": "Real-time Chat Application",
    "project.chatapp.description": "A real-time chat application with instant messaging, user authentication, and responsive design using React and Firebase.",
    "project.dashboard.title": "Analytics Dashboard",
    "project.dashboard.description": "A comprehensive analytics dashboard with interactive charts, data visualization, and real-time metrics using D3.js and Vue.js.",
    "project.mobile.title": "Mobile App Development",
    "project.mobile.description": "A cross-platform mobile application built with React Native and Expo, featuring offline support and push notifications.",
    
    // Skills
    "skills.title": "What I Do",
    "skills.subtitle": "Best",
    "skills.description": "I specialize in building modern web applications with cutting-edge technologies",
    
    // About Page
    "about.title": "About Me",
    "about.subtitle": "Get to know me better",
    "about.intro": "Hello! I'm Can Bekiroglu, a passionate software engineer with a love for creating innovative solutions.",
    "about.description": "I'm a dedicated software engineer with expertise in modern web technologies. My journey in programming started several years ago, and I've been constantly learning and growing ever since. I enjoy tackling complex problems and turning ideas into reality through clean, efficient code.",
    "about.experience": "Experience",
    "about.education": "Education",
    "about.skills": "Technical Skills",
    "about.interests": "Interests & Hobbies",
    "about.experienceDesc": "I have experience working with various technologies and frameworks, building scalable web applications and solving complex technical challenges.",
    "about.educationDesc": "Continuous learner with a strong foundation in computer science and software engineering principles.",
    "about.skillsDesc": "Proficient in modern web technologies including React, Next.js, TypeScript, Node.js, and cloud platforms.",
    "about.interestsDesc": "When I'm not coding, I enjoy exploring new technologies, contributing to open source projects, and staying up-to-date with the latest industry trends.",
    "about.myStory": "My Story",
    "about.story1": "I'm a passionate Computer Engineering student at the University of Duisburg-Essen with hands-on experience in data analysis and IT infrastructure. My journey began with a foundation year at FH Aachen University of Applied Sciences, where I built strong fundamentals in computer engineering and achieved a solid 3.2 GPA.",
    "about.story2": "Through internships at Monay and PrioRim Technologies, I've gained practical experience in data analysis using Python, Pandas, and Machine Learning, as well as IT infrastructure management. I specialize in modern web development with React, Next.js, and TypeScript, combining my analytical background with full-stack development skills.",
    "about.story3": "Currently pursuing my Bachelor's degree while continuously expanding my technical skills, I'm passionate about creating innovative digital solutions and exploring the intersection of data science and web development. I'm fluent in German and English, enabling me to work effectively in international environments.",
    "about.frontend": "Frontend",
    "about.frontendDesc": "Modern web interfaces",
    "about.backend": "Backend", 
    "about.backendDesc": "Server-side development",
    "about.toolsCloud": "Tools & Cloud",
    "about.toolsCloudDesc": "Development & deployment",
    "about.dataAnalyst": "Data Analyst Internship",
    "about.monayDesc": "Monay · Apprenticeship",
    "about.istanbulRemote": "Istanbul, Turkey · Remote",
    "about.dataAnalystTask1": "Developed data analysis solutions using Python and Pandas for financial data processing",
    "about.dataAnalystTask2": "Implemented machine learning models with PostgreSQL and MongoDB integration",
    "about.dataAnalystTask3": "Created automated data pipelines and visualization dashboards",
    "about.itInfrastructure": "IT Infrastructure",
    "about.priorimDesc": "PrioRim Technologies · Work Study",
    "about.dusseldorfHybrid": "Düsseldorf, North Rhine-Westphalia, Germany · Hybrid",
    "about.itTask1": "Collaborated with PrioRim Technologies and Altinsoy Manufaktur on infrastructure projects",
    "about.itTask2": "Configured and managed furniture website systems and IT infrastructure",
    "about.itTask3": "Developed technical solutions for web-based business applications",
    "about.bachelorTitle": "Bachelor of Science - Computer Engineering",
    "about.universityDuisburg": "University of Duisburg-Essen",
    "about.duisburgLocation": "Duisburg, North Rhine-Westphalia, Germany",
    "about.bachelorDesc": "Currently pursuing my Bachelor's degree in Computer Engineering, focusing on software development, data structures, algorithms, and modern web technologies.",
    "about.foundationTitle": "Foundation Year - Computer Engineering",
    "about.fhAachen": "FH Aachen University of Applied Sciences",
    "about.aachenLocation": "Aachen, North Rhine-Westphalia, Germany",
    "about.grade": "Grade: 3.2",
    "about.foundationDesc": "Completed foundation year with strong fundamentals in mathematics, physics, and computer science principles, preparing for advanced computer engineering studies.",
    
    // Contact Page
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together",
    "contact.description": "I'm always interested in hearing about new opportunities and interesting projects. Whether you have a question or just want to say hi, feel free to reach out!",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Message sent successfully!",
    "contact.form.error": "Failed to send message. Please try again.",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.subjectPlaceholder": "What's this about?",
    "contact.form.messagePlaceholder": "Tell me about your project or just say hello...",
    "contact.info.title": "Contact Information",
    "contact.info.email": "Email",
    "contact.info.location": "Location",
    "contact.info.availability": "Availability",
    "contact.info.response": "Response Time",
    "contact.info.emailValue": "canbek0104@gmail.com",
    "contact.info.locationValue": "Germany, Duisburg",
    "contact.info.availabilityValue": "Available for freelance",
    "contact.info.responseValue": "Usually within 24 hours",
    
    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Thoughts and insights",
    "blog.description": "I write about web development, programming, and technology trends.",
    "blog.readMore": "Read More",
    "blog.backToBlog": "Back to Blog",
    "blog.publishedOn": "Published on",
    "blog.tags": "Tags",
    "blog.noPosts": "No blog posts found.",
    "blog.loading": "Loading posts...",
    
    // Footer
    "footer.description": "Software Engineer passionate about creating innovative web solutions.",
    "footer.quickLinks": "Quick Links",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js and Tailwind CSS",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.tryAgain": "Try Again",
    "common.close": "Close",
    "common.open": "Open",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.share": "Share"
  },
  de: {
    // Navigation
    home: "Startseite",
    about: "Über mich",
    projects: "Projekte", 
    blog: "Blog",
    contact: "Kontakt",
    
    // Hero Section
    "hero.greeting": "Hallo, ich bin",
    "hero.role": "Software-Ingenieur & Full-Stack-Entwickler",
    "hero.description": "Ich bin ein leidenschaftlicher Software-Ingenieur mit Expertise in modernen Web-Technologien. Ich liebe es, skalierbare Anwendungen zu entwickeln und komplexe Probleme mit sauberem, effizientem Code zu lösen. Derzeit fokussiert auf React, Next.js und Cloud-Technologien.",
    "hero.contact": "Kontakt aufnehmen",
    "hero.download": "Lebenslauf herunterladen",
    
    // Projects
    "projects.featured": "Ausgewählte",
    "projects.title": "Projekte",
    "projects.description": "Einige meiner neuesten Arbeiten, auf die ich stolz bin",
    "projects.viewAll": "Alle Projekte anzeigen",
    "projects.code": "Code",
    "projects.demo": "Live Demo",
    "projects.pageTitle": "Meine Projekte",
    "projects.pageDescription": "Eine Sammlung von Projekten, an denen ich gearbeitet habe und die meine Fähigkeiten in Webentwicklung, mobilen Apps und Software-Engineering zeigen.",
    "projects.loading": "Projekte werden geladen...",
    "projects.noProjects": "Keine Projekte gefunden.",
    "projects.technologies": "Technologien",
    "projects.github": "Auf GitHub ansehen",
    "projects.live": "Live Demo",
    
    // Project Details
    "project.lieferspatz.title": "Lieferspatz - Food Delivery Plattform",
    "project.lieferspatz.description": "Eine umfassende Food-Delivery-Plattform mit Multi-User-Authentifizierung (Kunde, Restaurant, Admin), Echtzeit-Warenkorbverwaltung und PostgreSQL-Datenbank. Funktionen umfassen Restaurant-Dashboards, Bestellabwicklung und Zahlungsintegration.",
    "project.screener.title": "Screener - Live Streaming & Aufzeichnungsplattform",
    "project.screener.description": "Eine vollständige Video-Kollaborationsplattform mit WebRTC-Live-Streaming, professioneller Bildschirmaufzeichnung und Cloud-Video-Management. Funktionen umfassen Echtzeit-Peer-to-Peer-Videoanrufe, Bildschirmaufnahme mit Kamera-Overlay und Cloudinary-gestützte Video-Galerie.",
    "project.taskmanager.title": "Task Management App",
    "project.taskmanager.description": "Eine kollaborative Aufgabenverwaltungsanwendung mit Echtzeit-Updates, Drag-and-Drop-Funktionalität und Team-Kollaborationsfunktionen.",
    "project.weather.title": "Wetter Dashboard",
    "project.weather.description": "Ein responsives Wetter-Dashboard, das aktuelle Wetterbedingungen, Vorhersagen und interaktive Karten mit mehreren Wetter-APIs anzeigt.",
    "project.portfolio.title": "Portfolio Website",
    "project.portfolio.description": "Eine moderne, responsive Portfolio-Website, entwickelt mit Next.js 14, mit Blog-System, Projekt-Showcase und Kontaktformular.",
    "project.chatapp.title": "Echtzeit-Chat-Anwendung",
    "project.chatapp.description": "Eine Echtzeit-Chat-Anwendung mit sofortigen Nachrichten, Benutzerauthentifizierung und responsivem Design mit React und Firebase.",
    "project.dashboard.title": "Analytics Dashboard",
    "project.dashboard.description": "Ein umfassendes Analytics-Dashboard mit interaktiven Diagrammen, Datenvisualisierung und Echtzeit-Metriken mit D3.js und Vue.js.",
    "project.mobile.title": "Mobile App Entwicklung",
    "project.mobile.description": "Eine plattformübergreifende mobile Anwendung mit React Native und Expo, mit Offline-Unterstützung und Push-Benachrichtigungen.",
    
    // Skills
    "skills.title": "Was ich am",
    "skills.subtitle": "besten kann",
    "skills.description": "Ich spezialisiere mich auf die Entwicklung moderner Webanwendungen mit modernsten Technologien",
    
    // About Page
    "about.title": "Über mich",
    "about.subtitle": "Lernen Sie mich besser kennen",
    "about.intro": "Hallo! Ich bin Can Bekiroglu, ein leidenschaftlicher Software-Ingenieur mit einer Liebe für innovative Lösungen.",
    "about.description": "Ich bin ein engagierter Software-Ingenieur mit Expertise in modernen Web-Technologien. Meine Reise in der Programmierung begann vor mehreren Jahren, und ich lerne und wachse seitdem kontinuierlich. Ich genieße es, komplexe Probleme anzugehen und Ideen durch sauberen, effizienten Code in die Realität umzusetzen.",
    "about.experience": "Erfahrung",
    "about.education": "Bildung",
    "about.skills": "Technische Fähigkeiten",
    "about.interests": "Interessen & Hobbys",
    "about.experienceDesc": "Ich habe Erfahrung mit verschiedenen Technologien und Frameworks, beim Erstellen skalierbarer Webanwendungen und beim Lösen komplexer technischer Herausforderungen.",
    "about.educationDesc": "Kontinuierlicher Lerner mit einer starken Grundlage in Informatik und Software-Engineering-Prinzipien.",
    "about.skillsDesc": "Versiert in modernen Web-Technologien einschließlich React, Next.js, TypeScript, Node.js und Cloud-Plattformen.",
    "about.interestsDesc": "Wenn ich nicht programmiere, erkunde ich gerne neue Technologien, trage zu Open-Source-Projekten bei und bleibe über die neuesten Branchentrends auf dem Laufenden.",
    "about.myStory": "Meine Geschichte",
    "about.story1": "Ich bin ein leidenschaftlicher Informatik-Student an der Universität Duisburg-Essen mit praktischer Erfahrung in Datenanalyse und IT-Infrastruktur. Meine Reise begann mit einem Grundlagenjahr an der FH Aachen, wo ich starke Grundlagen in der Informatik aufgebaut und einen soliden 3,2 GPA erreicht habe.",
    "about.story2": "Durch Praktika bei Monay und PrioRim Technologies habe ich praktische Erfahrungen in der Datenanalyse mit Python, Pandas und Machine Learning sowie im IT-Infrastruktur-Management gesammelt. Ich spezialisiere mich auf moderne Webentwicklung mit React, Next.js und TypeScript und kombiniere meinen analytischen Hintergrund mit Full-Stack-Entwicklungsfähigkeiten.",
    "about.story3": "Während ich derzeit meinen Bachelor-Abschluss verfolge und kontinuierlich meine technischen Fähigkeiten erweitere, bin ich leidenschaftlich daran interessiert, innovative digitale Lösungen zu schaffen und die Schnittstelle zwischen Datenwissenschaft und Webentwicklung zu erkunden. Ich spreche fließend Deutsch und Englisch, was es mir ermöglicht, effektiv in internationalen Umgebungen zu arbeiten.",
    "about.frontend": "Frontend",
    "about.frontendDesc": "Moderne Web-Oberflächen",
    "about.backend": "Backend",
    "about.backendDesc": "Server-seitige Entwicklung",
    "about.toolsCloud": "Tools & Cloud",
    "about.toolsCloudDesc": "Entwicklung & Deployment",
    "about.dataAnalyst": "Datenanalyst-Praktikum",
    "about.monayDesc": "Monay · Ausbildung",
    "about.istanbulRemote": "Istanbul, Türkei · Remote",
    "about.dataAnalystTask1": "Entwicklung von Datenanalyse-Lösungen mit Python und Pandas für die Verarbeitung von Finanzdaten",
    "about.dataAnalystTask2": "Implementierung von Machine Learning-Modellen mit PostgreSQL- und MongoDB-Integration",
    "about.dataAnalystTask3": "Erstellung automatisierter Daten-Pipelines und Visualisierungs-Dashboards",
    "about.itInfrastructure": "IT-Infrastruktur",
    "about.priorimDesc": "PrioRim Technologies · İş Öğrencisi",
    "about.dusseldorfHybrid": "Düsseldorf, Nordrhein-Westfalen, Deutschland · Hybrid",
    "about.itTask1": "Zusammenarbeit mit PrioRim Technologies und Altinsoy Manufaktur an Infrastruktur-Projekten",
    "about.itTask2": "Konfiguration und Verwaltung von Möbel-Website-Systemen und IT-Infrastruktur",
    "about.itTask3": "Entwicklung technischer Lösungen für webbasierte Geschäftsanwendungen",
    "about.bachelorTitle": "Bachelor of Science - Informatik",
    "about.universityDuisburg": "Universität Duisburg-Essen",
    "about.duisburgLocation": "Duisburg, Nordrhein-Westfalen, Deutschland",
    "about.bachelorDesc": "Derzeit verfolge ich meinen Bachelor-Abschluss in Informatik mit Fokus auf Softwareentwicklung, Datenstrukturen, Algorithmen und moderne Web-Technologien.",
    "about.foundationTitle": "Grundlagenjahr - Informatik",
    "about.fhAachen": "FH Aachen Fachhochschule",
    "about.aachenLocation": "Aachen, Nordrhein-Westfalen, Deutschland",
    "about.grade": "Note: 3,2",
    "about.foundationDesc": "Abschluss des Grundlagenjahres mit starken Fundamenten in Mathematik, Physik und Informatik-Prinzipien als Vorbereitung auf das fortgeschrittene Informatik-Studium.",
    
    // Contact Page
    "contact.title": "Kontakt aufnehmen",
    "contact.subtitle": "Lassen Sie uns zusammenarbeiten",
    "contact.description": "Ich bin immer interessiert daran, von neuen Möglichkeiten und interessanten Projekten zu hören. Ob Sie eine Frage haben oder einfach nur Hallo sagen möchten, zögern Sie nicht, sich zu melden!",
    "contact.form.name": "Name",
    "contact.form.email": "E-Mail",
    "contact.form.subject": "Betreff",
    "contact.form.message": "Nachricht",
    "contact.form.send": "Nachricht senden",
    "contact.form.sending": "Wird gesendet...",
    "contact.form.success": "Nachricht erfolgreich gesendet!",
    "contact.form.error": "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.",
    "contact.form.namePlaceholder": "Ihr Name",
    "contact.form.emailPlaceholder": "ihre.email@beispiel.com",
    "contact.form.subjectPlaceholder": "Worum geht es?",
    "contact.form.messagePlaceholder": "Erzählen Sie mir von Ihrem Projekt oder sagen Sie einfach Hallo...",
    "contact.info.title": "Kontaktinformationen",
    "contact.info.email": "E-Mail",
    "contact.info.location": "Standort",
    "contact.info.availability": "Verfügbarkeit",
    "contact.info.response": "Antwortzeit",
    "contact.info.emailValue": "canbek0104@gmail.com",
    "contact.info.locationValue": "Deutschland, Duisburg",
    "contact.info.availabilityValue": "Verfügbar für Freelance",
    "contact.info.responseValue": "Normalerweise innerhalb von 24 Stunden",
    
    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Gedanken und Einsichten",
    "blog.description": "Ich schreibe über Webentwicklung, Programmierung und Technologie-Trends.",
    "blog.readMore": "Weiterlesen",
    "blog.backToBlog": "Zurück zum Blog",
    "blog.publishedOn": "Veröffentlicht am",
    "blog.tags": "Tags",
    "blog.noPosts": "Keine Blog-Posts gefunden.",
    "blog.loading": "Posts werden geladen...",
    
    // Footer
    "footer.description": "Software-Ingenieur mit Leidenschaft für innovative Web-Lösungen.",
    "footer.quickLinks": "Schnelllinks",
    "footer.connect": "Verbinden",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.builtWith": "Erstellt mit Next.js und Tailwind CSS",
    
    // Common
    "common.loading": "Wird geladen...",
    "common.error": "Etwas ist schief gelaufen",
    "common.tryAgain": "Erneut versuchen",
    "common.close": "Schließen",
    "common.open": "Öffnen",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.submit": "Absenden",
    "common.edit": "Bearbeiten",
    "common.delete": "Löschen",
    "common.view": "Ansehen",
    "common.share": "Teilen"
  },
  tr: {
    // Navigation
    home: "Ana Sayfa",
    about: "Hakkımda",
    projects: "Projeler",
    blog: "Blog", 
    contact: "İletişim",
    
    // Hero Section
    "hero.greeting": "Merhaba, ben",
    "hero.role": "Yazılım Mühendisi & Full-Stack Geliştirici",
    "hero.description": "Modern web teknolojilerinde uzman, tutkulu bir yazılım mühendisiyim. Ölçeklenebilir uygulamalar geliştirmeyi ve karmaşık problemleri temiz, verimli kodlarla çözmeyi seviyorum. Şu anda React, Next.js ve bulut teknolojilerine odaklanıyorum.",
    "hero.contact": "İletişime Geç",
    "hero.download": "CV İndir",
    
    // Projects
    "projects.featured": "Öne Çıkan",
    "projects.title": "Projeler", 
    "projects.description": "Gurur duyduğum son çalışmalarımdan bazıları",
    "projects.viewAll": "Tüm Projeleri Gör",
    "projects.code": "Kod",
    "projects.demo": "Canlı Demo",
    "projects.pageTitle": "Projelerim",
    "projects.pageDescription": "Web geliştirme, mobil uygulamalar ve yazılım mühendisliği alanlarındaki becerilerimi sergileyen projeler koleksiyonu.",
    "projects.loading": "Projeler yükleniyor...",
    "projects.noProjects": "Proje bulunamadı.",
    "projects.technologies": "Teknolojiler",
    "projects.github": "GitHub'da Görüntüle",
    "projects.live": "Canlı Demo",
    
    // Project Details
    "project.lieferspatz.title": "Lieferspatz - Yemek Teslimat Platformu",
    "project.lieferspatz.description": "Çoklu kullanıcı kimlik doğrulaması (Müşteri, Restoran, Admin), gerçek zamanlı sepet yönetimi ve PostgreSQL veritabanı ile kapsamlı bir yemek teslimat platformu. Restoran panelleri, sipariş işleme ve ödeme entegrasyonu gibi özellikler içerir.",
    "project.screener.title": "Screener - Canlı Yayın & Kayıt Platformu",
    "project.screener.description": "WebRTC canlı yayın, profesyonel ekran kaydı ve bulut video yönetimi ile kapsamlı video işbirliği platformu. Gerçek zamanlı eşler arası video görüşmeleri, kamera overlay'li ekran yakalama ve Cloudinary destekli video galerisi özellikleri içerir.",
    "project.taskmanager.title": "Görev Yönetimi Uygulaması",
    "project.taskmanager.description": "Gerçek zamanlı güncellemeler, sürükle-bırak işlevselliği ve takım işbirliği özellikleri ile işbirlikçi görev yönetimi uygulaması.",
    "project.weather.title": "Hava Durumu Paneli",
    "project.weather.description": "Mevcut hava koşullarını, tahminleri ve birden fazla hava durumu API'si kullanarak etkileşimli haritaları gösteren duyarlı hava durumu paneli.",
    "project.portfolio.title": "Portföy Web Sitesi",
    "project.portfolio.description": "Blog sistemi, proje vitrini ve iletişim formu içeren Next.js 14 ile oluşturulmuş modern, duyarlı portföy web sitesi.",
    "project.chatapp.title": "Gerçek Zamanlı Chat Uygulaması",
    "project.chatapp.description": "React ve Firebase kullanarak anlık mesajlaşma, kullanıcı kimlik doğrulaması ve responsive tasarım özellikli gerçek zamanlı chat uygulaması.",
    "project.dashboard.title": "Analitik Dashboard",
    "project.dashboard.description": "D3.js ve Vue.js kullanarak interaktif grafikler, veri görselleştirme ve gerçek zamanlı metriklere sahip kapsamlı analitik dashboard.",
    "project.mobile.title": "Mobil Uygulama Geliştirme",
    "project.mobile.description": "React Native ve Expo ile oluşturulmuş, offline destek ve push bildirimleri özellikli cross-platform mobil uygulama.",
    
    // Skills
    "skills.title": "En İyi Yaptığım",
    "skills.subtitle": "Şeyler",
    "skills.description": "Modern web uygulamaları geliştirmede en son teknolojilerle uzmanlaşıyorum",
    
    // About Page
    "about.title": "Hakkımda",
    "about.subtitle": "Beni daha iyi tanıyın",
    "about.intro": "Merhaba! Ben Can Bekiroğlu, yenilikçi çözümler yaratma tutkusu olan bir yazılım mühendisiyim.",
    "about.description": "Modern web teknolojilerinde uzman, kendini işine adamış bir yazılım mühendisiyim. Programlama yolculuğum birkaç yıl önce başladı ve o zamandan beri sürekli öğrenmeye ve gelişmeye devam ediyorum. Karmaşık problemlerle uğraşmayı ve fikirleri temiz, verimli kod aracılığıyla gerçeğe dönüştürmeyi seviyorum.",
    "about.experience": "Deneyim",
    "about.education": "Eğitim",
    "about.skills": "Teknik Beceriler",
    "about.interests": "İlgi Alanları & Hobiler",
    "about.experienceDesc": "Çeşitli teknolojiler ve framework'lerle çalışma, ölçeklenebilir web uygulamaları oluşturma ve karmaşık teknik zorlukları çözme deneyimim var.",
    "about.educationDesc": "Bilgisayar bilimleri ve yazılım mühendisliği prensiplerinde güçlü temeli olan sürekli öğrenen.",
    "about.skillsDesc": "React, Next.js, TypeScript, Node.js ve bulut platformları dahil modern web teknolojilerinde yetkin.",
    "about.interestsDesc": "Kod yazmadığım zamanlarda yeni teknolojileri keşfetmeyi, açık kaynak projelere katkıda bulunmayı ve sektördeki en son trendleri takip etmeyi seviyorum.",
    "about.myStory": "Hikayem",
    "about.story1": "Duisburg-Essen Üniversitesi'nde veri analizi ve IT altyapısında uygulamalı deneyime sahip, tutkulu bir Bilgisayar Mühendisliği öğrencisiyim. Yolculuğum FH Aachen Uygulamalı Bilimler Üniversitesi'nde bir hazırlık yılıyla başladı, burada bilgisayar mühendisliğinde güçlü temeller oluşturdum ve 3.2 GPA elde ettim.",
    "about.story2": "Monay ve PrioRim Technologies'deki stajlar aracılığıyla Python, Pandas ve Machine Learning kullanarak veri analizi ile IT altyapı yönetiminde pratik deneyim kazandım. React, Next.js ve TypeScript ile modern web geliştirmede uzmanlaşıyorum, analitik geçmişimi full-stack geliştirme becerileriyle birleştiriyorum.",
    "about.story3": "Şu anda Lisans derecemi sürdürürken teknik becerilerimi sürekli genişletiyorum, yenilikçi dijital çözümler yaratma ve veri bilimi ile web geliştirme kesişimini keşfetme konusunda tutkuluyum. Almanca ve İngilizce akıcı konuşuyorum, bu da uluslararası ortamlarda etkili çalışmamı sağlıyor.",
    "about.frontend": "Frontend",
    "about.frontendDesc": "Modern web arayüzleri",
    "about.backend": "Backend",
    "about.backendDesc": "Sunucu tarafı geliştirme",
    "about.toolsCloud": "Araçlar & Bulut",
    "about.toolsCloudDesc": "Geliştirme & dağıtım",
    "about.dataAnalyst": "Veri Analisti Stajı",
    "about.monayDesc": "Monay · Çıraklık",
    "about.istanbulRemote": "İstanbul, Türkiye · Uzaktan",
    "about.dataAnalystTask1": "Finansal veri işleme için Python ve Pandas kullanarak veri analizi çözümleri geliştirdim",
    "about.dataAnalystTask2": "PostgreSQL ve MongoDB entegrasyonu ile makine öğrenmesi modelleri uyguladım",
    "about.dataAnalystTask3": "Otomatik veri hatları ve görselleştirme panelleri oluşturdum",
    "about.itInfrastructure": "IT Altyapısı",
    "about.priorimDesc": "PrioRim Technologies · İş Öğrencisi",
    "about.dusseldorfHybrid": "Düsseldorf, Kuzey Ren-Vestfalya, Almanya · Hibrit",
    "about.itTask1": "PrioRim Technologies ve Altınsoy Manufaktur ile altyapı projelerinde işbirliği yaptım",
    "about.itTask2": "Mobilya web sitesi sistemleri ve IT altyapısını yapılandırdım ve yönettim",
    "about.itTask3": "Web tabanlı iş uygulamaları için teknik çözümler geliştirdim",
    "about.bachelorTitle": "Lisans - Bilgisayar Mühendisliği",
    "about.universityDuisburg": "Duisburg-Essen Üniversitesi",
    "about.duisburgLocation": "Duisburg, Kuzey Ren-Vestfalya, Almanya",
    "about.bachelorDesc": "Şu anda yazılım geliştirme, veri yapıları, algoritmalar ve modern web teknolojilerine odaklanarak Bilgisayar Mühendisliği lisans derecemi sürdürüyorum.",
    "about.foundationTitle": "Hazırlık Yılı - Bilgisayar Mühendisliği",
    "about.fhAachen": "FH Aachen Uygulamalı Bilimler Üniversitesi",
    "about.aachenLocation": "Aachen, Kuzey Ren-Vestfalya, Almanya",
    "about.grade": "Not: 3.2",
    "about.foundationDesc": "İleri bilgisayar mühendisliği çalışmalarına hazırlık için matematik, fizik ve bilgisayar bilimleri prensiplerinde güçlü temellerle hazırlık yılını tamamladım.",
    
    // Contact Page
    "contact.title": "İletişime Geçin",
    "contact.subtitle": "Birlikte çalışalım",
    "contact.description": "Yeni fırsatlar ve ilginç projeler hakkında duymakla her zaman ilgileniyorum. Bir sorunuz varsa veya sadece merhaba demek istiyorsanız, çekinmeden iletişime geçin!",
    "contact.form.name": "İsim",
    "contact.form.email": "E-posta",
    "contact.form.subject": "Konu",
    "contact.form.message": "Mesaj",
    "contact.form.send": "Mesaj Gönder",
    "contact.form.sending": "Gönderiliyor...",
    "contact.form.success": "Mesaj başarıyla gönderildi!",
    "contact.form.error": "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
    "contact.form.namePlaceholder": "Adınız",
    "contact.form.emailPlaceholder": "email@ornek.com",
    "contact.form.subjectPlaceholder": "Konu nedir?",
    "contact.form.messagePlaceholder": "Projenizden bahsedin veya sadece merhaba deyin...",
    "contact.info.title": "İletişim Bilgileri",
    "contact.info.email": "E-posta",
    "contact.info.location": "Konum",
    "contact.info.availability": "Müsaitlik",
    "contact.info.response": "Yanıt Süresi",
    "contact.info.emailValue": "canbek0104@gmail.com",
    "contact.info.locationValue": "Türkiye",
    "contact.info.availabilityValue": "Freelance için müsait",
    "contact.info.responseValue": "Genellikle 24 saat içinde",
    
    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Düşünceler ve görüşler",
    "blog.description": "Web geliştirme, programlama ve teknoloji trendleri hakkında yazıyorum.",
    "blog.readMore": "Devamını Oku",
    "blog.backToBlog": "Blog'a Dön",
    "blog.publishedOn": "Yayınlanma tarihi",
    "blog.tags": "Etiketler",
    "blog.noPosts": "Blog yazısı bulunamadı.",
    "blog.loading": "Yazılar yükleniyor...",
    
    // Footer
    "footer.description": "Yenilikçi web çözümleri yaratma tutkusu olan yazılım mühendisi.",
    "footer.quickLinks": "Hızlı Bağlantılar",
    "footer.connect": "Bağlantı",
    "footer.rights": "Tüm hakları saklıdır.",
    "footer.builtWith": "Next.js ve Tailwind CSS ile yapıldı",
    
    // Common
    "common.loading": "Yükleniyor...",
    "common.error": "Bir şeyler ters gitti",
    "common.tryAgain": "Tekrar Dene",
    "common.close": "Kapat",
    "common.open": "Aç",
    "common.save": "Kaydet",
    "common.cancel": "İptal",
    "common.submit": "Gönder",
    "common.edit": "Düzenle",
    "common.delete": "Sil",
    "common.view": "Görüntüle",
    "common.share": "Paylaş"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "de", "tr"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CaglarPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await fetch("/api/caglar-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    const contactForm = document.getElementById("contact-form");
    contactForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-yellow-50 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-yellow-500 bg-clip-text text-transparent">
                  Çağlar Bekiroğlu
                </span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Technical Consultant | R&D and Process Management Expert
              </p>
              <p className="text-lg text-muted-foreground">
                Technical Consultant and R&D specialist with 25+ years of experience in engineering, 
                sustainability, product development, and quality/process management.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600" />
                <a href="mailto:caglar.bekiroglu@hotmail.com" className="hover:text-emerald-600 transition-colors">
                  caglar.bekiroglu@hotmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <a href="tel:+905447832706" className="hover:text-emerald-600 transition-colors">
                  +90 544 783 27 06
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span>Kocaeli, Turkey</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToContact}>
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="https://www.linkedin.com/in/çağlar-bekiroğlu-bb110426a" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="https://wa.me/905447832706" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/CVs/CAGLAR_CV_EN.pdf" download target="_blank">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-yellow-500 p-1 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <Image
                    src="/profile-caglar.jpeg"
                    alt="Çağlar Bekiroğlu"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Key <span className="bg-gradient-to-r from-emerald-600 to-yellow-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-emerald-500 transition-colors hover:shadow-emerald-200 dark:hover:shadow-emerald-900">
            <CardHeader>
              <CardTitle className="text-xl">R&D Leadership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                25+ years leading R&D operations, technical development projects, and innovation management across multinational organizations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-teal-500 transition-colors hover:shadow-teal-200 dark:hover:shadow-teal-900">
            <CardHeader>
              <CardTitle className="text-xl">Sustainability Expert</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Former Vice President of IMSAD Sustainability Committee, specializing in green building standards and environmental management.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-yellow-500 transition-colors hover:shadow-yellow-200 dark:hover:shadow-yellow-900">
            <CardHeader>
              <CardTitle className="text-xl">Academic Contributor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Adjunct Lecturer at Gebze Technical University & Sabancı University, sharing expertise in sustainability and technical management.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Get In <span className="bg-gradient-to-r from-emerald-600 to-yellow-600 bg-clip-text text-transparent">Touch</span>
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Have a project or consultation inquiry? Let's connect!
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    ❌ Failed to send message. Please try again or contact directly via email.
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}


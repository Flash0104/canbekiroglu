import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPostMeta } from '@/lib/blog';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-xs text-muted-foreground">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 
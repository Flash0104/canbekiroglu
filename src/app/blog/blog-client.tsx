"use client";

import { BlogCard } from '@/components/blog-card';
import { useLanguage } from '@/contexts/language-context';
import { BlogPostMeta } from '@/lib/blog';

interface BlogPageClientProps {
  posts: BlogPostMeta[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("blog.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("blog.description")}
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("blog.noPosts")}</p>
          </div>
        )}
      </div>
    </div>
  );
} 
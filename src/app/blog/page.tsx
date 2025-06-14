import { getAllPosts } from '@/lib/blog';
import { BlogPageClient } from './blog-client';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogPageClient posts={posts} />;
} 
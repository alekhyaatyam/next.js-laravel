import { PostDashboard } from '@/components/post-dashboard';
import { getPosts } from '@/lib/api';

export default async function HomePage() {
  const posts = await getPosts().catch(() => []);

  return <PostDashboard initialPosts={posts} />;
}

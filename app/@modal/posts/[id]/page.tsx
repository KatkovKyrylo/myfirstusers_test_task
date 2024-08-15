import fs from 'fs';
import path from 'path';
import { FC } from 'react';
import { Post } from '@/types/Post';
import { PostModal } from '@/components/PostModal';

type Props = {
  params: {
    id: string;
  };
};

const BlogPostPage: FC<Props> = ({ params }) => {
  const posts: Post[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'blogs.json'), 'utf8')
  );
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostModal post={post} />;
};

export async function generateStaticParams() {
  const posts: Post[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'blogs.json'), 'utf8')
  );

  return posts.map((post) => ({ id: post.id }));
}

export default BlogPostPage;

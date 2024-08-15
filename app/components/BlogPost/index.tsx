import { Post } from '@/types/Post';
import Link from 'next/link';
import { FC } from 'react';
import { Card } from '@/components/ui/card';

type Props = {
  post: Post;
};

export const BlogPost: FC<Props> = ({ post }) => (
  <Link href={`/posts/${post.id}`} className='relative h-fit'>
    <Card
      style={{
        backgroundImage: `url(${post.imageUrl + '?' + post.id})`,
      }}
      className='bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md bg-cover cursor-pointer'
    >
      <h3 className='font-bold text-lg mb-3 text-white z-[1] relative'>
        {post.title}
      </h3>
      <div className='flex justify-between items-center z-[1] relative'>
        <span className='text-sm text-white'>{post.duration}</span>
        <span className='bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white'>
          {post.tag}
        </span>
      </div>
    </Card>
    <div className='absolute inset-0 bg-[linear-gradient(rgba(000,000,000,0.5),rgba(000,000,000,0.4))] rounded-xl'></div>
  </Link>
);

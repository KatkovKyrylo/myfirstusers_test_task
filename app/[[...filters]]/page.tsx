import type { FC } from 'react';
import Link from 'next/link';
import { Post } from '@/types/Post';
import fs from 'fs';
import path from 'path';
import { categories } from '@/data/categories';
import { BlogPost } from '../components/BlogPost';
import { PostCategory } from '../components/Category';

type Props = {
  params: { filters: string };
};

const MarketingDashboard: FC<Props> = ({ params: { filters = '' } }) => {
  const posts: Post[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'blogs.json'), 'utf8')
  );
  const selectedFilter = filters?.[0];

  const filteredExamples = !selectedFilter
    ? posts
    : posts.filter(
        (post) => post.tag.toLowerCase() === selectedFilter?.toLowerCase()
      );

  return (
    <div className='p-[5%] bg-white text-gray-800 min-h-screen'>
      <header className='mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-0'>
          MY FIRST USERS
        </h1>
        <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
          <button className='bg-gray-200 hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg text-sm text-gray-700'>
            Get 6 new tips in your inbox every Monday
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold text-white'>
            Yes Please :)
          </button>
          <Link href='/posts/create'>
            <button
              tabIndex={0}
              className='bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold text-white'
            >
              Add new post
            </button>
          </Link>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='lg:col-span-1'>
          {categories.map((category, index) => (
            <PostCategory
              key={index}
              category={category}
              selectedFilter={selectedFilter}
            />
          ))}
        </div>

        <div className='lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredExamples.map((example, index) => (
            <BlogPost post={example} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;


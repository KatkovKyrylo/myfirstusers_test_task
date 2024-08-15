import type { FC } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Post } from '@/types/Post';
import fs from 'fs';
import path from 'path';
import { categories } from '@/data/categories';

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
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='lg:col-span-1'>
          {categories.map((category, index) => (
            <div key={index} className='mb-6'>
              <h2 className='font-bold text-lg mb-3 text-blue-600'>
                {category.title}
              </h2>
              <div className='flex flex-wrap gap-2'>
                {category.items.map((item, itemIndex) => {
                  const isActive =
                    item.toLowerCase() === selectedFilter?.toLowerCase();

                  return (
                    <Link
                      href={isActive ? '/' : `/${item.toLowerCase()}`}
                      key={itemIndex}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className='lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredExamples.map((example, index) => (
            <Link key={index} href={`/posts/${example.id}`} className='h-fit'>
              <Card className='bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md cursor-pointer'>
                <h3 className='font-bold text-lg mb-3 text-blue-600'>
                  {example.name}
                </h3>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>
                    {example.duration}
                  </span>
                  <span className='bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white'>
                    {example.tag}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;


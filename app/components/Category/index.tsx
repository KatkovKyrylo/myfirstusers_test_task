import { Category } from '@/types/Category';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  category: Category;
  selectedFilter?: string;
};

export const PostCategory: FC<Props> = ({ category, selectedFilter }) => (
  <div className='mb-6'>
    <h2 className='font-bold text-lg mb-3 text-blue-600'>{category.title}</h2>
    <div className='flex flex-wrap gap-2'>
      {category.items.map((item, itemIndex) => {
        const isActive = item.toLowerCase() === selectedFilter?.toLowerCase();

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
);

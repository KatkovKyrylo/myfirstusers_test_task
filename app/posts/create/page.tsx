'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/Post';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  tag: z.string({ message: 'Tag is required.' }),
  duration: z.string({ message: 'Duration is required.' }),
  content: z.string({ message: 'Content is required.' }),
});

const fields: (keyof Omit<Post, 'id' | 'imageUrl'>)[] = [
  'title',
  'tag',
  'duration',
  'content',
];

const CreatePostForm = () => {
  const router = useRouter();
  const form = useForm<Omit<Post, 'id'>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Omit<Post, 'id'>> = async (postData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...postData,
        imageUrl: 'https://picsum.photos/700/700',
      }),
    });

    if (response.ok) {
      router.push('/');
      form.reset();
    } else {
      console.error('Failed to create post');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 p-9 max-w-lg mx-auto'
      >
        <h1 className='font-medium'>Create a post</h1>
        {fields.map((fieldName, i) => (
          <FormField
            key={i}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>{fieldName}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;

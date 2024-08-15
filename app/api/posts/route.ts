import fs from 'fs';
import path from 'path';

export const POST = async (request: Request) => {
  const postData = await request.json();
  const filePath = path.join(process.cwd(), 'data', 'blogs.json');

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const blogs = JSON.parse(fileContent);

  const newId = (blogs.length + 1).toString();

  const newBlogPost = {
    id: newId,
    ...postData,
  };

  blogs.push(newBlogPost);

  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));

  return new Response(
    JSON.stringify({ message: 'Post created successfully!' }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

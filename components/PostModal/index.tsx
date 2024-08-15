'use client';

import { Post } from '@/types/Post';
import { FC, useEffect } from 'react';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
  post: Post;
};

export const PostModal: FC<Props> = ({
  post: { id, name, tag, duration, imageUrl, content },
}) => {
  const router = useRouter();

  const handleClose = () => router.back();

  useEffect(() => {
    document.title = name;
  }, [name]);

  return (
    <Modal title={name} onClose={handleClose}>
      <p>Duration: {duration}</p>
      <p>Tag: {tag}</p>
      <p>Content: {content}</p>
      <br />
      <Image src={imageUrl + '?' + id} alt={name} width={600} height={600} />
    </Modal>
  );
};

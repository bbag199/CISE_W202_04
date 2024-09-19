'use client';

import { useParams } from 'next/navigation';

const PostPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Post ID: {id}</h1>
      {/* Fetch and display the content based on the `id` */}
    </div>
  );
};

export default PostPage;

import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

const Post = ({ saved }) => {
  return (
    <section className='bg-white shadow-2xl p-5 my-12 rounded-md border'>
      <Link href={`/${saved?.user_name}`}>
        <a>
          <div className='flex items-center gap-5'>
            <Avatar letter={saved?.user_name[0].toUpperCase()} />
            <p>{saved?.user_name}</p>
          </div>
        </a>
      </Link>
      <hr className='my-4' />
      <Link href={`/post/${saved.post_id}`}>
        <a>
          <p className='leading-relaxed'>{saved.saved_content}</p>
        </a>
      </Link>
    </section>
  );
};

export default Post;

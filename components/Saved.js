import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';
import moment from 'moment';

const Post = ({ saved }) => {
  return (
    <section className='bg-white dark:bg-gray-800 shadow-2xl p-5 my-12 rounded-md dark:border-none border'>
      <Link href={`/${saved?.user_name}`}>
        <a>
          <div className='flex items-center gap-5'>
            <Avatar letter={saved?.user_name[0].toUpperCase()} />
            <p>{saved?.user_name}</p>
          </div>
          <p className='text-xs text-gray-300 my-5'>
            {moment(saved.updated_at).fromNow()}
          </p>
        </a>
      </Link>
      <hr className='my-4 dark:border-gray-600' />
      <Link href={`/post/${saved.post_id}`}>
        <a>
          <p className='leading-relaxed'>{saved.saved_content}</p>
        </a>
      </Link>
    </section>
  );
};

export default Post;

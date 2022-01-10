import React from 'react';
import { useState } from 'react';
import AddPost from '../components/AddPost';
import Post from '../components/Post';
import Seo from '../components/Seo';
import { API_URL } from '../config';
import { parseCookies } from '../helpers';

const HomePage = ({ token, posts: storedPosts }) => {
  const [posts, setPosts] = useState(storedPosts);

  return (
    <>
      <Seo title='Home' />
      <div className='container mx-auto px-5 md:px-20'>
        {token === '' ? (
          <p className='text-lg my-8 dark:text-gray-300 text-gray-500'>
            Login/Signup to add a post
          </p>
        ) : (
          <AddPost token={token} posts={posts} setPosts={setPosts} />
        )}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/posts?_sort=created_at:DESC`);
  const data = await res.json();

  return {
    props: {
      posts: data,
      token: token ? token : '',
    },
  };
};

export default HomePage;

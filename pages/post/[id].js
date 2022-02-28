import Link from 'next/link';
import Post from '../../components/Post';
import Seo from '../../components/Seo';
import { API_URL } from '../../config';
import Comment from '../../components/Comment';
import { parseCookies } from '../../helpers';
import AddComment from '../../components/AddComment';
import { useState } from 'react';

const PostDetailsPage = ({ token, postDetails, myData }) => {
  const savedCheck = myData.filter(
    (data) => data.saved_content === postDetails.post_content
  );

  const newPosts = postDetails.comments.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  const [comments, setComments] = useState(newPosts);

  return (
    <>
      <Seo title='Post' />
      <div className='container mx-auto px-5 md:px-20'>
        <Post
          post={postDetails}
          showLikes
          token={token}
          savedCheck={savedCheck}
        />
        <h3 className='text-2xl my-3'>Comments</h3>
        {token === '' ? (
          <span className='text-md dark:text-gray-300 text-gray-500'>
            <Link href='/account/login'>
              <a className='underline'>Login</a>
            </Link>{' '}
            /
            <Link href='/account/signup'>
              <a className='underline'>Signup</a>
            </Link>{' '}
            to comment
          </span>
        ) : (
          <AddComment
            comments={comments}
            setComments={setComments}
            postID={postDetails.id}
            token={token}
          />
        )}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            token={token}
            setComments={setComments}
            comments={comments}
          />
        ))}
        {postDetails.comments.length === 0 && <p>No comments in this post!</p>}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req, query: { id } }) => {
  const { token } = parseCookies(req);

  // Query single post!
  const res = await fetch(`${API_URL}/posts/${id}`);
  const data = await res.json();

  //query for user name!
  const personalRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const personalData = await personalRes.json();

  // Query userdata!
  const userRes = await fetch(
    `${API_URL}/users?username=${personalData.username}`
  );
  const myData = await userRes.json();

  const checkData = myData.length === 0 ? [] : myData[0]?.saved;

  return {
    props: {
      postDetails: data,
      token: token ? token : '',
      myData: checkData,
    },
  };
};

export default PostDetailsPage;

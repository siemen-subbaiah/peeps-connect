import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { API_URL } from '../config';
import { AuthContext } from '../context/AuthState';

const AddPost = ({ token, posts, setPosts }) => {
  const [postContent, setPostContent] = useState('');

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postContent) {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_content: postContent,
          user: { id: user.id },
        }),
      });
      const data = await res.json();
      setPosts([data, ...posts]);
      setPostContent('');
      toast.success('Post posted successfully!');
    } else {
      toast.error('Please add the content!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name='content'
        placeholder='What’s happening?'
        className='border-2 p-3 h-36 outline-none w-full rounded-md'
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button className='bg-primary px-8 py-2 rounded-md text-white my-2'>
        Post
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddPost;

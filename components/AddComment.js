import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { API_URL } from '../config';
import { AuthContext } from '../context/AuthState';

const AddComment = ({ token, comments, setComments, postID }) => {
  const [commentContent, setCommentContent] = useState('');

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentContent) {
      const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment_content: commentContent,
          post: {
            id: postID,
          },
          user: { id: user.id },
          user_name: user.username,
        }),
      });
      const data = await res.json();
      setComments([data, ...comments]);
      setCommentContent('');
      toast.success('Comment posted successfully!');
    } else {
      toast.error('Please add the comment!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <textarea
        name='content'
        placeholder='Enter your comment here'
        className='border-2 p-3 h-24 outline-none w-full rounded-md'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button className='bg-primary px-8 py-2 rounded-md text-white my-3'>
        Comment
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddComment;

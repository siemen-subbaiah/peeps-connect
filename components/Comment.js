import { MdDelete, MdEdit } from 'react-icons/md';
import Link from 'next/link';
import Avatar from './Avatar';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthState';
import { API_URL } from '../config';

const Post = ({ token, comment, setComments, comments }) => {
  const { user } = useContext(AuthContext);

  const check = user?.username === comment?.user_name;

  const [toggleEdit, setToggleEdit] = useState(false);
  const [editContent, setEditContent] = useState('');

  const handleEditBox = async () => {
    setToggleEdit(true);
    setEditContent(comment?.comment_content);
  };

  const handleEdit = async (id) => {
    if (editContent) {
      const res = await fetch(`${API_URL}/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment_content: editContent,
        }),
      });
      const data = await res.json();
      console.log(data);
      setToggleEdit(false);
      setComments(comments.map((item) => (item.id === data.id ? data : item)));
      toast.success('Comment updated!');
    } else {
      toast.error('Please add the updated comment!');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <section className='bg-white dark:bg-gray-800 p-5 my-8 rounded-md dark:border-none border-2'>
      <Link href={`/${comment?.user_name}`}>
        <a>
          <div className='flex items-center gap-5'>
            <Avatar letter={comment?.user_name[0].toUpperCase()} />
            <p>{comment?.user_name}</p>
          </div>
        </a>
      </Link>
      <hr className='my-4 dark:border-gray-600' />
      <div className='flex md:items-center justify-between md:flex-row flex-col'>
        {toggleEdit ? (
          <div>
            <textarea
              type='text'
              name='post'
              className='border p-3 h-24 outline-none md:w-[400%] w-full rounded-md'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className='flex gap-3'>
              <button
                onClick={() => handleEdit(comment.id)}
                className='bg-primary px-6 py-1 rounded-md text-white my-4'
              >
                Edit
              </button>
              <button
                onClick={() => setToggleEdit(false)}
                className='bg-[#661EA7] px-5 py-1 rounded-md text-white my-4'
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className='leading-relaxed'>{comment?.comment_content}</p>
        )}
        {check && (
          <div className='flex items-center gap-3 mt-5 cursor-pointer'>
            <MdDelete
              className='h-6 w-6 text-red-500'
              onClick={() => handleDelete(comment.id)}
            />
            <MdEdit className='h-6 w-6 text-gray-500' onClick={handleEditBox} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Post;

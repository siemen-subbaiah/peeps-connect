import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import Link from 'next/link';
import Avatar from './Avatar';
import { API_URL } from '../config';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthState';
import { useRouter } from 'next/router';

const Post = ({
  post,
  showLikes,
  noShow,
  username,
  crud,
  setPosts,
  posts,
  token,
  savedCheck,
}) => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [editContent, setEditContent] = useState('');

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditBox = async (id) => {
    setToggleEdit(true);
    setEditContent(post.post_content);
  };

  const handleEdit = async (id) => {
    if (editContent) {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_content: editContent,
        }),
      });
      const data = await res.json();

      // EDIT THE SAVED ONES TOO!

      const editRes = await fetch(`${API_URL}/saveds/savedEdit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          saved_content: editContent,
        }),
      });
      const editData = await editRes.json();
      console.log(editData);

      setToggleEdit(false);
      setPosts(posts.map((item) => (item.id === data.id ? data : item)));
      toast.success('Post updated!');
    } else {
      toast.error('Please add the updated comment!');
    }
  };

  const handleSaved = async () => {
    const res = await fetch(`${API_URL}/saveds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        saved_content: post.post_content,
        post_id: post.id,
        user: {
          id: user.id,
        },
        user_name: post?.user?.username,
      }),
    });
    const data = await res.json();
    router.push('/account/dashboard');
  };

  const handleSavedDelete = async (id) => {
    await fetch(`${API_URL}/saveds/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push('/account/dashboard');
  };

  return (
    <section className='bg-white dark:bg-gray-800 shadow-2xl p-5 my-12 rounded-md dark:border-none border'>
      <Link href={`/${username ? username : post?.user?.username}`}>
        <a>
          {noShow ? (
            <div className='flex items-center gap-5'>
              <Avatar letter={username ? username[0].toUpperCase() : 'P'} />
              <p>{username}</p>
            </div>
          ) : (
            <div className='flex items-center gap-5'>
              <Avatar letter={post?.user?.username[0].toUpperCase()} />
              <p>{post?.user?.username}</p>
            </div>
          )}
        </a>
      </Link>
      <hr className='my-4 dark:border-gray-600' />
      <div className='flex md:items-center justify-between md:flex-row flex-col'>
        {toggleEdit ? (
          <div>
            <textarea
              type='text'
              name='post'
              className='border p-3 h-24 outline-none md:w-[400%] w-full rounded-md dark:text-black'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className='flex gap-3'>
              <button
                onClick={() => handleEdit(post.id)}
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
          <Link href={`/post/${post.id}`}>
            <a>
              <p className='leading-relaxed'>{post.post_content}</p>
            </a>
          </Link>
        )}
        {crud && (
          <div className='flex items-center gap-3 mt-5 cursor-pointer'>
            <MdDelete
              className='h-6 w-6 text-red-500'
              onClick={() => handleDelete(post.id)}
            />
            <MdEdit className='h-6 w-6 text-gray-500' onClick={handleEditBox} />
          </div>
        )}
      </div>
      <hr className='my-4  dark:border-gray-600' />
      {showLikes && (
        <div className='gap-3 flex justify-end items-center'>
          {token && (
            <>
              {savedCheck.length > 0 ? (
                <>
                  <p>saved</p>
                  <BsFillBookmarkFill
                    className='h-6 w-6 cursor-pointer'
                    onClick={() => handleSavedDelete(savedCheck[0].id)}
                  />
                </>
              ) : (
                <>
                  <p>save</p>
                  <BsBookmark
                    className='h-6 w-6 cursor-pointer'
                    onClick={handleSaved}
                  />
                </>
              )}
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default Post;

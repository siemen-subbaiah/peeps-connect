import moment from 'moment';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthState';
import { API_URL } from '../../config';
import { parseCookies } from '../../helpers';
import Post from '../../components/Post';
import Saved from '../../components/Saved';
import Seo from '../../components/Seo';

const DashboardPage = ({ token, myData }) => {
  const { user } = useContext(AuthContext);

  const [toggle, setToggle] = useState(0);

  const newPosts = myData.posts.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  const newSaved = myData?.saved?.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  const [posts, setPosts] = useState(newPosts);
  const [toggleEdit, setToggleEdit] = useState(false);

  // SAVE USERNAME AND EMAIL IN LOCAL STORAGE ONCE THE USER IS LOGGED IN!
  const localName = JSON.parse(localStorage.getItem('accdet'))?.username
    ? JSON.parse(localStorage.getItem('accdet'))?.username
    : user?.username;
  const localEmail = JSON.parse(localStorage.getItem('accdet'))?.email
    ? JSON.parse(localStorage.getItem('accdet'))?.email
    : user?.email;

  const [name, setName] = useState(localName);
  const [email, setEmail] = useState(localEmail);

  const handleEdits = async () => {
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: name,
        email,
      }),
    });
    const data = await res.json();
    console.log(data);

    const obj = { username: data.username, email: data.email };

    localStorage.setItem('accdet', JSON.stringify(obj));

    setToggleEdit(false);
  };

  return (
    <>
      <Seo title='My account' />
      <div className='container mx-auto md:px-20 px-5'>
        <section>
          <div className='flex justify-between items-start flex-col md:flex-row'>
            <div className='md:w-[150px] md:h-[150px] w-[100px] h-[100px] mb-5 rounded-full bg-primary flex justify-center items-center text-5xl text-white'>
              {user?.username[0].toUpperCase()}
            </div>
            <button
              className='bg-primary px-5 py-1 rounded-md text-white my-3 md:my-0'
              onClick={() => setToggleEdit(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className='flex justify-between items-start flex-col md:flex-row'>
            <div>
              {toggleEdit ? (
                <div>
                  <input
                    type='text'
                    name='name'
                    className='p-2 my-3 border border-primary outline-none rounded w-full'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              ) : (
                <div className='flex items-center gap-3 my-3'>
                  <MdOutlineAccountCircle className='h-8 w-8' />
                  <h1 className='text-xl'>{name}</h1>
                </div>
              )}
              <div className='flex'>
                <div>
                  {toggleEdit ? (
                    <div>
                      <input
                        type='email'
                        name='email'
                        className='p-2 my-3 border border-primary outline-none rounded w-full'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className='flex gap-3'>
                        <button
                          className='bg-primary px-5 py-1 rounded-md text-white my-3 md:my-0'
                          onClick={handleEdits}
                        >
                          edit
                        </button>
                        <button
                          className='bg-[#661EA7] px-5 py-1 rounded-md text-white my-3 md:my-0'
                          onClick={() => setToggleEdit(false)}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center gap-3'>
                      <FiMail className='h-8 w-8' />
                      <h1 className='text-sm md:text-xl'>{email}</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3 text-gray-500'>
              <AiOutlineCalendar className='h-8 w-8' />
              <p className='my-5 md:my-0 text-xs md:text-sm'>
                Joined {moment(user?.created_at).format('MMM YYYY')}
              </p>
            </div>
          </div>
        </section>
        <hr className='my-5' />
        <section className='my-5'>
          <div className='flex justify-center md:justify-start'>
            <button
              className={`${
                toggle === 0 ? 'bg-primary' : 'bg-gray-400'
              } py-3 px-9 rounded-tl-lg rounded-bl-lg text-white w-min`}
              onClick={() => setToggle(0)}
            >
              Posts
            </button>
            <button
              className={`${
                toggle === 1 ? 'bg-primary' : 'bg-gray-400'
              } py-3 px-9 rounded-tr-lg rounded-br-lg  text-white w-min`}
              onClick={() => setToggle(1)}
            >
              Saved
            </button>
          </div>
          {toggle === 0 ? (
            <>
              {posts?.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  noShow
                  username={user?.username}
                  crud
                  posts={posts}
                  setPosts={setPosts}
                  token={token}
                />
              ))}
              {myData?.posts.length === 0 && (
                <p className='my-10 text-center md:text-3xl text-2xl'>
                  No posts yet
                </p>
              )}
            </>
          ) : (
            <>
              {newSaved.map((saved) => (
                <Saved key={saved.id} saved={saved} />
              ))}
              {myData?.saved.length === 0 && (
                <p className='my-10 text-center md:text-3xl text-2xl'>
                  No saved posts yet
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  const userRes = await fetch(`${API_URL}/users?username=${data.username}`);
  const myData = await userRes.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
      myData: myData[0],
    },
  };
};

export default DashboardPage;

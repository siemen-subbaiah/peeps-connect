import { MdOutlineAccountCircle } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { API_URL } from '../config';
import Post from '../components/Post';
import Seo from '../components/Seo';

const AccountDetailsPage = ({ userDetails }) => {
  return (
    <>
      <Seo title={userDetails?.username} />
      <div className='container mx-auto md:px-20 px-5'>
        <section>
          <div className='w-[150px] h-[150px] mb-5 rounded-full bg-primary flex justify-center items-center text-5xl text-white'>
            {userDetails?.username[0].toUpperCase()}
          </div>
          <div className='flex justify-between items-start'>
            <div>
              <div className='flex items-center gap-3 my-3'>
                <MdOutlineAccountCircle className='h-8 w-8' />
                <h1 className='text-xl'>{userDetails?.username}</h1>
              </div>
              <div className='flex'>
                <div>
                  <div className='flex items-center gap-3'>
                    <FiMail className='h-8 w-8' />
                    <h1 className='text-xl'>{userDetails?.email}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3 text-gray-500'>
              <AiOutlineCalendar className='h-8 w-8' />
              <p>
                Joined {new Date(userDetails?.created_at).toLocaleDateString()}
                {/* use moment! */}
              </p>
            </div>
          </div>
        </section>
        <hr className='my-5' />
        <section className='my-5'>
          <div className='bg-primary py-3 px-9 rounded-lg  text-white w-min'>
            Posts
          </div>
          {userDetails?.posts?.map((post) => (
            <Post
              key={post.id}
              post={post}
              noShow
              username={userDetails?.username}
            />
          ))}
          {userDetails?.posts?.length === 0 && (
            <p className='my-10 text-center text-3xl'>No posts yet</p>
          )}
        </section>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query: { user } }) => {
  const res = await fetch(`${API_URL}/users?username=${user}`);
  const data = await res.json();

  return {
    props: {
      userDetails: data[0],
    },
  };
};

export default AccountDetailsPage;

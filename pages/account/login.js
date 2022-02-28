import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Seo from '../../components/Seo';
import { AuthContext } from '../../context/AuthState';
import ill from '../../public/images/ill.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading,setLoading] = useState(false)

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true)
    login({ identifier: email, password });
  };

  return (
    <>
      <Seo title='Login' />
      <div className='container mx-auto px-5 md:px-32 my-5'>
        <div className='grid md:grid-cols-2 items-center gap-16'>
          <Image src={ill} blurDataURL={ill} alt='ill' placeholder='blur' />
          <form onSubmit={handleSubmit}>
            <div className='my-4'>
              <input
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-primary p-3 w-full rounded-md outline-none text-black'
              />
            </div>
            <div className='my-4'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-primary p-3 w-full rounded-md outline-none text-black'
              />
            </div>
            <button className='bg-primary text-white px-5 py-2 rounded-md w-full'>
              Login
            </button>
            <p className='mt-5 dark:text-gray-300 text-gray-500'>
              Don't have an account?{' '}
              <Link href='/account/signup'>
                <a className='underline'>Signup</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;

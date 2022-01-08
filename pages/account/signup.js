import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Seo from '../../components/Seo';
import { AuthContext } from '../../context/AuthState';
import ill from '../../public/images/ill.svg';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username: name, email, password });
  };

  return (
    <>
      <Seo title='Signup' />
      <div className='container mx-auto px-5 md:px-32 my-5'>
        <div className='grid md:grid-cols-2 items-center gap-16'>
          <Image src={ill} blurDataURL={ill} alt='ill' placeholder='blur' />
          <form onSubmit={handleSubmit}>
            <div className='my-4'>
              <input
                type='name'
                name='name'
                placeholder='User name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-primary p-3 w-full rounded-md outline-none'
              />
            </div>
            <div className='my-4'>
              <input
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-primary p-3 w-full rounded-md outline-none'
              />
            </div>
            <div className='my-4'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-primary p-3 w-full rounded-md outline-none'
              />
            </div>
            <button className='bg-primary text-white px-5 py-2 rounded-md w-full'>
              Signup
            </button>
            <p className='mt-5 text-gray-500'>
              Have an account?{' '}
              <Link href='/account/login'>
                <a className='underline'>Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

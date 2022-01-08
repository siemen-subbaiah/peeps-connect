import { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { AuthContext } from '../context/AuthState';
import AccountAvatar from './AccountAvatar';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='md:px-20 p-5 md:flex items-center justify-between bg-primary text-white mb-5'>
      <div className='w-16 md:w-52'>
        <Link href='/'>
          <a>
            <h1 className='text-2xl'>PeepsConnect</h1>
          </a>
        </Link>
      </div>
      <GiHamburgerMenu
        className='h-8 w-8 absolute right-2 top-5 md:hidden cursor-pointer'
        onClick={() => setToggle(!toggle)}
      />
      <ul
        className={` md:flex items-center md:gap-20 ${
          toggle ? 'none' : ' hidden'
        }`}
      >
        {user ? (
          <>
            <li
              className='my-5 md:my-0 md:hidden'
              onClick={() => setToggle(false)}
            >
              <Link href='/account/dashboard'>Account</Link>
            </li>
            <li
              className='my-5 md:my-0 md:hidden'
              onClick={() => {
                setToggle(!toggle);
                logout();
                localStorage.removeItem('accdet');
              }}
            >
              <a href='#'>Logout</a>
            </li>
            <li className='my-5 md:my-0 hidden md:block'>
              <AccountAvatar />
            </li>
          </>
        ) : (
          <>
            <li className='my-5 md:my-0' onClick={() => setToggle(false)}>
              <Link href='/account/login'>Login</Link>
            </li>
            <button className='bg-primary md:bg-[#661EA7] md:px-3 rounded-md md:py-1'>
              <li className='my-5 md:my-0 ' onClick={() => setToggle(false)}>
                <Link href='/account/signup'>Signup</Link>
              </li>
            </button>
          </>
        )}
        <li className='my-5 md:my-0 ' onClick={() => setToggle(false)}>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

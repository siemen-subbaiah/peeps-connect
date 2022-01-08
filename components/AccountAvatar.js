import Link from 'next/link';
import { useContext } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import { AuthContext } from '../context/AuthState';

const AccountAvatar = () => {
  const [toggle, setToggle] = useState(false);

  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className='h-10 rounded-full w-10 bg-primary text-white text-lg flex justify-center items-center cursor-pointer'>
        <MdAccountCircle
          className='h-9 w-9'
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {toggle && (
        <div className='bg-white shadow-md text-black absolute top-[4.3rem] pr-20 pl-4 rounded-md right-52'>
          <ul>
            <li className='my-3' onClick={() => setToggle(false)}>
              <Link href='/account/dashboard'>Profile</Link>
            </li>
            <li className='my-3' onClick={logout}>
              <a href='#'>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AccountAvatar;

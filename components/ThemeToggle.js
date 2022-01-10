import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthState';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AuthContext);

  return (
    <div className='flex items-center md:justify-center w-full'>
      <label htmlFor='toggleB' className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input type='checkbox' id='toggleB' className='sr-only' />
          <div
            className={`block ${
              theme === 'light' ? 'bg-[#4f2475]' : 'bg-gray-800'
            } w-14 h-8 rounded-full`}
            onClick={toggleTheme}
          >
            <div
              className={`absolute left-1 top-1 ${
                theme === 'light' ? 'bg-black' : 'bg-white'
              } w-6 h-6 rounded-full transition ${
                theme === 'light' && 'translate-x-[100%]'
              }`}
            ></div>
          </div>
        </div>
        <div className='ml-3 text-gray-200 font-medium'>
          {theme === 'light' ? 'Dark' : 'Light'}
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;

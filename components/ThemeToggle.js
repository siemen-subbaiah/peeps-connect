import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthState';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AuthContext);

  const [icon, setIcon] = useState(false);

  useEffect(() => {
    theme === 'light' ? setIcon(true) : setIcon(false);
  }, [theme]);

  return (
    <div className='flex items-center md:justify-center w-full'>
      {icon ? (
        <div className='l-light'>
          <BsFillMoonStarsFill className='h-7 w-7' onClick={toggleTheme} />
        </div>
      ) : (
        <div className='l-dark'>
          <BsFillSunFill className='h-7 w-7' onClick={toggleTheme} />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;

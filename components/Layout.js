import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthState';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='font-poppins flex flex-col h-screen justify-between'>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

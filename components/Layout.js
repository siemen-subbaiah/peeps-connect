import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className='font-poppins flex flex-col h-screen justify-between'>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

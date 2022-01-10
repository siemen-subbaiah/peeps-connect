import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // For dark mode!
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'dark'
  );
  const [storeLocal, setStoreLocal] = useState(
    typeof window !== 'undefined' && localStorage.getItem('toggle')
      ? localStorage.getItem('toggle')
      : ''
  );

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    theme === 'light' ? setStoreLocal('translate-x-[100%]') : setStoreLocal('');
  };

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        theme,
        toggleTheme,
        storeLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

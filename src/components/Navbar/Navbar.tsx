import './Navbar.scss';
import { useState, useEffect } from 'react';
import { BsMoonFill, BsMoon } from 'react-icons/bs';

export default function Navbar() {
  const [isDark, setIskDark] = useState<boolean>(false);

  const toggleTheme = () => {
    if (isDark == false) {
      localStorage.setItem('theme', 'dark');
      setIskDark(true);
    } else {
      localStorage.setItem('theme', 'light');
      setIskDark(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme')
      setIskDark(true);
    } else {
      document.body.classList.remove('dark-theme')
      setIskDark(false);
    }
  }, [isDark]);

  return (
    <nav className='nav__container'>
      <h1>Where in the world?</h1>
      <button className='switch__theme' onClick={toggleTheme}> {!isDark ? <BsMoon size={17} /> : <BsMoonFill size={17} />}Dark Mode</button>
    </nav>
  )
}


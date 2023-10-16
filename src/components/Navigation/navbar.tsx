// Navbar.tsx
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Link } from "react-router-dom";
import cn from 'classnames'

interface NavbarProps {
  transparentThreshold: number; // The scroll threshold for changing the background
}

const Navbar: React.FC<NavbarProps> = ({ transparentThreshold }) => {

  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsTransparent(scrolled <= transparentThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [transparentThreshold]);
  
  return (
    <div className={cn('navbar-wrapper',{'transparent' : isTransparent})}>
      <div className='navbar'>
            <div className='navbar-container'>
              <div className='logo'>
                <Link to='/'>OfficeBites</Link>
    
              </div>
              <div className='menu'>

              <div className='item'>
                <Link to='/'>Random</Link>
              </div>
              <div className='item'>
                <Link to='/list'>List</Link>
              </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Navbar;

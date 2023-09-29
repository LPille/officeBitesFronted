// Navbar.tsx
import React from 'react';
import './styles.scss';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
            <ul className='navbar-container'>
              <li className='logo'>
                <Link to='/'>Logo</Link>
              </li>
              <li className=''>
                <Link to='/'>Random Lets GO</Link>
              </li>
              <li className=''>
                <Link to='/list'>List</Link>
              </li>
            </ul>
      </div>
    </div>
  );
};

export default Navbar;

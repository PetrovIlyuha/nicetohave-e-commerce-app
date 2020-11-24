import React from 'react';
import { Link } from 'react-router-dom';

const UserHistorySidebar = () => {
  return (
    <nav
      style={{
        height: '100vh',
        padding: 0,
        width: '120%',
        marginLeft: '-8%',
        backgroundColor: '#564154',
        color: 'white',
      }}>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link
            to='/user/history'
            className='nav-link'
            style={{ color: '#E0CBA8' }}>
            Your History
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/user/password'
            className='nav-link'
            style={{ color: '#E0CBA8' }}>
            Update Password
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/user/wishlist'
            className='nav-link'
            style={{ color: '#E0CBA8' }}>
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserHistorySidebar;

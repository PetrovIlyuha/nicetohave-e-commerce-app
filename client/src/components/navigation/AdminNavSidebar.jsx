import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiTwotoneContainer,
  AiFillDatabase,
  AiFillGold,
} from 'react-icons/ai';
import { SiCodefactor } from 'react-icons/si';
import { GiPresent } from 'react-icons/gi';
import { MdSecurity } from 'react-icons/md';
import { useSelector } from 'react-redux';

const AdminNavSidebar = () => {
  const { darkMode: darkState } = useSelector(state => state.theme);
  return (
    <nav
      style={{
        height: '100%',
        paddingLeft: 50,
        width: '120%',
        marginLeft: '-14%',
        paddingTop: 20,
        backgroundColor: darkState ? '#0F2034' : '#714674',
        color: 'white',
      }}>
      <ul className='nav flex-column justify-center'>
        <li className='nav-item'>
          <Link
            to='/admin/dashboard'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <AiOutlineDashboard /> Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/product'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <SiCodefactor /> Product Management
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/products'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <AiTwotoneContainer /> Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/category'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <AiFillDatabase /> Single Categories
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/admin/subcategory'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <AiFillGold /> Category Management
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/admin/coupons'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <GiPresent /> Coupons
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/user/password'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'black' }}>
            <MdSecurity /> Password Update
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavSidebar;

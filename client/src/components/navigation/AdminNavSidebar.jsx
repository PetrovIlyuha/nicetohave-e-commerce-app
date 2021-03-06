import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
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
import styled from 'styled-components';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const StyledNav = styled.nav`
  height: ${props => (props.fullHeight ? '100vh' : '100%')};
  padding-left: 50px;
  width: 120%;
  margin-left: -14%;
  padding-top: 20px;
  background-color: ${props => (props.darkState ? '#0F2034' : '#714674')};
  color: 'white';
`;

const StyledDrawer = styled.nav`
  height: 100%;
  width: 100%;
  background-color: ${props => (props.darkState ? '#0F2034' : '#714674')};
  color: 'white';
  box-shadow: 2px 4px 12px -2px rgba(0, 0, 0, 0.4);
`;

const AdminNavSidebar = ({ fullHeight, showSidebar, setShowSidebar }) => {
  const { darkMode: darkState } = useSelector(state => state.theme);
  const { categories } = useSelector(state => state.categories);
  const [showDrawer, setShowDrawer] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (window.matchMedia('(max-width: 770px)').matches) {
      setShowDrawer(true);
    } else {
      setShowDrawer(false);
    }
  }, [width]);

  const handleClose = e => {
    setShowSidebar(false);
  };

  return showDrawer ? (
    <Drawer
      title='Navigation'
      placement='left'
      closable={true}
      onClose={handleClose}
      visible={showSidebar}
      key={'side menu'}>
      <StyledDrawer darkState={darkState} fullHeight={fullHeight}>
        <ul className='nav flex-column justify-center'>
          <li className='nav-item'>
            <Link
              to='/admin/dashboard'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <AiOutlineDashboard /> Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/admin/product-management'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <SiCodefactor /> Products Management
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to={`/admin/products/${categories[0].name}`}
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <AiTwotoneContainer /> Products Creation
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/admin/category'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <AiFillDatabase /> Single Categories
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/admin/subcategory/null'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <AiFillGold /> Category Management
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/admin/coupons'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <GiPresent /> Coupons
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/user/password'
              className='nav-link'
              style={{ color: darkState ? '#E0CBA8' : 'white' }}>
              <MdSecurity /> Password Update
            </Link>
          </li>
        </ul>
      </StyledDrawer>
    </Drawer>
  ) : (
    <StyledNav darkState={darkState} fullHeight={fullHeight}>
      <ul className='nav flex-column justify-center'>
        <li className='nav-item'>
          <Link
            to='/admin/dashboard'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <AiOutlineDashboard /> Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/product-management'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <SiCodefactor /> Products Management
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to={`/admin/products/${categories[0].name}`}
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <AiTwotoneContainer /> Products Creation
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/category'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <AiFillDatabase /> Single Categories
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/admin/subcategory/null'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <AiFillGold /> Category Management
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/admin/coupons'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <GiPresent /> Coupons
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/user/password'
            className='nav-link'
            style={{ color: darkState ? '#E0CBA8' : 'white' }}>
            <MdSecurity /> Password Update
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default AdminNavSidebar;

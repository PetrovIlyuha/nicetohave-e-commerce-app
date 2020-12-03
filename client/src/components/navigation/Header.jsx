import React, { useEffect, useRef, useState } from 'react';
import { Menu, Avatar, Affix } from 'antd';
import { authWithFirebase } from '../../firebase';
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Switch } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu } = Menu;
const { Item } = Menu;

const Header = ({ history }) => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const { darkMode: darkState } = useSelector(state => state.theme);
  const [userName, setUserName] = useState('no user');
  const [showNavbarElevation, setShowNavbarElevation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const affixRef = useRef();

  useEffect(() => {
    if (!darkMode) {
      dispatch({ type: 'theme/removeDarkMode', payload: false });
    } else {
      dispatch({ type: 'theme/setDarkMode', payload: true });
    }
  }, [darkMode, dispatch]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setShowNavbarElevation(true);
      } else {
        setShowNavbarElevation(false);
      }
    };
  }, [window.pageYOffset]);

  useEffect(() => {
    if (user.email !== null) {
      setUserName(user.name);
    } else {
      setUserName('no user');
    }
  }, [user]);

  const userActive = user.email !== null;

  const handleClick = e => {
    setCurrent(e.key);
  };
  const logoutUserFromApp = () => {
    authWithFirebase.signOut();
    dispatch(
      logoutUser({
        email: null,
        token: null,
        name: null,
        avatar: null,
        role: null,
      }),
    );
    history.push('/login');
  };

  return (
    <Affix offsetTop={0} ref={affixRef}>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode='horizontal'
        theme={darkState ? 'dark' : 'light'}
        style={{
          boxShadow: showNavbarElevation
            ? '0px 2px 15px 5px rgba(0,0,0,0.25)'
            : '',
          padding: '1rem',
          fontSize: '1.2rem',
        }}>
        <Item key='home' icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Item>
        <Switch
          checkedChildren='🌒'
          unCheckedChildren='🌞'
          defaultChecked
          onChange={() => setDarkMode(!darkMode)}
        />
        {userActive ? (
          <SubMenu
            icon={<Avatar src={user.avatar} style={{ marginRight: 10 }} />}
            title={`${userName}`}
            className='float-right'>
            <Item key='dashboard' icon={<SettingOutlined />}>
              <Link
                to={`${
                  user.role !== 'admin' ? 'user/history' : 'admin/dashboard'
                }`}>
                Account
              </Link>
            </Item>
            <Item
              key='logout'
              icon={<LogoutOutlined />}
              onClick={logoutUserFromApp}>
              Logout
            </Item>
          </SubMenu>
        ) : (
          <>
            <Item key='login' icon={<LoginOutlined />} className='float-right'>
              <Link to='/login'>Login</Link>
            </Item>
            <Item
              key='register'
              icon={<UserAddOutlined />}
              className='float-right'>
              <Link to='/register'>Register</Link>
            </Item>
          </>
        )}
      </Menu>
    </Affix>
  );
};

export default withRouter(Header);

import React, { useEffect, useState } from 'react';
import { Menu, Avatar } from 'antd';
import { authWithFirebase } from '../../firebase';
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu } = Menu;
const { Item } = Menu;

const Header = ({ history }) => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [userName, setUserName] = useState('no user');
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
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
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
  );
};

export default withRouter(Header);

import React, { useEffect, useState } from 'react';
import {
  authWithFirebase,
  googleAuthProviderForFirebase,
} from '../../firebase';
import cogoToast from 'cogo-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logInUser } from '../../redux/user/userSlice';

import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import Spinner from '../../components/ui/Spinner';
import { createOrUpdateUser, roleBasedRedirect } from '../../utils/auth.js';
import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 100vh;
  background-color: ${props => (props.darkState ? '#432371' : 'white')};
  color: ${props => (props.darkState ? 'white' : 'black')};
  position: relative;
`;

const StyledLoginForm = styled.div`
  position: absolute;
  top: 30%;
  color: ${props => (props.darkState ? 'white' : 'black')};
`;

const StyledLoginInput = styled.input`
  background-color: ${props => props.darkState && '#0F2034'};
  color: ${props => props.darkState && 'yellow'};
`;

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailInputError, setEmailInputError] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { darkMode: darkState } = useSelector(state => state.theme);

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [history, user]);

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const authResult = await authWithFirebase.signInWithEmailAndPassword(
        email,
        password,
      );
      const { user } = authResult;
      const { token } = await user.getIdTokenResult();
      await localStorage.setItem('session-token', token);

      createOrUpdateUser(token)
        .then(res => {
          const { email, name, avatar, role, _id: id } = res.data;
          dispatch(
            logInUser({
              email,
              name,
              avatar,
              token,
              role,
              id,
            }),
          );
          setTimeout(() => {
            roleBasedRedirect(res, history);
          }, 1000);
        })
        .catch(err => {
          console.error(err);
        });

      setLoading(false);
      cogoToast.success('You are logged in!');
    } catch (err) {
      setLoading(false);
      cogoToast.error(err.message);
    }
  };

  const loginWithGoogle = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const googleAuthResult = await authWithFirebase.signInWithPopup(
        googleAuthProviderForFirebase,
      );
      const { user } = await googleAuthResult;
      const { token } = await user.getIdTokenResult();
      await localStorage.setItem('session-token', token);
      await createOrUpdateUser(token).then(res => {
        const { email, name, avatar, role, _id: id } = res.data;
        dispatch(
          logInUser({
            email,
            name,
            avatar,
            token,
            role,
            id,
          }),
        );
        setTimeout(() => {
          roleBasedRedirect(res, history);
        }, 1000);
      });
      cogoToast.success('You are logged in with Google!');
      setLoading(false);
      history.push('/');
    } catch (err) {
      cogoToast.error(err.message);
      setLoading(false);
    }
  };

  const checkEmailValidity = email => {
    const emailRegexp = /^\S+@\S+\.\S+$/;
    if (email.trim() && !emailRegexp.test(email)) {
      setEmailInputError('Please provide a valid email address!');
      setTimeout(() => {
        setEmailInputError('');
      }, 1300);
      return false;
    } else {
      setEmailInputError('');
      return true;
    }
  };

  const isEmailValid = () => {
    const emailRegexp = /^\S+@\S+\.\S+$/;
    if (email.trim() && !emailRegexp.test(email)) {
      return false;
    }
    return true;
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <StyledContainer darkState={darkState}>
      <div className='row'>
        <StyledLoginForm darkState={darkState} className='col-md-6 offset-md-3'>
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <StyledLoginInput
                type='email'
                value={email}
                darkState={darkState}
                placeholder='Enter your email address'
                className='form-control'
                onBlur={() => checkEmailValidity(email)}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              {emailInputError && (
                <h6 className='text-danger mt-1'>{emailInputError}</h6>
              )}
            </div>
            <div className='form-group'>
              <StyledLoginInput
                type='password'
                darkState={darkState}
                value={password}
                placeholder='Enter your password'
                className='form-control mt-3'
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <Button
              type='primary'
              block
              shape='round'
              icon={<MailOutlined />}
              size='large'
              disabled={!isEmailValid() || password.length < 6}
              className='mt-3'
              onClick={handleFormSubmit}>
              Login with email/password
            </Button>

            <Button
              type='danger'
              block
              shape='round'
              icon={<GoogleOutlined />}
              size='large'
              className='mt-4'
              onClick={loginWithGoogle}>
              Login with Google
            </Button>
            <Link
              to='/forgot-password'
              className='float-right text-danger mt-3 mr-3'>
              Forgot Password?
            </Link>
          </form>
        </StyledLoginForm>
      </div>
    </StyledContainer>
  );
};

export default Login;

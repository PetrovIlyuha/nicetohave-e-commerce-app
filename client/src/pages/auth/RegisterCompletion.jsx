import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authWithFirebase } from '../../firebase';
import cogoToast from 'cogo-toast';
import Spinner from '../../components/ui/Spinner';
import { useDispatch } from 'react-redux';

import { logInUser } from '../../redux/user/userSlice';

// cogoToast.success('This is a success message');
// cogoToast.info('This is a info message');
// cogoToast.loading('This is a loading message');
// cogoToast.warn('This is a warn message');
// cogoToast.error('This is a error message');

const createOrUpdateUser = async token => {
  return await axios.post(
    `http://localhost:4000/api/create-or-update-user`,
    {},
    {
      headers: {
        token,
      },
    },
  );
};

const RegisterCompletion = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [validPassword, setValidPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setEmail(window.localStorage.getItem('email-for-registration'));
  }, []);

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!checkPasswordValidity()) {
      return cogoToast.error('You should enter a password!');
    }
    setLoading(true);
    try {
      const result = await authWithFirebase.signInWithEmailLink(
        email,
        window.location.href,
      );
      setLoading(false);

      if (result.user.emailVerified) {
        window.localStorage.removeItem('email-for-registration');
        let currentUser = authWithFirebase.currentUser;
        await currentUser.updatePassword(password);
        const { token } = await currentUser.getIdTokenResult();
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
          })
          .catch(err => {
            console.error(err);
          });
        history.push('/');
        cogoToast.success('Welcome to our store!');
      }
    } catch (err) {
      setLoading(false);
      cogoToast.error(err.message);
    }
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const checkPasswordValidity = () => {
    if (!password) {
      cogoToast.error('You will need password for the future visits');
      return false;
    } else if (password.length < 6) {
      cogoToast.error('Password too short. No less then 6 symbols');
      return false;
    } else {
      setValidPassword(true);
      return true;
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='container fluid p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h2>Register</h2>
          <form onSubmit={handleFormSubmit}>
            <div className='md-form'>
              <input
                type='email'
                value={email}
                className='form-control px-3 rounded'
                disabled
              />
            </div>
            <div className='md-form'>
              <input
                type='password'
                placeholder='Choose your password'
                className='form-control mt-3 rounded px-3'
                onBlur={checkPasswordValidity}
                onChange={onPasswordChange}
                autoFocus
              />
            </div>
            <button
              type='submit'
              disabled={!validPassword}
              className='btn mt-4 btn-raised btn-danger'>
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompletion;

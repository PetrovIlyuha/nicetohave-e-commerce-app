import React, { useEffect, useState } from 'react';
import { authWithFirebase } from '../../firebase';
import cogoToast from 'cogo-toast';

import useEmailValidation from '../../hooks/useEmailValidation';
import { useSelector } from 'react-redux';

// cogoToast.success('This is a success message');
// cogoToast.info('This is a info message');
// cogoToast.loading('This is a loading message');
// cogoToast.warn('This is a warn message');
// cogoToast.error('This is a error message');

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [history, user]);

  const {
    emailInputError,
    setEmailInputError,
    checkEmailValidity,
  } = useEmailValidation();
  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailInputError('You should give us an email!');
      setTimeout(() => {
        setEmailInputError('');
      }, 1300);
      return;
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await authWithFirebase.sendSignInLinkToEmail(email, config);
    cogoToast.loading(`Sending you an email to ${email}`).then(() => {
      cogoToast.success('Email Successfully Sent. Check your inbox!');
    });
    window.localStorage.setItem('email-for-registration', email);
    setEmail('');
  };

  return (
    <div className='container fluid p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h2>Register</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type='email'
              value={email}
              placeholder='Enter your email address'
              className='form-control'
              onBlur={() => checkEmailValidity(email, setEmailInputError)}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            {emailInputError && (
              <h6 className='text-danger mt-1'>{emailInputError}</h6>
            )}
            <button type='submit' className='btn mt-4 btn-raised btn-danger'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from 'react';

import cogoToast from 'cogo-toast';
// import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import Spinner from '../../components/ui/Spinner';
import useEmailValidation from '../../hooks/useEmailValidation';
import { authWithFirebase } from '../../firebase';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    emailInputError,
    setEmailInputError,
    checkEmailValidity,
  } = useEmailValidation();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [history, user]);

  const handleForgotPasswordSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };
      await authWithFirebase.sendPasswordResetEmail(email, config);
      setEmail('');
      setLoading(false);
      cogoToast.success('Check your email for the link to change password!');
    } catch (err) {
      setLoading(false);
      cogoToast.error(err.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      <form onSubmit={handleForgotPasswordSubmit}>
        <h4>Retrive your password?</h4>
        <input
          type='email'
          className='form-control'
          placeholder='Email to send you the link'
          onBlur={() => checkEmailValidity(email, setEmailInputError)}
          autoFocus
          onChange={e => setEmail(e.target.value)}
        />
        {emailInputError && (
          <h6 className='text-danger mt-1'>{emailInputError}</h6>
        )}
        <button className='btn btn-raised btn-danger mt-4' disabled={!email}>
          Send me Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

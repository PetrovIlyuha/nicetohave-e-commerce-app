import { useState } from 'react';

const useEmailValidation = () => {
  const [emailInputError, setEmailInputError] = useState('');

  const checkEmailValidity = (email, setEmailInputError) => {
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
  return { emailInputError, setEmailInputError, checkEmailValidity };
};

export default useEmailValidation;

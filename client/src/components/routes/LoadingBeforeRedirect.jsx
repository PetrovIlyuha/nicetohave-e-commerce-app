import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingBeforeRedirect = ({ timeout }) => {
  const [counter, setCounter] = useState(timeout);

  const history = useHistory();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);
    counter === 0 && history.push('/');
    return () => {
      clearInterval(countdown);
    };
  }, [counter, history]);

  return (
    <div className='container p-5 mb-5 text-center'>
      <h3>You will be redirected in {counter} seconds</h3>
    </div>
  );
};

export default LoadingBeforeRedirect;

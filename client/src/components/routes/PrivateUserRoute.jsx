import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import Spinner from '../ui/Spinner';
import LoadingBeforeRedirect from './LoadingBeforeRedirect';

const PrivateUserRoute = ({ ...props }) => {
  const { user } = useSelector(state => state.user);

  return user && user.token ? (
    <Route {...props} />
  ) : (
    <>
      <LoadingBeforeRedirect timeoutMs={3} />
      <Spinner message='You are not authorized' />
    </>
  );
};

export default PrivateUserRoute;

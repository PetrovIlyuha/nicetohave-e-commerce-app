import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { getAdminUserData } from '../../utils/auth';

import Spinner from '../ui/Spinner';
import LoadingBeforeRedirect from './LoadingBeforeRedirect';

const RestrictedAdminRoute = ({ ...props }) => {
  const { user } = useSelector(state => state.user);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      getAdminUserData(user.token)
        .then(response => {
          setAdmin(true);
        })
        .catch(err => {
          setAdmin(false);
        });
    }
  }, [user]);
  return admin ? (
    <Route {...props} />
  ) : (
    <>
      <LoadingBeforeRedirect timeoutMs={3} />
      <Spinner message='Protected admin-only route' />
    </>
  );
};

export default RestrictedAdminRoute;

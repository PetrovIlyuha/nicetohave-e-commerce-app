import axios from 'axios';

export const createOrUpdateUser = async token => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        token,
      },
    },
  );
};

export const getCurrentUser = async token => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        token,
      },
    },
  );
};

export const roleBasedRedirect = (res, history) => {
  if (res.data.role === 'admin') {
    history.push('/admin/dashboard');
  } else {
    history.push('/user/history');
  }
};

export const getAdminUserData = async token => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin-user`,
    {},
    {
      headers: {
        token,
      },
    },
  );
};

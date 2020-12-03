import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authWithFirebase } from './firebase';
import { useDispatch } from 'react-redux';
import { logInUser } from './redux/user/userSlice';
import { getCurrentUser } from './utils/auth';
import { getAllCategoriesThunk } from './redux/categories/categoriesSlice';
const UpdateCategory = React.lazy(() =>
  import('./pages/admin/category/UpdateCategory'),
);
const PrivateUserRoute = React.lazy(() =>
  import('./components/routes/PrivateUserRoute'),
);
const RestrictedAdminRoute = React.lazy(() =>
  import('./components/routes/RestrictedAdminRoute'),
);
const History = React.lazy(() => import('./pages/user/History.jsx'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Header = React.lazy(() => import('./components/navigation/Header'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const RegisterCompletion = React.lazy(() =>
  import('./pages/auth/RegisterCompletion'),
);
const Wishlist = React.lazy(() => import('./pages/user/Wishlist'));
const Password = React.lazy(() => import('./pages/user/Password'));
const CreateCategory = React.lazy(() =>
  import('./pages/admin/category/CreateCategory'),
);
const CreateSubCategory = React.lazy(() =>
  import('./pages/admin/subcategories/CreateSubCategory'),
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authWithFirebase.onAuthStateChanged(async user => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        getCurrentUser(token)
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
      }
    });
    dispatch(getAllCategoriesThunk());
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/register/complete' component={RegisterCompletion} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <PrivateUserRoute path='/forgot-password' component={ForgotPassword} />
        <PrivateUserRoute path='/user/password' component={Password} />
        <PrivateUserRoute path='/user/history' component={History} />
        <PrivateUserRoute path='/user/wishlist' component={Wishlist} />
        <RestrictedAdminRoute
          exact
          path='/admin/dashboard'
          component={AdminDashboard}
        />
        <RestrictedAdminRoute
          exact
          path='/admin/category'
          component={CreateCategory}
        />
        <RestrictedAdminRoute
          path='/admin/category/:slug'
          component={UpdateCategory}
        />
        <RestrictedAdminRoute
          path='/admin/subcategory'
          component={CreateSubCategory}
        />
        <ToastContainer />
      </Switch>
    </>
  );
};

export default App;

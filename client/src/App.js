import React, { Suspense, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
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

const UpdateSubCategory = React.lazy(() =>
  import('./pages/admin/subcategories/UpdateSubCategory'),
);
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
const CreateProduct = React.lazy(() =>
  import('./pages/admin/product/CreateProduct'),
);
const ManageProducts = React.lazy(() =>
  import('./pages/admin/product/ManageProducts'),
);
const UpdateProduct = React.lazy(() =>
  import('./pages/admin/product/UpdateProduct.jsx'),
);

Sentry.init({
  dsn:
    'https://d104f00d7b7c45418a0d1883cf807c60@o492741.ingest.sentry.io/5560542',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/register/complete' component={RegisterCompletion} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <PrivateUserRoute
            path='/forgot-password'
            component={ForgotPassword}
          />
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
            exact
            path='/admin/subcategory/:categoryName'
            component={CreateSubCategory}
          />
          <RestrictedAdminRoute
            path='/admin/subcategory/:slug'
            component={UpdateSubCategory}
          />
          <RestrictedAdminRoute
            path='/admin/products/:defined_category'
            component={CreateProduct}
          />
          <RestrictedAdminRoute
            path='/admin/product-management'
            component={ManageProducts}
          />
          <RestrictedAdminRoute
            path='/admin/product/:slug'
            component={UpdateProduct}
          />
        </Suspense>
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;

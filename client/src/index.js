import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux';
import Spinner from './components/ui/Spinner';

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

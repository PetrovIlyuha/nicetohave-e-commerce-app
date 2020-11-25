import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';

export default combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

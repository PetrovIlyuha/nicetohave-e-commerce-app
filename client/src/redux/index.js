import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import themeReducer from './theme/themeSlice';

export default combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  theme: themeReducer,
});

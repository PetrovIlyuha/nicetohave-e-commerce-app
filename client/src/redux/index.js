import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import subCategoriesReducer from './subcategories/subCategoriesSlice';
import themeReducer from './theme/themeSlice';

export default combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  subcategories: subCategoriesReducer,
  theme: themeReducer,
});

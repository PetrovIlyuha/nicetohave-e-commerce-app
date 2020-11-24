import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export default combineReducers({
  user: userReducer,
});

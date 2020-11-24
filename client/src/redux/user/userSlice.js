import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'user',
  initialState: { user: {} },
  reducers: {
    logInUser: (state, action) => {
      const { email, token, name, avatar, role, id } = action.payload;
      state.user.email = email;
      state.user.token = token;
      state.user.name = name;
      state.user.avatar = avatar;
      state.user.role = role;
      state.user.id = id;
    },
    logoutUser: (state, action) => {
      const { email, token, name, avatar, role } = action.payload;
      state.user.email = email;
      state.user.token = token;
      state.user.name = name;
      state.user.name = avatar;
      state.user.role = role;
      state.user.id = undefined;
    },
  },
});

export const { logInUser, logoutUser } = todosSlice.actions;

export const getUserTokenCheck = () => async dispatch => {
  try {
  } catch (err) {}
};
export default todosSlice.reducer;

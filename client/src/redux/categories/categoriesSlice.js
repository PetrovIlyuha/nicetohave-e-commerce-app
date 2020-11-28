import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    categories: [],
    deleteMessage: { message: null },
  },
  reducers: {
    categoriesLoading: (state, action) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    categoriesReceived: (state, { payload }) => {
      if (state.loading) {
        state.loading = false;
        state.categories = payload;
      }
    },
    categoryCreateRequested: (state, action) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    singleCategoryReceived: (state, { payload }) => {
      state.category = payload;
    },
    singleCategoryRemoved: (state, { payload }) => {
      state.deleteMessage = payload;
    },
    createCategory: (state, { payload }) => {
      state.createdCategory = payload;
    },
    createCategoryFailed: (state, { payload }) => {
      state.createCategoryError = payload;
    },
    resetCreateFailure: (state, { payload }) => {
      state.createCategoryError = null;
    },
    updateCategory: (state, { payload }) => {
      state.updatedCategory = payload;
    },
  },
});

export const {
  categoriesLoading,
  categoriesReceived,
  singleCategoryReceived,
  categoryCreateRequested,
  createCategoryFailed,
  singleCategoryRemoved,
  createCategory,
  updateCategory,
  resetCreateFailure,
} = categoriesSlice.actions;

export const getAllCategoriesThunk = () => async dispatch => {
  dispatch(categoriesLoading());
  const { data } = await axios.get(`${process.env.REACT_APP_API}/categories`);
  dispatch(categoriesReceived(data));
};

export const getSingleCategoryThunk = slug => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/category/${slug}`,
  );
  dispatch(singleCategoryReceived(data));
};

export const deleteOneCategoryBySlugThunk = (slug, token) => async dispatch => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API}/category/${slug}`,
    {
      headers: {
        token,
      },
    },
  );
  dispatch(singleCategoryRemoved(data));
};

export const updateCategoryThunk = (slug, newName, token) => async dispatch => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name: newName },
    {
      headers: {
        token,
      },
    },
  );
  dispatch(updateCategory(data));
};

export const createCategoryThunk = (name, token) => async dispatch => {
  dispatch(categoryCreateRequested);
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/category`,
      name,
      { headers: { token } },
    );
    dispatch(createCategory(data));
  } catch (err) {
    dispatch(createCategoryFailed(err.response.data));
  }
};

export default categoriesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    categories: [],
    category: null,
    createdCategory: null,
    deleteMessage: { message: null },
    updateSuccess: false,
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
      state.updateSuccess = true;
    },
    clearRemovalMessage: (state, { payload }) => {
      state.deleteMessage = null;
    },
    clearCreateCategory: (state, { payload }) => {
      state.createdCategory = null;
    },
    resetUpdateState: (state, { payload }) => {
      state.updateSuccess = false;
      state.category = null;
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
  clearUpdatedCategory,
  resetUpdateState,
  clearCreateCategory,
  clearRemovalMessage,
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

export const updateCategoryThunk = (
  slug,
  newName,
  newImage,
  token,
) => async dispatch => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name: newName, image: newImage },
    {
      headers: {
        token,
      },
    },
  );
  dispatch(updateCategory(data));
};

export const createCategoryThunk = (categoryData, token) => async dispatch => {
  dispatch(categoryCreateRequested);
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/category`,
      categoryData,
      { headers: { token } },
    );
    dispatch(createCategory(data));
  } catch (err) {
    dispatch(createCategoryFailed(err.response.data));
  }
};

export default categoriesSlice.reducer;

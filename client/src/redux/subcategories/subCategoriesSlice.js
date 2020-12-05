import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const subCategoriesSlice = createSlice({
  name: 'sub-categories',
  initialState: {
    loading: false,
    subcategories: [],
    subcategory: null,
    createdSubCategory: null,
    updatedSubCategory: null,
    deleteMessage: { message: null },
    updateSuccess: false,
  },
  reducers: {
    subCategoriesLoading: (state, action) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    subCategoriesReceived: (state, { payload }) => {
      if (state.loading) {
        state.loading = false;
        state.subcategories = payload;
      }
    },
    subCategoryCreateRequested: (state, action) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    singleSubCategoryReceived: (state, { payload }) => {
      state.subcategory = payload;
    },
    singleSubCategoryRemoved: (state, { payload }) => {
      state.deleteMessage = payload;
    },
    createSubCategory: (state, { payload }) => {
      state.createdSubCategory = payload;
    },
    createSubCategoryFailed: (state, { payload }) => {
      state.createSubCategoryError = payload;
    },
    resetSubCategoryCreateFailure: (state, { payload }) => {
      state.createSubCategoryError = null;
    },
    updateSubCategory: (state, { payload }) => {
      state.updatedSubCategory = payload;
      state.updateSuccess = true;
    },
    clearSubCategoryRemovalMessage: (state, { payload }) => {
      state.deleteMessage = null;
    },
    clearCreateSubCategory: (state, { payload }) => {
      state.createdSubCategory = null;
    },
    resetUpdateStateSubCategory: (state, { payload }) => {
      state.updateSuccess = false;
      state.subcategory = null;
    },
  },
});

export const {
  subCategoriesLoading,
  subCategoriesReceived,
  singleSubCategoryReceived,
  subCategoryCreateRequested,
  createSubCategoryFailed,
  singleSubCategoryRemoved,
  createSubCategory,
  updateSubCategory,
  resetSubCategoryCreateFailure,
  resetUpdateStateSubCategory,
  clearCreateSubCategory,
  clearSubCategoryRemovalMessage,
} = subCategoriesSlice.actions;

export const getAllSubCategoriesThunk = () => async dispatch => {
  dispatch(subCategoriesLoading());
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/subcategories`,
  );
  dispatch(subCategoriesReceived(data));
};

export const getSingleSubCategoryThunk = slug => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
  );
  dispatch(singleSubCategoryReceived(data));
};

export const deleteOneSubCategoryBySlugThunk = (
  slug,
  token,
) => async dispatch => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    {
      headers: {
        token,
      },
    },
  );
  dispatch(singleSubCategoryRemoved(data));
};

export const updateSubCategoryThunk = (
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
  dispatch(updateSubCategory(data));
};

export const createSubCategoryThunk = (
  subCategoryData,
  token,
) => async dispatch => {
  dispatch(subCategoryCreateRequested);
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/subcategory`,
      subCategoryData,
      {
        headers: { token },
      },
    );
    dispatch(createSubCategory(data));
  } catch (err) {
    dispatch(createSubCategoryFailed(err.response.data));
  }
};

export default subCategoriesSlice.reducer;

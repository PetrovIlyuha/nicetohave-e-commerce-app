import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const subCategoriesSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    category: null,
    subcategories: null,
    product: null,
    deleteMessage: { message: null },
    updateSuccess: false,
  },
  reducers: {
    createProductLoading: (state, action) => {
      state.loading = true;
    },
    setMainCategory: (state, { payload }) => {
      state.category = payload;
    },
    createdProduct: (state, { payload }) => {
      state.product = payload;
    },
    clearCreateProductState: (state, { payload }) => {
      state.product = null;
      state.category = null;
    },
  },
});

export const {
  createProductLoading,
  createdProduct,
  setMainCategory,
  clearCreateProductState,
} = subCategoriesSlice.actions;

export const createProductThunk = (product, token) => async dispatch => {
  dispatch(createProductLoading());
  const { data } = await axios.post(
    `${process.env.REACT_APP_API}/product`,
    product,
    {
      headers: {
        token,
      },
    },
  );
  dispatch(createdProduct(data));
};

export const getCategoryByIdThunk = id => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/categoryById/${id}`,
  );
  dispatch(setMainCategory(data));
};

export default subCategoriesSlice.reducer;

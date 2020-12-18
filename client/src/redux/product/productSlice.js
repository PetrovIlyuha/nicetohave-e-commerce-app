import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const subCategoriesSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    category: null,
    subcategories: null,
    product: null,
    productCreateSuccess: null,
    deleteMessage: { message: null },
    updateSuccess: false,
    productCreateError: null,
    all: [],
  },
  reducers: {
    createProductLoading: (state, action) => {
      state.loading = true;
      state.productCreateError = null;
      state.productCreateSuccess = null;
    },
    setMainCategory: (state, { payload }) => {
      state.category = payload;
    },
    createdProduct: (state, { payload }) => {
      state.product = payload;
      state.productCreateSuccess = true;
      state.loading = false;
    },
    productCreateFailed: (state, { payload }) => {
      state.productCreateError = 'DB product creation error occurred!';
      state.loading = false;
    },
    clearCreateProductState: (state, { payload }) => {
      state.product = null;
      state.category = null;
    },
    setAllProductsInState: (state, { payload }) => {
      state.all = payload;
    },
  },
});

export const {
  createProductLoading,
  createdProduct,
  setMainCategory,
  productCreateFailed,
  clearCreateProductState,
  setAllProductsInState,
} = subCategoriesSlice.actions;

export const createProductThunk = (product, token) => async dispatch => {
  dispatch(createProductLoading());
  try {
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
  } catch (err) {
    dispatch(productCreateFailed(err.response.data.error));
  }
};

export const getCategoryByIdThunk = id => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/categoryById/${id}`,
  );
  dispatch(setMainCategory(data));
};

export const getAllProducts = () => async dispatch => {
  const { data } = await axios.get(`${process.env.REACT_APP_API}/products`);
  dispatch(setAllProductsInState(data));
};
export default subCategoriesSlice.reducer;

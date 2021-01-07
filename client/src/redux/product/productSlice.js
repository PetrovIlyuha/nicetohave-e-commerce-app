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
    productForCategory: [],
    productBySlug: null,
    removedProduct: null,
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
    setProductsByCategory: (state, { payload }) => {
      state.productForCategory = payload;
    },
    setOneProductBySlug: (state, { payload }) => {
      state.productBySlug = payload;
    },
    setRemovedProduct: (state, { payload }) => {
      state.removedProduct = payload;
    },
    clearRemovedProduct: (state, { payload }) => {
      state.removedProduct = null;
    },
    imageRemoved: (state, { payload }) => {
      state.imageRemoved = payload;
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
  setProductsByCategory,
  setOneProductBySlug,
  setRemovedProduct,
  clearRemovedProduct,
  imageRemoved,
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

export const getAllProductsByCount = count => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/products/${count}`,
  );
  dispatch(setAllProductsInState(data));
};

export const getProductsByCategoryId = id => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/products-by-category/${id}`,
  );
  dispatch(setProductsByCategory(data));
};

export const getOneProductBySlug = slug => async dispatch => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/product-by-slug/${slug}`,
  );
  dispatch(setOneProductBySlug(data));
};

export const deleteProductById = (id, token) => async dispatch => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API}/delete-product/${id}`,
    {
      headers: {
        token,
      },
    },
  );
  dispatch(setRemovedProduct(data));
};

export const removeImageCloudAndDatabase = (image, token) => async dispatch => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API}/remove-image`,
    {
      data: { public_id: image.public_id },
      headers: { token },
    },
  );
  dispatch(imageRemoved(data.message));
};

export default subCategoriesSlice.reducer;

import { Divider } from 'antd';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import Spinner from '../../../components/ui/Spinner';
import { getCategoryByIdThunk } from '../../../redux/subcategories/subCategoriesSlice';
import {
  getSingleSubCategoryThunk,
  updateSubCategoryThunk,
  resetUpdateStateSubCategory,
} from '../../../redux/subcategories/subCategoriesSlice';
import { slideInLeft } from './animations';
import SubDropDown from './SubDropDown';
import UpdateSubcategoryForm from './UpdateSubcategoryForm';

const UpdateSubCategory = ({ match, history }) => {
  const { slug } = match.params;
  const { darkMode: darkState } = useSelector(state => state.theme);
  const {
    user: { token },
  } = useSelector(state => state.user);
  const { subcategory, parentCategory: newParent, updateSuccess } = useSelector(
    state => state.subcategories,
  );

  const { categories } = useSelector(state => state.categories);
  const categoriesNames = categories?.map(cat => cat.name);
  const [parentCategory, setParentCategory] = useState('');
  const [resetUpdateForm, setResetUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  useEffect(() => {
    dispatch(getSingleSubCategoryThunk(slug));
    dispatch(resetUpdateStateSubCategory());
  }, [slug, dispatch]);

  useEffect(() => {
    if (subcategory && parentCategory) {
      const findParent = categories.find(cat => cat.name === parentCategory);
      dispatch(getCategoryByIdThunk(findParent._id));
    }
  }, [parentCategory, categories, dispatch, subcategory]);

  const onSubmit = async data => {
    const { name, image } = data;
    setLoading(true);
    await dispatch(
      updateSubCategoryThunk(slug, name, image, newParent._id, token),
    );
    setResetUpdateForm(true);
    dispatch(getSingleSubCategoryThunk(slug));
    setLoading(false);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(`Category was updated!`);
      setTimeout(() => {
        dispatch(resetUpdateStateSubCategory());
        history.push('/admin/subcategory');
      }, 1400);
    } else {
      return;
    }
  }, [updateSuccess, dispatch, history]);

  if (loading) return <Spinner message='Loading' />;

  return (
    <>
      {subcategory && (
        <div
          className={
            darkState ? 'container-fluid text-white' : 'container-fluid'
          }
          style={{ backgroundColor: darkState ? '#432371' : 'white' }}>
          <div className='row'>
            <div className='col-md-3 h-100'>
              <AdminNavSidebar fullHeight />
            </div>
            <motion.div
              className='col-md-8 offset-md-1'
              variants={slideInLeft}
              initial='hidden'
              animate='show'>
              <div className='container mt-3'>
                <h2 className={darkState ? 'text-white' : ''}>
                  Sub-category Management
                </h2>
                <Divider
                  style={{
                    height: '3px',
                    backgroundColor: darkState ? 'lightgreen' : 'black',
                  }}
                />
                <div className='row'>
                  <img
                    src={subcategory?.image}
                    alt='sub-category'
                    className='col-md-4 mb-3'
                  />
                  <div className='col-md-4'>
                    Current Sub-Category name:{' '}
                    <strong>{subcategory?.name}</strong>
                  </div>
                </div>
                <div className='my-3'>
                  <SubDropDown
                    label='Select new Category'
                    items={categoriesNames}
                    selectItem={setParentCategory}
                  />
                </div>
                <UpdateSubcategoryForm
                  resetUpdateForm={resetUpdateForm}
                  category={
                    newParent?.name ? newParent.name : subcategory.parent.name
                  }
                  onSubmit={onSubmit}
                  loading={loading}
                />
              </div>
            </motion.div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UpdateSubCategory;

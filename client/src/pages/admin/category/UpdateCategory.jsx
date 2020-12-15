import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import Spinner from '../../../components/ui/Spinner';
import {
  getSingleCategoryThunk,
  updateCategoryThunk,
  resetUpdateState,
} from '../../../redux/categories/categoriesSlice';
import UpdateCategoryForm from './UpdateCategoryForm';

const UpdateCategory = ({ match, history }) => {
  const { slug } = match.params;
  const { darkMode: darkState } = useSelector(state => state.theme);
  const {
    user: { token },
  } = useSelector(state => state.user);
  const { category, updateSuccess } = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const { reset } = useForm();
  const [loading, setLoading] = useState();

  useEffect(() => {
    dispatch(getSingleCategoryThunk(slug));
    dispatch(resetUpdateState());
  }, [slug, dispatch]);

  const onSubmit = async data => {
    const { name, image } = data;
    setLoading(true);
    await dispatch(updateCategoryThunk(slug, name, image, token));
    reset();
    dispatch(getSingleCategoryThunk(slug));
    setLoading(false);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(`Category was updated!`);
      setTimeout(() => {
        dispatch(resetUpdateState());
        history.push('/admin/category');
      }, 1400);
    } else {
      return;
    }
  }, [updateSuccess, dispatch, history]);

  if (loading) return <Spinner message='Loading' />;

  return (
    <>
      {category && (
        <div
          className={
            darkState ? 'container-fluid text-white' : 'container-fluid'
          }
          style={{ backgroundColor: darkState ? '#432371' : 'white' }}>
          <div className='row'>
            <div className='col-md-3 h-100'>
              <AdminNavSidebar fullHeight />
            </div>
            <div className='col-md-8 offset-md-1'>
              <div className='container mt-3'>
                <h2 className={darkState ? 'text-white' : ''}>
                  Update Category
                </h2>
                <div className='row'>
                  <img
                    src={category?.image}
                    alt='category'
                    className='col-md-4 mb-3'
                  />
                  <div className='col-md-4'>
                    Current Category name: <strong>{category?.name}</strong>
                  </div>
                </div>
                <UpdateCategoryForm onSubmit={onSubmit} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCategory;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'antd';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import Spinner from '../../../components/ui/Spinner';
import {
  getSingleCategoryThunk,
  updateCategoryThunk,
  resetUpdateState,
} from '../../../redux/categories/categoriesSlice';

const UpdateCategory = ({ match, history }) => {
  const { slug } = match.params;
  const { darkMode: darkState } = useSelector(state => state.theme);
  const {
    user: { token },
  } = useSelector(state => state.user);
  const { category, updateSuccess } = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm();
  const [loading, setLoading] = useState();

  useEffect(() => {
    dispatch(getSingleCategoryThunk(slug));
    dispatch(resetUpdateState());
  }, [slug]);

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
  }, [updateSuccess]);

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
                <form className='d-flex flex-column'>
                  <label htmlFor='category'>Updated Category Name</label>
                  <input
                    name='name'
                    autoFocus
                    style={{ color: 'black' }}
                    id='category'
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 40,
                    })}
                  />
                  {errors.name &&
                    'Category name is required. (min: 3, max: 40)'}
                  <label style={{ marginTop: 10 }} htmlFor='image'>
                    Updated Category Image URL
                  </label>
                  <input
                    name='image'
                    style={{ color: 'black' }}
                    id='image'
                    ref={register({ required: true })}
                  />
                  {errors.image && 'Image for category is required.'}
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    type='primary'
                    className='mt-3'
                    loading={loading}>
                    Update
                  </Button>
                </form>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCategory;

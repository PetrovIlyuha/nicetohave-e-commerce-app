import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const UpdateCategoryForm = ({
  category,
  onSubmit,
  loading,
  resetUpdateForm,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { darkMode } = useSelector(state => state.theme);

  useEffect(() => {
    if (resetUpdateForm) {
      reset();
    }
  }, [resetUpdateForm, reset]);
  return (
    <form className='d-flex flex-column'>
      <label htmlFor='category'>Move To This Category</label>
      <h2
        name='category'
        style={{ color: darkMode ? 'lightgreen' : 'black', marginBottom: 20 }}
        id='category'
        ref={register}>
        {category}
      </h2>
      <label htmlFor='category'>New Sub-Category Name</label>
      <input
        name='name'
        autoFocus
        style={{ color: 'black' }}
        id='subcategory'
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 40,
        })}
      />
      {errors.name && 'SubCategory name is required. (min: 3, max: 40)'}
      <label style={{ marginTop: 10 }} htmlFor='image'>
        Updated Sub-Category Image URL
      </label>
      <input
        name='image'
        style={{ color: 'black' }}
        id='image'
        ref={register({ required: true })}
      />
      {errors.image && 'Image for sub-category is required.'}
      <Button
        onClick={handleSubmit(onSubmit)}
        type='primary'
        className='mt-3'
        loading={loading}>
        Update
      </Button>
    </form>
  );
};

export default UpdateCategoryForm;

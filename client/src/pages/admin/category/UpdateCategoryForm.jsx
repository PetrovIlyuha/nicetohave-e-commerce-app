import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

const UpdateCategoryForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
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
      {errors.name && 'Category name is required. (min: 3, max: 40)'}
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
  );
};

export default UpdateCategoryForm;

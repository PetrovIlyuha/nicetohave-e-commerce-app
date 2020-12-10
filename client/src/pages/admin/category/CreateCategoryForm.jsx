import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';

const CreateCategoryForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (errors.name) {
      toast.error('Category name was not provided!');
      return;
    }
    if (errors.image) {
      toast.error('Image URL is needed for storage purposes');
      return;
    }
  }, [errors]);

  return (
    <form className='d-flex flex-column'>
      <label htmlFor='category'>New Category Name</label>
      <input
        name='name'
        autoFocus
        style={{ color: 'black' }}
        id='category'
        ref={register({ required: true, minLength: 3, maxLength: 40 })}
      />
      {errors.name && 'Category name is required. (min: 3, max: 40)'}
      <label style={{ marginTop: 10 }} htmlFor='image'>
        New Category Image URL
      </label>
      <input
        name='image'
        id='image'
        style={{ color: 'black' }}
        ref={register({ required: true })}
      />
      {errors.image && 'Image for category is required.'}
      <Button
        onClick={handleSubmit(onSubmit)}
        type='primary'
        className='mt-3'
        loading={loading}>
        Create
      </Button>
      <ToastContainer />
    </form>
  );
};

export default CreateCategoryForm;
